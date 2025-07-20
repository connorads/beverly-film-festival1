// Authentication System for Beverly Hills Film Festival
// Supports three portals: Festival (public), Admin, and Filmmaker

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import type { User, SiteMode, UserRole } from '@/lib/types';

// JWT configuration
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'development-secret-change-in-production'
);
const JWT_ALGORITHM = 'HS256';

// Token expiration times
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';
const REMEMBER_ME_EXPIRY = '30d';

// Cookie names per site mode
const COOKIE_NAMES = {
  festival: {
    access: 'bhff_festival_token',
    refresh: 'bhff_festival_refresh',
    session: 'bhff_festival_session',
  },
  admin: {
    access: 'bhff_admin_token',
    refresh: 'bhff_admin_refresh',
    session: 'bhff_admin_session',
  },
  filmmaker: {
    access: 'bhff_filmmaker_token',
    refresh: 'bhff_filmmaker_refresh',
    session: 'bhff_filmmaker_session',
  },
} as const;

// Permission matrix for roles
export const PERMISSIONS = {
  admin: [
    'users.read',
    'users.write',
    'users.delete',
    'films.read',
    'films.write',
    'films.delete',
    'films.status',
    'venues.read',
    'venues.write',
    'venues.delete',
    'screenings.read',
    'screenings.write',
    'screenings.delete',
    'tickets.read',
    'tickets.write',
    'tickets.refund',
    'payments.read',
    'payments.refund',
    'reports.read',
    'reports.export',
    'settings.read',
    'settings.write',
  ],
  festival_staff: [
    'films.read',
    'films.write',
    'films.status',
    'venues.read',
    'venues.write',
    'screenings.read',
    'screenings.write',
    'tickets.read',
    'tickets.write',
    'payments.read',
    'reports.read',
  ],
  filmmaker: [
    'films.read.own',
    'films.write.own',
    'films.submit',
    'screenings.read.own',
    'tickets.purchase',
    'payments.read.own',
  ],
  attendee: [
    'films.read.public',
    'screenings.read.public',
    'tickets.purchase',
    'tickets.read.own',
    'payments.read.own',
  ],
  judge: [
    'films.read.assigned',
    'films.review',
    'reviews.read.own',
    'reviews.write.own',
  ],
  sponsor: [
    'sponsors.read.own',
    'sponsors.write.own',
    'reports.read.sponsor',
  ],
  vendor: [
    'vendors.read.own',
    'vendors.write.own',
    'payments.read.own',
  ],
} as const;

// JWT payload types
interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  siteMode: SiteMode;
  permissions: string[];
  sessionId: string;
}

interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
  siteMode: SiteMode;
}

// Session data
interface Session {
  id: string;
  userId: string;
  siteMode: SiteMode;
  ipAddress?: string;
  userAgent?: string;
  lastActivity: Date;
  expiresAt: Date;
}

// Auth utilities
export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate access token
  static async generateAccessToken(user: User, siteMode: SiteMode, sessionId: string): Promise<string> {
    const permissions = PERMISSIONS[user.role] || [];
    
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      siteMode,
      permissions,
      sessionId,
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRY)
      .sign(JWT_SECRET);
  }

  // Generate refresh token
  static async generateRefreshToken(userId: string, siteMode: SiteMode, sessionId: string): Promise<string> {
    const payload: RefreshTokenPayload = {
      userId,
      sessionId,
      siteMode,
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setSubject(userId)
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRY)
      .sign(JWT_SECRET);
  }

  // Verify token
  static async verifyToken<T = TokenPayload>(token: string): Promise<T | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload as T;
    } catch (error) {
      return null;
    }
  }

  // Create session
  static async createSession(
    user: User,
    siteMode: SiteMode,
    rememberMe: boolean = false,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    session: Session;
  }> {
    const sessionId = nanoid();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (rememberMe ? 30 : 7));

    const session: Session = {
      id: sessionId,
      userId: user.id,
      siteMode,
      ipAddress,
      userAgent,
      lastActivity: new Date(),
      expiresAt,
    };

    const accessToken = await this.generateAccessToken(user, siteMode, sessionId);
    const refreshToken = await this.generateRefreshToken(user.id, siteMode, sessionId);

    return {
      accessToken,
      refreshToken,
      session,
    };
  }

  // Set auth cookies
  static async setAuthCookies(
    siteMode: SiteMode,
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean = false
  ) {
    const cookieStore = cookies();
    const cookieNames = COOKIE_NAMES[siteMode];
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    // Set access token cookie
    cookieStore.set(cookieNames.access, accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60, // 1 hour
    });

    // Set refresh token cookie
    cookieStore.set(cookieNames.refresh, refreshToken, {
      ...cookieOptions,
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7, // 30 days or 7 days
    });
  }

  // Clear auth cookies
  static async clearAuthCookies(siteMode: SiteMode) {
    const cookieStore = cookies();
    const cookieNames = COOKIE_NAMES[siteMode];
    
    cookieStore.delete(cookieNames.access);
    cookieStore.delete(cookieNames.refresh);
    cookieStore.delete(cookieNames.session);
  }

  // Get current user from cookies
  static async getCurrentUser(siteMode: SiteMode): Promise<TokenPayload | null> {
    const cookieStore = cookies();
    const cookieNames = COOKIE_NAMES[siteMode];
    
    const accessToken = cookieStore.get(cookieNames.access)?.value;
    if (!accessToken) return null;

    return this.verifyToken<TokenPayload>(accessToken);
  }

  // Refresh access token
  static async refreshAccessToken(siteMode: SiteMode): Promise<string | null> {
    const cookieStore = cookies();
    const cookieNames = COOKIE_NAMES[siteMode];
    
    const refreshToken = cookieStore.get(cookieNames.refresh)?.value;
    if (!refreshToken) return null;

    const payload = await this.verifyToken<RefreshTokenPayload>(refreshToken);
    if (!payload || payload.siteMode !== siteMode) return null;

    // TODO: Fetch user from database
    // For now, return null
    return null;
  }

  // Check permissions
  static hasPermission(user: TokenPayload, permission: string): boolean {
    return user.permissions.includes(permission);
  }

  // Check multiple permissions (all must match)
  static hasAllPermissions(user: TokenPayload, permissions: string[]): boolean {
    return permissions.every(permission => user.permissions.includes(permission));
  }

  // Check multiple permissions (any can match)
  static hasAnyPermission(user: TokenPayload, permissions: string[]): boolean {
    return permissions.some(permission => user.permissions.includes(permission));
  }

  // Validate role for site mode
  static isValidRoleForSiteMode(role: UserRole, siteMode: SiteMode): boolean {
    const validRoles: Record<SiteMode, UserRole[]> = {
      admin: ['admin', 'festival_staff'],
      filmmaker: ['filmmaker'],
      festival: ['attendee', 'judge', 'sponsor', 'vendor', 'filmmaker', 'admin', 'festival_staff'],
    };

    return validRoles[siteMode].includes(role);
  }
}

// Next.js middleware helper
export async function withAuth(
  request: Request,
  siteMode: SiteMode,
  requiredPermissions?: string[]
): Promise<TokenPayload | Response> {
  const user = await AuthService.getCurrentUser(siteMode);
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!AuthService.isValidRoleForSiteMode(user.role, siteMode)) {
    return new Response('Forbidden', { status: 403 });
  }

  if (requiredPermissions && !AuthService.hasAllPermissions(user, requiredPermissions)) {
    return new Response('Insufficient permissions', { status: 403 });
  }

  return user;
}

// React hooks helper functions
export const authHelpers = {
  isAdmin: (user: TokenPayload | null): boolean => {
    return user?.role === 'admin';
  },

  isFestivalStaff: (user: TokenPayload | null): boolean => {
    return user?.role === 'festival_staff';
  },

  isFilmmaker: (user: TokenPayload | null): boolean => {
    return user?.role === 'filmmaker';
  },

  isJudge: (user: TokenPayload | null): boolean => {
    return user?.role === 'judge';
  },

  canManageFilms: (user: TokenPayload | null): boolean => {
    if (!user) return false;
    return AuthService.hasAnyPermission(user, ['films.write', 'films.status']);
  },

  canManageUsers: (user: TokenPayload | null): boolean => {
    if (!user) return false;
    return AuthService.hasPermission(user, 'users.write');
  },

  canViewReports: (user: TokenPayload | null): boolean => {
    if (!user) return false;
    return AuthService.hasPermission(user, 'reports.read');
  },

  canPurchaseTickets: (user: TokenPayload | null): boolean => {
    if (!user) return false;
    return AuthService.hasPermission(user, 'tickets.purchase');
  },
};
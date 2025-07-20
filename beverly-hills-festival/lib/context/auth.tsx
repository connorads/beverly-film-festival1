'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, SiteMode, UserRole } from '@/lib/types';
import { useSiteMode } from './site-mode';
import { apiClient, setAuthToken, getAuthToken } from '@/lib/api-client';
import type { Login, Register } from '@/lib/schemas';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
  canAccess: (resource: string) => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { siteMode } = useSiteMode();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const response = await apiClient.auth.me();
          if (response.ok && response.data) {
            setUser(response.data);
          } else {
            // Invalid token, clear it
            setAuthToken(null);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.auth.login({ email, password, siteMode });
      
      if (response.ok && response.data) {
        setUser(response.data.user);
        
        // Redirect based on role and site mode
        if (siteMode === 'admin' && response.data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (response.data.user.role === 'filmmaker') {
          router.push('/filmmaker/dashboard');
        } else if (response.data.user.role === 'judge') {
          router.push('/judge/dashboard');
        } else {
          router.push('/account');
        }
      } else {
        setError(response.error?.message || 'Invalid credentials');
        throw new Error(response.error?.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Invalid credentials';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.auth.logout();
      
      // Clear auth state
      setUser(null);
      setError(null);
      
      // Redirect to appropriate login page
      if (siteMode === 'admin') {
        router.push('/admin/login');
      } else if (siteMode === 'filmmaker' as SiteMode) {
        router.push('/filmmaker/login');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const registerData: Register = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: (data.role || 'attendee') as UserRole,
      };
      
      const response = await apiClient.auth.register(registerData);
      
      if (response.ok && response.data) {
        setUser(response.data.user);
        
        // Redirect based on role
        if (response.data.user.role === 'filmmaker') {
          router.push('/filmmaker/dashboard');
        } else {
          router.push('/account');
        }
      } else {
        setError(response.error?.message || 'Registration failed');
        throw new Error(response.error?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.auth.updateProfile(data);
      
      if (response.ok && response.data) {
        setUser(response.data);
      } else {
        setError(response.error?.message || 'Failed to update profile');
        throw new Error(response.error?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    const token = getAuthToken();
    if (!token) return;
    
    try {
      const response = await apiClient.auth.me();
      if (response.ok && response.data) {
        setUser(response.data);
      } else {
        // If refresh fails, logout
        await logout();
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      // If refresh fails, logout
      await logout();
    }
  };

  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  }, [user]);

  const canAccess = useCallback((resource: string): boolean => {
    if (!user) return false;
    
    // Define permission matrix
    const permissions: Record<string, string[]> = {
      'admin.dashboard': ['admin', 'festival_staff'],
      'admin.films': ['admin', 'festival_staff'],
      'admin.users': ['admin'],
      'admin.venues': ['admin', 'festival_staff'],
      'admin.reports': ['admin'],
      'filmmaker.dashboard': ['filmmaker'],
      'filmmaker.submit': ['filmmaker'],
      'filmmaker.films': ['filmmaker'],
      'festival.tickets': ['attendee', 'filmmaker', 'judge', 'admin', 'festival_staff'],
      'festival.schedule': ['attendee', 'filmmaker', 'judge', 'admin', 'festival_staff'],
    };
    
    const allowedRoles = permissions[resource] || [];
    return allowedRoles.includes(user.role);
  }, [user]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    register,
    updateProfile,
    refreshSession,
    hasRole,
    canAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protecting routes
export function withAuth(Component: React.ComponentType<any>, requiredRoles?: string[]) {
  return function ProtectedComponent(props: any) {
    const { isAuthenticated, hasRole, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      } else if (!isLoading && requiredRoles && !hasRole(requiredRoles)) {
        router.push('/unauthorized');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated || (requiredRoles && !hasRole(requiredRoles))) {
      return null;
    }

    return <Component {...props} />;
  };
}
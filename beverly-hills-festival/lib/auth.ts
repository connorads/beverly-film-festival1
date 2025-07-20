import { NextRequest } from 'next/server';
import { db, User } from '@/lib/db';

export interface AuthContext {
  user: User;
  token: string;
}

export async function authenticateRequest(
  request: NextRequest,
  requiredRole?: 'admin' | 'submitter' | 'buyer'
): Promise<AuthContext | null> {
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  const session = await db.getSession(token);
  if (!session) {
    return null;
  }

  const user = await db.getUserById(session.userId);
  if (!user) {
    return null;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return { user, token };
}
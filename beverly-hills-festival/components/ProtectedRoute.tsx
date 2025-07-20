'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth';
import { useSiteMode } from '@/lib/context/site-mode';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading, hasRole } = useAuth();
  const { siteMode } = useSiteMode();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check if authentication is required
    if (requireAuth && !isAuthenticated) {
      // Redirect to appropriate login page
      if (siteMode === 'admin') {
        router.push('/admin/login');
      } else if (siteMode === 'filmmaker') {
        router.push('/filmmaker/login');
      } else {
        router.push('/login');
      }
      return;
    }

    // Check role requirements
    if (requiredRoles.length > 0 && (!user || !hasRole(requiredRoles))) {
      router.push('/unauthorized');
      return;
    }

    // Additional site mode checks
    if (siteMode === 'admin' && user && !['admin', 'festival_staff'].includes(user.role)) {
      router.push('/unauthorized');
      return;
    }

    if (siteMode === 'filmmaker' && user && user.role !== 'filmmaker') {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, isLoading, hasRole, requiredRoles, siteMode, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render children until auth check is complete
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRoles.length > 0 && (!user || !hasRole(requiredRoles))) {
    return null;
  }

  return <>{children}</>;
}

// HOC version for pages
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
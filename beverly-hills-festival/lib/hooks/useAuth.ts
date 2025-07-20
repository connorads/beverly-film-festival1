'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, setAuthToken } from '@/lib/api-client';
import type { User, Login, Register } from '@/lib/schemas';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const response = await apiClient.auth.me();
        if (response.ok && response.data) {
          setState({
            user: response.data,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          // Invalid token, clear it
          setAuthToken(null);
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: Login) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.auth.login(credentials);
    
    if (response.ok && response.data) {
      setState({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      // Redirect based on user role
      switch (response.data.user.role) {
        case 'admin':
        case 'festival_staff':
          router.push('/admin/dashboard');
          break;
        case 'filmmaker':
          router.push('/filmmaker/dashboard');
          break;
        case 'judge':
          router.push('/judge/dashboard');
          break;
        default:
          router.push('/account');
      }
    } else {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: response.error?.message || 'Login failed',
      });
      throw new Error(response.error?.message || 'Login failed');
    }
  }, [router]);

  const register = useCallback(async (data: Register) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.auth.register(data);
    
    if (response.ok && response.data) {
      setState({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      // Redirect to appropriate dashboard
      if (response.data.user.role === 'filmmaker') {
        router.push('/filmmaker/dashboard');
      } else {
        router.push('/account');
      }
    } else {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: response.error?.message || 'Registration failed',
      });
      throw new Error(response.error?.message || 'Registration failed');
    }
  }, [router]);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    await apiClient.auth.logout();
    
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
    
    router.push('/');
  }, [router]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!state.user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.auth.updateProfile(data);
    
    if (response.ok && response.data) {
      setState(prev => ({
        ...prev,
        user: response.data!,
        isLoading: false,
        error: null,
      }));
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Update failed',
      }));
      throw new Error(response.error?.message || 'Update failed');
    }
  }, [state.user]);

  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  }, [state.user]);

  const canAccess = useCallback((resource: string): boolean => {
    if (!state.user) return false;
    
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
      'judge.dashboard': ['judge'],
      'judge.reviews': ['judge'],
      'festival.tickets': ['attendee', 'filmmaker', 'judge', 'admin', 'festival_staff'],
      'festival.schedule': ['attendee', 'filmmaker', 'judge', 'admin', 'festival_staff'],
    };
    
    const allowedRoles = permissions[resource] || [];
    return allowedRoles.includes(state.user.role);
  }, [state.user]);

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    canAccess,
  };
}
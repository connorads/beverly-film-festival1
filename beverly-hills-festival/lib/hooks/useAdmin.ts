'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { Film } from '@/lib/schemas';

interface AdminStats {
  totalFilms: number;
  pendingFilms: number;
  approvedFilms: number;
  rejectedFilms: number;
  totalUsers: number;
  totalTicketsSold: number;
  totalRevenue: number;
  upcomingScreenings: number;
}

interface StatsState {
  stats: AdminStats | null;
  isLoading: boolean;
  error: string | null;
}

export function useAdminStats() {
  const [state, setState] = useState<StatsState>({
    stats: null,
    isLoading: true,
    error: null,
  });

  const fetchStats = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.admin.getStats();
    
    if (response.ok && response.data) {
      setState({
        stats: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        stats: null,
        isLoading: false,
        error: response.error?.message || 'Failed to fetch stats',
      });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    ...state,
    refetch: fetchStats,
  };
}

interface AdminFilmsState {
  films: Film[];
  isLoading: boolean;
  error: string | null;
}

export function useAdminFilms(filters?: { status?: string; category?: string }) {
  const [state, setState] = useState<AdminFilmsState>({
    films: [],
    isLoading: true,
    error: null,
  });

  const fetchFilms = useCallback(async (params?: { status?: string; category?: string }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.admin.getFilms(params || filters);
    
    if (response.ok && response.data) {
      setState({
        films: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        films: [],
        isLoading: false,
        error: response.error?.message || 'Failed to fetch films',
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const updateFilmStatus = useCallback(async (filmId: string, status: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.admin.updateFilmStatus(filmId, status);
    
    if (response.ok && response.data) {
      // Update the film in the list
      setState(prev => ({
        films: prev.films.map(film => 
          film.id === filmId ? response.data! : film
        ),
        isLoading: false,
        error: null,
      }));
      return response.data;
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Failed to update film status',
      }));
      throw new Error(response.error?.message || 'Failed to update film status');
    }
  }, []);

  return {
    ...state,
    refetch: fetchFilms,
    updateFilmStatus,
  };
}

// Hook for managing users (admin only)
export function useAdminUsers() {
  const [state, setState] = useState<{
    users: any[];
    isLoading: boolean;
    error: string | null;
  }>({
    users: [],
    isLoading: true,
    error: null,
  });

  const fetchUsers = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.get<any[]>('/api/admin/users');
    
    if (response.ok && response.data) {
      setState({
        users: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        users: [],
        isLoading: false,
        error: response.error?.message || 'Failed to fetch users',
      });
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUserRole = useCallback(async (userId: string, role: string) => {
    const response = await apiClient.patch(`/api/admin/users/${userId}`, { role });
    
    if (response.ok && response.data) {
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId ? { ...user, role } : user
        ),
      }));
    } else {
      throw new Error(response.error?.message || 'Failed to update user role');
    }
  }, []);

  const toggleUserStatus = useCallback(async (userId: string, isActive: boolean) => {
    const response = await apiClient.patch(`/api/admin/users/${userId}`, { isActive });
    
    if (response.ok && response.data) {
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId ? { ...user, isActive } : user
        ),
      }));
    } else {
      throw new Error(response.error?.message || 'Failed to update user status');
    }
  }, []);

  return {
    ...state,
    refetch: fetchUsers,
    updateUserRole,
    toggleUserStatus,
  };
}
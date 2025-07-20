'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import type { Film, CreateFilm, UpdateFilm, FilmSearch } from '@/lib/schemas';

interface UseFilmsOptions {
  autoFetch?: boolean;
  params?: FilmSearch;
}

interface FilmsState {
  films: Film[];
  isLoading: boolean;
  error: string | null;
}

export function useFilms(options: UseFilmsOptions = {}) {
  const { autoFetch = true, params } = options;
  const [state, setState] = useState<FilmsState>({
    films: [],
    isLoading: autoFetch,
    error: null,
  });

  const fetchFilms = useCallback(async (searchParams?: FilmSearch) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.films.list(searchParams || params);
    
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
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (autoFetch) {
      fetchFilms();
    }
  }, [autoFetch, JSON.stringify(params)]);

  return {
    ...state,
    refetch: fetchFilms,
  };
}

interface UseFilmOptions {
  id?: string;
  autoFetch?: boolean;
}

interface FilmState {
  film: Film | null;
  isLoading: boolean;
  error: string | null;
}

export function useFilm(options: UseFilmOptions = {}) {
  const { id, autoFetch = true } = options;
  const [state, setState] = useState<FilmState>({
    film: null,
    isLoading: autoFetch && !!id,
    error: null,
  });

  const fetchFilm = useCallback(async (filmId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.films.get(filmId);
    
    if (response.ok && response.data) {
      setState({
        film: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        film: null,
        isLoading: false,
        error: response.error?.message || 'Failed to fetch film',
      });
    }
  }, []);

  useEffect(() => {
    if (autoFetch && id) {
      fetchFilm(id);
    }
  }, [autoFetch, id, fetchFilm]);

  const createFilm = useCallback(async (data: CreateFilm) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.films.create(data);
    
    if (response.ok && response.data) {
      setState({
        film: response.data,
        isLoading: false,
        error: null,
      });
      return response.data;
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Failed to create film',
      }));
      throw new Error(response.error?.message || 'Failed to create film');
    }
  }, []);

  const updateFilm = useCallback(async (filmId: string, data: UpdateFilm) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.films.update(filmId, data);
    
    if (response.ok && response.data) {
      setState({
        film: response.data,
        isLoading: false,
        error: null,
      });
      return response.data;
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Failed to update film',
      }));
      throw new Error(response.error?.message || 'Failed to update film');
    }
  }, []);

  const deleteFilm = useCallback(async (filmId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.films.delete(filmId);
    
    if (response.ok) {
      setState({
        film: null,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error?.message || 'Failed to delete film',
      }));
      throw new Error(response.error?.message || 'Failed to delete film');
    }
  }, []);

  return {
    ...state,
    fetchFilm,
    createFilm,
    updateFilm,
    deleteFilm,
  };
}

// Hook for filmmaker's own films
export function useMyFilms() {
  const [state, setState] = useState<FilmsState>({
    films: [],
    isLoading: true,
    error: null,
  });

  const fetchMyFilms = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const response = await apiClient.get<Film[]>('/api/submitter/films');
    
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
        error: response.error?.message || 'Failed to fetch your films',
      });
    }
  }, []);

  useEffect(() => {
    fetchMyFilms();
  }, [fetchMyFilms]);

  return {
    ...state,
    refetch: fetchMyFilms,
  };
}
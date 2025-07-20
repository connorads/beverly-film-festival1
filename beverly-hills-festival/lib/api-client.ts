// Enhanced API Client with auth, error handling, and type safety
import type { 
  User, Film, Venue, Screening, Ticket, Pass, Payment, Review,
  CreateUser, UpdateUser, CreateFilm, UpdateFilm,
  Login, Register, FilmSubmission, FilmSearch, EventSearch
} from '@/lib/schemas';

// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// API error type
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  status: number;
}

// Response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  ok: boolean;
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Request configuration
interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
  token?: string;
}

// Token management
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem('auth_token');
  }
  return authToken;
}

// Base fetch wrapper with error handling and auth
async function fetchWithAuth<T>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  try {
    const { params, token, ...fetchConfig } = config;
    
    // Build URL with params
    const urlObject = new URL(url, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObject.searchParams.append(key, String(value));
        }
      });
    }

    // Set headers
    const headers = new Headers(fetchConfig.headers);
    
    // Add auth token
    const authToken = token || getAuthToken();
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    // Add content type for JSON
    if (!headers.has('Content-Type') && fetchConfig.body && typeof fetchConfig.body === 'string') {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(urlObject.toString(), {
      ...fetchConfig,
      headers,
    });

    // Handle response
    let data: any = null;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      const error: ApiError = {
        code: data?.code || 'UNKNOWN_ERROR',
        message: data?.message || `HTTP ${response.status}: ${response.statusText}`,
        details: data?.details,
        status: response.status,
      };

      // Handle auth errors
      if (response.status === 401) {
        setAuthToken(null);
        // Redirect to login if needed
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      return { error, ok: false };
    }

    return { data: data as T, ok: true };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Network request failed',
        status: 0,
      },
      ok: false,
    };
  }
}

// API client object with typed methods
export const apiClient = {
  // Generic methods
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return fetchWithAuth<T>(`${API_BASE_URL}${url}`, {
      method: 'GET',
      params,
    });
  },

  async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return fetchWithAuth<T>(`${API_BASE_URL}${url}`, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async put<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return fetchWithAuth<T>(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async patch<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return fetchWithAuth<T>(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return fetchWithAuth<T>(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
    });
  },

  // Auth endpoints
  auth: {
    async login(credentials: Login): Promise<ApiResponse<{ user: User; token: string }>> {
      const response = await apiClient.post<{ user: User; token: string }>('/api/auth/login', credentials);
      if (response.ok && response.data) {
        setAuthToken(response.data.token);
      }
      return response;
    },

    async logout(): Promise<ApiResponse<void>> {
      const response = await apiClient.post<void>('/api/auth/logout');
      setAuthToken(null);
      return response;
    },

    async register(data: Register): Promise<ApiResponse<{ user: User; token: string }>> {
      const response = await apiClient.post<{ user: User; token: string }>('/api/auth/register', data);
      if (response.ok && response.data) {
        setAuthToken(response.data.token);
      }
      return response;
    },

    async me(): Promise<ApiResponse<User>> {
      return apiClient.get<User>('/api/auth/me');
    },

    async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
      return apiClient.patch<User>('/api/auth/me', data);
    },
  },

  // Film endpoints
  films: {
    async list(params?: FilmSearch): Promise<ApiResponse<Film[]>> {
      return apiClient.get<Film[]>('/api/films', params);
    },

    async get(id: string): Promise<ApiResponse<Film>> {
      return apiClient.get<Film>(`/api/films/${id}`);
    },

    async create(data: CreateFilm): Promise<ApiResponse<Film>> {
      return apiClient.post<Film>('/api/submitter/films', data);
    },

    async update(id: string, data: UpdateFilm): Promise<ApiResponse<Film>> {
      return apiClient.patch<Film>(`/api/submitter/films/${id}`, data);
    },

    async delete(id: string): Promise<ApiResponse<void>> {
      return apiClient.delete<void>(`/api/submitter/films/${id}`);
    },

    async submit(data: FilmSubmission): Promise<ApiResponse<Film>> {
      return apiClient.post<Film>('/api/submitter/films', data);
    },
  },

  // Ticket endpoints
  tickets: {
    async list(): Promise<ApiResponse<Ticket[]>> {
      return apiClient.get<Ticket[]>('/api/buyer/tickets');
    },

    async purchase(data: { screeningId: string; quantity: number; seatNumbers?: string[] }): Promise<ApiResponse<Ticket[]>> {
      return apiClient.post<Ticket[]>('/api/checkout', data);
    },

    async get(id: string): Promise<ApiResponse<Ticket>> {
      return apiClient.get<Ticket>(`/api/buyer/tickets/${id}`);
    },
  },

  // Admin endpoints
  admin: {
    async getStats(): Promise<ApiResponse<any>> {
      return apiClient.get<any>('/api/admin/stats');
    },

    async getFilms(params?: { status?: string; category?: string }): Promise<ApiResponse<Film[]>> {
      return apiClient.get<Film[]>('/api/admin/films', params);
    },

    async updateFilmStatus(id: string, status: string): Promise<ApiResponse<Film>> {
      return apiClient.patch<Film>(`/api/admin/films/${id}`, { status });
    },
  },
};

// Export type-safe API hooks
export type ApiClient = typeof apiClient;
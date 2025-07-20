// API Client and Route Definitions for Beverly Hills Film Festival

import type { 
  User, Film, Venue, Screening, Ticket, Pass, Payment, Review
} from '@/lib/types';
import type {
  CreateUser, UpdateUser, CreateFilm, UpdateFilm,
  Login, Register, FilmSubmission, FilmSearch, EventSearch
} from '@/lib/schemas';

// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const API_VERSION = 'v1';

// API client configuration
export interface ApiConfig {
  baseUrl?: string;
  version?: string;
  token?: string;
  onTokenExpired?: () => void;
  onError?: (error: ApiError) => void;
}

// API error type
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  status: number;
}

// Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// API Routes
export const API_ROUTES = {
  // Auth routes
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    me: '/auth/me',
    updateProfile: '/auth/profile',
    changePassword: '/auth/change-password',
  },

  // User management routes (admin)
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    roles: '/users/roles',
    permissions: '/users/permissions',
    bulkInvite: '/users/bulk-invite',
  },

  // Film routes
  films: {
    list: '/films',
    get: (id: string) => `/films/${id}`,
    create: '/films',
    update: (id: string) => `/films/${id}`,
    delete: (id: string) => `/films/${id}`,
    submit: '/films/submit',
    myFilms: '/films/my-films',
    search: '/films/search',
    categories: '/films/categories',
    updateStatus: (id: string) => `/films/${id}/status`,
    addCrew: (id: string) => `/films/${id}/crew`,
    removeCrew: (id: string, userId: string) => `/films/${id}/crew/${userId}`,
    uploadMedia: (id: string) => `/films/${id}/media`,
    deleteMedia: (id: string, mediaId: string) => `/films/${id}/media/${mediaId}`,
  },

  // Venue routes
  venues: {
    list: '/venues',
    get: (id: string) => `/venues/${id}`,
    create: '/venues',
    update: (id: string) => `/venues/${id}`,
    delete: (id: string) => `/venues/${id}`,
    availability: (id: string) => `/venues/${id}/availability`,
    uploadImage: (id: string) => `/venues/${id}/images`,
  },

  // Screening routes
  screenings: {
    list: '/screenings',
    get: (id: string) => `/screenings/${id}`,
    create: '/screenings',
    update: (id: string) => `/screenings/${id}`,
    delete: (id: string) => `/screenings/${id}`,
    byFilm: (filmId: string) => `/screenings/film/${filmId}`,
    byVenue: (venueId: string) => `/screenings/venue/${venueId}`,
    schedule: '/screenings/schedule',
    checkIn: (id: string) => `/screenings/${id}/check-in`,
    guestList: (id: string) => `/screenings/${id}/guest-list`,
  },

  // Ticket routes
  tickets: {
    list: '/tickets',
    get: (id: string) => `/tickets/${id}`,
    purchase: '/tickets/purchase',
    myTickets: '/tickets/my-tickets',
    validate: '/tickets/validate',
    checkIn: (id: string) => `/tickets/${id}/check-in`,
    transfer: (id: string) => `/tickets/${id}/transfer`,
    refund: (id: string) => `/tickets/${id}/refund`,
  },

  // Pass routes
  passes: {
    list: '/passes',
    get: (id: string) => `/passes/${id}`,
    create: '/passes',
    update: (id: string) => `/passes/${id}`,
    delete: (id: string) => `/passes/${id}`,
    purchase: '/passes/purchase',
    myPasses: '/passes/my-passes',
  },

  // Payment routes
  payments: {
    list: '/payments',
    get: (id: string) => `/payments/${id}`,
    create: '/payments',
    process: '/payments/process',
    refund: (id: string) => `/payments/${id}/refund`,
    myPayments: '/payments/my-payments',
    receipt: (id: string) => `/payments/${id}/receipt`,
  },

  // Review routes (for judges)
  reviews: {
    list: '/reviews',
    get: (id: string) => `/reviews/${id}`,
    create: '/reviews',
    update: (id: string) => `/reviews/${id}`,
    myReviews: '/reviews/my-reviews',
    byFilm: (filmId: string) => `/reviews/film/${filmId}`,
    assignFilms: '/reviews/assign',
  },

  // Event routes
  events: {
    list: '/events',
    get: (id: string) => `/events/${id}`,
    create: '/events',
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
    search: '/events/search',
    rsvp: (id: string) => `/events/${id}/rsvp`,
    checkIn: (id: string) => `/events/${id}/check-in`,
  },

  // Sponsor routes
  sponsors: {
    list: '/sponsors',
    get: (id: string) => `/sponsors/${id}`,
    create: '/sponsors',
    update: (id: string) => `/sponsors/${id}`,
    delete: (id: string) => `/sponsors/${id}`,
    benefits: '/sponsors/benefits',
  },

  // Festival routes
  festival: {
    current: '/festival/current',
    info: '/festival/info',
    schedule: '/festival/schedule',
    stats: '/festival/stats',
    program: '/festival/program',
  },

  // Reports routes (admin)
  reports: {
    sales: '/reports/sales',
    attendance: '/reports/attendance',
    films: '/reports/films',
    demographics: '/reports/demographics',
    financial: '/reports/financial',
    export: '/reports/export',
  },

  // Media/upload routes
  media: {
    upload: '/media/upload',
    get: (id: string) => `/media/${id}`,
    delete: (id: string) => `/media/${id}`,
    generateUrl: '/media/generate-url',
  },

  // Search routes
  search: {
    global: '/search',
    films: '/search/films',
    people: '/search/people',
    venues: '/search/venues',
    events: '/search/events',
  },

  // Public routes (no auth required)
  public: {
    films: '/public/films',
    schedule: '/public/schedule',
    venues: '/public/venues',
    sponsors: '/public/sponsors',
    news: '/public/news',
    about: '/public/about',
  },
} as const;

// API client base class
export class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || API_BASE_URL,
      version: config.version || API_VERSION,
      ...config,
    };
  }

  private getUrl(path: string): string {
    return `${this.config.baseUrl}/${this.config.version}${path}`;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.config.token) {
      headers['Authorization'] = `Bearer ${this.config.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        code: data.code || 'UNKNOWN_ERROR',
        message: data.message || 'An error occurred',
        details: data.details,
        status: response.status,
      };

      if (response.status === 401 && this.config.onTokenExpired) {
        this.config.onTokenExpired();
      }

      if (this.config.onError) {
        this.config.onError(error);
      }

      return { success: false, error };
    }

    return { success: true, data: data.data, meta: data.meta };
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(this.getUrl(path));
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const response = await fetch(this.getUrl(path), {
      method: 'PUT',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const response = await fetch(this.getUrl(path), {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await fetch(this.getUrl(path), {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async upload<T>(path: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers: HeadersInit = {};
    if (this.config.token) {
      headers['Authorization'] = `Bearer ${this.config.token}`;
    }

    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse<T>(response);
  }

  setToken(token: string | null) {
    this.config.token = token || undefined;
  }

  getToken(): string | undefined {
    return this.config.token;
  }
}

// Service-specific API clients
export class AuthApi extends ApiClient {
  async login(credentials: Login): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.post(API_ROUTES.auth.login, credentials);
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.post(API_ROUTES.auth.logout);
  }

  async register(data: Register): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.post(API_ROUTES.auth.register, data);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get(API_ROUTES.auth.me);
  }

  async updateProfile(data: UpdateUser): Promise<ApiResponse<User>> {
    return this.patch(API_ROUTES.auth.updateProfile, data);
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.post(API_ROUTES.auth.changePassword, { oldPassword, newPassword });
  }

  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    return this.post(API_ROUTES.auth.forgotPassword, { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.post(API_ROUTES.auth.resetPassword, { token, password: newPassword });
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.post(API_ROUTES.auth.verify, { token });
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.post(API_ROUTES.auth.refresh);
  }
}

export class FilmApi extends ApiClient {
  async getFilms(params?: FilmSearch): Promise<ApiResponse<PaginatedResponse<Film>>> {
    return this.get(API_ROUTES.films.list, params);
  }

  async getFilm(id: string): Promise<ApiResponse<Film>> {
    return this.get(API_ROUTES.films.get(id));
  }

  async createFilm(data: CreateFilm): Promise<ApiResponse<Film>> {
    return this.post(API_ROUTES.films.create, data);
  }

  async updateFilm(id: string, data: UpdateFilm): Promise<ApiResponse<Film>> {
    return this.patch(API_ROUTES.films.update(id), data);
  }

  async deleteFilm(id: string): Promise<ApiResponse<void>> {
    return this.delete(API_ROUTES.films.delete(id));
  }

  async submitFilm(data: FilmSubmission): Promise<ApiResponse<Film>> {
    return this.post(API_ROUTES.films.submit, data);
  }

  async getMyFilms(): Promise<ApiResponse<Film[]>> {
    return this.get(API_ROUTES.films.myFilms);
  }

  async searchFilms(params: FilmSearch): Promise<ApiResponse<PaginatedResponse<Film>>> {
    return this.get(API_ROUTES.films.search, params);
  }

  async updateFilmStatus(id: string, status: Film['status']): Promise<ApiResponse<Film>> {
    return this.patch(API_ROUTES.films.updateStatus(id), { status });
  }

  async uploadMedia(filmId: string, file: File, type: string): Promise<ApiResponse<any>> {
    return this.upload(API_ROUTES.films.uploadMedia(filmId), file, { type });
  }
}

// Export other API services...
export class VenueApi extends ApiClient {
  // Venue-specific methods
}

export class TicketApi extends ApiClient {
  // Ticket-specific methods
}

export class PaymentApi extends ApiClient {
  // Payment-specific methods
}

// Create singleton instances
let authApi: AuthApi;
let filmApi: FilmApi;
let venueApi: VenueApi;
let ticketApi: TicketApi;
let paymentApi: PaymentApi;

export function initializeApis(config: ApiConfig) {
  authApi = new AuthApi(config);
  filmApi = new FilmApi(config);
  venueApi = new VenueApi(config);
  ticketApi = new TicketApi(config);
  paymentApi = new PaymentApi(config);
}

// Export API instances
export { authApi, filmApi, venueApi, ticketApi, paymentApi };
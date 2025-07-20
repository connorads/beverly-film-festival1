// In-memory database for prototype
// This simulates a real database but stores everything in memory

interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  role: 'admin' | 'submitter' | 'buyer';
  name: string;
  createdAt: Date;
}

interface Film {
  id: string;
  title: string;
  director: string;
  synopsis: string;
  duration: number; // in minutes
  genre: string;
  submitterId: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: Date;
  trailerUrl?: string;
  posterUrl?: string;
}

interface Ticket {
  id: string;
  filmId: string;
  buyerId: string;
  price: number;
  quantity: number;
  purchaseDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  sessionTime: Date;
}

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

class InMemoryDatabase {
  private users: Map<string, User> = new Map();
  private films: Map<string, Film> = new Map();
  private tickets: Map<string, Ticket> = new Map();
  private sessions: Map<string, Session> = new Map();

  constructor() {
    // Seed with test data
    this.seedData();
  }

  private seedData() {
    // Admin user
    this.users.set('admin-1', {
      id: 'admin-1',
      email: 'admin@beverlyhillsfilmfest.com',
      password: 'admin123', // In production, this would be hashed
      role: 'admin',
      name: 'Festival Admin',
      createdAt: new Date(),
    });

    // Test submitter
    this.users.set('submitter-1', {
      id: 'submitter-1',
      email: 'filmmaker@example.com',
      password: 'film123',
      role: 'submitter',
      name: 'John Filmmaker',
      createdAt: new Date(),
    });

    // Test buyer
    this.users.set('buyer-1', {
      id: 'buyer-1',
      email: 'buyer@example.com',
      password: 'buy123',
      role: 'buyer',
      name: 'Jane Buyer',
      createdAt: new Date(),
    });

    // Sample films
    this.films.set('film-1', {
      id: 'film-1',
      title: 'Sunset Boulevard Dreams',
      director: 'John Filmmaker',
      synopsis: 'A story about dreams and ambition in Hollywood.',
      duration: 120,
      genre: 'Drama',
      submitterId: 'submitter-1',
      status: 'approved',
      submissionDate: new Date(),
      trailerUrl: 'https://example.com/trailer1',
      posterUrl: '/images/sunset-boulevard-dreams.jpg',
    });

    this.films.set('film-2', {
      id: 'film-2',
      title: 'Beverly Hills Nights',
      director: 'Sarah Director',
      synopsis: 'A comedy about life in Beverly Hills.',
      duration: 95,
      genre: 'Comedy',
      submitterId: 'submitter-1',
      status: 'pending',
      submissionDate: new Date(),
    });
  }

  // User methods
  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  // Film methods
  async createFilm(film: Omit<Film, 'id' | 'submissionDate'>): Promise<Film> {
    const newFilm: Film = {
      ...film,
      id: `film-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submissionDate: new Date(),
    };
    this.films.set(newFilm.id, newFilm);
    return newFilm;
  }

  async getFilms(filters?: { status?: string; submitterId?: string }): Promise<Film[]> {
    let films = Array.from(this.films.values());
    
    if (filters?.status) {
      films = films.filter(f => f.status === filters.status);
    }
    if (filters?.submitterId) {
      films = films.filter(f => f.submitterId === filters.submitterId);
    }
    
    return films;
  }

  async getFilmById(id: string): Promise<Film | undefined> {
    return this.films.get(id);
  }

  async updateFilm(id: string, updates: Partial<Film>): Promise<Film | undefined> {
    const film = this.films.get(id);
    if (!film) return undefined;
    
    const updatedFilm = { ...film, ...updates };
    this.films.set(id, updatedFilm);
    return updatedFilm;
  }

  // Ticket methods
  async createTicket(ticket: Omit<Ticket, 'id' | 'purchaseDate'>): Promise<Ticket> {
    const newTicket: Ticket = {
      ...ticket,
      id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      purchaseDate: new Date(),
    };
    this.tickets.set(newTicket.id, newTicket);
    return newTicket;
  }

  async getTicketsByBuyer(buyerId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(t => t.buyerId === buyerId);
  }

  async getTicketsByFilm(filmId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(t => t.filmId === filmId);
  }

  // Session methods
  async createSession(userId: string): Promise<Session> {
    const session: Session = {
      id: `session-${Date.now()}`,
      userId,
      token: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };
    this.sessions.set(session.token, session);
    return session;
  }

  async getSession(token: string): Promise<Session | undefined> {
    const session = this.sessions.get(token);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.sessions.delete(token);
    }
    return undefined;
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }
}

// Export singleton instance
export const db = new InMemoryDatabase();
export type { User, Film, Ticket, Session };
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/admin/films - Get all films with admin view
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request, 'admin');
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    const films = await db.getFilms();

    // Enrich with submitter info and ticket sales
    const enrichedFilms = await Promise.all(
      films.map(async (film) => {
        const submitter = await db.getUserById(film.submitterId);
        const tickets = await db.getTicketsByFilm(film.id);
        
        const totalTicketsSold = tickets.reduce((sum, t) => sum + t.quantity, 0);
        const totalRevenue = tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);

        return {
          ...film,
          submitter: submitter ? {
            id: submitter.id,
            name: submitter.name,
            email: submitter.email,
          } : null,
          stats: {
            totalTicketsSold,
            totalRevenue,
          },
        };
      })
    );

    return NextResponse.json(enrichedFilms);
  } catch (error) {
    console.error('Admin get films error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/submitter/films - Get submitter's own films
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request, 'submitter');
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Submitter authentication required' },
        { status: 401 }
      );
    }

    const films = await db.getFilms({ submitterId: auth.user.id });

    // Enrich with ticket sales data
    const enrichedFilms = await Promise.all(
      films.map(async (film) => {
        const tickets = await db.getTicketsByFilm(film.id);
        
        const totalTicketsSold = tickets.reduce((sum, t) => sum + t.quantity, 0);
        const totalRevenue = tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);

        return {
          ...film,
          stats: {
            totalTicketsSold,
            totalRevenue,
          },
        };
      })
    );

    return NextResponse.json(enrichedFilms);
  } catch (error) {
    console.error('Get submitter films error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
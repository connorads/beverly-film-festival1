import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/admin/stats - Get festival statistics
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request, 'admin');
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    // Get all data
    const films = await db.getFilms();
    const allTickets = await Promise.all(
      films.map(film => db.getTicketsByFilm(film.id))
    ).then(ticketArrays => ticketArrays.flat());

    // Calculate statistics
    const stats = {
      films: {
        total: films.length,
        pending: films.filter(f => f.status === 'pending').length,
        approved: films.filter(f => f.status === 'approved').length,
        rejected: films.filter(f => f.status === 'rejected').length,
      },
      tickets: {
        totalSold: allTickets.reduce((sum, t) => sum + t.quantity, 0),
        totalRevenue: allTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0),
        averageTicketsPerFilm: films.length > 0 
          ? Math.round(allTickets.reduce((sum, t) => sum + t.quantity, 0) / films.length)
          : 0,
      },
      genres: films.reduce((acc, film) => {
        acc[film.genre] = (acc[film.genre] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      topFilms: await Promise.all(
        films
          .map(async (film) => {
            const tickets = await db.getTicketsByFilm(film.id);
            const revenue = tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
            return { ...film, revenue };
          })
      ).then(filmsWithRevenue => 
        filmsWithRevenue
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
      ),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
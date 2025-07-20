import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/tickets - Get user's tickets
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Only buyers can view their tickets
    if (auth.user.role !== 'buyer') {
      return NextResponse.json(
        { error: 'Only buyers can view tickets' },
        { status: 403 }
      );
    }

    const tickets = await db.getTicketsByBuyer(auth.user.id);

    // Enrich with film data
    const enrichedTickets = await Promise.all(
      tickets.map(async (ticket) => {
        const film = await db.getFilmById(ticket.filmId);
        return {
          ...ticket,
          film,
        };
      })
    );

    return NextResponse.json(enrichedTickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
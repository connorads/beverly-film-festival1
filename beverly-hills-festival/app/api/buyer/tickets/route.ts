import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/buyer/tickets - Get buyer's tickets with film details
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request, 'buyer');
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Buyer authentication required' },
        { status: 401 }
      );
    }

    const tickets = await db.getTicketsByBuyer(auth.user.id);

    // Enrich with film details
    const enrichedTickets = await Promise.all(
      tickets.map(async (ticket) => {
        const film = await db.getFilmById(ticket.filmId);
        return {
          ...ticket,
          film,
          qrCode: `BHFF-${ticket.id}`, // Simplified QR code
        };
      })
    );

    // Sort by session time
    enrichedTickets.sort((a, b) => 
      new Date(a.sessionTime).getTime() - new Date(b.sessionTime).getTime()
    );

    return NextResponse.json(enrichedTickets);
  } catch (error) {
    console.error('Get buyer tickets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
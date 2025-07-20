import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// POST /api/checkout - Process ticket purchase
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (auth.user.role !== 'buyer') {
      return NextResponse.json(
        { error: 'Only buyers can purchase tickets' },
        { status: 403 }
      );
    }

    const { filmId, quantity, sessionTime, paymentMethod } = await request.json();

    // Validate input
    if (!filmId || !quantity || !sessionTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if film exists and is approved
    const film = await db.getFilmById(filmId);
    if (!film) {
      return NextResponse.json(
        { error: 'Film not found' },
        { status: 404 }
      );
    }

    if (film.status !== 'approved') {
      return NextResponse.json(
        { error: 'Film is not available for ticketing' },
        { status: 400 }
      );
    }

    // Calculate price (simplified pricing)
    const ticketPrice = 25; // $25 per ticket
    const totalPrice = ticketPrice * quantity;

    // In a real app, we would process payment here
    // For now, we'll just simulate it
    if (paymentMethod) {
      console.log(`Processing payment of $${totalPrice} via ${paymentMethod}`);
    }

    // Create ticket
    const ticket = await db.createTicket({
      filmId,
      buyerId: auth.user.id,
      price: ticketPrice,
      quantity,
      status: 'confirmed',
      sessionTime: new Date(sessionTime),
    });

    // Return ticket with film info
    return NextResponse.json({
      ticket,
      film,
      totalPrice,
      message: 'Purchase successful!',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
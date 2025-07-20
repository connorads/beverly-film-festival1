import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

interface Params {
  params: {
    id: string;
  };
}

// GET /api/films/[id] - Get a specific film
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const film = await db.getFilmById(params.id);

    if (!film) {
      return NextResponse.json(
        { error: 'Film not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(film);
  } catch (error) {
    console.error('Get film error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/films/[id] - Update film (admin or film owner)
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const film = await db.getFilmById(params.id);
    
    if (!film) {
      return NextResponse.json(
        { error: 'Film not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (auth.user.role !== 'admin' && film.submitterId !== auth.user.id) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const updates = await request.json();
    
    // Only admin can change status
    if (updates.status && auth.user.role !== 'admin') {
      delete updates.status;
    }

    const updatedFilm = await db.updateFilm(params.id, updates);

    return NextResponse.json(updatedFilm);
  } catch (error) {
    console.error('Update film error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// GET /api/films - Get all films (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const submitterId = searchParams.get('submitterId') || undefined;

    const films = await db.getFilms({ status, submitterId });

    return NextResponse.json(films);
  } catch (error) {
    console.error('Get films error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/films - Submit a new film (submitters only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (auth.user.role !== 'submitter') {
      return NextResponse.json(
        { error: 'Only submitters can submit films' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const { title, director, synopsis, duration, genre, trailerUrl, posterUrl } = data;

    // Validate required fields
    if (!title || !director || !synopsis || !duration || !genre) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const film = await db.createFilm({
      title,
      director,
      synopsis,
      duration: Number(duration),
      genre,
      trailerUrl,
      posterUrl,
      submitterId: auth.user.id,
      status: 'pending',
    });

    return NextResponse.json(film, { status: 201 });
  } catch (error) {
    console.error('Create film error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
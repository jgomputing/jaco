import { NextRequest, NextResponse } from 'next/server';
import { MusicService, MusicAlbumInput } from '@/lib/services/music-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/music - Get all music albums with pagination
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const ascending = searchParams.get('ascending') === 'true';
    
    // Parse filters
    const status = searchParams.get('status') as 'draft' | 'published' | undefined;
    const category_id = searchParams.get('category_id') || undefined;
    const search = searchParams.get('search') || undefined;
    
    // Fetch music albums
    const result = await MusicService.getMusicAlbums(
      { cursor, limit, ascending },
      { status, category_id, search }
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching music albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch music albums' },
      { status: 500 }
    );
  }
}

// POST /api/music - Create a new music album
export async function POST(request: NextRequest) {
  try {
    // Try both authentication methods
    const supabaseSession = await getSupabaseSession();
    const customSession = await getCustomSession();
    
    // If neither session exists, return unauthorized
    if (!supabaseSession && !customSession) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.artist || !body.category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: title, artist, category_id' },
        { status: 400 }
      );
    }
    
    // Create music album
    const album = await MusicService.createMusicAlbum(body);
    
    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error('Error creating music album:', error);
    return NextResponse.json(
      { error: 'Failed to create music album' },
      { status: 500 }
    );
  }
} 
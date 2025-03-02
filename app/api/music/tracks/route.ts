import { NextRequest, NextResponse } from 'next/server';
import { MusicService, MusicTrackInput } from '@/lib/services/music-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/music/tracks - Get tracks for an album
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const albumId = searchParams.get('albumId');
    
    if (!albumId) {
      return NextResponse.json(
        { error: 'Missing required parameter: albumId' },
        { status: 400 }
      );
    }
    
    // Fetch tracks for the album
    const tracks = await MusicService.getTracksForAlbum(albumId);
    
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching music tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch music tracks' },
      { status: 500 }
    );
  }
}

// POST /api/music/tracks - Create a new music track
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.album_id || !body.audio_url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, album_id, audio_url' },
        { status: 400 }
      );
    }
    
    const trackData: MusicTrackInput = {
      title: body.title,
      album_id: body.album_id,
      track_number: body.track_number,
      duration: body.duration,
      audio_url: body.audio_url,
      lyrics: body.lyrics,
      status: body.status || 'draft'
    };
    
    // Create music track
    const track = await MusicService.createMusicTrack(trackData);
    
    return NextResponse.json(track, { status: 201 });
  } catch (error) {
    console.error('Error creating music track:', error);
    return NextResponse.json(
      { error: 'Failed to create music track' },
      { status: 500 }
    );
  }
} 
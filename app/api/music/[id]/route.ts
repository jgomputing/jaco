import { NextRequest, NextResponse } from 'next/server';
import { MusicService } from '@/lib/services/music-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/music/[id] - Get a music album by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Fetch music album
    const album = await MusicService.getMusicAlbumById(id);
    
    if (!album) {
      return NextResponse.json(
        { error: 'Music album not found' },
        { status: 404 }
      );
    }
    
    // Increment views
    await MusicService.incrementAlbumViews(id);
    
    // Fetch tracks for the album
    const tracks = await MusicService.getTracksForAlbum(id);
    
    return NextResponse.json({
      ...album,
      tracks
    });
  } catch (error) {
    console.error(`Error fetching music album (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch music album' },
      { status: 500 }
    );
  }
}

// PUT /api/music/[id] - Update a music album
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if album exists
    const existingAlbum = await MusicService.getMusicAlbumById(id);
    if (!existingAlbum) {
      return NextResponse.json(
        { error: 'Music album not found' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Update music album
    const updatedAlbum = await MusicService.updateMusicAlbum(id, body);
    
    return NextResponse.json(updatedAlbum);
  } catch (error) {
    console.error(`Error updating music album (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to update music album' },
      { status: 500 }
    );
  }
}

// DELETE /api/music/[id] - Delete a music album
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if album exists
    const existingAlbum = await MusicService.getMusicAlbumById(id);
    if (!existingAlbum) {
      return NextResponse.json(
        { error: 'Music album not found' },
        { status: 404 }
      );
    }
    
    // Delete music album
    await MusicService.deleteMusicAlbum(id);
    
    return NextResponse.json(
      { message: 'Music album deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting music album (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to delete music album' },
      { status: 500 }
    );
  }
}
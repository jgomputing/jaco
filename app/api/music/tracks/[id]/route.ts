import { NextRequest, NextResponse } from 'next/server';
import { MusicService } from '@/lib/services/music-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/music/tracks/[id] - Get a music track by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Fetch track
    const track = await MusicService.getTrackById(id);
    
    if (!track) {
      return NextResponse.json(
        { error: 'Music track not found' },
        { status: 404 }
      );
    }
    
    // Increment plays
    await MusicService.incrementTrackPlays(id);
    
    return NextResponse.json(track);
  } catch (error) {
    console.error(`Error fetching music track (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch music track' },
      { status: 500 }
    );
  }
}

// PUT /api/music/tracks/[id] - Update a music track
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if track exists
    const existingTrack = await MusicService.getTrackById(id);
    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Music track not found' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Update music track
    const updatedTrack = await MusicService.updateMusicTrack(id, body);
    
    return NextResponse.json(updatedTrack);
  } catch (error) {
    console.error(`Error updating music track (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to update music track' },
      { status: 500 }
    );
  }
}

// DELETE /api/music/tracks/[id] - Delete a music track
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if track exists
    const existingTrack = await MusicService.getTrackById(id);
    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Music track not found' },
        { status: 404 }
      );
    }
    
    // Delete music track
    await MusicService.deleteMusicTrack(id);
    
    return NextResponse.json(
      { message: 'Music track deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting music track (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to delete music track' },
      { status: 500 }
    );
  }
} 
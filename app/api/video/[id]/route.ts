import { NextRequest, NextResponse } from 'next/server';
import { VideoService } from '@/lib/services/video-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/video/[id] - Get a video by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Fetch video
    const video = await VideoService.getVideoById(id);
    
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Increment views
    await VideoService.incrementViews(id);
    
    return NextResponse.json(video);
  } catch (error) {
    console.error(`Error fetching video (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

// PUT /api/video/[id] - Update a video
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if video exists
    const existingVideo = await VideoService.getVideoById(id);
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Update video
    const updatedVideo = await VideoService.updateVideo(id, body);
    
    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error(`Error updating video (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE /api/video/[id] - Delete a video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if video exists
    const existingVideo = await VideoService.getVideoById(id);
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Delete video
    await VideoService.deleteVideo(id);
    
    return NextResponse.json(
      { message: 'Video deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting video (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
} 
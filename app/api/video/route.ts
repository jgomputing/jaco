import { NextRequest, NextResponse } from 'next/server';
import { VideoService, VideoInput } from '@/lib/services/video-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/video - Get all videos with pagination
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
    const author_id = searchParams.get('author_id') || undefined;
    const search = searchParams.get('search') || undefined;
    
    // Fetch videos
    const result = await VideoService.getVideos(
      { cursor, limit, ascending },
      { status, category_id, author_id, search }
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST /api/video - Create a new video
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
    if (!body.title || !body.video_url || !body.category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: title, video_url, category_id' },
        { status: 400 }
      );
    }
    
    // Set author_id from session if not provided
    const videoData: VideoInput = {
      ...body,
      author_id: body.author_id || 
                (supabaseSession?.user.id || 
                 customSession?.user.id || 
                 '1') // Fallback to admin ID
    };
    
    // Create video
    const video = await VideoService.createVideo(videoData);
    
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
} 
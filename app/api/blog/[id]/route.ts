import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/services/blog-service';
import { getSession as getSupabaseSession } from '@/lib/supabase';
import { getSession as getCustomSession } from '@/lib/auth';

// GET /api/blog/[id] - Get a blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Fetch blog post
    const post = await BlogService.getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Increment views
    await BlogService.incrementViews(id);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching blog post (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if post exists
    const existingPost = await BlogService.getBlogPostById(id);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Update blog post
    const updatedPost = await BlogService.updateBlogPost(id, body);
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(`Error updating blog post (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if post exists
    const existingPost = await BlogService.getBlogPostById(id);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Delete blog post
    await BlogService.deleteBlogPost(id);
    
    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting blog post (${params.id}):`, error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 
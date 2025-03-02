import { supabase } from '@/lib/supabase';
import { SupabaseService, PaginationParams, PaginatedResponse } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Types for blog operations
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithRelations extends BlogPost {
  category_name: string;
  category_slug: string;
  author_name: string;
  author_avatar?: string;
  tags: string[];
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  slug?: string; // Optional, will be generated if not provided
}

export interface BlogPostFilter {
  status?: 'draft' | 'published';
  category_id?: string;
  author_id?: string;
  search?: string;
}

export class BlogService {
  private static listeners: RealtimeChannel[] = [];

  // Fetch blog posts with pagination and filters
  static async getBlogPosts(
    pagination: PaginationParams,
    filters?: BlogPostFilter
  ): Promise<PaginatedResponse<BlogPostWithRelations>> {
    return SupabaseService.fetchPaginated<BlogPostWithRelations>(
      'view_blog_posts',
      pagination,
      (query) => {
        // Apply filters
        if (filters?.status) {
          query = query.eq('status', filters.status);
        }
        
        if (filters?.category_id) {
          query = query.eq('category_id', filters.category_id);
        }
        
        if (filters?.author_id) {
          query = query.eq('author_id', filters.author_id);
        }
        
        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }
        
        return query;
      }
    );
  }

  // Get a single blog post by ID
  static async getBlogPostById(id: string): Promise<BlogPostWithRelations | null> {
    return SupabaseService.fetchById<BlogPostWithRelations>('view_blog_posts', id);
  }

  // Get a single blog post by slug
  static async getBlogPostBySlug(slug: string): Promise<BlogPostWithRelations | null> {
    const { data, error } = await supabase
      .from('view_blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching blog post by slug:', error);
      throw error;
    }
    
    return data as BlogPostWithRelations;
  }

  // Create a new blog post
  static async createBlogPost(input: BlogPostInput): Promise<BlogPost> {
    // Generate slug if not provided
    const postData: any = { ...input };
    if (!postData.slug) {
      postData.slug = this.generateSlug(input.title);
    }
    
    // Set published_at if status is published
    if (postData.status === 'published' && !postData.published_at) {
      postData.published_at = new Date().toISOString();
    }
    
    // Extract tags before creating the post
    const tags = postData.tags || [];
    delete postData.tags;
    
    // Start a transaction
    const { data, error } = await supabase.rpc('create_blog_post_with_tags', {
      post_data: postData,
      tag_names: tags
    });
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    return data as BlogPost;
  }

  // Update an existing blog post
  static async updateBlogPost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost> {
    // Extract tags before updating the post
    const postData: any = { ...input };
    const tags = postData.tags;
    delete postData.tags;
    
    // If status is changing to published, set published_at
    if (postData.status === 'published') {
      const currentPost = await this.getBlogPostById(id);
      if (currentPost && currentPost.status !== 'published') {
        postData.published_at = new Date().toISOString();
      }
    }
    
    // Update the post
    const updatedPost = await SupabaseService.update<BlogPost>('blog_posts', id, postData);
    
    // Update tags if provided
    if (tags) {
      await this.updateBlogPostTags(id, tags);
    }
    
    return updatedPost;
  }

  // Delete a blog post
  static async deleteBlogPost(id: string): Promise<void> {
    return SupabaseService.delete('blog_posts', id);
  }

  // Increment view count
  static async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_blog_views', { post_id: id });
    
    if (error) {
      console.error('Error incrementing blog views:', error);
      throw error;
    }
  }

  // Set up real-time listeners for blog posts
  static setupRealtimeListeners(callback: (payload: any) => void): void {
    // Clear any existing listeners
    this.removeAllListeners();
    
    // Listen for changes to blog_posts
    const postsChannel = SupabaseService.setupRealtimeListener('blog_posts', callback);
    this.listeners.push(postsChannel);
    
    // Listen for changes to blog_posts_tags
    const tagsChannel = SupabaseService.setupRealtimeListener('blog_posts_tags', callback);
    this.listeners.push(tagsChannel);
  }

  // Remove all real-time listeners
  static removeAllListeners(): void {
    this.listeners.forEach(channel => {
      supabase.removeChannel(channel);
    });
    this.listeners = [];
  }

  // Helper methods
  private static async updateBlogPostTags(postId: string, tags: string[]): Promise<void> {
    // First, delete all existing tags for this post
    const { error: deleteError } = await supabase
      .from('blog_posts_tags')
      .delete()
      .eq('post_id', postId);
    
    if (deleteError) {
      console.error('Error deleting existing tags:', deleteError);
      throw deleteError;
    }
    
    // Then, add the new tags
    if (tags.length > 0) {
      const { error } = await supabase.rpc('add_tags_to_blog_post', {
        post_id: postId,
        tag_names: tags
      });
      
      if (error) {
        console.error('Error adding tags to blog post:', error);
        throw error;
      }
    }
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();
  }
} 
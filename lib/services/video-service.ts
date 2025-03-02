import { supabase } from '@/lib/supabase';
import { SupabaseService, PaginationParams, PaginatedResponse } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Types for video operations
export interface Video {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail_url?: string;
  video_url: string;
  duration?: number;
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

export interface VideoWithRelations extends Video {
  category_name: string;
  category_slug: string;
  author_name: string;
  author_avatar?: string;
  tags: string[];
}

export interface VideoInput {
  title: string;
  description?: string;
  thumbnail_url?: string;
  video_url: string;
  duration?: number;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  slug?: string; // Optional, will be generated if not provided
}

export interface VideoFilter {
  status?: 'draft' | 'published';
  category_id?: string;
  author_id?: string;
  search?: string;
}

export class VideoService {
  private static listeners: RealtimeChannel[] = [];

  // Fetch videos with pagination and filters
  static async getVideos(
    pagination: PaginationParams,
    filters?: VideoFilter
  ): Promise<PaginatedResponse<VideoWithRelations>> {
    return SupabaseService.fetchPaginated<VideoWithRelations>(
      'view_videos',
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
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
        
        return query;
      }
    );
  }

  // Get a single video by ID
  static async getVideoById(id: string): Promise<VideoWithRelations | null> {
    return SupabaseService.fetchById<VideoWithRelations>('view_videos', id);
  }

  // Get a single video by slug
  static async getVideoBySlug(slug: string): Promise<VideoWithRelations | null> {
    const { data, error } = await supabase
      .from('view_videos')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching video by slug:', error);
      throw error;
    }
    
    return data as VideoWithRelations;
  }

  // Create a new video
  static async createVideo(input: VideoInput): Promise<Video> {
    // Generate slug if not provided
    const videoData: any = { ...input };
    if (!videoData.slug) {
      videoData.slug = this.generateSlug(input.title);
    }
    
    // Set published_at if status is published
    if (videoData.status === 'published' && !videoData.published_at) {
      videoData.published_at = new Date().toISOString();
    }
    
    // Extract tags before creating the video
    const tags = videoData.tags || [];
    delete videoData.tags;
    
    // Start a transaction
    const { data, error } = await supabase.rpc('create_video_with_tags', {
      video_data: videoData,
      tag_names: tags
    });
    
    if (error) {
      console.error('Error creating video:', error);
      throw error;
    }
    
    return data as Video;
  }

  // Update an existing video
  static async updateVideo(id: string, input: Partial<VideoInput>): Promise<Video> {
    // Extract tags before updating the video
    const videoData: any = { ...input };
    const tags = videoData.tags;
    delete videoData.tags;
    
    // If status is changing to published, set published_at
    if (videoData.status === 'published') {
      const currentVideo = await this.getVideoById(id);
      if (currentVideo && currentVideo.status !== 'published') {
        videoData.published_at = new Date().toISOString();
      }
    }
    
    // Update the video
    const updatedVideo = await SupabaseService.update<Video>('videos', id, videoData);
    
    // Update tags if provided
    if (tags) {
      await this.updateVideoTags(id, tags);
    }
    
    return updatedVideo;
  }

  // Delete a video
  static async deleteVideo(id: string): Promise<void> {
    return SupabaseService.delete('videos', id);
  }

  // Increment view count
  static async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_video_views', { video_id: id });
    
    if (error) {
      console.error('Error incrementing video views:', error);
      throw error;
    }
  }

  // Set up real-time listeners for videos
  static setupRealtimeListeners(callback: (payload: any) => void): void {
    // Clear any existing listeners
    this.removeAllListeners();
    
    // Listen for changes to videos
    const videosChannel = SupabaseService.setupRealtimeListener('videos', callback);
    this.listeners.push(videosChannel);
    
    // Listen for changes to videos_tags
    const tagsChannel = SupabaseService.setupRealtimeListener('videos_tags', callback);
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
  private static async updateVideoTags(videoId: string, tags: string[]): Promise<void> {
    // First, delete all existing tags for this video
    const { error: deleteError } = await supabase
      .from('videos_tags')
      .delete()
      .eq('video_id', videoId);
    
    if (deleteError) {
      console.error('Error deleting existing tags:', deleteError);
      throw deleteError;
    }
    
    // Then, add the new tags
    if (tags.length > 0) {
      const { error } = await supabase.rpc('add_tags_to_video', {
        video_id: videoId,
        tag_names: tags
      });
      
      if (error) {
        console.error('Error adding tags to video:', error);
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
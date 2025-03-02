import { supabase } from '@/lib/supabase';
import { SupabaseService, PaginationParams, PaginatedResponse } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Types for music operations
export interface MusicAlbum {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover_image?: string;
  release_date?: string;
  artist_id: string;
  category_id: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MusicAlbumWithRelations extends MusicAlbum {
  category_name: string;
  category_slug: string;
  artist_name: string;
  artist_avatar?: string;
  track_count: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  album_id: string;
  track_number?: number;
  duration?: number;
  audio_url: string;
  lyrics?: string;
  status: 'draft' | 'published';
  plays: number;
  created_at: string;
  updated_at: string;
}

export interface MusicAlbumInput {
  title: string;
  description?: string;
  cover_image?: string;
  release_date?: string;
  artist_id: string;
  category_id: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  slug?: string; // Optional, will be generated if not provided
}

export interface MusicTrackInput {
  title: string;
  album_id: string;
  track_number?: number;
  duration?: number;
  audio_url: string;
  lyrics?: string;
  status: 'draft' | 'published';
}

export interface MusicFilter {
  status?: 'draft' | 'published';
  category_id?: string;
  artist_id?: string;
  search?: string;
}

export class MusicService {
  private static listeners: RealtimeChannel[] = [];

  // Fetch music albums with pagination and filters
  static async getMusicAlbums(
    pagination: PaginationParams,
    filters?: MusicFilter
  ): Promise<PaginatedResponse<MusicAlbumWithRelations>> {
    return SupabaseService.fetchPaginated<MusicAlbumWithRelations>(
      'view_music_albums',
      pagination,
      (query) => {
        // Apply filters
        if (filters?.status) {
          query = query.eq('status', filters.status);
        }
        
        if (filters?.category_id) {
          query = query.eq('category_id', filters.category_id);
        }
        
        if (filters?.artist_id) {
          query = query.eq('artist_id', filters.artist_id);
        }
        
        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
        
        return query;
      }
    );
  }

  // Get a single music album by ID
  static async getMusicAlbumById(id: string): Promise<MusicAlbumWithRelations | null> {
    return SupabaseService.fetchById<MusicAlbumWithRelations>('view_music_albums', id);
  }

  // Get a single music album by slug
  static async getMusicAlbumBySlug(slug: string): Promise<MusicAlbumWithRelations | null> {
    const { data, error } = await supabase
      .from('view_music_albums')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching music album by slug:', error);
      throw error;
    }
    
    return data as MusicAlbumWithRelations;
  }

  // Get tracks for an album
  static async getTracksForAlbum(albumId: string): Promise<MusicTrack[]> {
    const { data, error } = await supabase
      .from('music_tracks')
      .select('*')
      .eq('album_id', albumId)
      .order('track_number', { ascending: true });
    
    if (error) {
      console.error('Error fetching tracks for album:', error);
      throw error;
    }
    
    return data as MusicTrack[];
  }

  // Get a single track by ID
  static async getTrackById(id: string): Promise<MusicTrack | null> {
    return SupabaseService.fetchById<MusicTrack>('music_tracks', id);
  }

  // Create a new music album
  static async createMusicAlbum(input: MusicAlbumInput): Promise<MusicAlbum> {
    // Generate slug if not provided
    const albumData: any = { ...input };
    if (!albumData.slug) {
      albumData.slug = this.generateSlug(input.title);
    }
    
    // Set published_at if status is published
    if (albumData.status === 'published' && !albumData.published_at) {
      albumData.published_at = new Date().toISOString();
    }
    
    return SupabaseService.create<MusicAlbum>('music_albums', albumData);
  }

  // Update an existing music album
  static async updateMusicAlbum(id: string, input: Partial<MusicAlbumInput>): Promise<MusicAlbum> {
    const albumData: any = { ...input };
    
    // If status is changing to published, set published_at
    if (albumData.status === 'published') {
      const currentAlbum = await this.getMusicAlbumById(id);
      if (currentAlbum && currentAlbum.status !== 'published') {
        albumData.published_at = new Date().toISOString();
      }
    }
    
    return SupabaseService.update<MusicAlbum>('music_albums', id, albumData);
  }

  // Delete a music album
  static async deleteMusicAlbum(id: string): Promise<void> {
    return SupabaseService.delete('music_albums', id);
  }

  // Create a new music track
  static async createMusicTrack(input: MusicTrackInput): Promise<MusicTrack> {
    return SupabaseService.create<MusicTrack>('music_tracks', input);
  }

  // Update an existing music track
  static async updateMusicTrack(id: string, input: Partial<MusicTrackInput>): Promise<MusicTrack> {
    return SupabaseService.update<MusicTrack>('music_tracks', id, input);
  }

  // Delete a music track
  static async deleteMusicTrack(id: string): Promise<void> {
    return SupabaseService.delete('music_tracks', id);
  }

  // Increment view count for album
  static async incrementAlbumViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_music_album_views', { album_id: id });
    
    if (error) {
      console.error('Error incrementing album views:', error);
      throw error;
    }
  }

  // Increment play count for track
  static async incrementTrackPlays(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_music_track_plays', { track_id: id });
    
    if (error) {
      console.error('Error incrementing track plays:', error);
      throw error;
    }
  }

  // Set up real-time listeners for music
  static setupRealtimeListeners(callback: (payload: any) => void): void {
    // Clear any existing listeners
    this.removeAllListeners();
    
    // Listen for changes to music_albums
    const albumsChannel = SupabaseService.setupRealtimeListener('music_albums', callback);
    this.listeners.push(albumsChannel);
    
    // Listen for changes to music_tracks
    const tracksChannel = SupabaseService.setupRealtimeListener('music_tracks', callback);
    this.listeners.push(tracksChannel);
  }

  // Remove all real-time listeners
  static removeAllListeners(): void {
    this.listeners.forEach(channel => {
      supabase.removeChannel(channel);
    });
    this.listeners = [];
  }

  // Helper methods
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();
  }
} 
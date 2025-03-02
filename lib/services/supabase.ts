import { supabase } from '@/lib/supabase';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Pagination types
export interface PaginationParams {
  cursor?: string;
  limit?: number;
  ascending?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

// Generic helper functions for Supabase operations
export class SupabaseService {
  // Generic fetch with cursor-based pagination
  static async fetchPaginated<T>(
    table: string,
    { cursor, limit = 10, ascending = false }: PaginationParams,
    additionalFilters?: (query: PostgrestFilterBuilder<any, any, any>) => PostgrestFilterBuilder<any, any, any>
  ): Promise<PaginatedResponse<T>> {
    // Start with the base query
    let query = supabase
      .from(table)
      .select('*');
    
    // Apply cursor-based pagination
    if (cursor) {
      query = query.filter(
        'created_at',
        ascending ? 'gt' : 'lt',
        cursor
      );
    }
    
    // Apply any additional filters
    if (additionalFilters) {
      query = additionalFilters(query);
    }
    
    // Order and limit
    const { data, error } = await query
      .order('created_at', { ascending })
      .limit(limit + 1); // Fetch one extra to determine if there are more
    
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      throw error;
    }
    
    // Check if there are more results
    const hasMore = data.length > limit;
    const results = hasMore ? data.slice(0, limit) : data;
    
    // Get the next cursor
    const nextCursor = hasMore && results.length > 0 
      ? results[results.length - 1].created_at 
      : null;
    
    return {
      data: results as T[],
      nextCursor,
      hasMore
    };
  }
  
  // Generic fetch by ID
  static async fetchById<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Record not found
        return null;
      }
      console.error(`Error fetching ${table} by ID:`, error);
      throw error;
    }
    
    return data as T;
  }
  
  // Generic create
  static async create<T>(table: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error creating ${table}:`, error);
      throw error;
    }
    
    return result as T;
  }
  
  // Generic update
  static async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }
    
    return result as T;
  }
  
  // Generic delete
  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
  }
  
  // Setup a real-time listener for a table
  static setupRealtimeListener(
    table: string,
    callback: (payload: RealtimePostgresChangesPayload<any>) => void,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*'
  ) {
    const channel = supabase.channel(`public:${table}`)
      .on(
        'postgres_changes' as any,
        {
          event,
          schema: 'public',
          table,
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          callback(payload);
        }
      )
      .subscribe();
    
    // Return the channel so it can be unsubscribed later
    return channel;
  }
} 
import { supabase } from '@/lib/supabase';
import { SupabaseService } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Types for settings operations
export interface Setting {
  id: string;
  key: string;
  value: any;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SettingInput {
  key: string;
  value: any;
  description?: string;
  is_public?: boolean;
}

export class SettingsService {
  private static listeners: RealtimeChannel[] = [];
  private static cache: Record<string, any> = {};
  private static cacheTimestamp: number = 0;
  private static CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Get all settings
  static async getAllSettings(includePrivate: boolean = false): Promise<Setting[]> {
    const query = supabase
      .from('settings')
      .select('*');
    
    if (!includePrivate) {
      query.eq('is_public', true);
    }
    
    const { data, error } = await query.order('key');
    
    if (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
    
    return data as Setting[];
  }

  // Get a setting by key
  static async getSettingByKey(key: string, useCache: boolean = true): Promise<any> {
    // Check cache first if enabled
    if (useCache) {
      const now = Date.now();
      if (
        this.cache[key] !== undefined && 
        now - this.cacheTimestamp < this.CACHE_TTL
      ) {
        return this.cache[key];
      }
    }
    
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error(`Error fetching setting by key (${key}):`, error);
      throw error;
    }
    
    // Update cache
    if (useCache) {
      this.cache[key] = data.value;
      this.cacheTimestamp = Date.now();
    }
    
    return data.value;
  }

  // Get multiple settings by keys
  static async getSettingsByKeys(keys: string[], useCache: boolean = true): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    
    // Check which keys we need to fetch
    const keysToFetch = useCache 
      ? keys.filter(key => {
          const now = Date.now();
          if (
            this.cache[key] !== undefined && 
            now - this.cacheTimestamp < this.CACHE_TTL
          ) {
            result[key] = this.cache[key];
            return false;
          }
          return true;
        })
      : keys;
    
    if (keysToFetch.length > 0) {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', keysToFetch);
      
      if (error) {
        console.error('Error fetching settings by keys:', error);
        throw error;
      }
      
      // Update result and cache
      data.forEach(item => {
        result[item.key] = item.value;
        if (useCache) {
          this.cache[item.key] = item.value;
        }
      });
      
      if (useCache) {
        this.cacheTimestamp = Date.now();
      }
    }
    
    return result;
  }

  // Create or update a setting
  static async upsertSetting(input: SettingInput): Promise<Setting> {
    const { key, value, description, is_public = true } = input;
    
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        key,
        value,
        description,
        is_public,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error upserting setting:', error);
      throw error;
    }
    
    // Update cache
    this.cache[key] = value;
    this.cacheTimestamp = Date.now();
    
    return data as Setting;
  }

  // Delete a setting
  static async deleteSetting(key: string): Promise<void> {
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('key', key);
    
    if (error) {
      console.error(`Error deleting setting (${key}):`, error);
      throw error;
    }
    
    // Remove from cache
    delete this.cache[key];
  }

  // Clear cache
  static clearCache(): void {
    this.cache = {};
    this.cacheTimestamp = 0;
  }

  // Set up real-time listeners for settings
  static setupRealtimeListeners(callback: (payload: any) => void): void {
    // Clear any existing listeners
    this.removeAllListeners();
    
    // Listen for changes to settings
    const settingsChannel = SupabaseService.setupRealtimeListener('settings', (payload) => {
      // Clear cache on any settings change
      this.clearCache();
      callback(payload);
    });
    
    this.listeners.push(settingsChannel);
  }

  // Remove all real-time listeners
  static removeAllListeners(): void {
    this.listeners.forEach(channel => {
      supabase.removeChannel(channel);
    });
    this.listeners = [];
  }
} 
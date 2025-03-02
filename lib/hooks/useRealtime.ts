import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';
type RealtimeCallback = (payload: RealtimePostgresChangesPayload<any>) => void;

interface UseRealtimeOptions {
  tables: string[];
  event?: RealtimeEvent;
  callback?: RealtimeCallback;
  enabled?: boolean;
}

/**
 * Custom hook for setting up Supabase real-time listeners
 * 
 * @param options Configuration options for the real-time listeners
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useRealtime({
  tables,
  event = '*',
  callback,
  enabled = true
}: UseRealtimeOptions) {
  const [channels, setChannels] = useState<RealtimeChannel[]>([]);
  const [latestPayload, setLatestPayload] = useState<RealtimePostgresChangesPayload<any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const newChannels: RealtimeChannel[] = [];

    // Set up a channel for each table
    tables.forEach(table => {
      const channel = supabase.channel(`public:${table}`)
        .on(
          'postgres_changes' as any,
          {
            event,
            schema: 'public',
            table,
          },
          (payload: RealtimePostgresChangesPayload<any>) => {
            setLatestPayload(payload);
            if (callback) {
              callback(payload);
            }
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED');
        });

      newChannels.push(channel);
    });

    setChannels(newChannels);

    // Clean up function to remove channels when component unmounts
    return () => {
      newChannels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, [tables.join(','), event, enabled]); // Re-run if tables, event, or enabled changes

  return { latestPayload, isConnected };
}

/**
 * Custom hook for setting up real-time listeners for a specific table
 * 
 * @param table The table to listen to
 * @param event The event type to listen for
 * @param callback Callback function to execute when an event occurs
 * @param enabled Whether the listener is enabled
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useTableRealtime(
  table: string,
  event: RealtimeEvent = '*',
  callback?: RealtimeCallback,
  enabled: boolean = true
) {
  return useRealtime({
    tables: [table],
    event,
    callback,
    enabled
  });
}

/**
 * Custom hook for setting up real-time listeners for blog posts
 * 
 * @param callback Callback function to execute when an event occurs
 * @param enabled Whether the listener is enabled
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useBlogRealtime(callback?: RealtimeCallback, enabled: boolean = true) {
  return useRealtime({
    tables: ['blog_posts', 'blog_posts_tags'],
    callback,
    enabled
  });
}

/**
 * Custom hook for setting up real-time listeners for music
 * 
 * @param callback Callback function to execute when an event occurs
 * @param enabled Whether the listener is enabled
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useMusicRealtime(callback?: RealtimeCallback, enabled: boolean = true) {
  return useRealtime({
    tables: ['music_albums', 'music_tracks'],
    callback,
    enabled
  });
}

/**
 * Custom hook for setting up real-time listeners for videos
 * 
 * @param callback Callback function to execute when an event occurs
 * @param enabled Whether the listener is enabled
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useVideoRealtime(callback?: RealtimeCallback, enabled: boolean = true) {
  return useRealtime({
    tables: ['videos', 'videos_tags'],
    callback,
    enabled
  });
}

/**
 * Custom hook for setting up real-time listeners for settings
 * 
 * @param callback Callback function to execute when an event occurs
 * @param enabled Whether the listener is enabled
 * @returns Object containing the latest payload and a boolean indicating if the listener is connected
 */
export function useSettingsRealtime(callback?: RealtimeCallback, enabled: boolean = true) {
  return useTableRealtime('settings', '*', callback, enabled);
} 
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useBlogRealtime, useMusicRealtime, useVideoRealtime, useSettingsRealtime } from '@/lib/hooks/useRealtime';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Define the context type
interface RealtimeContextType {
  blogUpdates: RealtimePostgresChangesPayload<any> | null;
  musicUpdates: RealtimePostgresChangesPayload<any> | null;
  videoUpdates: RealtimePostgresChangesPayload<any> | null;
  settingsUpdates: RealtimePostgresChangesPayload<any> | null;
  isConnected: boolean;
}

// Create the context with default values
const RealtimeContext = createContext<RealtimeContextType>({
  blogUpdates: null,
  musicUpdates: null,
  videoUpdates: null,
  settingsUpdates: null,
  isConnected: false
});

// Hook to use the realtime context
export const useRealtime = () => useContext(RealtimeContext);

interface RealtimeProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

/**
 * Provider component that wraps the app and provides real-time updates
 */
export function RealtimeProvider({ children, enabled = true }: RealtimeProviderProps) {
  const [blogUpdates, setBlogUpdates] = useState<RealtimePostgresChangesPayload<any> | null>(null);
  const [musicUpdates, setMusicUpdates] = useState<RealtimePostgresChangesPayload<any> | null>(null);
  const [videoUpdates, setVideoUpdates] = useState<RealtimePostgresChangesPayload<any> | null>(null);
  const [settingsUpdates, setSettingsUpdates] = useState<RealtimePostgresChangesPayload<any> | null>(null);
  
  // Set up real-time listeners
  const { isConnected: blogConnected } = useBlogRealtime(
    (payload) => setBlogUpdates(payload),
    enabled
  );
  
  const { isConnected: musicConnected } = useMusicRealtime(
    (payload) => setMusicUpdates(payload),
    enabled
  );
  
  const { isConnected: videoConnected } = useVideoRealtime(
    (payload) => setVideoUpdates(payload),
    enabled
  );
  
  const { isConnected: settingsConnected } = useSettingsRealtime(
    (payload) => setSettingsUpdates(payload),
    enabled
  );
  
  // Overall connection status
  const isConnected = blogConnected && musicConnected && videoConnected && settingsConnected;
  
  // Log updates in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (blogUpdates) console.log('Blog update:', blogUpdates);
      if (musicUpdates) console.log('Music update:', musicUpdates);
      if (videoUpdates) console.log('Video update:', videoUpdates);
      if (settingsUpdates) console.log('Settings update:', settingsUpdates);
    }
  }, [blogUpdates, musicUpdates, videoUpdates, settingsUpdates]);
  
  // Provide the context value
  const contextValue: RealtimeContextType = {
    blogUpdates,
    musicUpdates,
    videoUpdates,
    settingsUpdates,
    isConnected
  };
  
  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  );
} 
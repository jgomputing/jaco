import { useState, useCallback, useEffect } from 'react';
import { PaginationParams, PaginatedResponse } from '@/lib/services/supabase';

interface UsePaginationOptions<T> {
  fetchFunction: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  initialLimit?: number;
  initialAscending?: boolean;
  initialCursor?: string;
  enabled?: boolean;
}

interface UsePaginationResult<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  limit: number;
  setLimit: (limit: number) => void;
  ascending: boolean;
  setAscending: (ascending: boolean) => void;
}

/**
 * Custom hook for cursor-based pagination
 * 
 * @param options Configuration options for pagination
 * @returns Object containing pagination state and functions
 */
export function usePagination<T>({
  fetchFunction,
  initialLimit = 10,
  initialAscending = false,
  initialCursor,
  enabled = true
}: UsePaginationOptions<T>): UsePaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor || null);
  const [limit, setLimit] = useState(initialLimit);
  const [ascending, setAscending] = useState(initialAscending);
  const [initialLoad, setInitialLoad] = useState(true);

  // Function to load the initial data
  const loadInitialData = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction({
        limit,
        ascending,
        cursor: initialCursor
      });
      
      setData(response.data);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
      setInitialLoad(false);
    }
  }, [fetchFunction, limit, ascending, initialCursor, enabled]);

  // Function to load more data
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || !nextCursor || !enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction({
        limit,
        ascending,
        cursor: nextCursor
      });
      
      setData(prevData => [...prevData, ...response.data]);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, hasMore, isLoading, nextCursor, limit, ascending, enabled]);

  // Function to refresh the data
  const refresh = useCallback(async () => {
    setData([]);
    setNextCursor(initialCursor || null);
    setHasMore(false);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction({
        limit,
        ascending,
        cursor: initialCursor
      });
      
      setData(response.data);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, limit, ascending, initialCursor]);

  // Load initial data on mount and when dependencies change
  useEffect(() => {
    if (initialLoad) {
      loadInitialData();
    }
  }, [loadInitialData, initialLoad]);

  // Reset data when limit or ascending changes
  useEffect(() => {
    if (!initialLoad) {
      refresh();
    }
  }, [limit, ascending, refresh, initialLoad]);

  return {
    data,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    limit,
    setLimit,
    ascending,
    setAscending
  };
}

/**
 * Custom hook for infinite scrolling with cursor-based pagination
 * 
 * @param options Configuration options for pagination
 * @param threshold Distance from the bottom of the page to trigger loading more data
 * @returns Object containing pagination state and functions, plus a ref to attach to the scrollable container
 */
export function useInfiniteScroll<T>(
  options: UsePaginationOptions<T>,
  threshold: number = 200
) {
  const pagination = usePagination<T>(options);
  const { loadMore, hasMore, isLoading } = pagination;
  
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        loadMore();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, hasMore, isLoading, threshold]);
  
  return pagination;
} 
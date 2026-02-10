import { useState, useEffect, useCallback, useRef } from 'react';
import { getAuthHeaders } from '@/lib/admin-auth';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  error?: string;
}

export interface UseAdminDataOptions {
  endpoint: string;
  limit?: number;
  enabled?: boolean;
  onSuccess?: <T>(data: T[]) => void;
  onError?: (error: string) => void;
}

export interface UseAdminDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination: PaginationMeta | null;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: Record<string, string | number | boolean | null>) => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: unknown[]; timestamp: number; meta?: PaginationMeta }>();
const CACHE_DURATION = 30000; // 30 seconds

export function useAdminData<T = unknown>({
  endpoint,
  limit = 20,
  enabled = true,
  onSuccess,
  onError,
}: UseAdminDataOptions): UseAdminDataReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string | number | boolean | null>>({});
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const buildUrl = useCallback(() => {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', currentLimit.toString());
    
    if (search) {
      url.searchParams.set('search', search);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        url.searchParams.set(key, value.toString());
      }
    });
    
    return url.toString();
  }, [endpoint, page, currentLimit, search, filters]);

  // Clear cache when filters change (but not on every render)
  const prevFiltersRef = useRef<{ search: string; filters: Record<string, string | number | boolean | null> }>({ search: '', filters: {} });
  
  useEffect(() => {
    const filtersChanged = 
      prevFiltersRef.current.search !== search ||
      JSON.stringify(prevFiltersRef.current.filters) !== JSON.stringify(filters);
    
    if (filtersChanged) {
      // Clear all cache entries for this endpoint
      const endpointBase = endpoint.split('?')[0];
      for (const key of cache.keys()) {
        if (key.includes(endpointBase)) {
          cache.delete(key);
        }
      }
      prevFiltersRef.current = { search, filters };
    }
  }, [search, filters, endpoint]);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const cacheKey = buildUrl();

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setData(cached.data as T[]);
      if (cached.meta) setPagination(cached.meta);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(cacheKey, {
        headers: getAuthHeaders(),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T[]> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result.data || []);
      
      if (result.meta) {
        setPagination(result.meta);
        // Cache with metadata
        cache.set(cacheKey, {
          data: result.data || [],
          timestamp: Date.now(),
          meta: result.meta,
        });
      } else {
        // Cache without metadata
        cache.set(cacheKey, {
          data: result.data || [],
          timestamp: Date.now(),
        });
      }

      onSuccess?.(result.data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was cancelled
      }
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching data';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled, buildUrl, onSuccess, onError]);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1); // Reset to first page on search
      fetchData();
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, fetchData]);

  // Fetch on page/limit/filters change
  useEffect(() => {
    fetchData();
  }, [page, currentLimit, filters, fetchData]);

  // Initial fetch
  useEffect(() => {
    if (enabled && !search) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const refetch = useCallback(async () => {
    // Clear cache for this endpoint
    const cacheKey = buildUrl();
    cache.delete(cacheKey);
    await fetchData();
  }, [buildUrl, fetchData]);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSetLimit = useCallback((newLimit: number) => {
    setCurrentLimit(newLimit);
    setPage(1);
  }, []);

  const handleSetFilters = useCallback((newFilters: Record<string, string | number | boolean | null>) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    pagination,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
    setSearch,
    setFilters: handleSetFilters,
  };
}


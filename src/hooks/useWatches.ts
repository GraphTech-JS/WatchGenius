import { useState, useEffect, useCallback, useRef  } from 'react';
import { getWatches } from '@/lib/api';
import { ApiWatchListResponse, GetWatchesParams } from '@/interfaces/api';
import { WatchItem } from '@/interfaces/watch';
import { transformApiWatch } from '@/lib/transformers';

export function useWatches(initialFilters?: GetWatchesParams) {
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<GetWatchesParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (!initialFilters || Object.keys(initialFilters).length === 0) {
      return;
    }

    async function fetchData() {
      setLoading(true);
      try {
        const response: ApiWatchListResponse = await getWatches({ pageSize: 12, ...initialFilters });
        const transformed: WatchItem[] = response.data.map(transformApiWatch);
        setWatches(transformed);
        setHasMore(transformed.length < response.pagination.total);
        setCurrentFilters(initialFilters || {});
        setCurrentPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [initialFilters]);

  const loadMore = async () => {
    if (!hasMore || loading || isLoadingRef.current) return;
    
    const nextPage = currentPage + 1;
    isLoadingRef.current = true;
    setLoading(true);
    try {
      const response: ApiWatchListResponse = await getWatches({ 
        page: nextPage,
        pageSize: 12,
        ...currentFilters 
      });
      const transformed: WatchItem[] = response.data.map(transformApiWatch);
      setWatches(prev => [...prev, ...transformed]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < response.pagination.totalPages && response.data.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  };

  const reloadWithFilters = useCallback(async (filters: GetWatchesParams) => {
    if (isLoadingRef.current) return;
    
    const cacheKey = getCacheKey(filters);
    const cached = getFromCache(cacheKey);
    
    isLoadingRef.current = true;
    setLoading(true);
    setWatches([]); 
    
    const hasFilters = Object.keys(filters).filter(k => k !== 'page' && k !== 'pageSize').length > 0;
    const pageSize = hasFilters ? 100 : 12;
    
    try {
      
      const response = await getWatches({ page: 1, pageSize, ...filters });
      const transformed = response.data.map(transformApiWatch);
      
      setToCache(cacheKey, transformed);
      setWatches(transformed);
      setCurrentFilters(filters);
      setCurrentPage(1);
      setHasMore(transformed.length < response.pagination.total);
    } catch (err) {
      if (cached) {
        setWatches(cached);
        setCurrentFilters(filters);
        setCurrentPage(1);
        setHasMore(cached.length >= pageSize);
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, []);

  const getAll = (): WatchItem[] => watches;
  const getById = (id: string): WatchItem | undefined =>
    watches.find((w) => w.id === id);

  const getBySlug = (slug: string): WatchItem | undefined =>
    watches.find((w) => w.slug === slug);

  const getManyByIds = (ids: string[]): WatchItem[] =>
    watches.filter((w) => ids.includes(w.id));

  return {
    watches,
    getAll,
    getById, 
    getBySlug, 
    getManyByIds,
    loading,
    error,
    hasMore,
    loadMore,
    reloadWithFilters,
  };
}



const cache = new Map<string, { data: WatchItem[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(filters: GetWatchesParams): string {
  return JSON.stringify(filters);
}

function getFromCache(key: string): WatchItem[] | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

function setToCache(key: string, data: WatchItem[]): void {
  cache.set(key, { data, timestamp: Date.now() });
}
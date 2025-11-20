'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSearchSuggestions } from '@/lib/api';
import { SearchSuggestion } from '@/interfaces/api';

interface UseSearchSuggestionsOptions {
  minLength?: number;
  debounceMs?: number;
}

export function useSearchSuggestions(
  query: string,
  options: UseSearchSuggestionsOptions = {}
) {
  const { minLength = 2, debounceMs = 300 } = options;

  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const data = await getSearchSuggestions(searchQuery);
        setSuggestions(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Failed to fetch search suggestions:', err);
          setError(err.message);
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < minLength) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(trimmedQuery);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, minLength, debounceMs, fetchSuggestions]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  return {
    suggestions,
    loading,
    error,
    clearSuggestions,
  };
}


'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDealers, getDealerById, searchDealers } from '@/lib/api';
import { DealerData } from '@/types/dealers';
import { transformApiDealer } from '@/lib/transformers';

export function useDealers() {
  const [dealers, setDealers] = useState<DealerData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDealers() {
      setError(null);
      setLoading(true);
      try {
        const apiDealers = await getDealers();
        const transformed = apiDealers.map(transformApiDealer);
        setDealers(transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadDealers();
  }, []);

  const fetchDealers = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const apiDealers = await getDealers();
      const transformed = apiDealers.map(transformApiDealer);
      setDealers(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDealerById = useCallback(async (id: string) => {
    setError(null);
    try {
      const apiDealer = await getDealerById(id);
      const transformed = transformApiDealer(apiDealer);
      
      setDealers(prev => {
        const existing = prev.find(d => d.id === transformed.id);
        if (existing) {
          return prev.map(d => d.id === transformed.id ? transformed : d);
        }
        return [...prev, transformed];
      });
      
      return transformed;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
    }
  }, []);

  const searchDealersByQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchDealers();
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      const apiDealers = await searchDealers(query);
      const transformed = apiDealers.map(transformApiDealer);
      setDealers(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [fetchDealers]);

  return {
    dealers,
    error,
    loading,
    fetchDealers,
    fetchDealerById,
    searchDealers: searchDealersByQuery,
  };
}
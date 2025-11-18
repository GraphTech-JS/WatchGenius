'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDealers, getDealerById, searchDealers } from '@/lib/api';
import { DealerData } from '@/types/dealers';
import { transformApiDealer } from '@/lib/transformers';

export function useDealers() {
  const [dealers, setDealers] = useState<DealerData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDealers() {
      setError(null);
      try {
        const apiDealers = await getDealers();
        const transformed = apiDealers.map(transformApiDealer);
        setDealers(transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } 
    }
    loadDealers();
  }, []);

  const fetchDealers = useCallback(async () => {
    setError(null);
    try {
      const apiDealers = await getDealers();
      const transformed = apiDealers.map(transformApiDealer);
      setDealers(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
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
    try {
      const apiDealers = await searchDealers(query);
      const transformed = apiDealers.map(transformApiDealer);
      setDealers(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
    }
  }, [fetchDealers]);

  return {
    dealers,
    error,
    fetchDealers,
    fetchDealerById,
    searchDealers: searchDealersByQuery,
  };
}
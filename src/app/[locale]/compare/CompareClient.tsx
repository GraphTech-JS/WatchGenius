'use client';

export const dynamic = 'force-dynamic';

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import ComparePage from '@/features/compare/ComparePage';
import { CompareProduct } from '@/interfaces/compare';
import { WatchItem } from '@/interfaces/watch';
import { useCompareContext } from '@/context/CompareContext';
import { getWatchesByIds } from '@/lib/api';
import { transformApiWatchFull } from '@/lib/transformers';
import { t } from '@/i18n';
import { productKeys } from '@/i18n/keys/product';
import { catalogKeys } from '@/i18n/keys/catalog';

function translateDetailValue(
  type: 'condition' | 'mechanism' | 'material',
  value: string
): string {
  if (!value) return value;

  const normalizedValue = value.toLowerCase().trim();
  let translationKey: string;

  if (type === 'condition') {
    translationKey = `${catalogKeys.filterData.conditions}.${normalizedValue}`;
    const translation = t(translationKey);
    if (translation !== translationKey) return translation;
    translationKey = `${catalogKeys.filterData.conditions}.${value}`;
  } else if (type === 'mechanism') {
    translationKey = `${catalogKeys.filterData.mechanisms}.${normalizedValue}`;
    const translation = t(translationKey);
    if (translation !== translationKey) return translation;
    translationKey = `${catalogKeys.filterData.mechanisms}.${value}`;
  } else {
    translationKey = `${catalogKeys.filterData.materials}.${normalizedValue}`;
    const translation = t(translationKey);
    if (translation !== translationKey) return translation;
    translationKey = `${catalogKeys.filterData.materials}.${value}`;
  }

  const translation = t(translationKey);
  return translation !== translationKey ? translation : value;
}

function getCurrencyFromStorage(): string {
  if (typeof window === 'undefined') return 'EUR';
  const savedCurrency = localStorage.getItem('selectedCurrency');
  const validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
  return savedCurrency && validCurrencies.includes(savedCurrency)
    ? savedCurrency
    : 'EUR';
}

const COMPARE_CACHE_PREFIX = 'compare-cache-';
const CACHE_TTL = 5 * 60 * 1000;

function getCompareCacheKey(ids: string[], currency: string): string {
  const sortedIds = [...ids].sort().join(',');
  return `${COMPARE_CACHE_PREFIX}${sortedIds}-${currency}`;
}

function getCachedWatches(ids: string[], currency: string): WatchItem[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getCompareCacheKey(ids, currency);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    const cachedIds = data.map((w: WatchItem) => w.id).sort();
    const requestedIds = [...ids].sort();

    if (
      cachedIds.length !== requestedIds.length ||
      !cachedIds.every((id: string, i: number) => id === requestedIds[i])
    ) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedWatches(
  ids: string[],
  currency: string,
  watches: WatchItem[]
): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getCompareCacheKey(ids, currency);
    const cacheData = {
      data: watches,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Silent fail
  }
}

const convertWatchToCompareProduct = (
  watch: WatchItem,
  t: (key: string) => string
): CompareProduct => {
  const imageUrl =
    typeof watch.image === 'string' ? watch.image : watch.image.src;

  return {
    id: watch.id,
    slug: watch.slug,
    title: watch.title,
    brand: watch.brand,
    model: watch.title.split(' ').slice(1).join(' '),
    reference: watch.reference || `${watch.brand}-${watch.id}`,
    chronoUrl: watch.chronoUrl,
    index: watch.index,
    price: {
      min: watch.price,
      max: watch.price,
      currency: watch.currency,
    },
    priceTrend: {
      value: watch.trend.value,
      period: watch.trend.period,
      isPositive: watch.trend.value > 0,
    },
    image: imageUrl,
    thumbnails: [imageUrl, imageUrl, imageUrl, imageUrl],
    description: `${watch.brand} ${watch.title} - ${watch.condition} годинник`,
    details: [
      {
        label: t(productKeys.details.mechanism),
        value: translateDetailValue('mechanism', watch.mechanism),
      },
      { label: t(productKeys.details.year), value: watch.year.toString() },
      {
        label: t(productKeys.details.material),
        value: translateDetailValue('material', watch.material),
      },
      {
        label: t(productKeys.details.diameter),
        value: `${watch.diameterMm}мм`,
      },
      {
        label: t(productKeys.details.condition),
        value: translateDetailValue('condition', watch.condition),
      },
      {
        label: t(productKeys.details.bracelet),
        value: translateDetailValue(
          'material',
          watch.braceletMaterial || watch.material
        ),
      },
      {
        label: t(productKeys.details.waterResistance),
        value: watch.waterResistance
          ? t(productKeys.details.yes)
          : t(productKeys.details.no),
      },
      {
        label: t(productKeys.details.chronograph),
        value: watch.chronograph
          ? t(productKeys.details.yes)
          : t(productKeys.details.no),
      },
    ],
    analytics: {
      demand: Math.floor((watch.id.charCodeAt(2) || 0) * 0.4) + 30,
      liquidity: Math.floor((watch.id.charCodeAt(2) || 0) * 0.3) + 50,
      dynamics: Math.floor((watch.id.charCodeAt(2) || 0) * 0.2) + 5,
      ads: `За ${Math.floor((watch.id.charCodeAt(2) || 0) * 0.1) + 1} днів`,
      trendGauge: Math.floor((watch.id.charCodeAt(2) || 0) * 0.4) + 30,
      lastUpdated: 'вересень 2024 року',
      volatility:
        watch.index === 'A'
          ? 'Низька'
          : watch.index === 'C'
          ? 'Висока'
          : 'Середня',
      liquidityLabel:
        watch.index === 'A'
          ? 'Висока'
          : watch.index === 'B'
          ? 'Середня'
          : 'Низька',
      popularity: 7.5 + ((watch.id.charCodeAt(2) || 0) % 20) / 10,
      reportPeak: Math.round(watch.price * 1.03),
      reportMin: Math.round(watch.price * 0.97),
      reportChangePct:
        (Math.sign(watch.trend.value) *
          (2 + ((watch.id.charCodeAt(1) || 0) % 3))) /
        10,
    },
    similarModels: [],
    sellerOffers: [],
    comparisonId: watch.id,
    isSelected: false,
  };
};

const ComparePageWrapper = () => {
  const router = useRouter();
  const locale = useLocale();
  const { selectedWatches } = useCompareContext();
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWatches = async () => {
      if (selectedWatches.length === 0) {
        setWatches([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const currency = getCurrencyFromStorage();

        const cachedWatches = getCachedWatches(selectedWatches, currency);
        if (cachedWatches) {
          setWatches(cachedWatches);
          setLoading(false);
        }

        const apiWatches = await getWatchesByIds(selectedWatches, currency);
        const transformed = apiWatches.map((watch) =>
          transformApiWatchFull(watch, currency)
        );
        setWatches(transformed);
        setCachedWatches(selectedWatches, currency, transformed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watches');
      } finally {
        setLoading(false);
      }
    };

    loadWatches();

    const handleCurrencyChange = () => {
      loadWatches();
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
  }, [selectedWatches]);

  const products = useMemo(() => {
    if (watches.length === 0) {
      return [];
    }

    return watches.map((watch) => convertWatchToCompareProduct(watch, t));
  }, [watches]);

  const handleBackToCatalog = () => {
    router.push(`/${locale}/catalog`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    );
  }

  return (
    <ComparePage products={products} onBackToCatalog={handleBackToCatalog} />
  );
};

export default ComparePageWrapper;

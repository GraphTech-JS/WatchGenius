'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import ProductPage from '@/features/product/ProductPage';
import { Product } from '@/interfaces/product';
import { generateSellerOffers } from '@/data/sellerOffers';
import { trackWatchView, getWatchBySlug, getSimilarWatches } from '@/lib/api';
import { transformApiWatchFull } from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import type { SimilarModel } from '@/interfaces/product';
import { t } from '@/i18n';
import { productKeys } from '@/i18n/keys/product';
import { catalogKeys } from '@/i18n/keys/catalog';
import { ProductLoading } from '@/features/product/ProductLoading/ProductLoading';
import type { ApiWatchFullResponse } from '@/interfaces/api';

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

const PRODUCT_CACHE_PREFIX = 'product-cache-';
const CACHE_TTL = 5 * 60 * 1000;

function getProductCacheKey(slug: string, currency: string): string {
  return `${PRODUCT_CACHE_PREFIX}${slug}-${currency}`;
}

function getCachedProduct(slug: string, currency: string): WatchItem | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getProductCacheKey(slug, currency);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedProduct(
  slug: string,
  currency: string,
  watch: WatchItem
): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getProductCacheKey(slug, currency);
    const cacheData = {
      data: watch,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Silent fail
  }
}

const SIMILAR_CACHE_PREFIX = 'similar-cache-';

function getSimilarCacheKey(watchId: string, currency: string): string {
  return `${SIMILAR_CACHE_PREFIX}${watchId}-${currency}`;
}

function getCachedSimilar(
  watchId: string,
  currency: string
): SimilarModel[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getSimilarCacheKey(watchId, currency);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedSimilar(
  watchId: string,
  currency: string,
  models: SimilarModel[]
): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getSimilarCacheKey(watchId, currency);
    const cacheData = {
      data: models,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Silent fail
  }
}

export default function ProductClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const [watch, setWatch] = useState<WatchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const loadWatch = async () => {
      try {
        setLoading(true);
        setError(null);
        const currency = getCurrencyFromStorage();

        const cachedWatch = getCachedProduct(resolvedParams.slug, currency);
        if (cachedWatch) {
          setWatch(cachedWatch);
          setLoading(false);
        }

        const apiWatch = await getWatchBySlug(resolvedParams.slug, currency);

        if (!apiWatch) {
          setError('Watch not found');
          return;
        }

        const transformedWatch = transformApiWatchFull(apiWatch, currency);
        setWatch(transformedWatch);
        setCachedProduct(resolvedParams.slug, currency, transformedWatch);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watch');
      } finally {
        setLoading(false);
      }
    };

    loadWatch();

    const handleCurrencyChange = () => {
      loadWatch();
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
  }, [resolvedParams.slug]);

  useEffect(() => {
    if (watch?.id && !hasTrackedView.current) {
      trackWatchView(watch.id).catch(() => {});
      hasTrackedView.current = true;
    }
  }, [watch?.id]);

  const [similarModels, setSimilarModels] = useState<SimilarModel[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    const loadSimilarModels = async () => {
      if (!watch?.id) return;

      try {
        setLoadingSimilar(true);
        const currency = getCurrencyFromStorage();

        const cachedModels = getCachedSimilar(watch.id, currency);
        if (cachedModels && cachedModels.length > 0) {
          setSimilarModels(cachedModels);
        }

        const similarWatches = await getSimilarWatches(watch.id, currency);

        if (!similarWatches || !Array.isArray(similarWatches)) {
          setSimilarModels([]);
          return;
        }

        const transformed: SimilarModel[] = similarWatches
          .filter((w: ApiWatchFullResponse) => w && w.id && w.id !== watch.id)
          .slice(0, 6)
          .reduce<SimilarModel[]>((acc, w: ApiWatchFullResponse) => {
            try {
              const watchItem = transformApiWatchFull(w, currency);
              const imageUrl =
                typeof watchItem.image === 'string'
                  ? watchItem.image
                  : watchItem.image.src;
              acc.push({
                id: watchItem.id,
                slug: watchItem.slug,
                title: watchItem.title,
                price: `${watchItem.price.toLocaleString()} ${
                  watchItem.currency
                }`,
                priceTrend: `${watchItem.trend.value > 0 ? '+' : ''}${
                  watchItem.trend.value
                }%`,
                image: imageUrl,
                index: watchItem.index,
              });
            } catch (error) {
              console.error(
                '⚠️ [SimilarModels] Error transforming watch:',
                w.id,
                error
              );
            }
            return acc;
          }, []);

        setSimilarModels(transformed);
        setCachedSimilar(watch.id, currency, transformed);
      } catch (error) {
        console.error('❌ [SimilarModels] Failed to load:', error);
        setSimilarModels([]);
      } finally {
        setLoadingSimilar(false);
      }
    };

    loadSimilarModels();

    const handleCurrencyChange = () => {
      loadSimilarModels();
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
  }, [watch?.id]);

  const sellerOffers = useMemo(() => {
    if (!watch) return [];
    return generateSellerOffers(watch.id, watch.price);
  }, [watch]);

  if (loading) {
    return <ProductLoading />;
  }

  if (error || !watch) {
    notFound();
  }

  const currency = getCurrencyFromStorage();
  const currencySymbol =
    currency === 'EUR'
      ? '€'
      : currency === 'USD'
      ? '$'
      : currency === 'UAH'
      ? '₴'
      : '€';

  const product: Product = {
    id: watch.id,
    slug: watch.slug,
    title: watch.title,
    brand: watch.brand,
    model: watch.title.split(' ').slice(1).join(' '),
    reference: watch.reference || `${watch.brand}-${watch.year}-${watch.id}`,
    chronoUrl:
      watch.chronoUrl && watch.chronoUrl.trim() !== ''
        ? watch.chronoUrl
        : undefined,
    price: {
      min: watch.price,
      max: watch.price,
      currency: currencySymbol as '€' | '$' | '₴',
    },
    priceTrend: {
      value:
        watch.trend30d !== undefined && watch.trend30d !== null
          ? watch.trend30d
          : watch.trend.value,
      period:
        watch.trend30d !== undefined && watch.trend30d !== null
          ? '30d'
          : watch.trend.period,
      isPositive:
        (watch.trend30d !== undefined && watch.trend30d !== null
          ? watch.trend30d
          : watch.trend.value) > 0,
    },
    image: typeof watch.image === 'string' ? watch.image : watch.image.src,
    thumbnails: [
      typeof watch.image === 'string' ? watch.image : watch.image.src,
      typeof watch.image === 'string' ? watch.image : watch.image.src,
      typeof watch.image === 'string' ? watch.image : watch.image.src,
      typeof watch.image === 'string' ? watch.image : watch.image.src,
      typeof watch.image === 'string' ? watch.image : watch.image.src,
    ],
    description: `${watch.brand} ${watch.title} - ${watch.condition} стан`,
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
      demand: Math.abs(watch.trend.value) * 10,
      liquidity: 72,
      dynamics: watch.trend.value,
      ads: 'За 3 дні',
      trendGauge: Math.abs(watch.trend.value) * 10,
      lastUpdated: 'вересень 2025 року',
      volatility:
        Math.abs(watch.trend.value) < 4
          ? 'Низька'
          : Math.abs(watch.trend.value) < 8
          ? 'Середня'
          : 'Висока',
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
    similarModels,
    sellerOffers,
  };

  return <ProductPage product={product} loadingSimilar={loadingSimilar} />;
}

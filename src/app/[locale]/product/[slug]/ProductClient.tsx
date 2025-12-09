'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import ProductPage from '@/features/product/ProductPage';
import { Product } from '@/interfaces/product';
import { generateSellerOffers } from '@/data/sellerOffers';
import {
  trackWatchView,
  getWatchBySlug,
  getSimilarWatches,
  getWatchById,
} from '@/lib/api';
import {
  transformApiWatchFull,
  transformDealerOffers,
} from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import type { SimilarModel } from '@/interfaces/product';
import { t } from '@/i18n';
import { productKeys } from '@/i18n/keys/product';
import { catalogKeys } from '@/i18n/keys/catalog';
import { ProductLoading } from '@/features/product/ProductLoading/ProductLoading';
import type { ApiPriceHistory, ApiWatchFullResponse } from '@/interfaces/api';

// Функція для перевірки, чи рядок є UUID
function isUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

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
    // Ignore
  }
}

const SLUG_TO_ID_CACHE_PREFIX = 'slug-to-id-cache-';

function getCachedWatchId(slug: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = `${SLUG_TO_ID_CACHE_PREFIX}${slug}`;
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

function setCachedWatchId(slug: string, id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = `${SLUG_TO_ID_CACHE_PREFIX}${slug}`;
    const cacheData = {
      data: id,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Ignore
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
    // Ignore
  }
}

const PRICE_REPORT_CACHE_PREFIX = 'price-report-cache-';

function getPriceReportCacheKey(
  watchId: string,
  currency: string,
  period: '3M' | '1P'
): string {
  return `${PRICE_REPORT_CACHE_PREFIX}${watchId}-${currency}-${period}`;
}

function getCachedPriceReport(
  watchId: string,
  currency: string,
  period: '3M' | '1P'
): { reportPeak: number; reportMin: number; reportChangePct: number } | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getPriceReportCacheKey(watchId, currency, period);
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

function setCachedPriceReport(
  watchId: string,
  currency: string,
  period: '3M' | '1P',
  report: { reportPeak: number; reportMin: number; reportChangePct: number }
): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getPriceReportCacheKey(watchId, currency, period);
    const cacheData = {
      data: report,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Ignore
  }
}

function calculatePriceReport(
  priceHistory: ApiPriceHistory[] | undefined,
  currentPrice: number,
  trendValue: number,
  watchId: string,
  period: '3M' | '1P' = '3M',
  requestedCurrency?: string,
  apiWatchCurrency?: string
): { reportPeak: number; reportMin: number; reportChangePct: number } {
  if (priceHistory && priceHistory.length > 0) {
    const sorted = [...priceHistory].sort(
      (a, b) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    );

    const lastHistoryItem = sorted[sorted.length - 1];
    const targetCurrency = requestedCurrency || apiWatchCurrency || 'EUR';

    let conversionRate = 1;

    if (
      lastHistoryItem &&
      lastHistoryItem.currency &&
      lastHistoryItem.currency !== targetCurrency &&
      currentPrice > 0 &&
      lastHistoryItem.price > 0
    ) {
      conversionRate = currentPrice / lastHistoryItem.price;
    }

    const now = new Date();
    let startDate: Date;

    if (period === '3M') {
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 3);
    } else {
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const filtered = sorted.filter((item) => {
      const itemDate = new Date(item.recordedAt);
      return itemDate >= startDate && itemDate <= now;
    });

    const dataToUse = filtered.length > 0 ? filtered : sorted;

    const prices = dataToUse
      .map((h) => {
        if (h.currency === targetCurrency) {
          return h.price;
        }
        return h.price * conversionRate;
      })
      .filter((p) => p > 0);

    if (prices.length === 0) {
      return {
        reportPeak: Math.round(currentPrice * 1.03),
        reportMin: Math.round(currentPrice * 0.97),
        reportChangePct: 0,
      };
    }

    const reportPeak = Math.max(...prices);
    const reportMin = Math.min(...prices);

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const reportChangePct =
      firstPrice > 0 ? (lastPrice - firstPrice) / firstPrice : 0;

    return {
      reportPeak: Math.round(reportPeak),
      reportMin: Math.round(reportMin),
      reportChangePct,
    };
  }

  return {
    reportPeak: Math.round(currentPrice * 1.03),
    reportMin: Math.round(currentPrice * 0.97),
    reportChangePct:
      (Math.sign(trendValue) * (2 + ((watchId.charCodeAt(1) || 0) % 3))) / 10,
  };
}

export default function ProductClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const identifier = resolvedParams.slug;
  const isId = isUUID(identifier);
  const [watch, setWatch] = useState<WatchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedView = useRef(false);
  const [apiWatchData, setApiWatchData] = useState<ApiWatchFullResponse | null>(
    null
  );

  useEffect(() => {
    const loadWatch = async () => {
      try {
        setLoading(true);
        setError(null);
        const currency = getCurrencyFromStorage();

        if (isId) {
          try {
            const apiWatch = await getWatchById(identifier, currency);
            if (apiWatch) {
              setApiWatchData(apiWatch);
              const transformedWatch = transformApiWatchFull(
                apiWatch,
                currency
              );
              setWatch(transformedWatch);
              if (apiWatch.id) {
                setCachedWatchId(identifier, apiWatch.id);
              }
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error('Failed to load watch by ID:', err);
            setError('Watch not found');
            setLoading(false);
            return;
          }
        }

        const cachedWatch = getCachedProduct(identifier, currency);
        if (cachedWatch) {
          setWatch(cachedWatch);
          const watchId = cachedWatch.id;
          if (watchId) {
            setCachedWatchId(identifier, watchId);
            try {
              const apiWatch = await getWatchById(watchId, currency);
              if (apiWatch) {
                setApiWatchData(apiWatch);
              }
            } catch (err) {
              console.error('Failed to load apiWatchData:', err);
            }
          }
          setLoading(false);
          return;
        }

        const cachedId = getCachedWatchId(identifier);
        if (cachedId) {
          try {
            const apiWatch = await getWatchById(cachedId, currency);
            if (apiWatch) {
              setApiWatchData(apiWatch);
              const transformedWatch = transformApiWatchFull(
                apiWatch,
                currency
              );
              setWatch(transformedWatch);
              setCachedProduct(identifier, currency, transformedWatch);
              setLoading(false);
              return;
            }
          } catch {}
        }

        const apiWatch = await getWatchBySlug(identifier, currency);

        if (!apiWatch) {
          setError('Watch not found');
          return;
        }

        setCachedWatchId(identifier, apiWatch.id);
        setApiWatchData(apiWatch);

        const transformedWatch = transformApiWatchFull(apiWatch, currency);
        setWatch(transformedWatch);
        setCachedProduct(identifier, currency, transformedWatch);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watch');
      } finally {
        setLoading(false);
      }
    };

    loadWatch();

    const handleCurrencyChange = () => {
      setApiWatchData(null);
      loadWatch();
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
  }, [identifier, isId]);

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
                priceTrend: (() => {
                  const trendValue = watchItem.trend.value;

                  if (isNaN(trendValue) || !isFinite(trendValue)) {
                    return '0.0%';
                  }
                  return `${trendValue > 0 ? '+' : ''}${trendValue}%`;
                })(),
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

  const currency = getCurrencyFromStorage();

  const sellerOffers = useMemo(() => {
    if (!watch) return [];

    if (apiWatchData?.dealerOffers && apiWatchData.dealerOffers.length > 0) {
      const translatedCondition = translateDetailValue(
        'condition',
        watch.condition
      );
      return transformDealerOffers(
        apiWatchData.dealerOffers,
        translatedCondition,
        currency
      );
    }

    return generateSellerOffers(watch.id, watch.price);
  }, [watch, apiWatchData, currency]);

  if (loading) {
    return <ProductLoading />;
  }

  if (error || !watch) {
    notFound();
  }

  const currencySymbol =
    currency === 'EUR'
      ? '€'
      : currency === 'USD'
      ? '$'
      : currency === 'UAH'
      ? '₴'
      : '€';

  const period = '3M';
  const cachedPriceReport = getCachedPriceReport(watch.id, currency, period);

  let priceReport: {
    reportPeak: number;
    reportMin: number;
    reportChangePct: number;
  };

  if (cachedPriceReport) {
    priceReport = cachedPriceReport;
  } else {
    priceReport = calculatePriceReport(
      apiWatchData?.priceHistory,
      watch.price,
      watch.trend.value,
      watch.id,
      period,
      currency,
      apiWatchData?.currency
    );
    setCachedPriceReport(watch.id, currency, period, priceReport);
  }
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
      demand: Math.min(100, Math.abs(watch.trend.value) * 10),
      liquidity: watch.liquidity
        ? parseFloat(watch.liquidity) ||
          (apiWatchData?.analytics?.liquidity
            ? parseFloat(apiWatchData.analytics.liquidity)
            : 0)
        : apiWatchData?.analytics?.liquidity
        ? parseFloat(apiWatchData.analytics.liquidity)
        : 0,
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
      popularity: Math.min(
        10,
        Math.max(
          0,
          watch.popularity
            ? watch.popularity
            : apiWatchData?.analytics?.popularity ?? 0
        )
      ),
      reportPeak: priceReport.reportPeak,
      reportMin: priceReport.reportMin,
      reportChangePct: priceReport.reportChangePct,
    },
    index: watch.index,
    similarModels,
    sellerOffers,
  };

  return (
    <ProductPage
      product={product}
      watch={watch}
      loadingSimilar={loadingSimilar}
      priceHistory={apiWatchData?.priceHistory}
      currentPrice={watch.price}
      currency={currency}
      apiWatchCurrency={apiWatchData?.currency}
    />
  );
}

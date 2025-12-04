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
import { compareKeys } from '@/i18n/keys/compare';
import { ClockLoader } from 'react-spinners';
import type { ApiWatchFullResponse, ApiPriceHistory } from '@/interfaces/api';

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

const PRICE_REPORT_CACHE_TTL = 5 * 60 * 1000;

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

    if (now - timestamp > PRICE_REPORT_CACHE_TTL) {
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

const COMPARE_CACHE_PREFIX = 'compare-cache-';
const COMPARE_CACHE_TTL = 5 * 60 * 1000;

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

    if (now - timestamp > COMPARE_CACHE_TTL) {
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
  t: (key: string) => string,
  apiWatchData?: ApiWatchFullResponse,
  currency: string = 'EUR'
): CompareProduct => {
  const imageUrl =
    typeof watch.image === 'string' ? watch.image : watch.image.src;

  const currencySymbol =
    currency === 'EUR'
      ? '€'
      : currency === 'USD'
      ? '$'
      : currency === 'UAH'
      ? '₴'
      : '€';

  const priceHistory = apiWatchData?.priceHistory;
  const latestPriceInCurrency =
    priceHistory && priceHistory.length > 0
      ? priceHistory
          .filter((p) => p.currency === currency)
          .sort(
            (a, b) =>
              new Date(b.recordedAt).getTime() -
              new Date(a.recordedAt).getTime()
          )[0]
      : null;
            
  const latestPrice =
    priceHistory && priceHistory.length > 0
      ? priceHistory[priceHistory.length - 1]
      : null;

  let currentPrice = watch.price;
  if (latestPriceInCurrency) {
    currentPrice = latestPriceInCurrency.price;
  } else if (latestPrice && latestPrice.currency !== currency) {
    
    currentPrice = watch.price;
  }

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
      min: Math.round(currentPrice),
      max: Math.round(currentPrice),
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
    analytics: (() => {
      const period = '3M';
      const cachedPriceReport = getCachedPriceReport(
        watch.id,
        currency,
        period
      );

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

      return {
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
      };
    })(),
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
  const [apiWatchesData, setApiWatchesData] = useState<
    Map<string, ApiWatchFullResponse>
  >(new Map());
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

        const watchesDataMap = new Map<string, ApiWatchFullResponse>();
        apiWatches.forEach((watch) => {
          if (watch && watch.id) {
            watchesDataMap.set(watch.id, watch);
          }
        });
        setApiWatchesData(watchesDataMap);
      } catch {
        setError(t(compareKeys.error));
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

    const currency = getCurrencyFromStorage();
    return watches.map((watch) =>
      convertWatchToCompareProduct(
        watch,
        t,
        apiWatchesData.get(watch.id),
        currency
      )
    );
  }, [watches, apiWatchesData]);

  const currency = getCurrencyFromStorage();

  const handleBackToCatalog = () => {
    router.push(`/${locale}/catalog`);
  };

  if (loading) {
    return (
      <div className='flex flex-col gap-6 justify-center items-center min-h-screen'>
        <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
        <p className='text-[#8b8b8b] text-[20px] font-[var(--font-inter)]'>
          Завантаження...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='px-4 text-center text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <ComparePage
      products={products}
      watches={watches}
      onBackToCatalog={handleBackToCatalog}
      apiWatchesData={apiWatchesData}
      currency={currency}
    />
  );
};

export default ComparePageWrapper;

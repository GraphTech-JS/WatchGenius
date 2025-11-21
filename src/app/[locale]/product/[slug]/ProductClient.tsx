'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import ProductPage from '@/features/product/ProductPage';
import { Product } from '@/interfaces/product';
import { generateSellerOffers } from '@/data/sellerOffers';
import { trackWatchView, getWatchBySlug, getWatches } from '@/lib/api';
import type { GetWatchesParams } from '@/interfaces/api';
import { transformApiWatchFull, transformApiWatch } from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import type { SimilarModel } from '@/interfaces/product';
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

// Helper to get currency from localStorage
function getCurrencyFromStorage(): string {
  if (typeof window === 'undefined') return 'EUR';
  const savedCurrency = localStorage.getItem('selectedCurrency');
  const validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
  return savedCurrency && validCurrencies.includes(savedCurrency)
    ? savedCurrency
    : 'EUR';
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

        const apiWatch = await getWatchBySlug(resolvedParams.slug, currency);

        if (!apiWatch) {
          setError('Watch not found');
          return;
        }

        const transformedWatch = transformApiWatchFull(apiWatch);
        setWatch(transformedWatch);
      } catch (err) {
        console.error('❌ [ProductClient] Failed to load watch:', err);
        setError(err instanceof Error ? err.message : 'Failed to load watch');
      } finally {
        setLoading(false);
      }
    };

    loadWatch();

    // Listen for currency changes
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
      trackWatchView(watch.id).catch(() => {
        // Silently fail if tracking endpoint is not available
      });
      hasTrackedView.current = true;
    }
  }, [watch?.id]);

  const [similarModels, setSimilarModels] = useState<SimilarModel[]>([]);

  useEffect(() => {
    const loadSimilarModels = async () => {
      if (!watch) return;

      try {
        const currency = getCurrencyFromStorage();

        const params: GetWatchesParams = {
          brands: watch.brand,
          pageSize: 6,
          currency: currency,
        };

        const response = await getWatches(params);
        const transformed = response.data
          .filter((w) => w.id !== watch.id)
          .slice(0, 6)
          .map((w) => {
            const watchItem = transformApiWatch(w);
            return {
              id: watchItem.id,
              slug: watchItem.slug,
              title: watchItem.title,
              price: `${watchItem.price.toLocaleString()} ${
                watchItem.currency
              }`,
              priceTrend: `${watchItem.trend.value > 0 ? '+' : ''}${
                watchItem.trend.value
              }%`,
              image:
                typeof watchItem.image === 'string'
                  ? watchItem.image
                  : watchItem.image.src,
              index: watchItem.index,
            };
          });

        setSimilarModels(transformed);
      } catch {
        setSimilarModels([]);
      }
    };

    if (watch?.id && watch?.brand) {
      loadSimilarModels();
    }

    const handleCurrencyChange = () => {
      if (watch?.id && watch?.brand) {
        loadSimilarModels();
      }
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch?.id, watch?.brand]);

  const sellerOffers = useMemo(() => {
    if (!watch) return [];
    return generateSellerOffers(watch.id, watch.price);
  }, [watch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  if (error || !watch) {
    notFound();
  }

  const product: Product = {
    id: watch.id,
    slug: watch.slug,
    title: watch.title,
    brand: watch.brand,
    model: watch.title.split(' ').slice(1).join(' '),
    reference: watch.reference || `${watch.brand}-${watch.year}-${watch.id}`,
    chronoUrl: watch.chronoUrl,
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

  return <ProductPage product={product} />;
}

'use client';

export const dynamic = 'force-dynamic';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import ComparePage from '@/features/compare/ComparePage';
import { CompareProduct } from '@/interfaces/compare';
import { useWatches } from '@/hooks/useWatches';
import { WatchItem } from '@/interfaces/watch';
import { useCompareContext } from '@/context/CompareContext';

const convertWatchToCompareProduct = (watch: WatchItem): CompareProduct => {
  return {
    id: watch.id,
    slug: watch.slug,
    title: watch.title,
    brand: watch.brand,
    model: watch.title.split(' ').slice(1).join(' '),
    reference: watch.reference || `${watch.brand}-${watch.id}`,
    index: watch.index,
    price: {
      min: Math.round(watch.price * 0.95),
      max: Math.round(watch.price * 1.05),
      currency: watch.currency,
    },
    priceTrend: {
      value: watch.trend.value,
      period: watch.trend.period,
      isPositive: watch.trend.value > 0,
    },
    image: watch.image,
    thumbnails: [watch.image, watch.image, watch.image, watch.image],
    description: `${watch.brand} ${watch.title} - ${watch.condition} годинник`,
    details: [
      { label: 'Матеріал', value: watch.material },
      { label: 'Механізм', value: watch.mechanism },
      { label: 'Рік', value: watch.year.toString() },
      { label: 'Стан', value: watch.condition },
      { label: 'Документи', value: watch.documents },
      { label: 'Локація', value: watch.location },
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
  const { getManyByIds } = useWatches();

  const watches = getManyByIds(selectedWatches);

  const products = useMemo(() => {
    if (watches.length === 0) {
      return [];
    }

    return watches.map(convertWatchToCompareProduct);
  }, [watches]);

  const handleBackToCatalog = () => {
    router.push(`/${locale}/catalog`);
  };

  return (
    <ComparePage products={products} onBackToCatalog={handleBackToCatalog} />
  );
};

export default ComparePageWrapper;

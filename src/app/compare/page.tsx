'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
      { label: 'Механізм', value: watch.mechanism },
      { label: 'Рік', value: watch.year.toString() },
      { label: 'Матеріал', value: watch.material },
      { label: 'Діаметр', value: `${watch.diameterMm}мм` },
      { label: 'Стан', value: watch.condition },
      { label: 'Ремінець', value: 'Залізо' },
      { label: 'Водостійкість', value: watch.waterResistance ? 'Так' : 'Ні' },
      { label: 'Хронограф', value: watch.chronograph ? 'Так' : 'Ні' },
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
      popularity: 7.5 + ((watch.id.charCodeAt(2) || 0) % 20) / 10, // 7.5..9.4
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
    router.push('/catalog');
  };

  return (
    <ComparePage products={products} onBackToCatalog={handleBackToCatalog} />
  );
};

export default ComparePageWrapper;

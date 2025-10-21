'use client';

import React, { useMemo } from 'react';
import { notFound } from 'next/navigation';
import ProductPage from '@/features/product/ProductPage';
import { useWatches } from '@/hooks/useWatches';
import { Product } from '@/interfaces/product';
import { generateSellerOffers } from '@/data/sellerOffers';

const ProductPageWrapper = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { getBySlug, getAll } = useWatches();
  const resolvedParams = React.use(params);
  const watch = getBySlug(resolvedParams.slug);

  if (!watch) {
    notFound();
  }

  const similarModels = useMemo(() => {
    const allWatches = getAll();
    return allWatches
      .filter((w) => w.id !== watch.id)
      .slice(0, 6)
      .map((w) => ({
        id: w.id,
        title: w.title,
        price: `${w.price.toLocaleString()} ${w.currency}`,
        priceTrend: `${w.trend.value > 0 ? '+' : ''}${w.trend.value}%`,
        image: typeof w.image === 'string' ? w.image : w.image.src,
        index: w.index,
      }));
  }, [watch.id, getAll]);

  const sellerOffers = useMemo(() => {
    return generateSellerOffers(watch.id, watch.price);
  }, [watch.id, watch.price]);

  const product: Product = {
    id: watch.id,
    slug: watch.slug,
    title: watch.title,
    brand: watch.brand,
    model: watch.title.split(' ').slice(1).join(' '),
    reference: watch.reference || `${watch.brand}-${watch.year}-${watch.id}`,
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
      { label: 'Матеріал', value: watch.material },
      { label: 'Калібр', value: watch.reference || 'N/A' },
      { label: 'Рік', value: watch.year.toString() },
      { label: 'Діаметр', value: '41 mm' },
      { label: 'Стан', value: watch.condition },
      { label: 'Водонепроникність', value: '300m' },
      { label: 'Механізм', value: watch.mechanism },
    ],
    analytics: {
      demand: Math.abs(watch.trend.value) * 10,
      liquidity: 72,
      dynamics: watch.trend.value,
      ads: 'За 3 дні',
      trendGauge: Math.abs(watch.trend.value) * 10,
      lastUpdated: 'вересень 2025 року',
    },
    similarModels,
    sellerOffers,
  };

  return <ProductPage product={product} />;
};

export default ProductPageWrapper;

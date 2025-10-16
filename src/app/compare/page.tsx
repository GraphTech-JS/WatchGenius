'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ComparePage from '@/features/compare/ComparePage';
import { CompareProduct } from '@/interfaces/compare';

// Mock data для демонстрації
const mockProducts: CompareProduct[] = [
  {
    id: '1',
    slug: 'rolex-submariner-date',
    title: 'ROLEX Submariner Date',
    brand: 'ROLEX',
    model: 'Submariner Date',
    reference: '210.30.42.20.01.00101',
    price: {
      min: 19500,
      max: 20000,
      currency: '€',
    },
    priceTrend: {
      value: 4.7,
      period: '30 днів',
      isPositive: true,
    },
    image: '/watch/RolexCatalog.png',
    thumbnails: [
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
    ],
    description: 'Класичний підводний годинник Rolex Submariner Date',
    details: [
      { label: 'Матеріал', value: 'Сталь' },
      { label: 'Калібр', value: '3235' },
      { label: 'Рік', value: '2023' },
      { label: 'Діаметр', value: '42 mm' },
      { label: 'Стан', value: 'Новий' },
      { label: 'Водонепроникність', value: '300m' },
      { label: 'Механізм', value: 'Автоматичний' },
    ],
    analytics: {
      demand: 65,
      liquidity: 72,
      dynamics: 12,
      ads: 'За 3 дні',
      trendGauge: 65,
      lastUpdated: 'вересень 2025 року',
    },
    similarModels: [],
    sellerOffers: [],
    comparisonId: '1',
  },
  {
    id: '2',
    slug: 'omega-seamaster',
    title: 'Omega Seamaster',
    brand: 'OMEGA',
    model: 'Seamaster',
    reference: '210.30.42.20.01.00102',
    price: {
      min: 18500,
      max: 19500,
      currency: '€',
    },
    priceTrend: {
      value: 7.2,
      period: '30 днів',
      isPositive: true,
    },
    image: '/watch/RolexCatalog.png',
    thumbnails: [
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
      '/watch/RolexCatalog.png',
    ],
    description: 'Класичний підводний годинник Omega Seamaster',
    details: [
      { label: 'Матеріал', value: 'Сталь' },
      { label: 'Калібр', value: '8800' },
      { label: 'Рік', value: '2023' },
      { label: 'Діаметр', value: '42 mm' },
      { label: 'Стан', value: 'Новий' },
      { label: 'Водонепроникність', value: '300m' },
      { label: 'Механізм', value: 'Автоматичний' },
    ],
    analytics: {
      demand: 58,
      liquidity: 68,
      dynamics: 8,
      ads: 'За 5 днів',
      trendGauge: 58,
      lastUpdated: 'вересень 2025 року',
    },
    similarModels: [],
    sellerOffers: [],
    comparisonId: '2',
  },
];

const ComparePageWrapper = () => {
  const router = useRouter();
  const products = mockProducts;

  const handleBackToCatalog = () => {
    router.push('/catalog');
  };

  return (
    <ComparePage products={products} onBackToCatalog={handleBackToCatalog} />
  );
};

export default ComparePageWrapper;

'use client';

import React from 'react';
import ProductPage from '@/features/product/ProductPage';
import { Product } from '@/interfaces/product';

// Mock data для демонстрації
const mockProduct: Product = {
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
  similarModels: [
    {
      id: '2',
      title: 'Omega Seamaster',
      price: '19 500 €',
      priceTrend: '+7%',
      image: '/watch/RolexCatalog.png',
      index: 'A',
    },
    {
      id: '3',
      title: 'Tudor Black Bay',
      price: '18 200 €',
      priceTrend: '+3%',
      image: '/watch/RolexCatalog.png',
      index: 'B',
    },
    {
      id: '4',
      title: 'Breitling Superocean',
      price: '17 800 €',
      priceTrend: '+5%',
      image: '/watch/RolexCatalog.png',
      index: 'A',
    },
    {
      id: '5',
      title: 'Tag Heuer Aquaracer',
      price: '16 500 €',
      priceTrend: '+2%',
      image: '/watch/RolexCatalog.png',
      index: 'C',
    },
    {
      id: '6',
      title: 'Seiko Prospex',
      price: '15 200 €',
      priceTrend: '+4%',
      image: '/watch/RolexCatalog.png',
      index: 'B',
    },
    {
      id: '7',
      title: 'Citizen Promaster',
      price: '14 800 €',
      priceTrend: '+1%',
      image: '/watch/RolexCatalog.png',
      index: 'A',
    },
  ],
  sellerOffers: [
    {
      id: '1',
      sellerName: 'Crown&Caliber',
      rating: 4.3,
      reviewsCount: 180,
      location: 'США, Атланта',
      details: '3 документами з упаковкою',
      shipping: 'Доставка від €50',
      price: '17 200',
      currency: '€',
    },
    {
      id: '2',
      sellerName: 'Crown&Caliber',
      rating: 4.3,
      reviewsCount: 180,
      location: 'США, Атланта',
      details: '3 документами з упаковкою',
      shipping: 'Доставка від €50',
      price: '17 200',
      currency: '€',
    },
    {
      id: '3',
      sellerName: 'Crown&Caliber',
      rating: 4.3,
      reviewsCount: 180,
      location: 'США, Атланта',
      details: '3 документами з упаковкою',
      shipping: 'Доставка від €50',
      price: '17 200',
      currency: '€',
    },
    {
      id: '4',
      sellerName: 'Crown&Caliber',
      rating: 4.3,
      reviewsCount: 180,
      location: 'США, Атланта',
      details: '3 документами з упаковкою',
      shipping: 'Доставка від €50',
      price: '17 200',
      currency: '€',
    },
  ],
};

const ProductPageWrapper = () => {
  // const params = useParams();
  // const slug = params.slug as string;

  // Тут буде логіка отримання продукту за slug
  // const product = await getProductBySlug(slug);

  return <ProductPage product={mockProduct} />;
};

export default ProductPageWrapper;

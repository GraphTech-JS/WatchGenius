'use client';

import React from 'react';
import { CompareAnalyticsProps } from '@/interfaces/compare';
import { ThemedText } from '@/components/ThemedText/ThemedText';

const CompareAnalytics: React.FC<CompareAnalyticsProps> = ({
  products,
  analytics,
}) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className='p-6 mb-8 bg-white rounded-lg border border-gray-200'>
      <ThemedText
        type='h3'
        className='mb-6 text-xl font-semibold text-gray-900'
      >
        Аналітика порівняння
      </ThemedText>

      <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4'>
        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium text-gray-600'>Ціна</span>
            <span
              className={`text-sm font-medium ${getTrendColor(
                analytics.priceComparison.trend
              )}`}
            >
              {getTrendIcon(analytics.priceComparison.trend)}
            </span>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-bold text-gray-900'>
              €{analytics.priceComparison.average.toLocaleString()}
            </div>
            <div className='text-xs text-gray-500'>
              Мін: €{analytics.priceComparison.min.toLocaleString()}
            </div>
            <div className='text-xs text-gray-500'>
              Макс: €{analytics.priceComparison.max.toLocaleString()}
            </div>
          </div>
        </div>

        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium text-gray-600'>Попит</span>
            <span className='text-sm text-blue-600'>📈</span>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-bold text-gray-900'>
              {analytics.demandComparison.average}%
            </div>
            <div className='text-xs text-gray-500'>
              Мін: {analytics.demandComparison.lowest}%
            </div>
            <div className='text-xs text-gray-500'>
              Макс: {analytics.demandComparison.highest}%
            </div>
          </div>
        </div>

        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium text-gray-600'>
              Ліквідність
            </span>
            <span className='text-sm text-blue-600'>💧</span>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-bold text-gray-900'>
              {analytics.liquidityComparison.average}%
            </div>
            <div className='text-xs text-gray-500'>
              Мін: {analytics.liquidityComparison.lowest}%
            </div>
            <div className='text-xs text-gray-500'>
              Макс: {analytics.liquidityComparison.highest}%
            </div>
          </div>
        </div>

        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium text-gray-600'>Динаміка</span>
            <span className='text-sm text-green-600'>📊</span>
          </div>
          <div className='space-y-1'>
            <div className='text-lg font-bold text-gray-900'>
              {analytics.dynamicsComparison.average > 0 ? '+' : ''}
              {analytics.dynamicsComparison.average}%
            </div>
            <div className='text-xs text-gray-500'>
              Мін: {analytics.dynamicsComparison.lowest}%
            </div>
            <div className='text-xs text-gray-500'>
              Макс: {analytics.dynamicsComparison.highest}%
            </div>
          </div>
        </div>
      </div>

      <div className='p-6 bg-gray-50 rounded-lg'>
        <ThemedText
          type='h4'
          className='mb-4 text-lg font-semibold text-gray-900'
        >
          Порівняння цін
        </ThemedText>

        <div className='relative p-4 h-64 bg-white rounded-lg'>
          <div className='flex justify-between items-end space-x-2 h-full'>
            {products.map((product) => {
              const maxPrice = Math.max(...products.map((p) => p.price.max));
              const height = (product.price.max / maxPrice) * 100;

              return (
                <div
                  key={product.id}
                  className='flex flex-col flex-1 items-center'
                >
                  <div
                    className='relative w-full bg-green-200 rounded-t-lg'
                    style={{ height: `${height}%` }}
                  >
                    <div className='absolute -top-6 left-1/2 text-xs font-medium text-gray-700 transform -translate-x-1/2'>
                      €{product.price.max.toLocaleString()}
                    </div>
                  </div>
                  <div className='mt-2 text-xs text-center text-gray-600'>
                    {product.brand}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='p-4 mt-6 bg-blue-50 rounded-lg'>
        <ThemedText
          type='h4'
          className='mb-2 text-lg font-semibold text-blue-900'
        >
          Рекомендації
        </ThemedText>
        <div className='space-y-2 text-sm text-blue-800'>
          <p>
            • Найкраща ціна:{' '}
            {
              products.find(
                (p) => p.price.min === analytics.priceComparison.min
              )?.brand
            }
          </p>
          <p>
            • Найвищий попит:{' '}
            {
              products.find(
                (p) => p.analytics.demand === analytics.demandComparison.highest
              )?.brand
            }
          </p>
          <p>
            • Найкраща ліквідність:{' '}
            {
              products.find(
                (p) =>
                  p.analytics.liquidity ===
                  analytics.liquidityComparison.highest
              )?.brand
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompareAnalytics;

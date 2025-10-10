'use client';

import React from 'react';
import { CompareProduct, CompareAnalytics } from '@/interfaces/compare';
import CompareCard from './components/CompareCard/CompareCard';
import CompareAnalyticsComponent from './components/CompareAnalytics/CompareAnalytics';
import { Button } from '@/components/Button/Button';
import { ThemedText } from '@/components/ThemedText/ThemedText';

interface ComparePageProps {
  products: CompareProduct[];
  onRemoveProduct: (productId: string) => void;
  onAddProduct: () => void;
  onBackToCatalog: () => void;
}

const ComparePage: React.FC<ComparePageProps> = ({
  products,
  onRemoveProduct,
  onAddProduct,
  onBackToCatalog,
}) => {
  const calculateAnalytics = (): CompareAnalytics => {
    const prices = products.map((p) => p.price.min);
    const demands = products.map((p) => p.analytics.demand);
    const liquidities = products.map((p) => p.analytics.liquidity);
    const dynamics = products.map((p) => p.analytics.dynamics);

    return {
      priceComparison: {
        min: Math.min(...prices),
        max: Math.max(...prices),
        average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
        trend: 'up' as const,
      },
      demandComparison: {
        highest: Math.max(...demands),
        lowest: Math.min(...demands),
        average: Math.round(
          demands.reduce((a, b) => a + b, 0) / demands.length
        ),
      },
      liquidityComparison: {
        highest: Math.max(...liquidities),
        lowest: Math.min(...liquidities),
        average: Math.round(
          liquidities.reduce((a, b) => a + b, 0) / liquidities.length
        ),
      },
      dynamicsComparison: {
        highest: Math.max(...dynamics),
        lowest: Math.min(...dynamics),
        average: Math.round(
          dynamics.reduce((a, b) => a + b, 0) / dynamics.length
        ),
      },
    };
  };

  const analytics = calculateAnalytics();

  const handleSave = (productId: string) => {
    console.log('Зберегти продукт:', productId);
  };

  const handlePriceNotification = (productId: string) => {
    console.log('Сповіщення про ціну:', productId);
  };

  const handleShare = (productId: string) => {
    console.log('Поділитися продуктом:', productId);
  };

  const handleBuy = (productId: string) => {
    console.log('Купити продукт:', productId);
  };

  const handleGetQuote = (productId: string) => {
    console.log('Отримати пропозицію:', productId);
  };

  if (products.length === 0) {
    return (
      <div className='min-h-screen bg-white'>
        <div className='px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='py-12 text-center'>
            <ThemedText
              type='h1'
              className='mb-4 text-3xl font-bold text-gray-900'
            >
              Немає товарів для порівняння
            </ThemedText>
            <p className='mb-8 text-gray-600'>
              Додайте товари для порівняння з каталогу
            </p>
            <Button
              variant='solid'
              onClick={onBackToCatalog}
              className='px-6 py-3 text-white bg-green-600 hover:bg-green-700'
            >
              Повернутись в каталог
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <nav className='flex items-center mb-8 space-x-2 text-sm text-gray-600'>
          <button
            onClick={onBackToCatalog}
            className='flex items-center space-x-2 transition-colors hover:text-gray-900'
          >
            <svg
              className='w-4 h-4 transform rotate-180'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
            <span>Назад</span>
          </button>

          <span className='text-gray-400'>/</span>
          <span className='font-medium text-gray-900'>Порівняння</span>
        </nav>

        <div className='mb-8'>
          <ThemedText
            type='h1'
            className='mb-2 text-3xl font-bold text-gray-900'
          >
            Порівняння товарів
          </ThemedText>
          <p className='text-gray-600'>
            Порівняйте {products.length} товарів за різними параметрами
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <CompareCard
              key={product.id}
              product={product}
              onRemove={() => onRemoveProduct(product.id)}
              onSave={() => handleSave(product.id)}
              onPriceNotification={() => handlePriceNotification(product.id)}
              onShare={() => handleShare(product.id)}
              onBuy={() => handleBuy(product.id)}
              onGetQuote={() => handleGetQuote(product.id)}
            />
          ))}

          {products.length < 3 && (
            <div
              className='flex justify-center items-center p-6 rounded-lg border-2 border-gray-300 border-dashed transition-colors cursor-pointer hover:border-gray-400'
              onClick={onAddProduct}
            >
              <div className='text-center'>
                <svg
                  className='mx-auto mb-4 w-12 h-12 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
                <p className='font-medium text-gray-600'>Додати товар</p>
                <p className='text-sm text-gray-500'>Максимум 3 товари</p>
              </div>
            </div>
          )}
        </div>

        {products.length > 1 && (
          <CompareAnalyticsComponent
            products={products}
            analytics={analytics}
          />
        )}
        <div className='mt-8 text-center'>
          <Button
            variant='outline'
            onClick={onBackToCatalog}
            className='px-6 py-3 text-gray-700 border-gray-300 hover:bg-gray-50'
          >
            Повернутись в каталог
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;

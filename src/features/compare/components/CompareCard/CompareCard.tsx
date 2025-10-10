'use client';

import React from 'react';
import Image from 'next/image';
import { CompareCardProps } from '@/interfaces/compare';
import { Button } from '@/components/Button/Button';
import { ThemedText } from '@/components/ThemedText/ThemedText';

const CompareCard: React.FC<CompareCardProps> = ({
  product,
  onRemove,
  onSave,
  onPriceNotification,
  onShare,
  onBuy,
  onGetQuote,
}) => {
  const formatPrice = () => {
    const { min, max, currency } = product.price;
    if (min === max) {
      return `${currency} ${min.toLocaleString()}`;
    }
    return `${currency} ${min.toLocaleString()}-${max.toLocaleString()}`;
  };

  const getTrendIcon = () => {
    return product.priceTrend.isPositive ? '↗' : '↘';
  };

  const getTrendColor = () => {
    return product.priceTrend.isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className='relative p-6 bg-white rounded-lg border border-gray-200'>
      <button
        onClick={onRemove}
        className='flex absolute top-4 right-4 justify-center items-center w-8 h-8 bg-gray-100 rounded-full transition-colors hover:bg-gray-200'
      >
        <svg
          className='w-4 h-4 text-gray-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      <div className='overflow-hidden relative mb-4 bg-gray-100 rounded-lg aspect-square'>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className='object-cover'
        />
        <div className='absolute top-2 right-2 px-2 py-1 bg-white rounded-full shadow-sm'>
          <span className='text-xs font-medium text-gray-900'>A</span>
        </div>
      </div>

      <div className='mb-4'>
        <ThemedText
          type='h3'
          className='mb-1 text-lg font-semibold text-gray-900'
        >
          {product.brand} {product.model}
        </ThemedText>
        <p className='text-sm text-gray-600'>(Ref.: {product.reference})</p>
      </div>

      <div className='mb-4'>
        <div className='flex items-center mb-2 space-x-2'>
          <ThemedText type='h4' className='text-xl font-semibold text-gray-900'>
            {formatPrice()}
          </ThemedText>
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()} {Math.abs(product.priceTrend.value)}%
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 mb-4'>
        <Button
          variant='outline'
          onClick={onSave}
          className='flex justify-center items-center py-2 space-x-1 text-xs'
        >
          <svg
            className='w-3 h-3'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
          <span>Зберегти</span>
        </Button>

        <Button
          variant='outline'
          onClick={() => window.open(`/product/${product.slug}`, '_blank')}
          className='flex justify-center items-center py-2 space-x-1 text-xs'
        >
          <svg
            className='w-3 h-3'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
          <span>Переглянути</span>
        </Button>

        <Button
          variant='outline'
          onClick={onPriceNotification}
          className='flex justify-center items-center py-2 space-x-1 text-xs'
        >
          <svg
            className='w-3 h-3'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h7.5l4 4v10.5a1.5 1.5 0 01-1.5 1.5h-9z'
            />
          </svg>
          <span>Сповіщення</span>
        </Button>

        <Button
          variant='outline'
          onClick={onShare}
          className='flex justify-center items-center py-2 space-x-1 text-xs'
        >
          <svg
            className='w-3 h-3'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
            />
          </svg>
          <span>Поширити</span>
        </Button>
      </div>

      <div className='space-y-2'>
        <Button
          variant='solid'
          onClick={onBuy}
          className='py-2 w-full text-sm font-semibold text-white bg-green-600 hover:bg-green-700'
        >
          Купити в Chrono24
        </Button>

        <Button
          variant='outline'
          onClick={onGetQuote}
          className='py-2 w-full text-sm font-semibold text-green-600 border-green-600 hover:bg-green-50'
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default CompareCard;

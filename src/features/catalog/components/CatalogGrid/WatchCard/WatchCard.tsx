'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import type { WatchItem } from '@/mock/watches';
import styles from './WatchCard.module.css';

type Props = {
  item: WatchItem;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onOpenFeedback?: (watchTitle: string) => void;
};

const indexBadgeClass = (idx: WatchItem['index']) => {
  switch (idx) {
    case 'A':
      return 'bg-[#b4e1c7] text-[#067b06]';
    case 'B':
      return 'bg-[#fff3d5] text-[#e57300]';
    case 'C':
      return 'bg-[#fddcdc] text-[#b91b1b]';
  }
};

export const WatchCard: React.FC<Props> = ({
  item,
  liked,
  onToggleLike,
  onOpenFeedback,
}) => {
  const router = useRouter();
  const trendValue = Number(item.trend.value);
  const isUp = trendValue > 0;
  const isFlat = trendValue === 0;

  const handleCardClick = () => {
    router.push(`/product/${item.slug}`);
  };

  return (
    <div
      className={`${styles.watchCard} border border-[rgba(23,20,20,0.15)] bg-white p-3`}
      onClick={handleCardClick}
    >
      <div className='flex justify-between items-center'>
        <span className={styles.badgeTooltipWrapper}>
          <span
            className={`inline-flex items-center justify-center rounded-[5px] ${
              styles.badge
            } ${indexBadgeClass(item.index)}`}
          >
            {item.index}
          </span>
          <span className={styles.badgeTooltip}>
            {item.index === 'A' && 'Топ-сегмент'}
            {item.index === 'B' && 'Середній сегмент'}
            {item.index === 'C' && 'Базовий сегмент'}
          </span>
        </span>

        <button
          aria-label={liked ? 'Прибрати з обраного' : 'Додати в обране'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(item.id);
          }}
          className='text-[18px] cursor-pointer z-2'
        >
          {liked ? (
            <FaHeart className='text-[#04694f]' />
          ) : (
            <FaRegHeart className='text-[#04694f]' />
          )}
        </button>
      </div>

      <div className='relative h-[111px] md:h-[124px] xl:h-[123px] w-full'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          className={styles.watchImage}
          style={{
            padding: item.variant === 'brand' ? '0 20px 0 20px' : '0',
          }}
          priority={false}
        />
      </div>

      <h4 className={`${styles.watchTitle} mt-[8px] mb-[8px]`}>{item.title}</h4>

      <div className='flex flex-col items-center gap-[9px] sm:flex-row sm:justify-between'>
        <div className='text-[16px] font-medium text-[var(--text-dark,#171414)]'>
          {item.price.toLocaleString('uk-UA')} {item.currency}
        </div>

        <div className='flex items-center gap-1 text-[14px] '>
          {isFlat ? (
            <span
              className={`${styles.trendBadge} ${styles.trendValue} ${styles.trendValueZero}`}
            >
              0 %{' '}
              <span className={styles.trendPeriod}>{item.trend.period}</span>
            </span>
          ) : (
            <span
              className={`${styles.trendBadge} ${styles.trendValue} ${
                isUp ? styles.trendValuePositive : styles.trendValueNegative
              }`}
              title={`${isUp ? 'Зростання' : 'Падіння'} за ${
                item.trend.period
              }`}
            >
              {isUp ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(trendValue)} %{' '}
              <span className={styles.trendPeriod}>{item.trend.period}</span>
            </span>
          )}
        </div>
      </div>

      <button
        className={`${styles.buyButton} mt-[27px]`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenFeedback?.(item.title);
        }}
      >
        {item.buttonLabel}
      </button>
    </div>
  );
};

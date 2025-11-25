'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { Heart, ArrowUp, ArrowDown } from 'lucide-react';
import type { WatchItem } from '@/interfaces/watch';
import styles from './WatchCard.module.css';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';

type Props = {
  item: WatchItem;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onOpenFeedback?: (watchTitle: string) => void;
  priority?: boolean;
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
  priority = false,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const trendValue =
    item.trend90d !== undefined && item.trend90d !== null
      ? item.trend90d
      : item.trend?.value ?? 0;
  const isUp = trendValue > 0;
  const isFlat = Math.abs(trendValue) < 0.01;

  const trendPeriod = '90d';

  const handleCardClick = () => {
    router.push(`/${locale}/product/${item.slug}`);
  };

  const hasValidImage = () => {
    if (!item.image) return false;
    const imageStr =
      typeof item.image === 'string' ? item.image : item.image.src || '';
    return (
      imageStr.trim() !== '' &&
      imageStr !== 'null' &&
      imageStr !== 'undefined' &&
      !imageStr.includes('/watch-random/')
    );
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.chronoUrl && hasValidImage()) {
      window.open(item.chronoUrl, '_blank');
    } else {
      onOpenFeedback?.(item.title);
    }
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
          aria-label={
            liked ? t(a11yKeys.favorites.remove) : t(a11yKeys.favorites.add)
          }
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(item.id);
          }}
          className='text-[18px] cursor-pointer z-2'
        >
          <Heart
            size={18}
            className={`text-[#04694f] ${liked ? 'fill-[#04694f]' : ''}`}
          />
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
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
        />
      </div>

      <h4 className={`${styles.watchTitle} mt-[8px] mb-[8px]`}>{item.title}</h4>

      <div className='flex flex-col items-center gap-[9px] sm:flex-row sm:justify-between'>
        <div className='text-[16px] font-medium text-[var(--text-dark,#171414)] whitespace-nowrap'>
          {Math.round(item.price).toLocaleString('uk-UA')} {item.currency}
        </div>

        <div className='flex items-center gap-1 text-[14px] '>
          {isFlat ? (
            <span
              className={`${styles.trendBadge} ${styles.trendValue} ${styles.trendValueZero}`}
            >
              0 % <span className={styles.trendPeriod}>{trendPeriod}</span>
            </span>
          ) : (
            <span
              className={`${styles.trendBadge} ${styles.trendValue} ${
                isUp ? styles.trendValuePositive : styles.trendValueNegative
              }`}
              title={`${isUp ? 'Зростання' : 'Падіння'} за 90 днів`}
            >
              {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(Math.round(trendValue * 10) / 10)} %{' '}
              <span className={styles.trendPeriod}>{trendPeriod}</span>
            </span>
          )}
        </div>
      </div>

      <button
        className={`${styles.buyButton} mt-[27px]`}
        onClick={handleBuyClick}
      >
        {item.chronoUrl && hasValidImage() ? item.buttonLabel : 'Get Quote'}
      </button>
    </div>
  );
};

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LineChart } from '@/components/Main/Hero/Chart/LineChart';
import styles from './ProductCard.module.css';
import { IWatch } from '@/interfaces';
import { BellIcon } from '../../../../public/social/Icon';
import { Heart } from 'lucide-react';
import { LocalizedLink } from '@/components/LocalizedLink';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';
import { useWishlistContext } from '@/context/WishlistContext';

const ArrowUp = () => (
  <svg
    width='16'
    height='14'
    viewBox='0 0 16 14'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='
      M8 1 V14
      M8 2 L13 7
      M8 1 L3 7
      '
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='butt'
      strokeLinejoin='miter'
    />
  </svg>
);

const ArrowDown = () => (
  <svg
    width='16'
    height='14'
    viewBox='0 0 16 14'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='
      M8 13 V1 
      M8 12 L13 7 
      M8 12 L3 7'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='butt'
      strokeLinejoin='miter'
    />
  </svg>
);

export type ProductCardProps = IWatch & {
  className?: string;
  cardStyle?: React.CSSProperties;
  height?: number | string;
  dense?: boolean;
  priority?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  changePercent,
  brand,
  price,
  chartData,
  chartId,
  slug,
  index,
  title,
  id,
  originalId,
  watchItem,
  className,
  cardStyle,
  height,
  dense = false,
  priority = false,
}) => {
  let variant: 'green' | 'orange' | 'red' | 'overall' = 'orange';
  let percentClass = styles.percentNeutral;
  let ArrowIcon: React.FC | null = null;

  const score =
    index || (changePercent > 0 ? 'A' : changePercent < 0 ? 'C' : 'B');

  let scoreClass = styles.scoreNeutral;
  if (score === 'A') {
    scoreClass = styles.scorePositive;
  } else if (score === 'C') {
    scoreClass = styles.scoreNegative;
  }

  if (changePercent > 0) {
    variant = 'green';
    percentClass = styles.percentPositive;
    ArrowIcon = ArrowUp;
  } else if (changePercent < 0) {
    variant = 'red';
    percentClass = styles.percentNegative;
    ArrowIcon = ArrowDown;
  }

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistContext();

  const watchId = originalId || id.toString();
  const isFavorite = isInWishlist(watchId);
  const [chartHeight, setChartHeight] = useState(70);
  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width >= 1024) setChartHeight(70);
      else if (width >= 834) setChartHeight(dense ? 60 : 70);
      else if (width >= 768) setChartHeight(dense ? 54 : 60);
      else setChartHeight(50);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [dense]);

  const getModelName = (): string => {
    if (!title) return '';

    let modelName = title.trim();
    const brandRegex = new RegExp(`^${brand}\\s+`, 'i');
    modelName = modelName.replace(brandRegex, '').trim();
    modelName = modelName.replace(brandRegex, '').trim();

    modelName = modelName.replace(/\b\d{6,}[A-Z0-9]*\b/g, '').trim();
    modelName = modelName.replace(/\b(19|20)\d{2}\b/g, '').trim();

    modelName = modelName
      .replace(/\bNEW\b/gi, '')
      .replace(/\bUNWORN\b/gi, '')
      .replace(/\bOyster\s+Bracelet\b/gi, '')
      .replace(/\b\[.*?\]\s*/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const words = modelName.split(/\s+/).filter((word) => word.length > 0);
    if (words.length > 3) {
      modelName = words.slice(0, 3).join(' ');
    } else {
      modelName = words.join(' ');
    }

    if (modelName.length > 35) {
      const truncated = modelName.substring(0, 35);
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > 20) {
        modelName = truncated.substring(0, lastSpace) + '...';
      } else {
        modelName = truncated + '...';
      }
    }

    return modelName || brand;
  };

  return (
    <LocalizedLink
      href={slug ? `/product/${slug}` : '/catalog'}
      prefetch={false}
      aria-label={t(a11yKeys.card.product, {
        brand,
        price,
        currency: '€',
        change: changePercent,
      })}
    >
      <article
        className={`${
          styles.productCard
        } flex flex-col rounded-2xl h-[15rem] md:h-[21rem] px-2 md:px-4 ${
          dense ? 'py-2' : 'py-3 md:py-3'
        } max-w-[30rem] justify-between ${className || ''}`}
        style={{
          ...(cardStyle || {}),
          ...(height !== undefined
            ? { height: typeof height === 'number' ? `${height}px` : height }
            : {}),
        }}
      >
        <div
          className={`relative ${
            dense ? 'mb-1' : 'mb-1 md:mb-4'
          } flex w-full justify-center items-center`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isFavorite) {
                removeFromWishlist(watchId);
              } else {
                if (watchItem) {
                  addToWishlist(watchItem);
                } else {
                  addToWishlist(watchId);
                }
              }
            }}
            className={`${styles.productCardScore} absolute top-0 left-0 z-10 flex items-center justify-center w-8 h-8`}
            aria-label={
              isFavorite
                ? t(a11yKeys.favorites.remove)
                : t(a11yKeys.favorites.add)
            }
            aria-pressed={isFavorite}
          >
            <Heart
              size={20}
              className={`cursor-pointer transition-colors duration-300 ${
                isFavorite ? 'text-[#04694f] fill-[#04694f]' : 'text-[#000000]'
              }`}
              aria-hidden='true'
            />
          </button>

          <div className='relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] mx-auto overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={brand}
              fill
              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              className={styles.productCardImage}
              priority={priority}
            />
          </div>

          <div
            className={`${styles.productCardScore} ${scoreClass} absolute top-0 right-0 flex items-center justify-center w-6 md:w-8 h-6 md:h-8 rounded-md font-bold`}
            aria-label={t(a11yKeys.rating.label, { rating: score })}
            role='status'
          >
            {score}
          </div>
        </div>

        <div
          className={` mb-0 md:mb-1 flex ${
            dense ? 'gap-1' : 'gap-2'
          } items-center justify-center`}
        >
          <div
            className={`flex flex-col ${dense ? 'gap-0' : 'gap-0 md:gap-2'}`}
          >
            <div
              className={`${styles.cardWatchName} text-center font-bold text-sm md:text-base leading-tight`}
            >
              <div className='text-base md:text-lg'>{brand}</div>
              <div className='text-xs md:text-sm font-semibold text-gray-700 mt-0.5'>
                {getModelName()}
              </div>
            </div>
            <LineChart
              data={chartData || []}
              variant={variant}
              id={chartId}
              height={chartHeight}
              aria-label={t(a11yKeys.chart.priceChange, {
                trend:
                  changePercent > 0
                    ? t(a11yKeys.chart.trendUp)
                    : changePercent < 0
                    ? t(a11yKeys.chart.trendDown)
                    : t(a11yKeys.chart.trendStable),
              })}
            />
          </div>
        </div>

        <div className='flex gap-2 items-center w-full'>
          <div className='relative text-center max-h-[54px] w-full flex flex-row justify-between items-center'>
            <div className={`${styles.Price}`}>{price} €</div>
            <div
              className={`${
                styles.marketCardHeadPercent
              } ${percentClass} absolute ${
                dense ? 'bottom-3 left-14' : 'bottom-3 left-16'
              } flex items-center justify-center gap-1 min-w-14  font-bold`}
            >
              {ArrowIcon && <ArrowIcon />}
              {Math.abs(Math.round(changePercent * 10) / 10)} %
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label={t(a11yKeys.notifications.priceAlert)}
              className='p-0 bg-transparent border-0 cursor-pointer'
            >
              <BellIcon
                className={`${styles.productCardBell} w-[13px] md:w-[21px] h-[16px] md:h-[22px]`}
                aria-hidden='true'
              />
            </button>
          </div>
        </div>
      </article>
    </LocalizedLink>
  );
};

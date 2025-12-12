'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LineChart } from '@/components/Main/Hero/Chart/LineChart';
import styles from './Market.module.css';
import { IWatch } from '@/interfaces';
import { LocalizedLink } from '@/components/LocalizedLink';
const ArrowUp = () => (
  <svg width='12' height='14' viewBox='0 0 12 14' fill='none'>
    <path
      d='M6 15 V1 M6 1 L2 5 M6 1 L10 5'
      stroke='currentColor'
      strokeWidth='1'
    />
  </svg>
);

const ArrowDown = () => (
  <svg width='12' height='14' viewBox='0 0 12 14' fill='none'>
    <path
      d='M6 1 V15 M6 15 L2 11 M6 15 L10 11'
      stroke='currentColor'
      strokeWidth='1'
    />
  </svg>
);

export const MarketCard: React.FC<IWatch & { priority?: boolean }> = ({
  title,
  image,
  changePercent,
  brand,
  chartData,
  chartId,
  slug,
  priority = false,
}) => {
  let percentColor = '#BA790F';
  let variant: 'green' | 'orange' | 'red' | 'overall' = 'green';
  let ArrowIcon: React.FC | null = null;

  if (changePercent > 0) {
    percentColor = '#05873B';
    variant = 'green';
    ArrowIcon = ArrowUp;
  } else if (changePercent === 0) {
    percentColor = '#BA790F';
    variant = 'orange';
  } else {
    percentColor = '#B91B1BF4';
    variant = 'red';
    ArrowIcon = ArrowDown;
  }

  const [chartHeight, setChartHeight] = useState(70);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setChartHeight(90);
      } else if (width >= 834) {
        setChartHeight(70);
      } else if (width >= 768) {
        setChartHeight(70);
      } else {
        setChartHeight(79);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <LocalizedLink
      href={slug ? `/product/${slug}` : '/catalog'}
      prefetch={false}
    >
      <div
        className={`${styles.marketCard} flex flex-col gap-4 md:gap-2 rounded-2xl h-[12.5rem] md:h-[10rem] lg:h-[13.5rem] px-[1.25rem] md:px-[0.6rem] lg:px-[1.25rem] py-[1rem] md:py-[0.6rem] lg:py-[1rem] max-w-[30rem]`}
      >
        <div
          className={`${styles.marketCardHead} flex w-full justify-between items-start`}
        >
          <div className={`${styles.marketCardHeadName}`}>{title}</div>
          <div
            className={`${styles.marketCardHeadPercent} flex items-center gap-1 font-bold`}
            style={{ color: percentColor }}
          >
            {ArrowIcon && <ArrowIcon />}
            {Math.round(changePercent * 10) / 10}%
          </div>
        </div>
        <div className={`${styles.marketCardBody} flex gap-2 items-center`}>
          <Image
            src={image || '/watch/watch-random/img_1.webp'}
            alt={brand}
            width={134}
            height={142}
            className={`${styles.cardImage}`}
            style={{ width: 'auto', height: 'auto' }}
            priority={priority}
            unoptimized={typeof image === 'string' && image.startsWith('http')}
          />
          <div className='flex flex-col gap-2 justify-between items-center h-full md:gap-2 lg:gap-3'>
            <div
              className={`${styles.cardWatchName} text-center max-h-[54px] md:max-h-[36px]  max-w-[164px] lg:max-w-[212px] overflow-hidden`}
            >
              {brand}
            </div>
            <LineChart
              data={chartData || []}
              variant={variant}
              id={chartId}
              height={chartHeight}
            />
          </div>
        </div>
      </div>
    </LocalizedLink>
  );
};

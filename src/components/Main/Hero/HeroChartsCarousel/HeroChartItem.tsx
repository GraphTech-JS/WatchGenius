'use client';
import React, { useState, useEffect } from 'react';
import styles from './HeroChartsCarousel.module.css';
import { LineChart } from '@/components/Main/Hero/Chart/LineChart';
import { LocalizedLink } from '@/components/LocalizedLink';

export interface HeroChartItemProps {
  id: string;
  label: string;
  data: number[];
  variant: 'green' | 'orange' | 'red' | 'overall';
  percent: string;
  period: string;
  isSpecial?: boolean;
}

export const HeroChartItem: React.FC<HeroChartItemProps> = ({
  id,
  label,
  data,
  variant,
  percent,
  period,
  isSpecial = false,
}) => {
  const [chartHeight, setChartHeight] = useState(46);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 1024) {
        setChartHeight(60);
      } else {
        setChartHeight(46);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const isClickable =
    !isSpecial && (label === 'A' || label === 'B' || label === 'C');
  const catalogHref = isClickable ? `/catalog?index=${label}` : undefined;

  const content = (
    <>
      {isSpecial ? (
        <div className='relative flex items-center justify-between w-[350px] lg:w-[210px] h-full rounded-[10px] px-2.5 pt-7.5 lg:pt-[40px] shrink-0'>
          <div
            className={`${styles.chartOverall} absolute top-[0px] lg:top-[4px] left-[8px] flex items-center justify-center rounded-md font-bold`}
          >
            {label}
          </div>
          <LineChart data={data} height={chartHeight} id={id} />
          <div className='absolute top-[8px] right-[10px] lg:top-[12px] flex flex-row lg:flex-col items-center lg:items-end text-right text-sm gap-2 lg:gap-0'>
            <span className={`${styles.chartPersent} font-bold text-black`}>
              {percent}
            </span>
            <span className='text-gray-500'>{period}</span>
          </div>
        </div>
      ) : (
        <div
          className={`relative flex flex-col items-center px-2.5 lg:px-2.5 pt-7.5 pb-1.5 lg:py-3 w-[350px] lg:w-[210px] h-full rounded-[10px] gap-0 md:gap-3 shrink-0 ${
            isClickable ? 'cursor-pointer' : ''
          }`}
        >
          <div className='absolute top-1.5 lg:top-0 px-2.5 lg:px-0 lg:relative flex w-full justify-between'>
            <div
              className={`${
                styles[`chart${variant[0].toUpperCase() + variant.slice(1)}`]
              } flex items-center justify-center w-10.5 lg:w-12 h-9.5 lg:h-11 rounded-md font-bold text-base lg:text-xl`}
            >
              {label}
            </div>
            <div className='flex flex-row lg:flex-col items-center lg:items-end text-right text-sm gap-2 lg:gap-0'>
              <span className={`${styles.chartPersent} font-bold text-black`}>
                {percent}
              </span>
              <span className='text-gray-500'>{period}</span>
            </div>
          </div>
          <LineChart
            data={data}
            variant={variant}
            height={chartHeight}
            id={id}
          />
        </div>
      )}
    </>
  );

  if (isClickable && catalogHref) {
    return (
      <LocalizedLink href={catalogHref} className='block w-full h-full'>
        {content}
      </LocalizedLink>
    );
  }

  return <>{content}</>;
};

'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './WatchCard.module.css';

export const WatchCardSkeleton: React.FC = () => {
  return (
    <div
      className={`${styles.watchCard} border border-[rgba(23,20,20,0.15)] bg-white`}
    >
      <div className='flex justify-between items-center'>
        <Skeleton height={27} width={34} borderRadius={5} />
        <Skeleton height={18} width={18} circle />
      </div>

      <div className='relative h-[111px] md:h-[124px] xl:h-[123px] w-[150px]'>
        <Skeleton
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: 0,
            bottom: 0,
          }}
        />
      </div>

      <Skeleton height={20} width='100%' className='mt-[8px] mb-[8px]' />

      <div className='flex flex-col items-center gap-[9px] sm:flex-row sm:justify-between'>
        <Skeleton height={20} width={80} />
        <Skeleton height={20} width={64} />
      </div>

      <Skeleton
        className={`${styles.buyButton} mt-[27px]`}
        height={31}
        borderRadius={10}
      />
    </div>
  );
};

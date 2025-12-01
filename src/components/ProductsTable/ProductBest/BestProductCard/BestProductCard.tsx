'use client';
import React from 'react';
import Image from 'next/image';
import styles from './BestProductCard.module.css';
import { IWatch } from '@/interfaces';
import { LocalizedLink } from '@/components/LocalizedLink';

export const BestProductCard: React.FC<IWatch & { currency?: string }> = ({
  image,
  changePercent,
  brand,
  price,
  slug,
  currency = '€',
}) => {
  return (
    <LocalizedLink
      href={slug ? `/product/${slug}` : '/catalog'}
      prefetch={false}
      className='w-full'
    >
      <div
        className={`${styles.productCard} flex flex-row gap-6 rounded-3xl h-[8.4rem] md:h-[10rem] px-3.5 md:px-6.5 py-3 md:py-4 w-full max-w-[23.75rem] md:max-w-[38.75rem] justify-start`}
      >
        <div className='flex flex-shrink-0 items-center'>
          <Image
            src={image}
            alt={brand}
            width={134}
            height={142}
            className='w-auto max-h-[98px] md:max-h-[120px] lg:max-h-[140px]'
          />
        </div>

        <div
          className={`${styles.cardBody} flex flex-col gap-2.5 justify-start flex-1`}
        >
          <div className={`${styles.cardBodyName}`}>{brand}</div>
          <div className={`${styles.cardBodyPrice} md:mb-2.5`}>
            {price} {currency}
          </div>
          <div className={`${styles.cardBodyPercent} flex items-center`}>
            <div
              className={`${styles.cardBodyPercentItem} px-2 py-1 rounded-xl`}
            >
              -{changePercent} % від ринку
            </div>
          </div>
        </div>
      </div>
    </LocalizedLink>
  );
};

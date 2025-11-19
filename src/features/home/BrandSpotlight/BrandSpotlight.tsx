'use client';
import React from 'react';
import styles from './BrandSpotlight.module.css';
import Image from 'next/image';
import { RolexBrand, RolexBrandDark } from '../../../../public/watch';
import { BrandCards } from '@/components/Main/BrandSpotlight/BrandCards/BrandCards';
import { mockTrending } from '@/mock/watch';
import { t } from '@/i18n';
import { brandSpotlightKeys } from '@/i18n/keys/home';

export const BrandSpotlight = () => {
  return (
    <section
      id='brand'
      className={`${styles.brand} flex justify-center`}
      suppressHydrationWarning
    >
      <div
        className={`${styles.brandWrap} max-w-[90rem] flex flex-col items-center px-5 md:px-10 lg:px-15 xl:px-25 py-9 md:py-6 lg:py-5.5`}
      >
        <div
          className={`${styles.brandTitle} flex justify-center w-full mb-6 lg:mb-0`}
        >
          Brand Spotlight
        </div>
        <div
          className={`${styles.brandContainer} flex flex-col lg:flex-row lg:gap-8 xl:gap-12.5 mb-6 lg:mb-0`}
        >
          <div
            className={`${styles.brandDescription} flex flex-col md:flex-row lg:flex-col items-center lg:justify-end gap-3 md:gap-6 md:px-4 lg:px-1 lg:gap-3 lg:max-w-[15.5rem]`}
          >
            <Image
              src={RolexBrand}
              alt='Rolex'
              width={155}
              height={86}
              className='w-[9.75rem] block lg:hidden '
            />
            <Image
              src={RolexBrandDark}
              alt='Rolex'
              width={155}
              height={86}
              className='w-[8.75rem] hidden lg:block'
            />
            <div
              className={`${styles.DescriptionBrand} flex flex-col items-center gap-3`}
            >
              <div
                className={`${styles.BrandName} text-center md:w-full md:text-start lg:text-center`}
              >
                Rolex
              </div>
              <div
                className={`${styles.BrandDescription} text-center md:text-start`}
              >
                {t(brandSpotlightKeys.description)}
              </div>
            </div>
            <button
              className={`${styles.brandViewAllBtn} hidden lg:block py-4 rounded-xl w-full max-w-[28.25rem] text-center`}
            >
              {t(brandSpotlightKeys.viewAll)}
            </button>
          </div>
          <div className={`${styles.brandCards} mt-8 w-full`}>
            <BrandCards items={mockTrending} />
          </div>
        </div>
        <button
          className={`${styles.brandViewAllBtn} px-10 py-4 rounded-xl w-full max-w-[28.25rem] lg:hidden`}
        >
          {t(brandSpotlightKeys.viewAll)}
        </button>
      </div>
    </section>
  );
};

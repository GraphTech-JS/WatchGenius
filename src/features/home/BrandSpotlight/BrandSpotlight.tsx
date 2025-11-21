'use client';
import React, { useEffect, useState } from 'react';
import styles from './BrandSpotlight.module.css';
import Image from 'next/image';
import { RolexBrand, RolexBrandDark } from '../../../../public/watch';
import { BrandCards } from '@/components/Main/BrandSpotlight/BrandCards/BrandCards';
import { mockTrending } from '@/mock/watch';
import { t } from '@/i18n';
import { brandSpotlightKeys } from '@/i18n/keys/home';
import { getPopularWatchesByBrand } from '@/lib/api';
import { transformApiWatchFull } from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import { IWatch } from '@/interfaces';

function convertWatchItemToIWatch(watch: WatchItem, index: number): IWatch {
  const imageUrl =
    typeof watch.image === 'string' ? watch.image : watch.image?.src || '';

  return {
    id: parseInt(watch.id.replace(/\D/g, '')) || index + 1,
    slug: watch.slug,
    title: watch.title,
    image: imageUrl,
    brand: watch.brand,
    price: watch.price,
    rating: Math.abs(watch.trend.value) % 11,
    changePercent: watch.trend.value,
    chartData: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    chartColor: watch.trend.value > 0 ? '#22c55e' : '#EED09D',
    chartId: `brand-chart-${watch.id}`,
  };
}

export const BrandSpotlight = () => {
  const [brandData, setBrandData] = useState<{
    brand: string;
    watches: IWatch[];
  }>({ brand: 'Rolex', watches: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrandWatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const currency = 'EUR';

        const data = await getPopularWatchesByBrand(currency);

        console.log('📊 [BrandSpotlight] API Response:', data);
        console.log('📊 [BrandSpotlight] Response length:', data.length);

        if (data.length === 0) {
          console.log('⚠️ [BrandSpotlight] Empty response, using mockTrending');
          setBrandData({ brand: 'Rolex', watches: mockTrending });
          return;
        }

        const firstBrand = data[0];

        const transformed = firstBrand.watches.map((watch) =>
          transformApiWatchFull(watch)
        );

        const iWatchItems = transformed.map((watch, index) =>
          convertWatchItemToIWatch(watch, index)
        );

        console.log('📊 [BrandSpotlight] First brand:', firstBrand.brand);
        console.log('📊 [BrandSpotlight] Transformed watches:', transformed);
        console.log('📊 [BrandSpotlight] IWatch items:', iWatchItems);

        setBrandData({
          brand: firstBrand.brand,
          watches: iWatchItems,
        });
      } catch (err) {
        console.error('❌ [BrandSpotlight] Failed to load brand watches:', err);
        setError(err instanceof Error ? err.message : 'Failed to load watches');
        console.log('⚠️ [BrandSpotlight] Using mockTrending as fallback');
        setBrandData({ brand: 'Rolex', watches: mockTrending });
      } finally {
        setLoading(false);
      }
    };

    loadBrandWatches();
  }, []);

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
              alt={brandData.brand}
              width={155}
              height={86}
              className='w-[9.75rem] block lg:hidden '
            />
            <Image
              src={RolexBrandDark}
              alt={brandData.brand}
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
                {brandData.brand}
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
            {loading ? (
              <div className='flex justify-center items-center py-12'>
                <div className='text-gray-500'>Loading...</div>
              </div>
            ) : error && brandData.watches.length === 0 ? (
              <div className='flex justify-center items-center py-12'>
                <div className='text-red-500'>Error: {error}</div>
              </div>
            ) : (
              <BrandCards items={brandData.watches} />
            )}
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

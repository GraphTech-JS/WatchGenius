'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Trending.module.css';
import { ThemedText } from '@/components/ThemedText/ThemedText';
import { getPopularWatches } from '@/lib/api';
import { transformApiPopularWatchItem } from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import { ProductCarousel } from '@/components/ProductsTable/ProductCarousel/ProductCarousel';
import { SettingsIcon } from '../../../../public/social/Icon';
import { t } from '@/i18n';
import { trendingKeys } from '@/i18n/keys/home';
import { IWatch } from '@/interfaces';
import { mockTrending } from '@/mock/watch';

function getCurrencyFromStorage(): string {
  if (typeof window === 'undefined') return 'EUR';

  const stored = localStorage.getItem('selectedCurrency');
  if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
    return stored;
  }

  return 'EUR';
}

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
    chartId: `trending-chart-${watch.id}`,
  };
}

export const Trending = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularWatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const currency = getCurrencyFromStorage();
        const data = await getPopularWatches(currency);

        const transformed = data.map((item) =>
          transformApiPopularWatchItem(item.watch)
        );

        const iWatchItems = transformed.map((watch, index) =>
          convertWatchItemToIWatch(watch, index)
        );

        setWatches(iWatchItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load watches');
        setWatches(mockTrending);
      } finally {
        setLoading(false);
      }
    };

    loadPopularWatches();

    const handleStorageChange = () => {
      loadPopularWatches();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('currencyChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('currencyChanged', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  return (
    <section
      id='treands'
      className={`${styles.trending} max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6.25rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
      suppressHydrationWarning
    >
      <div className={styles.trendingContainer}>
        <div
          className={`${styles.trendingTitle} relative flex mb-6 lg:mb-[30xp] justify-between items-center`}
        >
          <ThemedText type='h2'>Trending now</ThemedText>
          <div ref={menuRef} className='relative'>
            <SettingsIcon
              onClick={toggleMenu}
              className='mr-2 w-[24px] h-[24px] cursor-pointer'
            />

            <div
              className={`${
                styles.trendingSettings
              } absolute right-[-10px] top-[-8px] z-10 min-w-[12.5rem] flex flex-col text-center rounded-xl border-1 transition-all duration-300 ${
                open
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div
                className={`${styles.trendingSettingsItem} py-2 px-5 flex items-center justify-end gap-6 border-b cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>{t(trendingKeys.sort.trend)}</span>
                <SettingsIcon className='w-[24px] h-[24px] cursor-pointer' />
              </div>
              <div
                className={`${styles.trendingSettingsItem} py-2 border-b cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>{t(trendingKeys.sort.price)}</span>
              </div>
              <div
                className={`${styles.trendingSettingsItem} py-2 cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>{t(trendingKeys.sort.rating)}</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='text-gray-500'>Loading...</div>
          </div>
        ) : error && watches.length === 0 ? (
          <div className='flex justify-center items-center py-12'>
            <div className='text-red-500'>Error: {error}</div>
          </div>
        ) : (
          <ProductCarousel
            items={watches}
            ctaLabel={t(trendingKeys.carousel.cta)}
          />
        )}
      </div>
    </section>
  );
};

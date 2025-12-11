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
import { ClockLoader } from 'react-spinners';

function getCurrencyFromStorage(): string {
  if (typeof window === 'undefined') return 'EUR';
  const stored = localStorage.getItem('selectedCurrency');
  const validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
  return stored && validCurrencies.includes(stored) ? stored : 'EUR';
}

const BRANDSPOTLIGHT_CACHE_PREFIX = 'brandspotlight-cache-';
const CACHE_TTL = 5 * 60 * 1000;

function getBrandSpotlightCacheKey(currency: string): string {
  return `${BRANDSPOTLIGHT_CACHE_PREFIX}${currency}`;
}

function getCachedBrandSpotlight(
  currency: string
): { brands: Array<{ brand: string; watches: IWatch[] }> } | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getBrandSpotlightCacheKey(currency);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedBrandSpotlight(
  currency: string,
  brandData: { brands: Array<{ brand: string; watches: IWatch[] }> }
): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getBrandSpotlightCacheKey(currency);
    const cacheData = {
      data: brandData,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Ignore
  }
}

function convertWatchItemToIWatch(watch: WatchItem, index: number): IWatch {
  const imageUrl =
    typeof watch.image === 'string' ? watch.image : watch.image?.src || '';

  return {
    id: parseInt(watch.id.replace(/\D/g, '')) || index + 1,
    originalId: watch.id,
    watchItem: watch,
    slug: watch.slug,
    title: watch.title,
    image: imageUrl,
    brand: watch.brand,
    price: watch.price,
    rating: Math.abs(watch.trend.value) % 11,
    changePercent: watch.trend.value,
    chartData:
      watch.priceHistory && watch.priceHistory.length >= 1
        ? (() => {
            const sorted = [...watch.priceHistory].sort(
              (a, b) =>
                new Date(a.recordedAt).getTime() -
                new Date(b.recordedAt).getTime()
            );
            const prices = sorted.map((record) => record.price);
            if (prices.length === 1) {
              return [
                prices[0],
                prices[0],
                prices[0],
                prices[0],
                prices[0],
                prices[0],
                prices[0],
              ];
            }
            return prices.length >= 2
              ? prices
              : [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7];
          })()
        : [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    chartColor: watch.trend.value > 0 ? '#22c55e' : '#EED09D',
    chartId: `brand-chart-${watch.id}`,
    index: watch.index,
  };
}

export const BrandSpotlight = () => {
  const [brandData, setBrandData] = useState<{
    brands: Array<{ brand: string; watches: IWatch[] }>;
  }>({ brands: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrandWatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const currency = getCurrencyFromStorage();

        const cachedData = getCachedBrandSpotlight(currency);
        if (cachedData) {
          setBrandData(cachedData);
          setLoading(false);
        }

        const data = await getPopularWatchesByBrand(currency);

        if (data.length === 0) {
          setBrandData({ brands: [{ brand: 'Rolex', watches: mockTrending }] });
          return;
        }

        const topBrands = data.slice(0, 3);

        const brandsData = topBrands.map((brandItem) => {
          const transformed = brandItem.watches.map((watch) =>
            transformApiWatchFull(watch, currency)
          );

          const iWatchItems = transformed.map((watch, index) =>
            convertWatchItemToIWatch(watch, index)
          );

          return {
            brand: brandItem.brand,
            watches: iWatchItems,
          };
        });

        const brandData = {
          brands: brandsData,
        };

        setBrandData(brandData);
        setCachedBrandSpotlight(currency, brandData);
      } catch {
        setError(t(brandSpotlightKeys.error));
        setBrandData({ brands: [{ brand: 'Rolex', watches: mockTrending }] });
      } finally {
        setLoading(false);
      }
    };

    loadBrandWatches();

    const handleCurrencyChange = () => {
      loadBrandWatches();
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
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
              alt={brandData.brands[0]?.brand || 'Brand'}
              width={155}
              height={86}
              className='w-[9.75rem] block lg:hidden '
            />
            <Image
              src={RolexBrandDark}
              alt={brandData.brands[0]?.brand || 'Brand'}
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
                {brandData.brands[0]?.brand || 'Brand'}
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
                <ClockLoader
                  size={60}
                  color={'#04694f'}
                  speedMultiplier={0.9}
                />
              </div>
            ) : error &&
              (brandData.brands.length === 0 ||
                brandData.brands[0]?.watches.length === 0) ? (
              <div className='flex justify-center items-center py-12'>
                <div className='text-red-500 text-center px-4'>{error}</div>
              </div>
            ) : (
              <BrandCards
                items={brandData.brands.flatMap(
                  (brandItem) => brandItem.watches
                )}
              />
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

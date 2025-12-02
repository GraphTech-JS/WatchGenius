'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Market.module.css';
import { ThemedText } from '@/components/ThemedText/ThemedText';
import { MarketCard } from '@/components/Main/Market/MarketCard/MarketCard';
import { MarketTotal } from '@/components/Main/Market/MarketCard/MarketTotal';
import { getTrendingWatch90d, getStableWatch } from '@/lib/api';
import { ClockLoader } from 'react-spinners';

import { transformApiWatchFull } from '@/lib/transformers';
import type { WatchItem } from '@/interfaces/watch';
import { IWatch } from '@/interfaces';
import { t } from '@/i18n';
import { marketKeys } from '@/i18n/keys/home';

function getCurrencyFromStorage(): string {
  if (typeof window === 'undefined') return 'EUR';
  const stored = localStorage.getItem('selectedCurrency');
  if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
    return stored;
  }
  return 'EUR';
}

const MARKET_CACHE_PREFIX = 'market-cache-';
const CACHE_TTL = 5 * 60 * 1000;

function getMarketCacheKey(currency: string): string {
  return `${MARKET_CACHE_PREFIX}${currency}`;
}

function getCachedMarket(currency: string): WatchItem | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getMarketCacheKey(currency);
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

function setCachedMarket(currency: string, watch: WatchItem): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getMarketCacheKey(currency);
    const cacheData = {
      data: watch,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Ignore
  }
}

const MARKET_STABLE_CACHE_PREFIX = 'market-stable-cache-';

function getCachedStable(currency: string): WatchItem | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = `${MARKET_STABLE_CACHE_PREFIX}${currency}`;
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

function setCachedStable(currency: string, watch: WatchItem): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = `${MARKET_STABLE_CACHE_PREFIX}${currency}`;
    const cacheData = {
      data: watch,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Ignore
  }
}

function convertWatchToMarketCard(
  watch: WatchItem | null,
  title: string,
  chartId: string
): IWatch | null {
  if (!watch) return null;

  const imageUrl =
    typeof watch.image === 'string' ? watch.image : watch.image?.src || '';

  const changePercent = watch.trend?.value
    ? Math.round(watch.trend.value * 10) / 10
    : 0;

  const chartData =
    watch.priceHistory && watch.priceHistory.length >= 2
      ? [...watch.priceHistory]
          .sort(
            (a, b) =>
              new Date(a.recordedAt).getTime() -
              new Date(b.recordedAt).getTime()
          )
          .map((record) => record.price)
      : [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7];

  return {
    id: parseInt(watch.id.replace(/\D/g, '')) || 1,
    slug: watch.slug,
    title: title,
    image: imageUrl,
    brand: watch.title || watch.brand,
    price: watch.price,
    rating: Math.abs(changePercent) % 11,
    changePercent: changePercent,
    chartData: chartData,
    chartColor: changePercent > 0 ? '#22c55e' : '#EED09D',
    chartId: chartId,
    index: watch.index,
  };
}

export const Market = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const [topGainer90d, setTopGainer90d] = useState<WatchItem | null>(null);
  const [stable90d, setStable90d] = useState<WatchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currency = getCurrencyFromStorage();

        const cachedTop = getCachedMarket(currency);
        const cachedStable = getCachedStable(currency);
        if (cachedTop) setTopGainer90d(cachedTop);
        if (cachedStable) setStable90d(cachedStable);

        if (cachedTop || cachedStable) {
          setLoading(false);
        }

        const [trending90d, stable] = await Promise.all([
          getTrendingWatch90d(currency),
          getStableWatch(currency),
        ]);

        if (trending90d) {
          const transformed = transformApiWatchFull(trending90d, currency);
          setTopGainer90d(transformed);
          setCachedMarket(currency, transformed);
        }

        if (stable) {
          const transformed = transformApiWatchFull(stable, currency);
          setStable90d(transformed);
          setCachedStable(currency, transformed);
        }
      } catch {
        setError(t(marketKeys.error));
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();

    const handleStorageChange = () => {
      loadMarketData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('currencyChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('currencyChanged', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const desktopCards = [
    ...(topGainer90d
      ? (() => {
          const marketCard = convertWatchToMarketCard(
            topGainer90d,
            'Top Gainers 90d',
            'market-gainer-90d-desktop'
          );
          return marketCard
            ? [
                {
                  type: 'card' as const,
                  content: (
                    <MarketCard
                      key='desktop-gainer-90d'
                      {...marketCard}
                      priority={true}
                    />
                  ),
                },
              ]
            : [];
        })()
      : []),

    ...(stable90d
      ? (() => {
          const marketCard = convertWatchToMarketCard(
            stable90d,
            'Stable Picks 90d',
            'market-stable-90d-desktop'
          );
          return marketCard
            ? [
                {
                  type: 'card' as const,
                  content: (
                    <MarketCard key='desktop-stable-90d' {...marketCard} />
                  ),
                },
              ]
            : [];
        })()
      : []),

    {
      type: 'total' as const,
      content: (
        <MarketTotal
          key='desktop-total'
          title='Liquidity Leaders'
          deals={120}
          amount={12545000}
          chartData={[7, 6, 7, 6, 7.5, 7, 8]}
          chartId='market-total-desktop'
        />
      ),
    },
  ];

  const mobileCards = [
    ...(topGainer90d
      ? (() => {
          const marketCard = convertWatchToMarketCard(
            topGainer90d,
            'Top Gainers 90d',
            'market-gainer-90d-mobile'
          );
          return marketCard
            ? [
                {
                  type: 'card' as const,
                  content: (
                    <MarketCard key='mobile-gainer-90d' {...marketCard} />
                  ),
                },
              ]
            : [];
        })()
      : []),
    ...(stable90d
      ? (() => {
          const marketCard = convertWatchToMarketCard(
            stable90d,
            'Stable Picks 90d',
            'market-stable-90d-mobile'
          );
          return marketCard
            ? [
                {
                  type: 'card' as const,
                  content: (
                    <MarketCard key='mobile-stable-90d' {...marketCard} />
                  ),
                },
              ]
            : [];
        })()
      : []),
    {
      type: 'total' as const,
      content: (
        <MarketTotal
          key='mobile-total'
          title='Liquidity Leaders'
          deals={120}
          amount={12545000}
          chartData={[7, 6, 7, 6, 7.5, 7, 8]}
          chartId='market-total-mobile'
        />
      ),
    },
  ];

  const scrollToIndex = (idx: number) => {
    const el = swipeRef.current;
    if (!el) return;
    const viewport = el.clientWidth;
    el.scrollTo({ left: idx * viewport, behavior: 'smooth' });
  };
  useEffect(() => {
    if (isDesktop) return;
    const el = swipeRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;
    const onDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      pointerId = e.pointerId;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      if (pointerId !== null) {
        try {
          (e.target as Element).releasePointerCapture?.(pointerId);
        } catch {}
        pointerId = null;
      }
      const viewport = el.clientWidth;
      const idx = Math.round(el.scrollLeft / viewport);
      setActiveIndex(idx);
      scrollToIndex(idx);
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [isDesktop]);
  useEffect(() => {
    if (isDesktop) return;
    const el = swipeRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewport = el.clientWidth;
        const idx = Math.round(el.scrollLeft / viewport);
        if (idx !== activeIndex) setActiveIndex(idx);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop, activeIndex]);

  return (
    <section
      id='market'
      className={`${styles.market} max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6.25rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
    >
      <div className={`${styles.marketContainer}`}>
        <div className={`${styles.marketTitle} mb-6`}>
          <ThemedText type='h2'>Market overview</ThemedText>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        ) : error ? (
          <div className='flex justify-center items-center py-12'>
            <div className='text-red-500 text-center px-4'>{error}</div>
          </div>
        ) : (
          <>
            <div
              className={`${styles.marketContent} hidden md:grid md:grid-cols-3 gap-6`}
            >
              {desktopCards.map((card) => card.content)}
            </div>

            <div className='md:hidden'>
              <div
                ref={swipeRef}
                className={`${styles.marketContent} flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth ${styles.swipe} ${styles.noScrollbar}`}
              >
                {mobileCards.map((card, idx) => (
                  <div
                    key={`mob-${idx}`}
                    className='flex justify-center snap-start shrink-0'
                    style={{ flex: '0 0 100%', maxWidth: '100%' }}
                  >
                    {card.content}
                  </div>
                ))}
              </div>

              <div className='flex gap-2 justify-center mt-4'>
                {mobileCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === idx
                        ? 'bg-[#04694F] scale-110'
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Показати товар ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

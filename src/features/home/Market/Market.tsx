'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Market.module.css';
import { ThemedText } from '@/components/ThemedText/ThemedText';
import { mockCards } from '@/mock/watch';
import { MarketCard } from '@/components/Main/Market/MarketCard/MarketCard';
import { MarketTotal } from '@/components/Main/Market/MarketCard/MarketTotal';

export const Market = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const swipeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const desktopCards = [
    ...mockCards.map((card, idx) => ({
      type: 'card' as const,
      content: (
        <MarketCard
          key={`desktop-card-${idx}`}
          {...{
            ...card,
            chartId: `${card.chartId}-desktop`,
            priority: idx === 0,
          }}
        />
      ),
    })),
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
    ...mockCards.map((card, idx) => ({
      type: 'card' as const,
      content: (
        <MarketCard
          key={`mobile-card-${idx}`}
          {...{
            ...card,
            chartId: `${card.chartId}-mobile`,
            priority: idx === 0,
          }}
        />
      ),
    })),
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
                  activeIndex === idx ? 'bg-[#04694F] scale-110' : 'bg-gray-300'
                }`}
                aria-label={`Показати товар ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

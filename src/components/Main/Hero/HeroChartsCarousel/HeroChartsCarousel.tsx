'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './HeroChartsCarousel.module.css';
import { HeroChartItem } from './HeroChartItem';
import { HeroChartItemProps } from './HeroChartItem';

const charts: HeroChartItemProps[] = [
  {
    id: 'hero-chart1',
    label: 'A',
    data: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    variant: 'green',
    percent: '+7%',
    period: 'за 90 днів',
  },
  {
    id: 'hero-chart2',
    label: 'B',
    data: [7, 6, 7, 6, 7.5, 7, 8],
    variant: 'orange',
    percent: '+0%',
    period: 'за 90 днів',
  },
  {
    id: 'hero-chart3',
    label: 'C',
    data: [5, 6, 7, 6, 7.5, 7, 8],
    variant: 'red',
    percent: '-7%',
    period: 'за 90 днів',
  },
  {
    id: 'hero-chart4',
    label: 'Overall',
    data: [5, 6, 7, 6, 7.5, 7, 8],
    variant: 'overall',
    percent: '+1,2%',
    period: 'за 90 днів',
    isSpecial: true,
  },
];

export const HeroChartsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const checkSize = () => {
      const w = window.innerWidth;
      setIsDesktop(w >= 1024);
      setIsTablet(w >= 768 && w < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    if (isDesktop || isTablet) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === charts.length - 1 ? 0 : prev + 1));
    }, 40000);
    return () => clearInterval(interval);
  }, [isDesktop, isTablet]);

  // Mobile drag + snap + sync
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

      // mobile snap
      if (!isTablet) {
        const vw = el.clientWidth;
        const idx = Math.round(el.scrollLeft / vw);
        setActiveIndex(idx);
        el.scrollTo({ left: idx * vw, behavior: 'smooth' });
      }
    };

    const onScroll = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          if (isTablet) {
            const chartWidth = 350 + 16;
            const scroll = el.scrollLeft;
            const maxScroll = el.scrollWidth - el.clientWidth;
            const zone1End = chartWidth * 0.7;
            const zone2End = maxScroll - chartWidth * 0.7;

            if (scroll < zone1End) {
              setActiveIndex(0);
            } else if (scroll < zone2End) {
              setActiveIndex(1);
            } else {
              setActiveIndex(2);
            }
          } else {
            const vw = el.clientWidth;
            const idx = Math.round(el.scrollLeft / vw);
            if (idx !== activeIndex) setActiveIndex(idx);
          }
        });
      }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop, isTablet, activeIndex]);

  const scrollToChart = (index: number) => {
    setActiveIndex(index);

    if (isDesktop && containerRef.current) {
      const chartWidth = 350 + 16;
      containerRef.current.scrollTo({
        left: index * chartWidth,
        behavior: 'smooth',
      });
    } else if (isTablet && swipeRef.current) {
      const el = swipeRef.current;
      const chartWidth = 350 + 16;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const target = Math.min(index * chartWidth, maxScroll);
      el.scrollTo({ left: target, behavior: 'smooth' });
    } else if (!isDesktop && swipeRef.current) {
      const el = swipeRef.current;
      const viewport = el.clientWidth;
      el.scrollTo({ left: index * viewport, behavior: 'smooth' });
    }
  };

  const tabletDots = [0, 1, 2];

  return (
    <>
      {/* DESKTOP версія - показується тільки на lg */}
      <div
        className={`${styles.heroChartsCarousel} hidden lg:flex lg:w-fit flex-col`}
      >
        <div
          ref={containerRef}
          className={`${styles.heroChartContainer} flex gap-4 h-[160px] rounded-[15px] p-[15px] overflow-hidden`}
        >
          {charts.map((chart) => (
            <div
              key={`desktop-${chart.id}`}
              className={`${styles.heroChartItem} flex rounded-[10px]`}
            >
              <HeroChartItem {...{ ...chart, id: `${chart.id}-desktop` }} />
            </div>
          ))}
        </div>
      </div>

      {/* TABLET версія - показується тільки на md до lg */}
      <div
        className={`${styles.heroChartsCarousel} hidden md:flex lg:hidden w-full flex-col`}
      >
        <div
          ref={containerRef}
          className={`${styles.heroChartContainer} flex gap-4 h-[108px] rounded-l-[15px] overflow-hidden`}
        >
          <div
            ref={swipeRef}
            className={`flex gap-4 overflow-x-auto ${styles.swipe} ${styles.noScrollbar}`}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {charts.map((chart) => (
              <div
                key={`tablet-${chart.id}`}
                className='snap-start shrink-0'
                style={{ flex: '0 0 auto', width: '350px' }}
              >
                <div className={`${styles.heroChartItem} flex rounded-[10px]`}>
                  <HeroChartItem {...{ ...chart, id: `${chart.id}-tablet` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex gap-2 justify-center mt-3'>
          {tabletDots.map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => scrollToChart(dotIndex)}
              className={`${styles.dot} ${
                activeIndex === dotIndex ? styles.activeDot : styles.inactiveDot
              }`}
              aria-label={`Переглянути графік ${dotIndex + 1}`}
              aria-current={activeIndex === dotIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* MOBILE версія - показується тільки до md */}
      <div
        className={`${styles.heroChartsCarousel} flex md:hidden w-full flex-col items-center`}
      >
        <div
          className={`${styles.heroChartContainer} w-full h-[108px] max-w-[362px] rounded-[15px] `}
        >
          <div
            ref={swipeRef}
            className={`flex gap-4 overflow-x-auto snap-x snap-mandatory ${styles.swipe} ${styles.noScrollbar}`}
            style={{ width: '100%' }}
          >
            {charts.map((chart) => (
              <div
                key={`mobile-${chart.id}`}
                className='flex justify-center snap-start shrink-0'
                style={{ flex: '0 0 100%', maxWidth: '100%' }}
              >
                <div
                  className={`${styles.heroChartItem} flex rounded-[10px] h-full w-full`}
                >
                  <HeroChartItem {...{ ...chart, id: `${chart.id}-mobile` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.dotsWrapper}  flex justify-center gap-2`}>
          {charts.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToChart(index)}
              className={`${styles.dot} ${
                activeIndex === index ? styles.activeDot : styles.inactiveDot
              }`}
              aria-label={`Переглянути графік ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </>
  );
};

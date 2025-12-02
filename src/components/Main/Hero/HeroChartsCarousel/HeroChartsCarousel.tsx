'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './HeroChartsCarousel.module.css';
import { HeroChartItem } from './HeroChartItem';
import { HeroChartItemProps } from './HeroChartItem';
import { ApiSegmentTrendResponse } from '@/interfaces/api';
import { getSegmentsTrend } from '@/lib/api';

function formatPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const formatted = rounded.toString().replace('.', ',');
  const sign = rounded >= 0 ? '+' : '';
  return `${sign}${formatted}%`;
}

function transformTrendDataToCharts(
  data: ApiSegmentTrendResponse
): HeroChartItemProps[] {
  const historyDataA =
    data.history && data.history.length >= 2
      ? data.history.map((record) => record.A)
      : [];
  const historyDataB =
    data.history && data.history.length >= 2
      ? data.history.map((record) => record.B)
      : [];
  const historyDataC =
    data.history && data.history.length >= 2
      ? data.history.map((record) => record.C)
      : [];
  const historyDataOverall =
    data.history && data.history.length >= 2
      ? data.history.map((record) => record.overall)
      : [];

  return [
    {
      id: 'hero-chart1',
      label: 'A',
      data: historyDataA,
      variant: 'green',
      percent: formatPercent(data.segments.A.trend90avg),
      period: 'за 90 днів',
    },
    {
      id: 'hero-chart2',
      label: 'B',
      data: historyDataB,
      variant: 'orange',
      percent: formatPercent(data.segments.B.trend90avg),
      period: 'за 90 днів',
    },
    {
      id: 'hero-chart3',
      label: 'C',
      data: historyDataC,
      variant: 'red',
      percent: formatPercent(data.segments.C.trend90avg),
      period: 'за 90 днів',
    },
    {
      id: 'hero-chart4',
      label: 'Overall',
      data: historyDataOverall,
      variant: 'overall',
      percent: formatPercent(data.totalTrend),
      period: 'за 90 днів',
      isSpecial: true,
    },
  ];
}

const SEGMENTS_TREND_CACHE_KEY = 'segments-trend-cache';
const CACHE_TTL = 5 * 60 * 1000;

function getCachedSegmentsTrend(): ApiSegmentTrendResponse | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(SEGMENTS_TREND_CACHE_KEY);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_TTL) {
      localStorage.removeItem(SEGMENTS_TREND_CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedSegmentsTrend(data: ApiSegmentTrendResponse): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(SEGMENTS_TREND_CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // Ignore
  }
}

export const HeroChartsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const [charts, setCharts] = useState<HeroChartItemProps[]>([]);

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
    const loadTrendData = async () => {
      const cached = getCachedSegmentsTrend();
      if (cached) {
        const transformed = transformTrendDataToCharts(cached);
        setCharts(transformed);
        return;
      }

      try {
        const data = await getSegmentsTrend();
        setCachedSegmentsTrend(data);
        const transformed = transformTrendDataToCharts(data);
        if (transformed.some((chart) => chart.data.length >= 2)) {
          setCharts(transformed);
        } else {
          console.warn(
            'Not enough data points for charts, showing empty charts'
          );
          setCharts(transformed);
        }
      } catch (error) {
        console.error('Failed to load segments trend:', error);
      }
    };

    loadTrendData();
  }, []);

  useEffect(() => {
    if (isDesktop || isTablet) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === charts.length - 1 ? 0 : prev + 1));
    }, 40000);
    return () => clearInterval(interval);
  }, [isDesktop, isTablet, charts.length]);

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

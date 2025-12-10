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
  const tabletSwipeRef = useRef<HTMLDivElement | null>(null);
  const mobileSwipeRef = useRef<HTMLDivElement | null>(null);
  const tabletSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);
  const isScrollingProgrammatically = useRef(false);
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
    if (charts.length === 0) return;

    tabletSlideRefs.current = new Array(charts.length).fill(null);

    let timeoutId: NodeJS.Timeout | null = null;

    const setupHandlers = (): (() => void) | void => {
      const el = isTablet ? tabletSwipeRef.current : mobileSwipeRef.current;
      if (!el) {
        if (isTablet) {
          timeoutId = setTimeout(setupHandlers, 100);
        }
        return;
      }

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

      const updateActiveIndex = () => {
        if (isScrollingProgrammatically.current) return;

        if (isTablet) {
          let mostVisibleIndex = 0;
          let maxVisibleArea = 0;

          tabletSlideRefs.current.forEach((slide, index) => {
            if (!slide || !el) return;

            const slideRect = slide.getBoundingClientRect();
            const containerRect = el.getBoundingClientRect();

            const left = Math.max(slideRect.left, containerRect.left);
            const right = Math.min(slideRect.right, containerRect.right);
            const visibleWidth = Math.max(0, right - left);

            if (visibleWidth > maxVisibleArea) {
              maxVisibleArea = visibleWidth;
              mostVisibleIndex = index;
            }
          });

          const dotIndex = Math.min(mostVisibleIndex, 2);
          setActiveIndex(dotIndex);
        } else {
          const vw = el.clientWidth;
          const idx = Math.round(el.scrollLeft / vw);
          setActiveIndex(idx);
        }
      };

      const onScroll = () => {
        if (!rafId.current) {
          rafId.current = requestAnimationFrame(() => {
            rafId.current = null;
            updateActiveIndex();
          });
        }
      };

      const onScrollEnd = () => {
        updateActiveIndex();
      };

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
      el.addEventListener('scroll', onScroll, { passive: true });
      el.addEventListener('scrollend', onScrollEnd, { passive: true });

      return () => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
        el.removeEventListener('scroll', onScroll);
        el.removeEventListener('scrollend', onScrollEnd);
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    };

    const cleanup = setupHandlers();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, [isDesktop, isTablet, charts.length]);

  const scrollToChart = (index: number) => {
    if (isDesktop && containerRef.current) {
      const chartWidth = 350 + 16;
      isScrollingProgrammatically.current = true;
      setActiveIndex(index);
      containerRef.current.scrollTo({
        left: index * chartWidth,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    } else if (isTablet && tabletSwipeRef.current) {
      const el = tabletSwipeRef.current;
      if (!el) return;
      const chartWidth = 350 + 16;

      const targetSlideIndex = index === 2 ? 3 : index;

      isScrollingProgrammatically.current = true;
      setActiveIndex(index);

      el.scrollTo({
        left: targetSlideIndex * chartWidth,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 600);
    } else if (!isDesktop && !isTablet && mobileSwipeRef.current) {
      const el = mobileSwipeRef.current;
      const viewport = el.clientWidth;
      isScrollingProgrammatically.current = true;
      setActiveIndex(index);
      el.scrollTo({ left: index * viewport, behavior: 'smooth' });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const tabletDots = [0, 1, 2];

  return (
    <>
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

      <div
        className={`${styles.heroChartsCarousel} hidden md:flex lg:hidden w-full flex-col`}
      >
        <div
          ref={containerRef}
          className={`${styles.heroChartContainer} flex gap-4 h-[108px] rounded-l-[15px] overflow-hidden`}
        >
          <div
            ref={tabletSwipeRef}
            className={`flex gap-4 overflow-x-auto ${styles.swipe} ${styles.noScrollbar}`}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {charts.map((chart, idx) => (
              <div
                key={`tablet-${chart.id}`}
                ref={(el) => {
                  if (tabletSlideRefs.current) {
                    tabletSlideRefs.current[idx] = el;
                  }
                }}
                className='snap-start shrink-0'
                style={{ flex: '0 0 auto', width: '350px', minWidth: '350px' }}
              >
                <div className={`${styles.heroChartItem} flex rounded-[10px]`}>
                  <HeroChartItem {...{ ...chart, id: `${chart.id}-tablet` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className='flex gap-2 justify-center mt-3'
          style={{ width: '100%', minWidth: 'fit-content' }}
        >
          {tabletDots.map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => scrollToChart(dotIndex)}
              className={`${styles.dot} ${
                activeIndex === dotIndex ? styles.activeDot : styles.inactiveDot
              }`}
              aria-label={`Переглянути графік ${dotIndex + 1}`}
              aria-current={activeIndex === dotIndex ? 'true' : 'false'}
              style={{ flexShrink: 0 }}
            />
          ))}
        </div>
      </div>

      <div
        className={`${styles.heroChartsCarousel} flex md:hidden w-full flex-col items-center`}
      >
        <div
          className={`${styles.heroChartContainer} w-full h-[108px] max-w-[362px] rounded-[15px] `}
        >
          <div
            ref={mobileSwipeRef}
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

'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Dealers.module.css';
import { ArrowIcon } from '../../../../public/social/Icon';
import { DealerCard } from '@/components/Main/Dealers/DealerCard';
import { mockDealers } from '@/mock/dealers';

export const Dealers = () => {
  const [cols, setCols] = useState<1 | 2>(1);
  const [page, setPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  // Only need the setter; value is not read
  const [, setDirection] = useState<'next' | 'prev' | null>(null);
  const swipeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setCols(1);
        setIsDesktop(true);
      } else if (w >= 768) {
        setCols(2);
        setIsDesktop(false);
      } else {
        setCols(1);
        setIsDesktop(false);
      }
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(mockDealers.length / cols));

  const scrollToPage = (idx: number) => {
    const el = swipeRef.current;
    if (!el) return;
    const viewport = el.clientWidth;
    el.scrollTo({ left: idx * viewport, behavior: 'smooth' });
  };

  const next = () => {
    if (page < totalPages - 1) {
      setDirection('next');
      scrollToPage(page + 1);
    }
  };
  const prev = () => {
    if (page > 0) {
      setDirection('prev');
      scrollToPage(page - 1);
    }
  };

  // Enable mouse drag / touch swipe to change page with smooth dragging
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    let startX = 0;
    let isDown = false;
    let pointerId: number | null = null;
    let startScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      pointerId = e.pointerId;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      if (pointerId !== null) {
        try {
          (e.target as Element).releasePointerCapture?.(pointerId);
        } catch {}
        pointerId = null;
      }
      // snap to nearest page
      const viewport = el.clientWidth;
      const newPage = Math.round(el.scrollLeft / viewport);
      setPage(newPage);
      scrollToPage(newPage);
    };
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [page, totalPages]);

  // Track scroll to update pagination state
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewport = el.clientWidth;
        const idx = Math.round(el.scrollLeft / viewport);
        if (idx !== page) setPage(idx);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [page]);

  return (
    <section id='dealers' className={styles.dealers}>
      <div
        className={`${styles.dealersContainer} w-full flex flex-col gap-6 max-w-[90rem] mx-auto px-5 md:px-10 lg:px-25 py-7 lg:py-9 mb-12.5 md:mb-12 lg:mb-15`}
      >
        <div
          className={`${styles.dealersHead} relative flex items-center justify-center`}
        >
          <div className={`${styles.dealersTitle} mb-2.5`}>Featured dealer</div>
          {isDesktop && (
            <div
              className={`${styles.dealersSlider} absolute right-0 flex items-center`}
            >
              <div className={`${styles.arrows} flex items-center gap-8`}>
                <button
                  onClick={prev}
                  disabled={page === 0}
                  className={
                    page === 0 ? styles.arrowDisabled : styles.arrowActive
                  }
                  aria-label='Попередній дилер'
                >
                  <ArrowIcon
                    className='w-[14px] h-[26px] transform rotate-180 cursor-pointer'
                    aria-hidden='true'
                  />
                </button>
                <button
                  onClick={next}
                  disabled={page === totalPages - 1}
                  className={
                    page === totalPages - 1
                      ? styles.arrowDisabled
                      : styles.arrowActive
                  }
                  aria-label='Наступний дилер'
                >
                  <ArrowIcon
                    className='w-[14px] h-[26px] cursor-pointer'
                    aria-hidden='true'
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.dealersBody}>
          <div
            ref={swipeRef}
            className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar ${styles.swipe}`}
            onAnimationEnd={() => setDirection(null)}
          >
            {mockDealers.map((dealer) => {
              const gap = '1.5rem'; // Tailwind gap-6
              const basis = `calc((100% - ${gap} * ${cols - 1}) / ${cols})`;
              return (
                <div
                  key={dealer.id}
                  className='snap-start shrink-0'
                  style={{ flex: `0 0 ${basis}`, maxWidth: basis }}
                >
                  <DealerCard dealer={dealer} />
                </div>
              );
            })}
          </div>

          {!isDesktop && (
            <div className={`${styles.dots} flex justify-center gap-2 mt-11.5`}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPage(i)}
                  aria-label={`Сторінка ${i + 1}`}
                  aria-current={i === page ? 'true' : 'false'}
                  className={`${styles.dot} ${
                    i === page ? styles.dotActive : ''
                  } w-2 h-2 rounded-full cursor-pointer p-[17px]`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

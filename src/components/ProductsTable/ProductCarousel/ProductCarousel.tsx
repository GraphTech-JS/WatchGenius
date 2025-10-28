'use client';
import React, { useEffect, useRef, useState } from 'react';
// import Link from "next/link";
import { LocalizedLink } from '@/components/LocalizedLink';
import styles from './ProductCarousel.module.css';
import { ProductCard } from '@/components/ProductsTable/ProductCard/ProductCard';
import type { IWatch } from '@/interfaces';
import { ArrowIcon } from '../../../../public/social/Icon';

type Props = {
  items: IWatch[];
  ctaHref?: string;
  ctaLabel?: string;
};

export const ProductCarousel: React.FC<Props> = ({
  items,
  ctaHref = '/catalog',
  ctaLabel = 'Перейти до каталогу',
}) => {
  const [cols, setCols] = useState<2 | 3 | 4>(2);
  const [page, setPage] = useState(0);
  const swipeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 768) setCols(3);
      else setCols(2);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / cols));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const scrollToPage = (idx: number) => {
    const el = swipeRef.current;
    if (!el) return;
    const viewport = el.clientWidth;
    el.scrollTo({ left: idx * viewport, behavior: 'smooth' });
  };

  const next = () =>
    setPage((p) => {
      const np = Math.min(p + 1, totalPages - 1);
      scrollToPage(np);
      return np;
    });
  const prev = () =>
    setPage((p) => {
      const np = Math.max(p - 1, 0);
      scrollToPage(np);
      return np;
    });

  // Pointer drag with live move and snap to pages
  useEffect(() => {
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
      setPage(idx);
      scrollToPage(idx);
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
  }, [cols, totalPages]);

  // Keep pagination in sync while scrolling
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
    <div className={`${styles.section} lg:ml-1.5`}>
      <div
        ref={swipeRef}
        className={`flex gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth ${styles.swipe} ${styles.noScrollbar}`}
      >
        {items.map((card, index) => {
          return (
            <div
              key={`${card.id}-${card.brand}`}
              className='snap-start shrink-0 w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_5rem)_/_3)] xl:w-[calc((100%_-_7.5rem)_/_4)]'
              style={{ minWidth: 0 }}
            >
              <ProductCard {...card} priority={index === 0} />
            </div>
          );
        })}
      </div>

      <div className={`${styles.controls} flex justify-center mt-10 lg:ml-2`}>
        {/* MOBILE/TABLET версія - показується до xl */}
        <div className='flex xl:hidden flex-col gap-5.5'>
          <div className={`${styles.dots} flex justify-center gap-2`}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                aria-label={`Сторінка ${i + 1}`}
                className={`${styles.dot} ${
                  i === page ? styles.dotActive : ''
                } w-2 h-2 rounded-full`}
              />
            ))}
          </div>
          <LocalizedLink
            href={ctaHref}
            className={`${styles.ctaBtn} inline-flex justify-self-start py-3.5 px-14 rounded-xl items-center`}
          >
            {ctaLabel}
          </LocalizedLink>
        </div>

        {/* DESKTOP версія - показується тільки на xl+ */}
        <div
          className={`${styles.desktopBar} hidden xl:grid w-full items-center gap-4`}
        >
          <LocalizedLink
            href={ctaHref}
            className={`${styles.ctaBtn} inline-flex justify-self-start py-[10px] px-[42px] rounded-xl items-center`}
          >
            {ctaLabel}
          </LocalizedLink>

          {/* Bars */}
          <div
            className={`${styles.pageBars} flex justify-self-center items-center gap-3`}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                aria-label={`Сторінка ${i + 1}`}
                className={`${styles.pageBar} ${
                  i === page ? styles.pageBarActive : ''
                } rounded-full h-1 w-12 cursor-pointer`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div
            className={`${styles.arrows} flex justify-self-end items-center gap-8`}
          >
            <button
              onClick={prev}
              disabled={page === 0}
              aria-label='Назад'
              className={page === 0 ? styles.arrowDisabled : styles.arrowActive}
            >
              <ArrowIcon className=' w-[14px] h-[26px] transform rotate-180 cursor-pointer' />
            </button>
            <button
              onClick={next}
              disabled={page === totalPages - 1}
              aria-label='Вперед'
              className={
                page === totalPages - 1
                  ? styles.arrowDisabled
                  : styles.arrowActive
              }
            >
              <ArrowIcon className='w-[14px] h-[26px] cursor-pointer' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

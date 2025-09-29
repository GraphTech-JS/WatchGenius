"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./ProductCarousel.module.css";
import { ProductCard } from "@/components/ProductsTable/ProductCard/ProductCard";
import type { IWatch } from "@/interfaces";
import { ArrowIcon } from "../../../../public/social/Icon";

type Props = {
  items: IWatch[];
  ctaHref?: string;
  ctaLabel?: string;
};

export const ProductCarousel: React.FC<Props> = ({
  items,
  ctaHref = "/catalog",
  ctaLabel = "Переглянути всі тренди",
}) => {
  const [cols, setCols] = useState<2 | 3 | 4>(2);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 768) setCols(3);
      else setCols(2);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / cols));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const slice = useMemo(() => {
    const start = page * cols;
    return items.slice(start, start + cols);
  }, [items, page, cols]);

  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const isMobile = cols === 2;
  const isTablet = cols === 3;
  const isDesktop = cols === 4;

  return (
    <div className={styles.section}>
      <div
        className={`${styles.row} grid gap-10`}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
      >
        {slice.map((card, i) => (
          <ProductCard key={`${page}-${i}-${card.brand}`} {...card} />
        ))}
      </div>

      <div className={`${styles.controls} flex justify-center mt-6`}>
        {(isMobile || isTablet) && (
          <div className="flex flex-col gap-5.5">
            <div className={`${styles.dots} flex justify-center gap-2`}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Сторінка ${i + 1}`}
                  className={`${styles.dot} ${
                    i === page ? styles.dotActive : ""
                  } w-2 h-2 rounded-full`}
                />
              ))}
            </div>
            <Link
              href={ctaHref}
              className={`${styles.ctaBtn} inline-flex justify-self-start py-3.5 px-14 rounded-xl items-center`}
            >
              {ctaLabel}
            </Link>
          </div>
        )}

        {isDesktop && (
          <div
            className={`${styles.desktopBar} mt-9 w-full grid items-center gap-4`}
          >
            <Link
              href={ctaHref}
              className={`${styles.ctaBtn} inline-flex justify-self-start py-[10px] px-[42px] rounded-xl items-center`}
            >
              {ctaLabel}
            </Link>

            {/* Bars */}
            <div
              className={`${styles.pageBars} flex justify-self-center items-center gap-3`}
            >
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Сторінка ${i + 1}`}
                  className={`${styles.pageBar} ${
                    i === page ? styles.pageBarActive : ""
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
                aria-label="Попередня"
                className={
                  page === 0 ? styles.arrowDisabled : styles.arrowActive
                }
              >
                <ArrowIcon className=" w-[14px] h-[26px] transform rotate-180" />
              </button>
              <button
                onClick={next}
                disabled={page === totalPages - 1}
                aria-label="Наступна"
                className={
                  page === totalPages - 1
                    ? styles.arrowDisabled
                    : styles.arrowActive
                }
              >
                <ArrowIcon className="w-[14px] h-[26px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./Dealers.module.css";
import { ArrowIcon } from "../../../../public/social/Icon";
import { DealerCard } from "@/components/Main/Dealers/DealerCard";
import { mockDealers } from "@/mock/dealers";

export const Dealers = () => {
  const [cols, setCols] = useState<1 | 2>(1);
  const [page, setPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

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
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(mockDealers.length / cols));

  const slice = useMemo(() => {
    const start = page * cols;
    return mockDealers.slice(start, start + cols);
  }, [page, cols]);

  const next = () => {
    if (page < totalPages - 1) {
      setDirection("next");
      setPage((p) => p + 1);
    }
  };
  const prev = () => {
    if (page > 0) {
      setDirection("prev");
      setPage((p) => p - 1);
    }
  };

  return (
    <section id="dealers" className={styles.dealers}>
      <div
        className={`${styles.dealersContainer} w-full flex flex-col gap-6 max-w-[90rem] mx-auto px-5 md:px-10 lg:px-25 py-7 lg:py-9`}
      >
        <div
          className={`${styles.dealersHead} relative flex items-start justify-center`}
        >
          <div className={styles.dealersTitle}>Featured dealer</div>
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
                >
                  <ArrowIcon className="w-[14px] h-[26px] transform rotate-180 cursor-pointer" />
                </button>
                <button
                  onClick={next}
                  disabled={page === totalPages - 1}
                  className={
                    page === totalPages - 1
                      ? styles.arrowDisabled
                      : styles.arrowActive
                  }
                >
                  <ArrowIcon className="w-[14px] h-[26px] cursor-pointer" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.dealersBody}>
          <div
            className={`grid gap-6 ${
              direction ? styles[`slide-${direction}`] : ""
            }`}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            onAnimationEnd={() => setDirection(null)} // після анімації скидаємо
          >
            {slice.map((dealer) => (
              <DealerCard key={dealer.id} dealer={dealer} />
            ))}
          </div>

          {!isDesktop && (
            <div className={`${styles.dots} flex justify-center gap-2 mt-4`}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > page ? "next" : "prev");
                    setPage(i);
                  }}
                  aria-label={`Сторінка ${i + 1}`}
                  className={`${styles.dot} ${
                    i === page ? styles.dotActive : ""
                  } w-2 h-2 rounded-full cursor-pointer`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

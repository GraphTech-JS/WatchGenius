"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface FloatingButtonProps {
  watchedIds: string[];
  safeOffset?: number;
  initialOffsetPercent?: number;
  extraOffset?: number;
  className?: string;
  style?: React.CSSProperties;
  children: (props: { bottom: string; isScrolling: boolean }) => ReactNode;
}

export function FloatingButton({
  watchedIds,
  safeOffset = 20,
  initialOffsetPercent = 0.2,
  extraOffset = 50,
  className,
  style,
  children,
}: FloatingButtonProps) {
  const [bottom, setBottom] = useState<string>(
    `${initialOffsetPercent * 100}%`
  );
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    const updatePosition = () => {
      const vh = window.innerHeight;
      const basePx = vh * initialOffsetPercent;

      let minTop = Infinity;
      watchedIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          minTop = Math.min(minTop, el.getBoundingClientRect().top);
        }
      });
      if (minTop === Infinity || minTop > vh) {
        setBottom(`${initialOffsetPercent * 100}%`);
      } else {
        const minBottom = vh - minTop + safeOffset;
        const finalPx = Math.round(Math.max(basePx, minBottom) + extraOffset);
        setBottom(`${finalPx}px`);
      }

      ticking = false;
    };

    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 100);

      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };
    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
      clearTimeout(scrollTimeout);
    };
  }, [watchedIds.join(","), safeOffset, initialOffsetPercent, extraOffset]);

  return (
    <div
      className={`fixed left-5 right-5 z-100  ${className}`}
      style={{ bottom, ...style }}
    >
      {children({ bottom, isScrolling })}
    </div>
  );
}

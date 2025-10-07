'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './FixedSidebar.module.css';

type FixedSidebarProps = {
  containerRef: React.RefObject<HTMLElement>;
  top?: number;
  width?: number;
  zIndex?: number;
  className?: string;
  children: React.ReactNode;
};

type Mode = 'fixed' | 'abs-top' | 'abs-bottom';

export const FixedSidebar: React.FC<FixedSidebarProps> = ({
  containerRef,
  top = 96,
  width = 311,
  zIndex = 30,
  className,
  children,
}) => {
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const prevModeRef = useRef<Mode>('abs-top');

  const [leftFixed, setLeftFixed] = useState(0);
  const [leftAbs, setLeftAbs] = useState(0);
  const [absTop, setAbsTop] = useState(0);
  const [mode, setMode] = useState<Mode>('abs-top');
  const [height, setHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  const THRESHOLD = 15; 

  const update = () => {
    const container = containerRef.current;
    const placeholder = placeholderRef.current;
    const inner = innerRef.current;
    if (!container || !placeholder || !inner) return;

    const contRect = container.getBoundingClientRect();
    const phRect = placeholder.getBoundingClientRect();
    const innerH = inner.scrollHeight;

    const contTopAbs = contRect.top + window.scrollY;
    const contBottomAbs = contTopAbs + container.offsetHeight;

    const desiredTopAbs = window.scrollY + top;
    const desiredBottomAbs = desiredTopAbs + innerH;

    const availableScreenHeight = window.innerHeight - top;

    setLeftFixed(phRect.left);
    setLeftAbs(phRect.left - contRect.left);

    let newMode: Mode = prevModeRef.current;

    if (desiredTopAbs < contTopAbs - THRESHOLD) {
      newMode = 'abs-top';
      setAbsTop(0);
      setMaxHeight(availableScreenHeight);
    }
    else if (desiredBottomAbs > contBottomAbs + THRESHOLD) {
      newMode = 'abs-bottom';
      const bottomOffset =
        container.offsetHeight - Math.min(innerH, availableScreenHeight);
      setAbsTop(Math.max(0, bottomOffset));
      setMaxHeight(availableScreenHeight);
    }
    else {
      newMode = 'fixed';
      setMaxHeight(availableScreenHeight);
    }

    prevModeRef.current = newMode;
    setMode(newMode);
    setHeight(innerH);
  };

  useEffect(() => {
    update();

    let rafId: number;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const roInner = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    });
    const roPh = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    });

    if (innerRef.current) roInner.observe(innerRef.current);
    if (placeholderRef.current) roPh.observe(placeholderRef.current);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      roInner.disconnect();
      roPh.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const innerStyle = useMemo<React.CSSProperties>(() => {
    const baseStyle: React.CSSProperties = {
      width,
      zIndex,
      maxHeight: maxHeight ? `${maxHeight}px` : undefined,
      overflowY: maxHeight ? 'auto' : 'visible',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    };

    if (mode === 'fixed') {
      return {
        ...baseStyle,
        position: 'fixed',
        top,
        left: leftFixed,
      };
    }

    return {
      ...baseStyle,
      position: 'absolute',
      top: absTop,
      left: leftAbs,
    };
  }, [mode, top, leftFixed, leftAbs, absTop, width, zIndex, maxHeight]);

  return (
    <div
      ref={placeholderRef}
      className={['shrink-0', className, styles.hiddenScrollbar]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height }}
    >
      <div ref={innerRef} className={styles.hiddenScrollbar} style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

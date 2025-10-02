'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CatalogSidebar } from '@/features/catalog/components/CatalogSidebar/CatalogSidebar';
import styles from './TabletSidebar.module.css';

type Props = {
  width?: number;
  zIndex?: number;
  className?: string;
  onReset?: () => void;
  topOffset?: number;
  containerRef?: React.RefObject<HTMLElement>;
};

export const TabletSidebar: React.FC<Props> = ({
  width = 321,
  zIndex = 5,
  className,
  onReset,
  topOffset = 280,
  containerRef,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const CLOSED_X = -width;
  const OPEN_X = 0;
  const HANDLE_OVERLAP = 3;

  const [x, setX] = useState<number>(CLOSED_X);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [startOffset, setStartOffset] = useState<number>(CLOSED_X);
  const [handleTop, setHandleTop] = useState<number | null>(null);

  const [pointerDownTime, setPointerDownTime] = useState<number>(0);
  const [totalDragDistance, setTotalDragDistance] = useState<number>(0);

  const [staticTop, setStaticTop] = useState<number>(0);

  const open = () => setX(OPEN_X);
  const close = () => setX(CLOSED_X);
  const isOpen = x > CLOSED_X + width / 2;

  const HEADER_SAFE_Z = 40;
  const BASE_Z = Math.min(zIndex ?? 0, HEADER_SAFE_Z - 2);
  const HANDLE_Z = BASE_Z + 1;

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setStartX(e.clientX);
    setStartOffset(x);
    setPointerDownTime(Date.now());
    setTotalDragDistance(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const next = Math.min(OPEN_X, Math.max(CLOSED_X, startOffset + dx));
    setX(next);

    setTotalDragDistance((prev) => prev + Math.abs(e.movementX || 0));
  };

  const onPointerUp = () => {
    const wasClick =
      totalDragDistance < 5 && Date.now() - pointerDownTime < 200;

    setDragging(false);

    if (wasClick) {
      if (isOpen) close();
      else open();
    } else {
      const threshold = CLOSED_X + width / 2;
      if (x > threshold) open();
      else close();
    }
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const alignHandle = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const input = panel.querySelector(
        'input[data-sidebar-search="true"]'
      ) as HTMLElement | null;
      if (!input) return;
      const pr = panel.getBoundingClientRect();
      const ir = input.getBoundingClientRect();
      const center = ir.top - pr.top + ir.height / 2;
      setHandleTop(center - 22.5);
    };
    alignHandle();
    window.addEventListener('resize', alignHandle);
    return () => window.removeEventListener('resize', alignHandle);
  }, []);

  useEffect(() => {
    const compute = () => {
      const container = containerRef?.current;

      if (container) {
        const contRect = container.getBoundingClientRect();
        const contTopAbs = contRect.top + window.scrollY;
        setStaticTop(contTopAbs);
        return;
      }

      setStaticTop(topOffset ?? 280);
    };

    compute();
    window.addEventListener('resize', compute);
    const ro = new ResizeObserver(compute);
    if (containerRef?.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
    };
  }, [topOffset, containerRef]);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className || ''}`}>
      <div
        ref={panelRef}
        role='complementary'
        aria-label='Фільтри'
        className={`${styles.panel} ${
          dragging ? styles.panelDragging : styles.panelNotDragging
        }`}
        style={{
          width,
          top: staticTop,
          position: 'absolute',
          zIndex: BASE_Z,
          transform: `translateX(${x}px)`,
        }}
      >
        <CatalogSidebar onReset={onReset} />
      </div>

      <button
        ref={handleRef}
        type='button'
        aria-label={isOpen ? 'Закрити фільтри' : 'Відкрити фільтри'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className={`${styles.handle} ${
          dragging ? styles.handleDragging : styles.handleNotDragging
        }`}
        style={{
          position: 'absolute',
          left: x + width - HANDLE_OVERLAP,
          top: handleTop ? staticTop + handleTop : staticTop + 150,
          transform: 'none',
          zIndex: HANDLE_Z,
        }}
      />
    </div>
  );
};

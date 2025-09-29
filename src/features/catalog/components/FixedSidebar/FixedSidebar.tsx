'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

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

  const [leftFixed, setLeftFixed] = useState(0);
  const [leftAbs, setLeftAbs] = useState(0);
  const [absTop, setAbsTop] = useState(0);
  const [mode, setMode] = useState<Mode>('abs-top');
  const [height, setHeight] = useState(0); 

  const update = () => {
    const container = containerRef.current;
    const placeholder = placeholderRef.current;
    const inner = innerRef.current;
    if (!container || !placeholder || !inner) return;

    const contRect = container.getBoundingClientRect();
    const phRect = placeholder.getBoundingClientRect();
    const innerH = inner.offsetHeight;

    const contTopAbs = contRect.top + window.scrollY;
    const contBottomAbs = contTopAbs + container.offsetHeight;

    const desiredTopAbs = window.scrollY + top;

    const fixedStart = contTopAbs;
    const fixedEnd = contBottomAbs - innerH;

    setLeftFixed(phRect.left); 
    setLeftAbs(phRect.left - contRect.left); 

    if (desiredTopAbs <= fixedStart) {
      setMode('abs-top');
      setAbsTop(0); 
    } else if (desiredTopAbs >= fixedEnd) {
      setMode('abs-bottom');
      setAbsTop(fixedEnd - contTopAbs); 
    } else {
      setMode('fixed');
    }

    setHeight(innerH);
  };

  useEffect(() => {
    update();
    const onScroll = () => update();
    const onResize = () => update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const roInner = new ResizeObserver(update);
    const roPh = new ResizeObserver(update);
    if (innerRef.current) roInner.observe(innerRef.current);
    if (placeholderRef.current) roPh.observe(placeholderRef.current);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      roInner.disconnect();
      roPh.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const innerStyle = useMemo<React.CSSProperties>(() => {
    if (mode === 'fixed') {
      return { position: 'fixed', top, left: leftFixed, width, zIndex };
    }
    return { position: 'absolute', top: absTop, left: leftAbs, width, zIndex };
  }, [mode, top, leftFixed, leftAbs, absTop, width, zIndex]);

  return (
    <div
      ref={placeholderRef}
      className={['shrink-0', className].filter(Boolean).join(' ')}
      style={{ width, height }} 
    >
      <div ref={innerRef} style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

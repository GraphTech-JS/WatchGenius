import { useRef, useState, useEffect } from "react";
export const useSidebarPosition = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sidebarTopOffset, setSidebarTopOffset] = useState<number>(0);

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pageTop = Math.round(rect.top + window.scrollY);
      setSidebarTopOffset(Math.max(0, pageTop));
    };
    
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure);
    
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, []);

  return {
    sectionRef,
    sidebarTopOffset,
  };
};
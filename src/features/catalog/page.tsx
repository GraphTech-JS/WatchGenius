'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CatalogSearch } from './components/CatalogSearch/CatalogSearch';
import { SaveToChatButton } from './components/SaveToChatButton/SaveToChatButton';
import { SortButtons } from './components/SortButtons/SortButtons';
import { SortDropdown } from './components/SortDropdown/SortDropdown';
import { CatalogSidebar } from '@/features/catalog/components/CatalogSidebar/CatalogSidebar';
import { FixedSidebar } from '@/features/catalog/components/FixedSidebar/FixedSidebar';
import { CatalogGrid } from '@/features/catalog/components/CatalogGrid/CatalogGrid';
import { TabletSidebar } from '@/features/catalog/components/TabletSidebar/TabletSidebar';

import { watchesMock } from '@/mock/watches';
import styles from './page.module.css';

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('За замовчуванням');

  const handleSaveToChat = () =>
    console.log('Збереження пошуку в чат:', searchTerm);
  const handleApplyFilters = () => console.log('Застосування фільтрів');
  const handleResetFilters = () => console.log('Скидання фільтрів');

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return watchesMock;
    return watchesMock.filter((w) => w.title.toLowerCase().includes(term));
  }, [searchTerm]);

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

  return (
    <div className='bg-white py-[60px] min-h-screen mx-auto '>
      <div className='flex flex-col mb-[15px]'>
        <h1 className={styles.catalogTitle}>Каталог годинників</h1>
        <p className={styles.catalogSubtitle}>
          Знайдено {filteredItems.length} моделей
        </p>
      </div>

      <TabletSidebar
        className='block lg:hidden'
        width={321}
        zIndex={5}
        containerRef={sectionRef as React.RefObject<HTMLElement>}
        onReset={handleResetFilters}
        topOffset={sidebarTopOffset}
      />

      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-[15px] mb-5 md:mb-8'>
        <div className='flex flex-col md:flex-row items-stretch sm:items-center gap-3 sm:gap-[15px] w-full md:w-auto'>
          <CatalogSearch value={searchTerm} onChange={setSearchTerm} />
          <SaveToChatButton onClick={handleSaveToChat} />
        </div>

        <div className='flex items-center gap-3 flex-col md:flex-row md:gap-[15px] w-full md:w-auto'>
          <div className='flex'>
            <SortButtons />
          </div>
          <div className='flex-1 w-full md:flex-none md:w-auto'>
            <SortDropdown value={sortValue} onChange={setSortValue} />
          </div>
        </div>
      </div>

      <div ref={sectionRef} className='flex relative gap-[20px] items-start'>
        <FixedSidebar
          containerRef={sectionRef as React.RefObject<HTMLElement>}
          width={320}
          top={96}
          className='hidden lg:block'
        >
          <CatalogSidebar
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </FixedSidebar>

        <div className='flex-1 min-w-0'>
          <CatalogGrid items={filteredItems} initialCount={12} />
        </div>
      </div>
    </div>
  );
};
export default CatalogPage;

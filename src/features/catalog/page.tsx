'use client';
import React, { useMemo, useRef, useState } from 'react';
import { CatalogSearch } from './components/CatalogSearch/CatalogSearch';
import { SaveToChatButton } from './components/SaveToChatButton/SaveToChatButton';
import { SortButtons } from './components/SortButtons/SortButtons';
import { SortDropdown } from './components/SortDropdown/SortDropdown';
import { CatalogSidebar } from '@/features/catalog/components/CatalogSidebar/CatalogSidebar';
import { FixedSidebar } from '@/features/catalog/components/FixedSidebar/FixedSidebar';

import { CatalogGrid } from '@/features/catalog/components/CatalogGrid/CatalogGrid';
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

  return (
    <div className='bg-white py-[60px] min-h-screen max-w-[1300px] mx-auto'>
      <div className='flex flex-col  mb-[15px]'>
        <h1  className={`${styles.catalogTitle}`}>
          Каталог годинників
        </h1>
        <p className={`${styles.catalogSubtitle}`}>
          Знайдено {filteredItems.length} моделей
        </p>
      </div>

      <div className='flex items-center gap-[15px] mb-8 justify-between'>
        <div className='flex items-center gap-[15px]'>
          <CatalogSearch value={searchTerm} onChange={setSearchTerm} />
          <SaveToChatButton onClick={handleSaveToChat} />
        </div>
        <div className='flex items-center gap-[15px]'>
          <SortButtons />
          <SortDropdown value={sortValue} onChange={setSortValue} />
        </div>
      </div>

      <div ref={sectionRef} className='flex relative gap-8 items-start'>
        <FixedSidebar
          containerRef={sectionRef as React.RefObject<HTMLElement>}
          width={311}
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

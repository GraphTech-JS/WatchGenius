'use client';

import React from 'react';
import {
  useCatalogFilters,
  type UseCatalogFiltersReturn,
} from '@/hooks/useCatalogFilters';
import { FilterAccordion } from '@/features/catalog/components/FilterAccordion/FilterAccordion';
import { Search } from 'lucide-react';
import styles from './CatalogSidebar.module.css';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';

interface CatalogSidebarProps {
  title?: string;
  widthPx?: number;
  onApply?: (filters: UseCatalogFiltersReturn) => void;
  onReset?: () => void;
}

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({
  title = t(catalogKeys.sidebar.title),
  widthPx = 311,
  onApply,
  onReset,
}) => {
  const filters = useCatalogFilters();

  const handleReset = () => {
    filters.reset();
    onReset?.();
  };

  return (
    <div
      className={`${styles.sidebar} rounded-[20px] p-[20px_21px_42px] sticky top-5`}
      style={{
        background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
        width: `${widthPx}px`,
      }}
    >
      <h2
        className={`${styles.sidebarTitle} text-[16px] font-medium  pb-1 text-[var(--text-dark)] mb-6`}
      >
        {title}
      </h2>

      <div className='relative mb-6'>
        <label htmlFor='sidebar-brand-search' className='sr-only'>
          {t(catalogKeys.sidebar.searchPlaceholder)}
        </label>
        <input
          id='sidebar-brand-search'
          type='search'
          value={filters.searchTerm}
          onChange={(e) => filters.setSearchTerm(e.target.value)}
          data-sidebar-search='true'
          placeholder={t(catalogKeys.sidebar.searchPlaceholder)}
          aria-label={t(catalogKeys.sidebar.searchPlaceholder)}
          className='w-[269px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[15px] pl-[40px] pr-[10px]
                     bg-white text-[14px] text-[var(--text-dark)]
                      placeholder:text-[#8b8b8b]'
        />
        <span
          className='absolute left-[15px] top-1/2 -translate-y-1/2 text-[#8b8b8b]'
          aria-hidden='true'
        >
          <Search size={16} />
        </span>
      </div>

      <FilterAccordion filters={filters} />

      <div className='space-y-3'>
        <button
          onClick={() => onApply?.(filters)}
          className='w-[269px] h-[40px] bg-[#04694f] text-white rounded-[10px]
                     font-[var(--font-inter)] text-[20px]
                     hover:bg-[#035a3f] transition-colors flex items-center justify-center cursor-pointer'
          aria-label='Застосувати фільтри до каталогу'
        >
          {t(catalogKeys.sidebar.apply)}
        </button>

        <button
          onClick={handleReset}
          className='w-[269px] h-[40px] text-[#04694f] border border-[#04694f] rounded-[10px]
                     font-[var(--font-inter)] text-[20px]
                     hover:bg-white transition-colors flex items-center justify-center cursor-pointer'
          style={{
            background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
          }}
          aria-label='Скинути всі фільтри'
        >
          {t(catalogKeys.sidebar.reset)}
        </button>
      </div>
    </div>
  );
};

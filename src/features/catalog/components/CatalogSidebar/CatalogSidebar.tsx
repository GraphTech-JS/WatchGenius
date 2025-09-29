'use client';

import React from 'react';
import {
  useCatalogFilters,
  type UseCatalogFiltersReturn,
} from '@/hooks/useCatalogFilters';
import { FilterAccordion } from '@/features/catalog/components/FilterAccordion/FilterAccordion';
import { FaSearch } from 'react-icons/fa';

interface CatalogSidebarProps {
  title?: string;
  widthPx?: number;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  onApply?: (filters: UseCatalogFiltersReturn) => void;
  onReset?: () => void;
}

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({
  title = 'Фільтр',
  widthPx = 311,
  searchTerm,
  setSearchTerm,
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
      className='rounded-[20px] p-[20px_21px_42px] shadow-sm sticky top-5'
      style={{
        background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
        width: `${widthPx}px`,
      }}
    >
      <h3 className='text-[16px] font-medium font-[var(--font-inter)] text-[var(--text-dark)] mb-6'>
        {title}
      </h3>

      <div className='relative mb-6'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm?.(e.target.value)}
          placeholder='Пошук бренду'
          className='w-[269px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[15px] pl-[40px] pr-[10px]
                     bg-white text-[14px] text-[var(--text-dark)]
                     focus:outline-none focus:ring-2 focus:ring-[#04694f]/20 placeholder:text-[#8b8b8b]'
        />
        <span className='absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b8b8b]'>
          <FaSearch />
        </span>
      </div>

      <FilterAccordion filters={filters} />

      <div className='space-y-3'>
        <button
          onClick={() => onApply?.(filters)}
          className='w-[269px] h-[40px] bg-[#04694f] text-white rounded-[10px]
                     font-[var(--font-inter)] text-[20px]
                     hover:bg-[#035a3f] transition-colors flex items-center justify-center'
        >
          Застосувати
        </button>

        <button
          onClick={handleReset}
          className='w-[269px] h-[40px] text-[#04694f] border border-[#04694f] rounded-[10px]
                     font-[var(--font-inter)] text-[20px]
                     hover:bg-white transition-colors flex items-center justify-center'
          style={{
            background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
          }}
        >
          Скинути
        </button>
      </div>
    </div>
  );
};

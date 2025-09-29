'use client';
import React, { useState } from 'react';
import { CatalogSearch } from './components/CatalogSearch/CatalogSearch';
import { SaveToChatButton } from './components/SaveToChatButton/SaveToChatButton';
import { SortButtons } from './components/SortButtons/SortButtons';
import { SortDropdown } from './components/SortDropdown/SortDropdown';
import { CatalogFilters } from './components/CatalogFilters/CatalogFilters';

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('За замовчуванням');

  const handleSaveToChat = () => {
    console.log('Збереження пошуку в чат:', searchTerm);
  };

  const handleApplyFilters = () => {
    console.log('Застосування фільтрів');
  };

  const handleResetFilters = () => {
    console.log('Скидання фільтрів');
  };

  return (
    <div className='bg-white p-[70px_52px_50px_70px] min-h-screen'>
      <div className='flex flex-col gap-[10px] mb-[30px]'>
        <h1 className='text-[48px] font-semibold font-[var(--font-roboto)] text-black m-0'>
          Каталог годинників
        </h1>
        <p className='text-[14px] font-normal font-[var(--font-inter)] text-[rgba(23,20,20,0.5)]'>
          Знайдено 12 моделей
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

      <div className='flex gap-8'>
        <CatalogFilters
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
    
        <div className='flex-1'>
          <p>Тут буде сітка товарів</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;

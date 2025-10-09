'use client';
import React from 'react';

import { CatalogSidebar } from '@/features/catalog/components/CatalogSidebar/CatalogSidebar';
import { FixedSidebar } from '@/features/catalog/components/FixedSidebar/FixedSidebar';
import { CatalogGrid } from '@/features/catalog/components/CatalogGrid/CatalogGrid';
import { TabletSidebar } from '@/features/catalog/components/TabletSidebar/TabletSidebar';
import { CatalogControls } from '@/features/catalog/components/CatalogControls/CatalogControls';
import { FeedbackModal } from '@/components/FeedbackModal/FeedbackModal';
import { useFeedbackModal } from '@/hooks/useFeedbackModal';

import styles from './page.module.css';
import { useCatalogSearch } from '@/hooks/useCatalogSearch';
import { useSidebarPosition } from '@/hooks/useSidebarPosition';
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';

const CatalogPage = () => {
  const search = useCatalogSearch();
  const sidebar = useSidebarPosition();
  const feedbackModal = useFeedbackModal();

  const handleSaveToChat = () => {
    // TODO: Implement save to chat functionality
  };

  const handleApplyFilters = (filters: UseCatalogFiltersReturn) => {
    search.applySidebarFilters(filters);
  };

  const handleResetFilters = () => {
    search.setSearchTerm('');
    search.setQuickIndexFilter(null);
    search.clearSidebarFilters();
  };

  const handleAskGeni = () => {
    // TODO: Implement ask Geni functionality
  };

  return (
    <div className='bg-white py-[60px] min-h-screen mx-auto'>
      <div className='flex flex-col mb-[15px]'>
        <h1 className={styles.catalogTitle}>Каталог годинників</h1>
        <p className={styles.catalogSubtitle}>
          Знайдено {search.filteredItems.length} моделей
        </p>
      </div>

      <TabletSidebar
        className='block lg:hidden'
        width={321}
        zIndex={5}
        containerRef={sidebar.sectionRef as React.RefObject<HTMLElement>}
        onReset={handleResetFilters}
        topOffset={sidebar.sidebarTopOffset}
      />

      <CatalogControls
        searchTerm={search.searchTerm}
        onSearchChange={search.setSearchTerm}
        selectedIndex={search.quickIndexFilter}
        onIndexChange={search.toggleIndex}
        sortValue={search.sortOption}
        onSortChange={search.setSortOption}
        onSaveToChat={handleSaveToChat}
      />

      <div
        ref={sidebar.sectionRef}
        className='flex relative gap-[20px] items-start'
      >
        <FixedSidebar
          containerRef={sidebar.sectionRef as React.RefObject<HTMLElement>}
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
          <CatalogGrid
            items={search.filteredItems}
            initialCount={12}
            onResetFilters={handleResetFilters}
            onAskGeni={handleAskGeni}
            onOpenFeedback={feedbackModal.openModal}
          />
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={feedbackModal.closeModal}
        watchTitle={feedbackModal.watchTitle}
      />
    </div>
  );
};
export default CatalogPage;

'use client';
import React, { useEffect, useContext } from 'react';
import { MainContext } from '@/context';

import { CatalogSidebar } from '@/features/catalog/components/CatalogSidebar/CatalogSidebar';
import { FixedSidebar } from '@/features/catalog/components/FixedSidebar/FixedSidebar';
import { CatalogGrid } from '@/features/catalog/components/CatalogGrid/CatalogGrid';
import { TabletSidebar } from '@/features/catalog/components/TabletSidebar/TabletSidebar';
import { CatalogControls } from '@/features/catalog/components/CatalogControls/CatalogControls';
import { ActiveFiltersBar } from '@/features/catalog/components/ActiveFiltersBar/ActiveFiltersBar';
import { FeedbackModal } from '@/components/FeedbackModal/FeedbackModal';
import { useFeedbackModal } from '@/hooks/useFeedbackModal';
import { useSaveSearchToChat } from '@/hooks/useSaveSearchToChat';

import styles from './page.module.css';
import { useCatalogSearch } from '@/hooks/useCatalogSearch';
import { useSidebarPosition } from '@/hooks/useSidebarPosition';
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';

const CatalogPage = () => {
  const search = useCatalogSearch();
  const sidebar = useSidebarPosition();
  const feedbackModal = useFeedbackModal();
  const { savedCatalogFilters, setSavedCatalogFilters } =
    useContext(MainContext);

  const { saveSearchToChat } = useSaveSearchToChat();

  useEffect(() => {
    if (savedCatalogFilters) {
      if (savedCatalogFilters.searchTerm) {
        search.setSearchTerm(savedCatalogFilters.searchTerm);
      }

      const selectedBrands: string[] = [];
      const selectedConditions: string[] = [];
      const selectedMechanisms: string[] = [];
      const selectedMaterials: string[] = [];
      const selectedDocuments: string[] = [];
      const selectedLocations: string[] = [];
      const selectedIndexes: Array<'A' | 'B' | 'C'> = [];

      savedCatalogFilters.filters.forEach((filter) => {
        const [group, value] = filter.split(':');

        if (group === 'brand') selectedBrands.push(value);
        else if (group === 'condition') selectedConditions.push(value);
        else if (group === 'mechanism') selectedMechanisms.push(value);
        else if (group === 'material') selectedMaterials.push(value);
        else if (group === 'document') selectedDocuments.push(value);
        else if (group === 'location') selectedLocations.push(value);
        else if (
          group === 'index' &&
          (value === 'A' || value === 'B' || value === 'C')
        ) {
          selectedIndexes.push(value);
        }
      });

      if (
        selectedBrands.length ||
        selectedConditions.length ||
        selectedMechanisms.length ||
        selectedMaterials.length
      ) {
        search.applySidebarFilters({
          selectedBrands,
          selectedConditions,
          selectedMechanisms,
          selectedMaterials,
          selectedDocuments,
          selectedLocations,
          priceFrom: '0',
          priceTo: '50000',
          yearFrom: '2000',
          yearTo: '2005',
        } as UseCatalogFiltersReturn);
      }
      if (selectedIndexes.length) search.setSelectedIndexes(selectedIndexes);

      setSavedCatalogFilters(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCatalogFilters]);

  const handleSaveToChat = () => {
    saveSearchToChat({
      searchTerm: search.searchTerm,
      activeFilters: search.activeFilters,
    });
  };

  const handleApplyFilters = (filters: UseCatalogFiltersReturn) => {
    search.applySidebarFilters(filters);
  };

  const handleResetFilters = () => {
    search.setSearchTerm('');
    search.setSelectedIndexes([]);
    search.clearSidebarFilters();
  };

  const handleAskGeni = () => {};

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
        selectedIndexes={search.selectedIndexes}
        onToggleIndex={search.toggleIndex}
        sortValue={search.sortOption}
        onSortChange={search.setSortOption}
        onSaveToChat={handleSaveToChat}
      />
      <ActiveFiltersBar
        ref={search.chipsRef as React.RefObject<HTMLDivElement>}
        chips={search.activeFilters.map((c) => ({
          id: c.id,
          label: c.label,
        }))}
        onRemove={(id) => {
          const chip = search.activeFilters.find((c) => c.id === id);
          if (chip)
            search.removeFilter({ group: chip.group, value: chip.value });
        }}
        onClearAll={search.clearAllFilters}
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

        <div className='relative flex-1 min-w-0'>
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

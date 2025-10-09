import { useState, useMemo, useCallback } from "react";
import { watchesMock } from "@/mock/watches";
import { WatchIndex } from "@/mock/watches";
import { UseCatalogFiltersReturn } from "@/hooks/useCatalogFilters";
import { SortOption } from "@/types/sorting";
import { applySorting } from "@/utils/sortingUtils";

export const useCatalogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quickIndexFilter, setQuickIndexFilter] = useState<WatchIndex | null>(null);
  const [sidebarFilters, setSidebarFilters] = useState<UseCatalogFiltersReturn | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.DEFAULT);

  const toggleIndex = useCallback((button: string | null) => {
    if (button === null) {
      setQuickIndexFilter(null);
    } else if (quickIndexFilter === button) {
      setQuickIndexFilter(null);
    } else if (['A', 'B', 'C'].includes(button)) {
      setQuickIndexFilter(button as WatchIndex);
    }
  }, [quickIndexFilter]);

  const applySidebarFilters = useCallback((filters: UseCatalogFiltersReturn) => {
    setSidebarFilters(filters);
  }, []);

  const clearSidebarFilters = useCallback(() => {
    setSidebarFilters(null);
  }, []);

  const filteredItems = useMemo(() => {
    let items = watchesMock;

    // Пошук за назвою
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter((w) => w.title.toLowerCase().includes(term));
    }

    // Швидкий фільтр за індексом (верхні кнопки)
    if (quickIndexFilter) {
      items = items.filter((w) => w.index === quickIndexFilter);
    }

    // Фільтри сайдбару
    if (sidebarFilters) {
      // Фільтр за індексом
      if (sidebarFilters.indexValue) {
        items = items.filter((w) => w.index === sidebarFilters.indexValue);
      }

      // Фільтр за брендами
      if (sidebarFilters.selectedBrands?.length) {
        items = items.filter((w) => sidebarFilters.selectedBrands.includes(w.brand));
      }

      // Фільтр за станом
      if (sidebarFilters.selectedConditions?.length) {
        items = items.filter((w) => sidebarFilters.selectedConditions.includes(w.condition));
      }

      // Фільтр за механізмом
      if (sidebarFilters.selectedMechanisms?.length) {
        items = items.filter((w) => sidebarFilters.selectedMechanisms.includes(w.mechanism));
      }

      // Фільтр за матеріалом
      if (sidebarFilters.selectedMaterials?.length) {
        items = items.filter((w) => sidebarFilters.selectedMaterials.includes(w.material));
      }

      // Фільтр за документами
      if (sidebarFilters.selectedDocuments?.length) {
        items = items.filter((w) => sidebarFilters.selectedDocuments.includes(w.documents));
      }

      // Фільтр за локацією
      if (sidebarFilters.selectedLocations?.length) {
        items = items.filter((w) => sidebarFilters.selectedLocations.includes(w.location));
      }

      // Фільтр за ціною
      if (sidebarFilters.priceFrom || sidebarFilters.priceTo) {
        const from = parseFloat(sidebarFilters.priceFrom) || 0;
        const to = parseFloat(sidebarFilters.priceTo) || Infinity;
        items = items.filter((w) => w.price >= from && w.price <= to);
      }

      // Фільтр за роком
      if (sidebarFilters.yearFrom || sidebarFilters.yearTo) {
        const from = parseInt(sidebarFilters.yearFrom) || 0;
        const to = parseInt(sidebarFilters.yearTo) || Infinity;
        items = items.filter((w) => w.year >= from && w.year <= to);
      }
    }

    // Застосовуємо сортування
    return applySorting(items, sortOption);
  }, [searchTerm, quickIndexFilter, sidebarFilters, sortOption]);

  return {
    searchTerm,
    setSearchTerm,
    quickIndexFilter,
    setQuickIndexFilter,
    toggleIndex,
    filteredItems,
    applySidebarFilters,
    clearSidebarFilters,
    sortOption,
    setSortOption,
  };
};
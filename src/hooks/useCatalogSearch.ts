import { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import { useWatches } from '@/hooks/useWatches';
import { WatchIndex, WatchItem } from '@/interfaces'; 
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import { SortOption } from '@/types/sorting';
import { applySorting } from '@/utils/sortingUtils';


type ActiveFilterChip ={
  id: string;
  group: 'index'|'brand'|'condition'|'mechanism'|'material'|'document'|'location'|'price'|'year';
  value: string;
  label: string;
}



export const useCatalogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState<WatchIndex[]>([]);
  const [sidebarFilters, setSidebarFilters] =
    useState<UseCatalogFiltersReturn | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.DEFAULT);
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const [chipsHeight, setChipsHeight] = useState(0);
    const { getAll } = useWatches();

  const activeFilters = useMemo<ActiveFilterChip[]>(() => {
  const chips: ActiveFilterChip[] = [];

  selectedIndexes.forEach(idx => {
    chips.push({ id: `index:${idx}`, group: 'index', value: idx, label: idx });
  });

  if (sidebarFilters?.selectedIndexes?.length) {
    sidebarFilters.selectedIndexes.forEach((idx) => {
      chips.push({ id: `sb-index:${idx}`, group: 'index', value: idx, label: idx });
    });
  }

  if (sidebarFilters) {
    const f = sidebarFilters;

    f.selectedBrands?.forEach(b =>
      chips.push({ id: `brand:${b}`, group: 'brand', value: b, label: b })
    );
    f.selectedConditions?.forEach(c =>
      chips.push({ id: `condition:${c}`, group: 'condition', value: c, label: c })
    );
    f.selectedMechanisms?.forEach(m =>
      chips.push({ id: `mechanism:${m}`, group: 'mechanism', value: m, label: m })
    );
    f.selectedMaterials?.forEach(m =>
      chips.push({ id: `material:${m}`, group: 'material', value: m, label: m })
    );
    f.selectedDocuments?.forEach(d =>
      chips.push({ id: `document:${d}`, group: 'document', value: d, label: d })
    );
    f.selectedLocations?.forEach(l =>
      chips.push({ id: `location:${l}`, group: 'location', value: l, label: l })
    );

    if (f.priceFrom !== '0' || f.priceTo !== '50000') {
      chips.push({
        id: `price:${f.priceFrom}-${f.priceTo}`,
        group: 'price',
        value: `${f.priceFrom}-${f.priceTo}`,
        label: `€ ${f.priceFrom}–${f.priceTo}`,
      });
    }

    if (f.yearFrom !== '2000' || f.yearTo !== '2005') {
      chips.push({
        id: `year:${f.yearFrom}-${f.yearTo}`,
        group: 'year',
        value: `${f.yearFrom}-${f.yearTo}`,
        label: `Рік ${f.yearFrom}–${f.yearTo}`,
      });
    }
  }

  return chips;
}, [selectedIndexes, sidebarFilters]);


const removeFrom = (arr: string[] = [], v: string) => arr.filter(x => x !== v);

const removeFilter = useCallback((chip: { group: ActiveFilterChip['group']; value: string }) => {
  if (chip.group === 'index') {
    // знімаємо зі швидких індексів
    setSelectedIndexes(prev => prev.filter(i => i !== chip.value));
    // і, за наявності, зі списку індексів сайдбара
    setSidebarFilters(prev => {
      if (!prev) return prev;
      if (!prev.selectedIndexes?.includes(chip.value as WatchIndex)) return prev;
      return { ...prev, selectedIndexes: prev.selectedIndexes.filter(i => i !== chip.value) } as UseCatalogFiltersReturn;
    });
    return;
  }

  setSidebarFilters(prev => {
    if (!prev) return prev;
    const f = { ...prev };

    if (chip.group === 'brand')      f.selectedBrands      = removeFrom(f.selectedBrands, chip.value);
    if (chip.group === 'condition')  f.selectedConditions  = removeFrom(f.selectedConditions, chip.value);
    if (chip.group === 'mechanism')  f.selectedMechanisms  = removeFrom(f.selectedMechanisms, chip.value);
    if (chip.group === 'material')   f.selectedMaterials   = removeFrom(f.selectedMaterials, chip.value);
    if (chip.group === 'document')   f.selectedDocuments   = removeFrom(f.selectedDocuments, chip.value);
    if (chip.group === 'location')   f.selectedLocations   = removeFrom(f.selectedLocations, chip.value);
    if (chip.group === 'price')     { f.priceFrom = '0';     f.priceTo = '50000'; }
    if (chip.group === 'year')      { f.yearFrom  = '2000';  f.yearTo  = '2005'; }

    return f;
  });
}, []);

const clearAllFilters = useCallback(() => {
  setSelectedIndexes([]);
  setSidebarFilters(null);
  setSearchTerm('');
}, []);




  const toggleIndex = useCallback((index: WatchIndex) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const applySidebarFilters = useCallback(
    (filters: UseCatalogFiltersReturn) => {
      setSidebarFilters(filters);
    },
    []
  );

  const clearSidebarFilters = useCallback(() => {
    setSidebarFilters(null);
  }, []);

  const filteredItems = useMemo(() => {
    let items: WatchItem[] = getAll();

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter((w) => w.title.toLowerCase().includes(term));
    }

    if (selectedIndexes.length > 0) {
      items = items.filter((w) => selectedIndexes.includes(w.index));
    }

    if (sidebarFilters) {
      if (sidebarFilters.selectedIndexes?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedIndexes.includes(w.index)
        );
      }

      if (sidebarFilters.selectedBrands?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedBrands.includes(w.brand)
        );
      }

      if (sidebarFilters.selectedConditions?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedConditions.includes(w.condition)
        );
      }

      if (sidebarFilters.selectedMechanisms?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedMechanisms.includes(w.mechanism)
        );
      }

      if (sidebarFilters.selectedMaterials?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedMaterials.includes(w.material)
        );
      }

      if (sidebarFilters.selectedDocuments?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedDocuments.includes(w.documents)
        );
      }

      if (sidebarFilters.selectedLocations?.length) {
        items = items.filter((w) =>
          sidebarFilters.selectedLocations.includes(w.location)
        );
      }

      if (sidebarFilters.priceFrom || sidebarFilters.priceTo) {
        const from = parseFloat(sidebarFilters.priceFrom) || 0;
        const to = parseFloat(sidebarFilters.priceTo) || Infinity;
        items = items.filter((w) => w.price >= from && w.price <= to);
      }

      if (sidebarFilters.yearFrom || sidebarFilters.yearTo) {
        const from = parseInt(sidebarFilters.yearFrom) || 0;
        const to = parseInt(sidebarFilters.yearTo) || Infinity;
        items = items.filter((w) => w.year >= from && w.year <= to);
      }
    }

    return applySorting(items, sortOption);
  }, [searchTerm, selectedIndexes, sidebarFilters, sortOption]);

  useLayoutEffect(() => {
    if (!chipsRef.current) {
      setChipsHeight(0);
      return;
    }
    const measure = () => setChipsHeight(chipsRef.current?.offsetHeight ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(chipsRef.current);
    const id = requestAnimationFrame(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, [activeFilters]);

  return {
    searchTerm,
    setSearchTerm,
    selectedIndexes,
    setSelectedIndexes,
    toggleIndex,
    filteredItems,
    applySidebarFilters,
    clearSidebarFilters,
    sortOption,
    setSortOption,

    activeFilters,
    removeFilter,
    clearAllFilters,

    chipsRef,
    chipsHeight,
  };
};

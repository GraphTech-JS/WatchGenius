import { useState, useMemo, useCallback, useLayoutEffect, useRef, useEffect } from 'react';
import { useWatches } from '@/hooks/useWatches';
import { WatchIndex, WatchItem } from '@/interfaces'; 
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import { SortOption } from '@/types/sorting';
import { applySorting } from '@/utils/sortingUtils';
import { convertFiltersToApiParams } from '@/lib/api';
import { GetWatchesParams } from '@/interfaces/api';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';


type ActiveFilterChip ={
  id: string;
  group: 'index'|'brand'|'condition'|'mechanism'|'material'|'document'|'location'|'price'|'year';
  value: string;
  label: string;
}

function translateFilterValue(group: ActiveFilterChip['group'], value: string): string {
  const translationKeyMap: Record<ActiveFilterChip['group'], string | null> = {
    'brand': catalogKeys.filterData.brands,
    'condition': catalogKeys.filterData.conditions,
    'mechanism': catalogKeys.filterData.mechanisms,
    'material': catalogKeys.filterData.materials,
    'document': catalogKeys.filterData.documents,
    'location': catalogKeys.filterData.locations,
    'index': null,
    'price': null,
    'year': null,
  };

  const translationKey = translationKeyMap[group];
  
  if (!translationKey) {
    return value;
  }

  const fullKey = `${translationKey}.${value}`;
  const translation = t(fullKey);
  
  return translation !== fullKey ? translation : value;
}



export const useCatalogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState<WatchIndex[]>([]);
  const [sidebarFilters, setSidebarFilters] =
    useState<UseCatalogFiltersReturn | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.DEFAULT);
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const [chipsHeight, setChipsHeight] = useState(0);
  const { watches, loadMore, hasMore, reloadWithFilters, loading } = useWatches(); 

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
      chips.push({ 
        id: `brand:${b}`, 
        group: 'brand', 
        value: b, 
        label: translateFilterValue('brand', b)
      })
    );
    f.selectedConditions?.forEach(c =>
      chips.push({ 
        id: `condition:${c}`, 
        group: 'condition', 
        value: c, 
        label: translateFilterValue('condition', c)
      })
    );
    f.selectedMechanisms?.forEach(m =>
      chips.push({ 
        id: `mechanism:${m}`, 
        group: 'mechanism', 
        value: m, 
        label: translateFilterValue('mechanism', m)
      })
    );
    f.selectedMaterials?.forEach(m =>
      chips.push({ 
        id: `material:${m}`, 
        group: 'material', 
        value: m, 
        label: translateFilterValue('material', m)
      })
    );
    f.selectedDocuments?.forEach(d =>
      chips.push({ 
        id: `document:${d}`, 
        group: 'document', 
        value: d, 
        label: translateFilterValue('document', d)
      })
    );
    f.selectedLocations?.forEach(l =>
      chips.push({ 
        id: `location:${l}`, 
        group: 'location', 
        value: l, 
        label: translateFilterValue('location', l)
      })
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
    setSelectedIndexes(prev => prev.filter(i => i !== chip.value));
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
    let items: WatchItem[] = watches;

    if (selectedIndexes.length > 0) {
      items = items.filter((w) => selectedIndexes.includes(w.index));
    }

    return applySorting(items, sortOption);
  }, [watches, selectedIndexes, sortOption]);  

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

useEffect(() => {
  const apiParams: GetWatchesParams = !searchTerm.trim() && !sidebarFilters 
    ? { pageSize: 12, currency: 'EUR' }
    : {
        ...(searchTerm.trim() && { search: searchTerm.trim() }),
        ...(sidebarFilters ? convertFiltersToApiParams(sidebarFilters) : {}),
        currency: 'EUR'
      };
  
  reloadWithFilters(apiParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchTerm, sidebarFilters]);
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

    loadMore,
    hasMore,
    loading,
  };
};

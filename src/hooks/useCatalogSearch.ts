import {
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { useWatches } from '@/hooks/useWatches';
import { WatchIndex, WatchItem } from '@/interfaces';
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import { SortOption } from '@/types/sorting';
import { applySorting } from '@/utils/sortingUtils';
import { convertFiltersToApiParams } from '@/lib/api';
import { GetWatchesParams } from '@/interfaces/api';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';
import { trackEvent } from '@/lib/analytics';
import { MainContext } from '@/context';

type ActiveFilterChip = {
  id: string;
  group:
    | 'index'
    | 'brand'
    | 'condition'
    | 'mechanism'
    | 'material'
    | 'document'
    | 'location'
    | 'price'
    | 'year';
  value: string;
  label: string;
};

function translateFilterValue(
  group: ActiveFilterChip['group'],
  value: string
): string {
  const translationKeyMap: Record<ActiveFilterChip['group'], string | null> = {
    brand: catalogKeys.filterData.brands,
    condition: catalogKeys.filterData.conditions,
    mechanism: catalogKeys.filterData.mechanisms,
    material: catalogKeys.filterData.materials,
    document: catalogKeys.filterData.documents,
    location: catalogKeys.filterData.locations,
    index: null,
    price: null,
    year: null,
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
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndexes, setSelectedIndexes] = useState<WatchIndex[]>([]);
  const [sidebarFilters, setSidebarFilters] =
    useState<UseCatalogFiltersReturn | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.DEFAULT);
  const previousSortRef = useRef<SortOption>(SortOption.DEFAULT);
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const [chipsHeight, setChipsHeight] = useState(0);
  const previousChipsHeightRef = useRef<number>(0);
  const previousParamsRef = useRef<string>('');
  const {
    watches,
    loadMore,
    hasMore,
    reloadWithFilters,
    loading,
    setWatchesDirectly,
  } = useWatches();
  const { isApplyingSavedFilters, savedCatalogFilters } =
    useContext(MainContext);

  const activeFilters = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];

    selectedIndexes.forEach((idx) => {
      chips.push({
        id: `index:${idx}`,
        group: 'index',
        value: idx,
        label: idx,
      });
    });

    if (sidebarFilters?.selectedIndexes?.length) {
      sidebarFilters.selectedIndexes.forEach((idx) => {
        chips.push({
          id: `sb-index:${idx}`,
          group: 'index',
          value: idx,
          label: idx,
        });
      });
    }

    if (sidebarFilters) {
      const f = sidebarFilters;

      f.selectedBrands?.forEach((b) =>
        chips.push({
          id: `brand:${b}`,
          group: 'brand',
          value: b,
          label: translateFilterValue('brand', b),
        })
      );
      f.selectedConditions?.forEach((c) =>
        chips.push({
          id: `condition:${c}`,
          group: 'condition',
          value: c,
          label: translateFilterValue('condition', c),
        })
      );
      f.selectedMechanisms?.forEach((m) =>
        chips.push({
          id: `mechanism:${m}`,
          group: 'mechanism',
          value: m,
          label: translateFilterValue('mechanism', m),
        })
      );
      f.selectedMaterials?.forEach((m) =>
        chips.push({
          id: `material:${m}`,
          group: 'material',
          value: m,
          label: translateFilterValue('material', m),
        })
      );
      f.selectedDocuments?.forEach((d) =>
        chips.push({
          id: `document:${d}`,
          group: 'document',
          value: d,
          label: translateFilterValue('document', d),
        })
      );
      f.selectedLocations?.forEach((l) =>
        chips.push({
          id: `location:${l}`,
          group: 'location',
          value: l,
          label: translateFilterValue('location', l),
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

  const removeFrom = (arr: string[] = [], v: string) =>
    arr.filter((x) => x !== v);

  const removeFilter = useCallback(
    (chip: { group: ActiveFilterChip['group']; value: string }) => {
      if (chip.group === 'index') {
        setSelectedIndexes((prev) => {
          const newIndexes = prev.filter((i) => i !== chip.value);

          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (newIndexes.length === 0) {
              url.searchParams.delete('index');
            } else {
              url.searchParams.set('index', newIndexes[0]);
            }
            window.history.pushState({}, '', url.toString());
          }

          return newIndexes;
        });
        setSidebarFilters((prev) => {
          if (!prev) return prev;
          if (!prev.selectedIndexes?.includes(chip.value as WatchIndex))
            return prev;
          return {
            ...prev,
            selectedIndexes: prev.selectedIndexes.filter(
              (i) => i !== chip.value
            ),
          } as UseCatalogFiltersReturn;
        });
        return;
      }

      setSidebarFilters((prev) => {
        if (!prev) return prev;
        const f = { ...prev };

        if (chip.group === 'brand')
          f.selectedBrands = removeFrom(f.selectedBrands, chip.value);
        if (chip.group === 'condition')
          f.selectedConditions = removeFrom(f.selectedConditions, chip.value);
        if (chip.group === 'mechanism')
          f.selectedMechanisms = removeFrom(f.selectedMechanisms, chip.value);
        if (chip.group === 'material')
          f.selectedMaterials = removeFrom(f.selectedMaterials, chip.value);
        if (chip.group === 'document')
          f.selectedDocuments = removeFrom(f.selectedDocuments, chip.value);
        if (chip.group === 'location')
          f.selectedLocations = removeFrom(f.selectedLocations, chip.value);
        if (chip.group === 'price') {
          f.priceFrom = '0';
          f.priceTo = '50000';
        }
        if (chip.group === 'year') {
          f.yearFrom = '2000';
          f.yearTo = '2005';
        }

        return f;
      });
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setSelectedIndexes([]);
    setSidebarFilters(null);
    setSearchTerm('');

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('index');
      url.searchParams.delete('sortByLiquidity');
      window.history.pushState({}, '', url.toString());
    }
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
    const sortByLiquidityParam = searchParams.get('sortByLiquidity');
    const isSortByLiquidity = sortByLiquidityParam === 'true';
    
    let items: WatchItem[] = watches;

    if (isSortByLiquidity) {
      return items;
    }

    if (selectedIndexes.length > 0) {
      items = items.filter((w) => selectedIndexes.includes(w.index));
    }

    const sorted = applySorting(items, sortOption);
    return sorted;
  }, [watches, selectedIndexes, sortOption, searchParams]);

  useLayoutEffect(() => {
    if (!chipsRef.current) {
      if (previousChipsHeightRef.current !== 0) {
        previousChipsHeightRef.current = 0;
        setChipsHeight(0);
      }
      return;
    }
    const measure = () => {
      const newHeight = chipsRef.current?.offsetHeight ?? 0;
      if (previousChipsHeightRef.current !== newHeight) {
        previousChipsHeightRef.current = newHeight;
        setChipsHeight(newHeight);
      }
    };
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
    if (isApplyingSavedFilters || savedCatalogFilters) {
      return;
    }

    const getCurrencyFromStorage = (): string => {
      if (typeof window === 'undefined') return 'EUR';
      const savedCurrency = localStorage.getItem('selectedCurrency');
      const validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
      return savedCurrency && validCurrencies.includes(savedCurrency)
        ? savedCurrency
        : 'EUR';
    };

    const sortByLiquidityParam = searchParams.get('sortByLiquidity');
    const currency = getCurrencyFromStorage();

    const paramsKey = JSON.stringify({
      searchTerm: searchTerm.trim(),
      selectedIndexes: selectedIndexes.sort().join(','),
      sortByLiquidity: sortByLiquidityParam === 'true',
      sidebarFilters: sidebarFilters ? JSON.stringify(sidebarFilters) : null,
      currency: currency,
    });

    if (
      previousParamsRef.current === paramsKey &&
      previousParamsRef.current !== ''
    ) {
      return;
    }

    previousParamsRef.current = paramsKey;

    const apiParams: GetWatchesParams =
      !searchTerm.trim() && !sidebarFilters
        ? {
            pageSize: sortByLiquidityParam === 'true' ? 100 : 12,
            currency: currency,
            ...(selectedIndexes.length > 0 && sortByLiquidityParam !== 'true' && {
              segment: selectedIndexes.join('/'),
            }),
            ...(sortByLiquidityParam === 'true' && { sortByLiquidity: true }),
          }
        : {
            ...(searchTerm.trim() && { search: searchTerm.trim() }),
            ...(sidebarFilters
              ? convertFiltersToApiParams(sidebarFilters)
              : {}),
            ...(selectedIndexes.length > 0 &&
              !sidebarFilters && sortByLiquidityParam !== 'true' && { segment: selectedIndexes.join('/') }),
            currency: currency,
            pageSize: sortByLiquidityParam === 'true' ? 100 : 12,
            ...(sortByLiquidityParam === 'true' && { sortByLiquidity: true }),
          };

    reloadWithFilters(apiParams);

    const handleCurrencyChange = () => {
      previousParamsRef.current = '';
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('storage', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('storage', handleCurrencyChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    sidebarFilters,
    sortOption,
    isApplyingSavedFilters,
    savedCatalogFilters,
    selectedIndexes,
    searchParams,
  ]);

  const handleSortChange = useCallback((newSort: SortOption) => {
    trackEvent('sort_change', {
      sort_option: newSort,
      previous_sort: previousSortRef.current,
    });
    previousSortRef.current = newSort;
    setSortOption(newSort);
  }, []);

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
    setSortOption: handleSortChange,

    activeFilters,
    removeFilter,
    clearAllFilters,

    chipsRef,
    chipsHeight,

    loadMore,
    hasMore,
    loading,
    reloadWithFilters,
    sidebarFilters,
    setWatchesDirectly,
  };
};

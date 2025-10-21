import { SortOption, SortFunction } from '@/types/sorting';
import type { WatchItem } from '@/interfaces';

export const sortByPriceAsc: SortFunction<WatchItem> = (a, b) => {
  return a.price - b.price;
};

export const sortByPriceDesc: SortFunction<WatchItem> = (a, b) => {
  return b.price - a.price;
};

export const sortByName: SortFunction<WatchItem> = (a, b) => {
  return a.title.localeCompare(b.title, 'uk');
};

export const sortByNewest: SortFunction<WatchItem> = (a, b) => {
  const idA = parseInt(a.id) || 0;
  const idB = parseInt(b.id) || 0;
  return idB - idA;
};

export const sortByIndexAsc: SortFunction<WatchItem> = (a, b) => {
  const indexOrder = { 'A': 1, 'B': 2, 'C': 3 };
  return (indexOrder[a.index as keyof typeof indexOrder] || 999) - 
         (indexOrder[b.index as keyof typeof indexOrder] || 999);
};

export const sortByIndexDesc: SortFunction<WatchItem> = (a, b) => {
  const indexOrder = { 'A': 1, 'B': 2, 'C': 3 };
  return (indexOrder[b.index as keyof typeof indexOrder] || 999) - 
         (indexOrder[a.index as keyof typeof indexOrder] || 999);
};

export const sortByTrend: SortFunction<WatchItem> = (a, b) => {
  return b.trend.value - a.trend.value;
};

export const sortFunctions: Record<SortOption, SortFunction<WatchItem>> = {
  [SortOption.DEFAULT]: () => 0,
  [SortOption.TREND_90_DAYS]: sortByTrend,
  [SortOption.PRICE_ASC]: sortByPriceAsc,
  [SortOption.PRICE_DESC]: sortByPriceDesc,
  [SortOption.NEWEST]: sortByNewest,
  [SortOption.NAME]: sortByName,
  [SortOption.INDEX_ASC]: sortByIndexAsc,
  [SortOption.INDEX_DESC]: sortByIndexDesc,
};

export const applySorting = (items: WatchItem[], sortOption: SortOption): WatchItem[] => {
  if (sortOption === SortOption.DEFAULT) {
    return items;
  }
  
  const sortFn = sortFunctions[sortOption];
  if (!sortFn) {
    console.warn(`Sort function not found for option: ${sortOption}`);
    return items;
  }
  
  return [...items].sort(sortFn);
};

import { WATCHES } from '@/data/watches';
import type { WatchItem } from '@/interfaces';

export function useWatches() {
  const getAll = (): WatchItem[] => WATCHES;
  const getById = (id: string): WatchItem | undefined =>
    WATCHES.find(w => w.id === id);
  const getBySlug = (slug: string): WatchItem | undefined =>
    WATCHES.find(w => w.slug === slug);
  const getManyByIds = (ids: string[]): WatchItem[] =>
    WATCHES.filter(w => ids.includes(w.id));

  return { getAll, getById, getBySlug, getManyByIds };
}
import { SortOption } from '@/types/sorting';
import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import { WatchItem, WatchIndex } from './watch';

export type { WatchItem, WatchIndex };

export interface CatalogControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedIndexes: WatchIndex[];
 onToggleIndex: (index: WatchIndex) => void; 
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  onSaveToChat: () => void;
}

export interface CatalogSidebarProps {
  title?: string;
  widthPx?: number;
  onApply?: (filters: UseCatalogFiltersReturn) => void;
  onReset?: () => void;
}

export interface CatalogGridProps {
  items: WatchItem[];
  initialCount?: number;
  onResetFilters?: () => void;
  onAskGeni?: () => void;
  onOpenFeedback?: (watchTitle: string) => void;
}

export interface WatchCardProps {
  item: WatchItem;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onOpenFeedback?: (watchTitle: string) => void;
}

export interface EmptyStateProps {
  onResetFilters: () => void;
  onAskGeni: () => void;
}

export interface SortButtonsProps{
   selectedIndexes?: WatchIndex[];  
  onToggleIndex?: (index: WatchIndex) => void;
}

export interface SortDropdownProps {
  value?: SortOption;
  onChange?: (value: SortOption) => void;
}

export interface SaveToChatButtonProps {
  onClick: () => void;
}

export interface FilterAccordionProps {
  filters: UseCatalogFiltersReturn;
}

export interface FixedSidebarProps {
  containerRef: React.RefObject<HTMLElement>;
  top?: number;
  width?: number;
  zIndex?: number;
  className?: string;
  children: React.ReactNode;
}

export type FixedSidebarMode = 'fixed' | 'abs-top' | 'abs-bottom';

export interface TabletSidebarProps {
  className?: string;
  width?: number;
  zIndex?: number;
  containerRef?: React.RefObject<HTMLElement>;
  onReset?: () => void;
  topOffset?: number;
}



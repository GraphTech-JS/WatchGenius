type ActiveFiltersBarProps = {
  chips: { id: string; label: string }[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

import React from 'react';
import { X } from 'lucide-react';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';

export const ActiveFiltersBar = React.forwardRef<
  HTMLDivElement,
  ActiveFiltersBarProps
>(({ chips, onRemove, onClearAll }, ref) => {
  if (chips.length === 0) return null;

  return (
    <div
      ref={ref}
      className='flex flex-wrap gap-2 items-center mb-5 pointer-events-none max-md:hidden'
    >
      <button
        type='button'
        onClick={onClearAll}
        className='px-3  h-[32px] rounded-full border text-[14px] hover:bg-[#04694f] hover:text-white transition-all duration-300 cursor-pointer pointer-events-auto'
        style={{ borderColor: '#04694f' }}
      >
        {t(catalogKeys.activeFilters.clearAll)}
      </button>

      {chips.map(({ id, label }) => (
        <div
          key={id}
          className='flex items-center justify-center gap-2 px-3 py-3  h-[32px] cursor-pointer rounded-full border max-w-[240px] bg-white pointer-events-auto'
          style={{ borderColor: '#04694f' }}
          title={label}
        >
          <span className='truncate'>{label}</span>
          <button
            aria-label={t(catalogKeys.activeFilters.removeFilter)}
            onClick={() => onRemove(id)}
            className='text-[#8b8b8b] hover:text-[#04694f]  cursor-pointer '
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
});
ActiveFiltersBar.displayName = 'ActiveFiltersBar';

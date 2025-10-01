'use client';

import React from 'react';
import { FilterCheckbox } from '@/components/FilterCheckbox/FilterCheckbox';

interface ShowAllConfig {
  initialCount: number;
  showAll: boolean;
  onToggleShowAll: () => void;
  disabledThreshold?: number;
  labels?: { more: string; less: string };
}

interface Props {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  showAllConfig?: ShowAllConfig;
}
export const ChecklistSection: React.FC<Props> = ({
  options,
  selected,
  onToggle,
  showAllConfig,
}) => {
  const list = showAllConfig
    ? showAllConfig.showAll
      ? options
      : options.slice(0, showAllConfig.initialCount)
    : options;

  return (
    <div className='space-y-3'>
      {list.map((opt) => (
        <FilterCheckbox
          key={opt}
          label={opt}
          checked={selected.includes(opt)}
          onChange={() => onToggle(opt)}
        />
      ))}

      {showAllConfig && (
        <button
          type='button'
          onClick={showAllConfig.onToggleShowAll}
          disabled={
            options.length <=
            (showAllConfig.disabledThreshold ?? showAllConfig.initialCount)
          }
          className='w-full text-center text-[14px] font-[var(--font-inter)] text-[#8b8b8b] underline disabled:opacity-60'
        >
          {showAllConfig.showAll
            ? showAllConfig.labels?.less ?? 'Показати менше'
            : showAllConfig.labels?.more ?? 'Показати всі'}
        </button>
      )}
    </div>
  );
};

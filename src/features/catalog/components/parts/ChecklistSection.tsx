'use client';

import React from 'react';
import { FilterCheckbox } from '@/components/FilterCheckbox/FilterCheckbox';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';

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

  const getTranslationNamespace = (opt: string): string | null => {
    const normalizedOpt = opt.toLowerCase();

    if (
      normalizedOpt === 'new' ||
      normalizedOpt === 'used' ||
      normalizedOpt === 'excellent'
    )
      return catalogKeys.filterData.conditions;

    if (
      normalizedOpt === 'automatic' ||
      normalizedOpt.includes('automatic') ||
      normalizedOpt === 'manual winding' ||
      normalizedOpt.includes('manual') ||
      normalizedOpt === 'mechanical' ||
      normalizedOpt.includes('mechanical') ||
      normalizedOpt === 'quartz' ||
      normalizedOpt.includes('quartz') ||
      normalizedOpt === 'kinetic' ||
      normalizedOpt.includes('kinetic') ||
      normalizedOpt.includes('spring')
    )
      return catalogKeys.filterData.mechanisms;

    if (
      normalizedOpt === 'gold' ||
      normalizedOpt === 'ceramic' ||
      normalizedOpt === 'steel' ||
      normalizedOpt === 'silver' ||
      normalizedOpt === 'titanium' ||
      normalizedOpt === 'platinum' ||
      normalizedOpt === 'rose' ||
      normalizedOpt === 'white' ||
      normalizedOpt === 'yellow'
    )
      return catalogKeys.filterData.materials;

    if (
      normalizedOpt.includes('box') ||
      normalizedOpt.includes('papers') ||
      normalizedOpt.includes('fullset') ||
      normalizedOpt.includes('full set')
    )
      return catalogKeys.filterData.documents;

    if (
      normalizedOpt === 'europe' ||
      normalizedOpt === 'asia' ||
      normalizedOpt === 'america' ||
      normalizedOpt.includes('united states')
    )
      return catalogKeys.filterData.locations;

    return null;
  };
  return (
    <div className='space-y-3'>
      {list.map((opt) => {
        const ns = getTranslationNamespace(opt);
        let label = opt;

        if (ns) {
          const translationKey = `${ns}.${opt}`;
          const translation = t(translationKey);
          label = translation !== translationKey ? translation : opt;
        }

        return (
          <FilterCheckbox
            key={opt}
            label={label}
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
        );
      })}

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
            ? showAllConfig.labels?.less ?? t(catalogKeys.filter.showLess)
            : showAllConfig.labels?.more ?? t(catalogKeys.filter.showMore)}
        </button>
      )}
    </div>
  );
};

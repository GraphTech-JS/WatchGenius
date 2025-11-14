"use client";

import React from "react";
import { FilterCheckbox } from "@/components/FilterCheckbox/FilterCheckbox";
import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";
import { filterData } from "@/mock/filterData";

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
    if (filterData.conditions.includes(opt))
      return catalogKeys.filterData.conditions;
    if (filterData.mechanisms.includes(opt))
      return catalogKeys.filterData.mechanisms;
    if (filterData.materials.includes(opt))
      return catalogKeys.filterData.materials;
    if (filterData.documents.includes(opt))
      return catalogKeys.filterData.documents;
    if (filterData.locations.includes(opt))
      return catalogKeys.filterData.locations;
    return null;
  };
  return (
    <div className="space-y-3">
      {list.map((opt) => {
        const ns = getTranslationNamespace(opt);
        const label = ns ? t(`${ns}.${opt}`) : opt;

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
          type="button"
          onClick={showAllConfig.onToggleShowAll}
          disabled={
            options.length <=
            (showAllConfig.disabledThreshold ?? showAllConfig.initialCount)
          }
          className="w-full text-center text-[14px] font-[var(--font-inter)] text-[#8b8b8b] underline disabled:opacity-60"
        >
          {showAllConfig.showAll
            ? showAllConfig.labels?.less ?? t(catalogKeys.filter.showLess)
            : showAllConfig.labels?.more ?? t(catalogKeys.filter.showMore)}
        </button>
      )}
    </div>
  );
};

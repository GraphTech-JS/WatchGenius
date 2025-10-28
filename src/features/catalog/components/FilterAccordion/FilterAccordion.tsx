'use client';

import React, { useState } from 'react';

import { Accordion } from '@/components/ui/Accordion';
import { filterData } from '@/mock/filterData';
import { FilterCheckbox } from '@/components/FilterCheckbox/FilterCheckbox';
import { onlyDigits, formatDigits, onlyYearDigits } from '@/utils/format';
import type { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import { ChecklistSection } from '@/features/catalog/components/parts/ChecklistSection';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';
import { a11yKeys } from '@/i18n/keys/accessibility';

type Props = {
  filters: UseCatalogFiltersReturn;
};

export const FilterAccordion: React.FC<Props> = ({ filters }) => {
  const {
    visibleBrands,
    filteredBrands,
    selectedBrands,
    showAllBrands,
    setShowAllBrands,
    toggleBrand,

    priceFrom,
    priceTo,
    currency,
    setPriceFrom,
    setPriceTo,

    selectedIndexes,
    toggleIndex,
    openKeys,
    setOpenKeys,

    yearFrom,
    yearTo,
    setYearFrom,
    setYearTo,

    selectedConditions,
    toggleCondition,
    selectedMechanisms,
    toggleMechanism,
    mechanismShowAll,
    setMechanismShowAll,
    selectedMaterials,
    toggleMaterial,
    selectedDocuments,
    toggleDocument,
    selectedLocations,
    toggleLocation,
  } = filters;

  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);
  const [yearFromFocus, setYearFromFocus] = useState(false);
  const [yearToFocus, setYearToFocus] = useState(false);

  const items = filterData.sections.map((section) => ({
    key: section,
    title: t(`catalog.filterSections.${section}`),
    content: (
      <>
        {section === "brand" && (
          <>
            <div className='space-y-3'>
              {visibleBrands.map((brand) => (
                <FilterCheckbox
                  key={brand}
                  label={t(`${catalogKeys.filterData.brands}.${brand}`)}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
              ))}

              <button
                type='button'
                onClick={() => setShowAllBrands((v) => !v)}
                disabled={filteredBrands.length <= 5}
                className='w-full text-center text-[14px] text-[#8b8b8b] underline disabled:opacity-60'
              >
                {showAllBrands
                  ? t(catalogKeys.filter.showLess)
                  : t(catalogKeys.filter.showMore)}
              </button>
            </div>
          </>
        )}

        {section === "price" && (
          <div className="flex items-center gap-x-2 gap-y-2 max-w-[269px]">
            <label
              htmlFor='price-from'
              className='text-[14px] text-[rgba(23,20,20,0.6)]'
            >
              {t(catalogKeys.filter.from)}
            </label>
            <input
              id='price-from'
              inputMode='numeric'
              pattern='[0-9]*'
              value={isFromFocused ? priceFrom : formatDigits(priceFrom)}
              onFocus={() => setIsFromFocused(true)}
              onBlur={() => setIsFromFocused(false)}
              onChange={(e) => setPriceFrom(onlyDigits(e.target.value))}
              aria-label={t(a11yKeys.filter.priceFrom)}
              className='w-[74px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[10px] bg-white
                         text-[14px] text-[var(--text-dark)] text-center focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
            />
            <label
              htmlFor='price-to'
              className='text-[14px] text-[rgba(23,20,20,0.6)]'
            >
              {t(catalogKeys.filter.to)}
            </label>
            <input
              id='price-to'
              inputMode='numeric'
              pattern='[0-9]*'
              value={isToFocused ? priceTo : formatDigits(priceTo)}
              onFocus={() => setIsToFocused(true)}
              onBlur={() => setIsToFocused(false)}
              onChange={(e) => setPriceTo(onlyDigits(e.target.value))}
              aria-label={t(a11yKeys.filter.priceTo)}
              className='w-[84px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[10px] bg-white
                         text-[14px] text-[var(--text-dark)] text-center focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
            />
            <div
              className='w-[40px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[10px] bg-white
                            text-[14px] text-[var(--text-dark)] flex items-center justify-center select-none'
              aria-hidden='true'
            >
              {currency}
            </div>
          </div>
        )}

        {section === "index" && (
          <div className="flex gap-2 items-center">
            {filterData.indexButtons.map((btn) => {
              const active = selectedIndexes.includes(btn);
              return (
                <button
                  key={btn}
                  type='button'
                  onClick={() => toggleIndex(btn)}
                  className={`w-[76px] h-[26px] border rounded-[15px] px-[21px] text-[14px] font-medium transition-colors
                    flex items-center justify-center cursor-pointer
                    ${
                      active
                        ? 'bg-[#04694f] text-white border-[#04694f]'
                        : 'bg-white text-[var(--text-dark)] border-[rgba(23,20,20,0.3)] hover:bg-[#04694f] hover:text-white'
                    }`}
                  aria-pressed={active}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        )}

        {section === "condition" && (
          <ChecklistSection
            options={filterData.conditions}
            selected={selectedConditions}
            onToggle={toggleCondition}
          />
        )}

        {section === "mechanism" && (
          <ChecklistSection
            options={filterData.mechanisms}
            selected={selectedMechanisms}
            onToggle={toggleMechanism}
            showAllConfig={{
              initialCount: 4,
              showAll: mechanismShowAll,
              onToggleShowAll: () => setMechanismShowAll((v) => !v),
              disabledThreshold: 4,
            }}
          />
        )}

        {section === "material" && (
          <ChecklistSection
            options={filterData.materials}
            selected={selectedMaterials}
            onToggle={toggleMaterial}
          />
        )}

        {section === "year" && (
          <div className="flex items-center gap-x-2 gap-y-2 max-w-[269px]">
            <label
              htmlFor='year-from'
              className='text-[14px] text-[rgba(23,20,20,0.6)]'
            >
              {t(catalogKeys.filter.from)}
            </label>
            <input
              id='year-from'
              inputMode='numeric'
              pattern='[0-9]*'
              value={yearFromFocus ? yearFrom : yearFrom}
              onFocus={() => setYearFromFocus(true)}
              onBlur={() => setYearFromFocus(false)}
              onChange={(e) => setYearFrom(onlyYearDigits(e.target.value))}
              aria-label={t(a11yKeys.filter.yearFrom)}
              className='w-[74px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[10px] bg-white
                         text-[14px] text-[var(--text-dark)] text-center focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
            />
            <label
              htmlFor='year-to'
              className='text-[14px] text-[rgba(23,20,20,0.6)]'
            >
              {t(catalogKeys.filter.to)}
            </label>
            <input
              id='year-to'
              inputMode='numeric'
              pattern='[0-9]*'
              value={yearToFocus ? yearTo : yearTo}
              onFocus={() => setYearToFocus(true)}
              onBlur={() => setYearToFocus(false)}
              onChange={(e) => setYearTo(onlyYearDigits(e.target.value))}
              aria-label={t(a11yKeys.filter.yearTo)}
              className='w-[84px] h-[31px] border border-[rgba(23,20,20,0.3)] rounded-[10px] bg-white
                         text-[14px] text-[var(--text-dark)] text-center focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
            />
            <span
              className='text-[14px] text-[rgba(23,20,20,0.6)]'
              aria-hidden='true'
            >
              {t(catalogKeys.filter.year)}
            </span>
          </div>
        )}

        {section === "documents" && (
          <ChecklistSection
            options={filterData.documents}
            selected={selectedDocuments}
            onToggle={toggleDocument}
          />
        )}

        {section === "location" && (
          <ChecklistSection
            options={filterData.locations}
            selected={selectedLocations}
            onToggle={toggleLocation}
          />
        )}
      </>
    ),
  }));

  return (
    <Accordion items={items} openKeys={openKeys} onOpenChange={setOpenKeys} />
  );
};

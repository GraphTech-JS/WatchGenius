'use client';
import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { FilterCheckbox } from '@/components/FilterCheckbox/FilterCheckbox';

interface CatalogFiltersProps {
  onApply?: () => void;
  onReset?: () => void;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  onApply,
  onReset,
}) => {
  const PANEL_W = 311;

  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<string[]>([]);

  const allBrands = [
    'Rolex',
    'Patek Philippe',
    'Vacheron Constantin',
    'Audemars Piguet',
    'Omega',
    'Tudor',
    'Cartier',
  ];
  const conditionOptions = ['Новий', 'Відмінний', 'Б/у'];
  const mechanismAll = [
    'Механічний',
    'Кварцовий',
    'Кінетичний',
    'Автоматичний',
    'Spring Drive',
  ];
  const materialOptions = ['Золото', 'Срібло', 'Титан', 'Кераміка'];
  const documentsOptions = ['Тільки з документами і коробкою'];
  const locationOptions = ['Європа', 'Азія', 'Америка'];

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedMechanisms, setSelectedMechanisms] = useState<string[]>([]);
  const [mechanismShowAll, setMechanismShowAll] = useState(false);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [priceFrom, setPriceFrom] = useState<string>('0');
  const [priceTo, setPriceTo] = useState<string>('50000');
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);
  const [currency] = useState<'€' | '$' | '₴'>('€');

  const onlyDigits = (s: string) => s.replace(/[^\d]/g, '');
  const formatDigits = (digits: string) => {
    if (!digits) return '';
    const n = parseInt(digits, 10);
    if (Number.isNaN(n)) return '';
    return n.toLocaleString('uk-UA');
  };

  const [yearFrom, setYearFrom] = useState<string>('2000');
  const [yearTo, setYearTo] = useState<string>('2005');
  const [yearFromFocus, setYearFromFocus] = useState(false);
  const [yearToFocus, setYearToFocus] = useState(false);
  const onlyYearDigits = (s: string) => s.replace(/[^\d]/g, '').slice(0, 4);

  const [indexValue, setIndexValue] = useState<'A' | 'B' | 'C' | null>(null);
  const indexButtons: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];

  const sections = [
    'Бренд',
    'Ціна',
    'Індекс',
    'Стан',
    'Механізм',
    'Матеріал',
    'Рік',
    'Документи',
    'Локація',
  ] as const;

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };
  const isOpen = (section: string) => openSections.includes(section);

  const filteredBrands = allBrands.filter((b) =>
    b.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleBrands = showAllBrands
    ? filteredBrands
    : filteredBrands.slice(0, 5);

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleReset = () => {
    setSelectedBrands([]);
    setShowAllBrands(false);

    setSelectedConditions([]);
    setSelectedMechanisms([]);
    setMechanismShowAll(false);

    setSelectedMaterials([]);
    setSelectedDocuments([]);
    setSelectedLocations([]);

    setPriceFrom('0');
    setPriceTo('50000');
    setYearFrom('2000');
    setYearTo('2005');

    setIndexValue(null);

    onReset?.();
  };

  return (
    <div
      className='rounded-[20px] p-[20px_21px_42px] shadow-sm'
      style={{
        background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
        width: `${PANEL_W}px`,
      }}
    >
      <h3 className='text-[16px] font-medium font-[var(--font-inter)] text-[var(--text-dark)] mb-6'>
        Фільтр
      </h3>

      <div className='relative mb-6'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Пошук бренду'
          className='w-[269px] h-[31px]
             border border-[rgba(23,20,20,0.3)]
             rounded-[15px]
             pl-[40px] pr-[10px]
             bg-white
             text-[14px] font-normal text-[var(--text-dark)]
             focus:outline-none focus:ring-2 focus:ring-[#04694f] focus:ring-opacity-20
             placeholder:text-[#8b8b8b]'
        />
        <span className='absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b8b8b]'>
          <FaSearch />
        </span>
      </div>

      <div className='mb-8 space-y-1'>
        {sections.map((section, index) => {
          const sectionId = `section-${section
            .toLowerCase()
            .replace(/\s+/g, '-')}`;

          return (
            <div key={section}>
              <button
                onClick={() => toggleSection(section)}
                aria-expanded={isOpen(section)}
                aria-controls={sectionId}
                className='w-full flex items-center justify-between py-3
                           text-[20px] font-medium font-[var(--font-inter)] text-[var(--text-dark)]
                           cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04694f]/20 rounded-[8px]
                           transition-colors duration-200 '
              >
                <span>{section}</span>
                <FaChevronDown
                  className={`text-[20px] transition-all duration-300 ease-in-out ${
                    isOpen(section)
                      ? 'rotate-180 text-[#04694f]'
                      : 'text-[var(--text-dark)]'
                  }`}
                />
              </button>

              <div
                id={sectionId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen(section)
                    ? 'pb-3 opacity-100 max-h-[500px]'
                    : 'pb-0 max-h-0 opacity-0'
                }`}
              >
                <div className='pt-2'>
                  {section === 'Бренд' && (
                    <div className='space-y-3'>
                      {visibleBrands.map((brand) => (
                        <FilterCheckbox
                          key={brand}
                          label={brand}
                          checked={selectedBrands.includes(brand)}
                          onChange={() =>
                            setSelectedBrands((prev) =>
                              prev.includes(brand)
                                ? prev.filter((v) => v !== brand)
                                : [...prev, brand]
                            )
                          }
                        />
                      ))}

                      <button
                        type='button'
                        onClick={() => setShowAllBrands((v) => !v)}
                        disabled={filteredBrands.length <= 5}
                        className='w-full text-center text-[14px] font-[var(--font-inter)] text-[#8b8b8b] underline disabled:opacity-60'
                      >
                        {showAllBrands ? 'Показати менше' : 'Показати всі'}
                      </button>
                    </div>
                  )}

                  {section === 'Ціна' && (
                    <div className='flex  items-center gap-x-2 gap-y-2 max-w-[269px]'>
                      <span className='text-[14px] text-[rgba(23,20,20,0.6)]'>
                        Від
                      </span>
                      <input
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={
                          isFromFocused ? priceFrom : formatDigits(priceFrom)
                        }
                        onFocus={() => setIsFromFocused(true)}
                        onBlur={() => setIsFromFocused(false)}
                        onChange={(e) =>
                          setPriceFrom(onlyDigits(e.target.value))
                        }
                        className='w-[74px] h-[31px]
                                   border border-[rgba(23,20,20,0.3)]
                                   rounded-[10px]
                                   bg-white
                                   text-[14px] text-[var(--text-dark)] text-center
                                   focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
                      />
                      <span className='text-[14px] text-[rgba(23,20,20,0.6)]'>
                        До
                      </span>
                      <input
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={isToFocused ? priceTo : formatDigits(priceTo)}
                        onFocus={() => setIsToFocused(true)}
                        onBlur={() => setIsToFocused(false)}
                        onChange={(e) => setPriceTo(onlyDigits(e.target.value))}
                        className='w-[84px] h-[31px]
                                   border border-[rgba(23,20,20,0.3)]
                                   rounded-[10px]
                                   bg-white
                                   text-[14px] text-[var(--text-dark)] text-center
                                   focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
                      />
                      <div
                        className='w-[40px] h-[31px]
                                   border border-[rgba(23,20,20,0.3)]
                                   rounded-[10px]
                                   bg-white
                                   text-[14px] text-[var(--text-dark)]
                                   flex items-center justify-center select-none'
                        title='Валюта'
                      >
                        {currency}
                      </div>
                    </div>
                  )}

                  {section === 'Індекс' && (
                    <div className='flex gap-2 items-center'>
                      {indexButtons.map((btn) => {
                        const active = indexValue === btn;
                        return (
                          <button
                            key={btn}
                            type='button'
                            onClick={() =>
                              setIndexValue((prev) =>
                                prev === btn ? null : btn
                              )
                            }
                            className={`
            w-[76px] h-[26px]
            border border-[rgba(23,20,20,0.3)]
            rounded-[15px]
            px-[21px] 
            text-[14px] font-medium
            transition-colors
            flex items-center justify-center
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04694f]/20
            cursor-pointer
            ${
              active
                ? 'bg-[#04694f] text-white border-[#04694f]'
                : 'bg-white text-[var(--text-dark)] border-[rgba(23,20,20,0.3)] hover:bg-[#04694f] hover:text-white'
            }
          `}
                            aria-pressed={active}
                          >
                            {' '}
                            {btn}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {section === 'Стан' && (
                    <div className='space-y-3'>
                      {conditionOptions.map((opt) => (
                        <FilterCheckbox
                          key={opt}
                          label={opt}
                          checked={selectedConditions.includes(opt)}
                          onChange={() =>
                            setSelectedConditions((prev) =>
                              toggleInArray(prev, opt)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}

                  {section === 'Механізм' && (
                    <div className='space-y-3'>
                      {(mechanismShowAll
                        ? mechanismAll
                        : mechanismAll.slice(0, 4)
                      ).map((opt) => (
                        <FilterCheckbox
                          key={opt}
                          label={opt}
                          checked={selectedMechanisms.includes(opt)}
                          onChange={() =>
                            setSelectedMechanisms((prev) =>
                              toggleInArray(prev, opt)
                            )
                          }
                        />
                      ))}

                      <button
                        type='button'
                        onClick={() => setMechanismShowAll((v) => !v)}
                        disabled={mechanismAll.length <= 4}
                        className='w-full text-center text-[14px] font-[var(--font-inter)] text-[#8b8b8b] underline disabled:opacity-60'
                      >
                        {mechanismShowAll ? 'Показати менше' : 'Показати всі'}
                      </button>
                    </div>
                  )}

                  {section === 'Матеріал' && (
                    <div className='space-y-3'>
                      {materialOptions.map((opt) => (
                        <FilterCheckbox
                          key={opt}
                          label={opt}
                          checked={selectedMaterials.includes(opt)}
                          onChange={() =>
                            setSelectedMaterials((prev) =>
                              toggleInArray(prev, opt)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}

                  {section === 'Рік' && (
                    <div className='flex  items-center gap-x-2 gap-y-2 max-w-[269px]'>
                      <span className='text-[14px] text-[rgba(23,20,20,0.6)]'>
                        З
                      </span>
                      <input
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={yearFromFocus ? yearFrom : yearFrom}
                        onFocus={() => setYearFromFocus(true)}
                        onBlur={() => setYearFromFocus(false)}
                        onChange={(e) =>
                          setYearFrom(onlyYearDigits(e.target.value))
                        }
                        className='w-[74px] h-[31px]
                                   border border-[rgba(23,20,20,0.3)]
                                   rounded-[10px]
                                   bg-white
                                   text-[14px] text-[var(--text-dark)] text-center
                                   focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
                      />
                      <span className='text-[14px] text-[rgba(23,20,20,0.6)]'>
                        До
                      </span>
                      <input
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={yearToFocus ? yearTo : yearTo}
                        onFocus={() => setYearToFocus(true)}
                        onBlur={() => setYearToFocus(false)}
                        onChange={(e) =>
                          setYearTo(onlyYearDigits(e.target.value))
                        }
                        className='w-[84px] h-[31px]
                                   border border-[rgba(23,20,20,0.3)]
                                   rounded-[10px]
                                   bg-white
                                   text-[14px] text-[var(--text-dark)] text-center
                                   focus:outline-none focus:ring-2 focus:ring-[#04694f]/20'
                      />
                      <span className='text-[14px] text-[rgba(23,20,20,0.6)]'>
                        Рік
                      </span>
                    </div>
                  )}

                  {section === 'Документи' && (
                    <div className='space-y-3'>
                      {documentsOptions.map((opt) => (
                        <FilterCheckbox
                          key={opt}
                          label={opt}
                          checked={selectedDocuments.includes(opt)}
                          onChange={() =>
                            setSelectedDocuments((prev) =>
                              toggleInArray(prev, opt)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}

                  {section === 'Локація' && (
                    <div className='space-y-3'>
                      {locationOptions.map((opt) => (
                        <FilterCheckbox
                          key={opt}
                          label={opt}
                          checked={selectedLocations.includes(opt)}
                          onChange={() =>
                            setSelectedLocations((prev) =>
                              toggleInArray(prev, opt)
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {index < sections.length - 1 && (
                <div className='h-px bg-[rgba(23,20,20,0.1)] mx-2' />
              )}
            </div>
          );
        })}
      </div>

      <div className='space-y-3'>
        <button
          onClick={onApply}
          className='w-[269px] h-[40px]
                     bg-[#04694f] text-white
                     rounded-[10px]
                     px-[137px] py-[15px]
                     font-[var(--font-inter)] font-normal text-[20px]
                     hover:bg-[#035a3f] transition-colors
                     flex items-center justify-center
                     cursor-pointer'
        >
          Застосувати
        </button>

        <button
          onClick={handleReset}
          className='w-[269px] h-[40px]
                     text-[#04694f] border border-[#04694f]
                     rounded-[10px]
                     px-[137px] py-[15px]
                     font-[var(--font-inter)] font-normal text-[20px]
                     hover:bg-white transition-colors
                     flex items-center justify-center
                     cursor-pointer'
          style={{
            background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
          }}
        >
          Скинути
        </button>
      </div>
    </div>
  );
};

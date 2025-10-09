'use client';
import React, { useEffect, useRef, useState, useId, useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './SortDropdown.module.css';
import { SortOption } from '@/types/sorting';

interface SortDropdownProps {
  value?: SortOption;
  onChange?: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value = SortOption.DEFAULT,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const optionsToRender = useMemo(() => {
    const baseOptions = [
      SortOption.TREND_90_DAYS,
      SortOption.PRICE_ASC,
      SortOption.PRICE_DESC,
      SortOption.NEWEST,
      SortOption.NAME,
      SortOption.INDEX_ASC,
      SortOption.INDEX_DESC,
    ];

    return value === SortOption.DEFAULT
      ? baseOptions
      : [SortOption.DEFAULT, ...baseOptions];
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleOptionClick = (option: SortOption) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      className='relative w-full md:w-[194px] lg:w-[252px]'
      ref={dropdownRef}
    >
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((o) => !o)}
        className={`relative w-full h-[51px] bg-white 
                    border border-[rgba(23, 20, 20, 0.3)] 
                    rounded-[15px] 
                    px-[20px] md:px-[12px] lg:px-[20px]
                    pr-[50px] md:pr-[36px] lg:pr-[50px]
                    py-[11px] 
                    font-medium text-[#000] flex items-center cursor-pointer 
                    ${styles.sortDropdownButton} 
                    ${isOpen ? 'rounded-b-none border-b-0' : ''}`}
      >
        <span className='truncate text-[16px] md:text-[14px] lg:text-[16px]'>
          {value}
        </span>
        <div
          className={`pointer-events-none absolute 
                      right-[20px] md:right-[12px] lg:right-[20px]
                      top-1/2 -translate-y-1/2 
                      w-4 h-4 transition-all duration-150 ease-in-out 
                      ${
                        isOpen
                          ? 'rotate-180 text-black'
                          : 'rotate-0 text-[#8b8b8b]'
                      }`}
        >
          <FaChevronDown className='w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4' />
        </div>
      </button>

      <div
        id={listId}
        role='listbox'
        className={`absolute top-full left-0 right-0 z-50 bg-white
                    ${styles.dropdownList} rounded-b-[15px] overflow-hidden
                    divide-y divide-[var(--text-dark)]
                    transform origin-top transition-all duration-150 cursor-pointer
                    ${
                      isOpen
                        ? 'opacity-100 scale-y-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 scale-y-95 -translate-y-1 invisible pointer-events-none'
                    }`}
      >
        {optionsToRender.map((option) => (
          <button
            key={option}
            type='button'
            role='option'
            aria-selected={option === value}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left 
                        px-[20px] md:px-[12px] lg:px-[20px]
                        py-[12px] md:py-[10px] lg:py-[12px]
                        font-medium 
                        text-[16px] md:text-[14px] lg:text-[16px]
                        transition-colors cursor-pointer
                        ${styles.sortDropdownButton}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

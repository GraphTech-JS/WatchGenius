'use client';
import React, { useEffect, useRef, useState, useId } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value = 'За замовчуванням',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const options = [
    'По тренду (90 днів)',
    'По ціні (зростання)',
    'По ціні (спадання)',
    'По новизні',
    'По назві',
    'За індексом (зростання)',
    'За індексом (спадання)',
  ];

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

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      className='relative inline-block w-full md:w-[194px] lg:w-[252px]'
      ref={dropdownRef}
    >
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((o) => !o)}
        className={`
          relative
          w-full h-[51px]
          bg-white 
          border border-[rgba(23, 20, 20, 0.3)]
          rounded-[15px]
          px-[20px] pr-[50px] py-[11px]
          font-medium text-[#000]
          flex items-center
          cursor-pointer
          ${styles.sortDropdownButton}

          ${isOpen ? 'rounded-b-none border-b-0' : ''}
        `}
      >
        <span className='truncate'>{value}</span>
        <div
          className={`
          pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 w-4 h-4
          transition-all duration-150 ease-in-out
          ${isOpen ? 'rotate-180 text-black' : 'rotate-0 text-[#8b8b8b]'}
        `}
        >
          <FaChevronDown className='w-4 h-4' />
        </div>
      </button>

      <div
        id={listId}
        role='listbox'
        className={`
          absolute top-full left-0 right-0 z-50
          bg-white
          ${styles.dropdownList}
          rounded-b-[15px]
          overflow-hidden
          divide-y divide-[var(--text-dark)]
          transform origin-top transition-all duration-150
          cursor-pointer
          ${
            isOpen
              ? 'opacity-100 scale-y-100 translate-y-0 visible pointer-events-auto'
              : 'opacity-0 scale-y-95 -translate-y-1 invisible pointer-events-none'
          }
        `}
      >
        {options.map((option) => (
          <button
            key={option}
            type='button'
            role='option'
            aria-selected={option === value}
            onClick={() => handleOptionClick(option)}
            className={`
              w-full text-left
              px-[20px] py-[12px]
              font-medium text-[16px]
              transition-colors
              cursor-pointer
              ${styles.sortDropdownButton}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

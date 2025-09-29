'use client';
import React, { useId } from 'react';

export interface FilterCheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  id,
  label,
  checked = false,
  disabled = false,
  onChange,
  className = '',
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`grid grid-cols-[19px_auto] items-center gap-2 select-none ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        id={checkboxId}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className='sr-only peer'
      />

      <span
        className={`
          col-start-1 row-start-1
          inline-block w-[19px] h-[19px]
          rounded-[10px] border border-[#04694f] bg-white
          peer-checked:bg-[#04694f]
          peer-focus-visible:ring-2 peer-focus-visible:ring-[#04694f]/20
        `}
        aria-hidden='true'
      />

      <svg
        className='col-start-1 row-start-1 justify-self-center self-center w-[13px] h-[8px] text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100 pointer-events-none'
        width='13'
        height='8'
        viewBox='0 0 13 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13 1.9L6.5 7.5L-4.64107e-07 1.9L1.625 0.5L6.5 4.7L11.375 0.500001L13 1.9Z'
          fill='currentColor'
        />
      </svg>

      {label && (
        <span className='text-[16px] font-[var(--font-inter)] text-[var(--text-dark)]'>
          {label}
        </span>
      )}
    </label>
  );
};

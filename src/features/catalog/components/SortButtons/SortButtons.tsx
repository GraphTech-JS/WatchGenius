'use client';
import React from 'react';

interface SortButtonsProps {
  onButtonClick?: (button: string) => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({ onButtonClick }) => {
  const buttons = ['A', 'B', 'C'];

  return (
    <div className='flex gap-[10px]'>
      {buttons.map((button) => (
        <button
          key={button}
          type='button'
          onClick={() => onButtonClick?.(button)}
          className='
            w-[51px] h-[51px]
            border border-[rgba(23,20,20,0.3)]
            rounded-[15px]
            px-[21px] py-[16px]
            font-[var(--font-inter)] font-medium text-[16px]
            transition-colors
            flex items-center justify-center
            bg-white text-black
            hover:bg-[#04694f] hover:text-white
            cursor-pointer
          '
        >
          {button}
        </button>
      ))}
    </div>
  );
};

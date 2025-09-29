'use client';
import React from 'react';
import styles from './SortButtons.module.css';

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
          className={`${styles.sortButtons} flex items-center justify-center gap-2 text-[var(--text-dark)]  transition-colors`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

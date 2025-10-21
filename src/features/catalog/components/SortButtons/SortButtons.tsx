'use client';
import React from 'react';
import { SortButtonsProps, WatchIndex } from '@/interfaces';

import styles from './SortButtons.module.css';

export const SortButtons: React.FC<SortButtonsProps> = ({
  selectedIndexes,
  onToggleIndex,
}) => {
 const buttons: WatchIndex[] = ['A', 'B', 'C']; 

  return (
    <div className='flex gap-[10px]'>
      {buttons.map((button) => {
        const isActive = selectedIndexes?.includes(button) || false;

        const buttonStyle = {
          backgroundColor: isActive ? '#04694f' : 'white',
          color: isActive ? 'white' : 'var(--text-dark)',
          borderColor: isActive ? '#04694f' : 'rgba(23, 20, 20, 0.3)',
        };

        return (
          <button
            key={button}
            type='button'
            onClick={() => onToggleIndex?.(button)}
            className={`${styles.sortButtons} ${isActive ? styles.active : ''}`}
            style={buttonStyle}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

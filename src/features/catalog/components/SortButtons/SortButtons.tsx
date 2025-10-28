'use client';
import React from 'react';
import { SortButtonsProps } from '@/interfaces/catalog';
import { WatchIndex } from '@/interfaces/watch';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';

import styles from './SortButtons.module.css';

export const SortButtons: React.FC<SortButtonsProps> = ({
  selectedIndexes,
  onToggleIndex,
}) => {
  const buttons: WatchIndex[] = ['A', 'B', 'C'];

  const getAriaLabel = (index: WatchIndex) => {
    switch (index) {
      case 'A':
        return t(a11yKeys.catalog.indexA);
      case 'B':
        return t(a11yKeys.catalog.indexB);
      case 'C':
        return t(a11yKeys.catalog.indexC);
    }
  };

  return (
    <div
      className='flex gap-[10px]'
      role='group'
      aria-label='Фільтр за індексом'
    >
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
            aria-label={getAriaLabel(button)}
            aria-pressed={isActive}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

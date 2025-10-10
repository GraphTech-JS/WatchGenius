'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onResetFilters: () => void;
  onAskGeni: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  onAskGeni,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.emptyState}>
      <div className={styles.content}>
        <h2 className={`${styles.title}`}>Нічого не знайдено</h2>
        <p className={`${styles.description} font-[var(--font-inter)]`}>
          Спробуйте змінити налаштування фільтрів або запитайте у Geni, який
          годинник вас може зацікавити
        </p>

        <div className={styles.actions}>
          <button
            onClick={onResetFilters}
            className={styles.resetButton}
            type='button'
          >
            <Image
              src='/icons/FilterCatalog.svg'
              alt='Filter icon'
              width={20}
              height={20}
              className={styles.filterIcon}
            />
            Скинути фільтри
          </button>

          <button
            onClick={onAskGeni}
            className={styles.askButton}
            type='button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={
                isHovered
                  ? '/icons/RobotCatalogWhite.svg'
                  : '/icons/RobotCatalog.svg'
              }
              alt='Robot icon'
              width={20}
              height={20}
              className={styles.robotIcon}
            />
            Запитай у Geni
          </button>
        </div>
      </div>
    </div>
  );
};

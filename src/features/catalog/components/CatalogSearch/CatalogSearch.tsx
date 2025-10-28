'use client';
import React from 'react';
import styles from './CatalogSearch.module.css';
import Image from 'next/image';
import { CatalogSearchIcon } from '../../../../../public/catalogPage';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  value,
  onChange,
  placeholder = 'Пошук бренду, моделі або референсу...',
}) => {
  return (
    <div className='relative w-full'>
      <label htmlFor='catalog-search' className='sr-only'>
        {t(a11yKeys.catalog.search)}
      </label>
      <input
        id='catalog-search'
        type='search'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.catalogSearch} w-full`}
        aria-label={t(a11yKeys.catalog.search)}
      />
      <div className={styles.iconWrapper} aria-hidden='true'>
        <Image
          src={CatalogSearchIcon}
          alt=''
          width={20}
          height={20}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

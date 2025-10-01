'use client';
import React from 'react';
import styles from './CatalogSearch.module.css';
import Image from 'next/image';
import { CatalogSearchIcon } from '../../../../../public/catalogPage';

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
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.catalogSearch} w-full`}
      />
      <div className={styles.iconWrapper}>
        <Image
          src={CatalogSearchIcon}
          alt='CatalogSearchIcon'
          width={20}
          height={20}
          className={styles.icon}
        />
      </div>
    </div>
  );
};
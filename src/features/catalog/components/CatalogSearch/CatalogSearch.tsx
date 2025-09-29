'use client';
import React from 'react';
import styles from './CatalogSearch.module.css';
import Image from 'next/image';
import { CatalogSearchIcon as CatalogSearchIcon } from '../../../../../public/catalogPage';

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
    <div className='relative'>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.catalogSearch} w-[426px] h-[51px] 
                   border border-[rgba(23,20,20,0.3)] 
                   rounded-[15px] 
                   pl-[68px] pr-[19px] py-[16px] 
                   bg-white 
                  `}
      />
      <div className='absolute left-[21px] top-1/2 -translate-y-1/2'>
        <Image src={CatalogSearchIcon} alt='CatalogSearchIcon' className='w-5 h-5 text-[#8b8b8b]' />
      </div>
    </div>
  );
};

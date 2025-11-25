'use client';
import React from 'react';
import { ClockLoader } from 'react-spinners';

export const ProductLoading: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
      <p className='text-[#8b8b8b] text-[20px] font-[var(--font-inter)]'>
        Завантаження...
      </p>
    </div>
  );
};

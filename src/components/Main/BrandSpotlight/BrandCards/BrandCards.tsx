'use client';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductsTable/ProductCard/ProductCard';
import type { IWatch } from '@/interfaces';

interface BrandCardsProps {
  items: IWatch[];
}

export const BrandCards: React.FC<BrandCardsProps> = ({ items }) => {
  const [cols, setCols] = useState<2 | 3 | 4>(2);
  const [isLt1024, setIsLt1024] = useState<boolean>(true);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      setIsLt1024(width < 1024);
      setIsTablet(width >= 768 && width < 1024);
      if (width >= 1024) setCols(3);
      else if (width >= 768) setCols(4);
      else setCols(2);
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const visibleItems = items.slice(0, cols);

  return (
    <div
      className={`grid gap-2 md:gap-5 w-full lg:gap-8 xl:gap-12.5`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {visibleItems.map((watch) => (
        <ProductCard
          key={watch.id}
          {...watch}
          height={isTablet ? 260 : isLt1024 ? 240 : undefined}
          dense={isLt1024}
          className='w-full max-w-full'
        />
      ))}
    </div>
  );
};

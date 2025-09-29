'use client';

import React, { useMemo, useState } from 'react';
import { WatchCard } from '@/features/catalog/components/CatalogGrid/WatchCard/WatchCard';
import type { WatchItem } from '@/mock/watches';

type Props = {
  items: WatchItem[];
  initialCount?: number; 
};

export const CatalogGrid: React.FC<Props> = ({ items, initialCount = 24 }) => {
  const [showAll, setShowAll] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const visible = useMemo(
    () => (showAll ? items : items.slice(0, initialCount)),
    [showAll, items, initialCount]
  );

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const canToggle = items.length > initialCount;

  return (
    <>
      <div className='grid grid-cols-1 gap-[17px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {visible.map((item) => (
          <WatchCard
            key={item.id}
            item={item}
            liked={liked.has(item.id)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>

      {canToggle && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={() => setShowAll((v) => !v)}
            className='w-full text-center text-[14px] text-[#8b8b8b] underline cursor-pointer disabled:opacity-60 flex items-center justify-center'
          >
            {showAll ? 'Показати менше' : 'Показати ще'}
          </button>
        </div>
      )}
    </>
  );
};

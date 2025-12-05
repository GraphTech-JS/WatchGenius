'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { WatchCard } from '@/features/catalog/components/CatalogGrid/WatchCard/WatchCard';
import { EmptyState } from '@/features/catalog/components/CatalogGrid/EmptyState/EmptyState';
import { useWishlistContext } from '@/context/WishlistContext';
import type { WatchItem } from '@/interfaces';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';
import { WatchCardSkeleton } from '@/features/catalog/components/CatalogGrid/WatchCard/WatchCardSkeleton';

type Props = {
  items: WatchItem[];
  initialCount?: number;
  onResetFilters?: () => void;
  onAskGeni?: () => void;
  onOpenFeedback?: (watchTitle: string) => void;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loading?: boolean;
};

export const CatalogGrid: React.FC<Props> = ({
  items,
  initialCount = 30,
  onResetFilters,
  onAskGeni,
  onOpenFeedback,
  onLoadMore,
  hasMore = false,
  loading = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  const { isInWishlist, addToWishlist, removeFromWishlist } =
    useWishlistContext();

  useEffect(() => {
    if (!hasMore && items.length > initialCount) {
      setShowAll(true);
    }
  }, [hasMore, items.length, initialCount]);

  const visible = useMemo(() => {
    if (hasMore) {
      return items;
    }

    if (!showAll && items.length > initialCount) {
      return items.slice(0, initialCount);
    }

    return items;
  }, [items, hasMore, showAll, initialCount]);

  const handleToggleLike = (id: string) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      const watch = items.find((item) => item.id === id);
      if (watch) {
        addToWishlist(watch);
      }
    }
  };

  useEffect(() => {
    if (!hasMore) return;
    if (!onLoadMore) return;

    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (isLoading || isLoadingRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);

        try {
          await onLoadMore();
        } catch (error) {
          console.error('Error loading more watches:', error);
        } finally {
          isLoadingRef.current = false;
          setIsLoading(false);
        }
      },
      { root: null, rootMargin: '120px', threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, onLoadMore, isLoading]);

  if (loading && items.length === 0) {
    return (
      <div className='grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 12 }).map((_, index) => (
          <WatchCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        onResetFilters={onResetFilters || (() => {})}
        onAskGeni={onAskGeni || (() => {})}
      />
    );
  }

  const canCollapse = !hasMore && items.length > initialCount;
  const showButton = (hasMore && !!onLoadMore) || canCollapse;

  let buttonText = '';
  let ariaLabel = '';

  if (hasMore) {
    buttonText = t(catalogKeys.page.showMore);
    ariaLabel = 'Показати більше годинників';
  } else if (canCollapse && showAll) {
    buttonText = t(catalogKeys.page.showLess);
    ariaLabel = 'Згорнути список годинників';
  } else if (canCollapse && !showAll) {
    buttonText = t(catalogKeys.page.showMore);
    ariaLabel = 'Показати більше годинників';
  }

  return (
    <>
      <div className='grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
        {visible.map((item, index) => (
          <WatchCard
            key={item.id}
            item={item}
            liked={isInWishlist(item.id)}
            onToggleLike={handleToggleLike}
            onOpenFeedback={onOpenFeedback}
            priority={index === 0}
            positionInGrid={index + 1}
          />
        ))}
      </div>

      {showButton && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={async () => {
              if (isLoading) return;

              if (hasMore && onLoadMore && !isLoadingRef.current) {
                isLoadingRef.current = true;
                setIsLoading(true);
                try {
                  await onLoadMore();
                } catch (error) {
                  console.error('Error loading more watches:', error);
                } finally {
                  isLoadingRef.current = false;
                  setIsLoading(false);
                }
                return;
              }

              if (canCollapse) {
                setShowAll((prev) => !prev);
              }
            }}
            disabled={isLoading}
            className='w-full text-center text-[20px] text-[#8b8b8b] underline cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2'
            aria-label={ariaLabel}
          >
            {isLoading ? (
              <ClipLoader size={24} color={'#04694f'} speedMultiplier={0.9} />
            ) : (
              <>{buttonText}</>
            )}
          </button>
        </div>
      )}

      {hasMore && onLoadMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </>
  );
};

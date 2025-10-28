"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { WatchCard } from "@/features/catalog/components/CatalogGrid/WatchCard/WatchCard";
import { EmptyState } from "@/features/catalog/components/CatalogGrid/EmptyState/EmptyState";
import type { WatchItem } from "@/interfaces";
import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";

type Props = {
  items: WatchItem[];
  initialCount?: number;
  onResetFilters?: () => void;
  onAskGeni?: () => void;
  onOpenFeedback?: (watchTitle: string) => void;
};

export const CatalogGrid: React.FC<Props> = ({
  items,
  initialCount = 24,
  onResetFilters,
  onAskGeni,
  onOpenFeedback,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const suppressAutoRef = useRef(false);
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

  useEffect(() => {
    if (!canToggle) return;
    if (showAll) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (suppressAutoRef.current) {
          suppressAutoRef.current = false;
          return;
        }
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
          setShowAll(true);
          setIsLoading(false);
        }, 500);
      },
      { root: null, rootMargin: "120px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canToggle, isLoading, showAll]);

  if (items.length === 0) {
    return (
      <EmptyState
        onResetFilters={onResetFilters || (() => {})}
        onAskGeni={onAskGeni || (() => {})}
      />
    );
  }

  return (
    <>
      <div className="grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item, index) => (
          <WatchCard
            key={item.id}
            item={item}
            liked={liked.has(item.id)}
            onToggleLike={toggleLike}
            onOpenFeedback={onOpenFeedback}
            priority={index === 0}
          />
        ))}
      </div>

      {canToggle && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (isLoading) return;
              if (showAll) {
                suppressAutoRef.current = true;
                setShowAll(false);
                return;
              }
              setIsLoading(true);
              setTimeout(() => {
                setShowAll(true);
                setIsLoading(false);
              }, 500);
            }}
            disabled={isLoading}
            className="w-full text-center text-[20px] text-[#8b8b8b] underline cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            aria-label={
              showAll
                ? 'Згорнути список годинників'
                : 'Показати більше годинників'
            }
          >
            {isLoading ? (
              <ClipLoader size={24} color={"#04694f"} speedMultiplier={0.9} />
            ) : (
              <>
                {showAll
                  ? t(catalogKeys.page.showLess)
                  : t(catalogKeys.page.showMore)}
              </>
            )}
          </button>
        </div>
      )}

      {canToggle && !showAll && <div ref={sentinelRef} style={{ height: 1 }} />}
    </>
  );
};

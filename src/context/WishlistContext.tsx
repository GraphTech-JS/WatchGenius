'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import type { WatchItem } from '@/interfaces/watch';
import { getWatchesByIds, getWatchById } from '@/lib/api';
import { transformApiWatchFull } from '@/lib/transformers';

interface WishlistContextType {
  wishlistItems: WatchItem[];
  wishlistIds: string[];
  loading: boolean;
  error: string | null;
  addToWishlist: (watch: WatchItem | string) => void;
  removeFromWishlist: (watchId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (watchId: string) => boolean;
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WatchItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_ITEMS'; payload: WatchItem[] };

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const wishlistReducer = (
  state: WatchItem[],
  action: WishlistAction
): WatchItem[] => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return state.some((item) => item.id === action.payload.id)
        ? state
        : [...state, action.payload];

    case 'REMOVE_FROM_WISHLIST':
      return state.filter((item) => item.id !== action.payload);

    case 'CLEAR_WISHLIST':
      return [];

    case 'SET_ITEMS':
      return action.payload;

    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, dispatch] = useReducer(wishlistReducer, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wishlistIds = useMemo(
    () => wishlistItems.map((item) => item.id),
    [wishlistItems]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('⚠️ [Wishlist] SSR - skipping localStorage load');
      return;
    }

    console.log('🔍 [Wishlist] Checking localStorage...');
    const saved = localStorage.getItem('wishlist-watches');
    console.log('📦 [Wishlist] localStorage value:', saved);

    if (!saved) {
      console.log('ℹ️ [Wishlist] No saved wishlist data found');
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      console.log('📋 [Wishlist] Parsed data:', parsed);

      if (!Array.isArray(parsed)) {
        console.log(
          '⚠️ [Wishlist] Parsed data is not an array:',
          typeof parsed
        );
        return;
      }

      const ids: string[] = parsed.filter(
        (item): item is string => typeof item === 'string'
      );

      console.log('🆔 [Wishlist] Extracted IDs:', ids);

      if (ids.length === 0) {
        console.log('ℹ️ [Wishlist] No valid IDs found');
        return;
      }

      setLoading(true);
      setError(null);

      console.log('🔄 [Wishlist] Loading from API, IDs:', ids);

      getWatchesByIds(ids, 'EUR')
        .then((apiWatches) => {
          console.log(
            '✅ [Wishlist] API Response:',
            apiWatches.length,
            'watches'
          );
          console.log('📦 [Wishlist] First watch from API:', apiWatches[0]);
          const transformed = apiWatches.map(transformApiWatchFull);
          console.log(
            '🔄 [Wishlist] Transformed:',
            transformed.length,
            'watches'
          );
          dispatch({ type: 'SET_ITEMS', payload: transformed });
        })
        .catch((err) => {
          console.error('Failed to load wishlist from API:', err);
          setError(
            err instanceof Error ? err.message : 'Failed to load wishlist'
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Failed to parse wishlist data:', error);
      setError('Failed to load wishlist data');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ids = wishlistItems.map((item) => item.id);
    localStorage.setItem('wishlist-watches', JSON.stringify(ids));
  }, [wishlistItems]);

  const addToWishlist = useCallback(
    (watch: WatchItem | string) => {
      console.log(
        '➕ [Wishlist] addToWishlist called:',
        typeof watch === 'string' ? `ID: ${watch}` : `Watch object: ${watch.id}`
      );

      if (typeof watch === 'string') {
        const id = watch;
        if (wishlistIds.includes(id)) return;

        setLoading(true);
        setError(null);

        console.log('🔄 [Wishlist] Adding watch from API, ID:', id);

        getWatchById(id, 'EUR')
          .then((apiWatch) => {
            console.log(
              '✅ [Wishlist] API Response for single watch:',
              apiWatch
            );
            const transformed = transformApiWatchFull(apiWatch);
            console.log('🔄 [Wishlist] Transformed watch:', transformed);
            dispatch({ type: 'ADD_TO_WISHLIST', payload: transformed });
          })
          .catch((err) => {
            console.error('Failed to add watch to wishlist:', err);
            setError(
              err instanceof Error ? err.message : 'Failed to add watch'
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        if (wishlistIds.includes(watch.id)) {
          console.log('ℹ️ [Wishlist] Watch already in wishlist');
          return;
        }
        console.log('✅ [Wishlist] Adding watch object directly:', watch.id);
        dispatch({ type: 'ADD_TO_WISHLIST', payload: watch });
      }
    },
    [wishlistIds]
  );

  const removeFromWishlist = useCallback((watchId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: watchId });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  }, []);

  const isInWishlist = useCallback(
    (watchId: string) => {
      return wishlistItems.some((item) => item.id === watchId);
    },
    [wishlistItems]
  );

  const value: WishlistContextType = {
    wishlistItems,
    wishlistIds,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = (): WishlistContextType => {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error(
      'useWishlistContext must be used within a WishlistProvider'
    );
  }

  return context;
};

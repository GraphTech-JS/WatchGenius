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
import { Toast } from '@/components/Toast/Toast';
import { t } from '@/i18n';
import { wishlistKeys } from '@/i18n/keys/wishlist';

const MAX_WISHLIST_ITEMS = 3;
interface WishlistContextType {
  wishlistItems: WatchItem[];
  wishlistIds: string[];
  loading: boolean;
  error: string | null;
  addToWishlist: (watch: WatchItem | string) => void;
  removeFromWishlist: (watchId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (watchId: string) => boolean;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const wishlistIds = useMemo(
    () => wishlistItems.map((item) => item.id),
    [wishlistItems]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const saved = localStorage.getItem('wishlist-watches');

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return;
      }

      let cachedItems: WatchItem[] = [];
      let ids: string[] = [];

      if (parsed.length > 0) {
        if (typeof parsed[0] === 'string') {
          ids = parsed.filter(
            (item): item is string => typeof item === 'string'
          );
        } else {
          cachedItems = parsed.filter(
            (item): item is WatchItem =>
              typeof item === 'object' && item !== null && 'id' in item
          );
          ids = cachedItems.map((item) => item.id);
        }
      }

      if (ids.length === 0) {
        return;
      }

      if (cachedItems.length > 0) {
        const itemsToShow = cachedItems.slice(0, MAX_WISHLIST_ITEMS);
        dispatch({ type: 'SET_ITEMS', payload: itemsToShow });
      }

      setLoading(true);
      setError(null);

      getWatchesByIds(ids, 'EUR')
        .then((apiWatches) => {
          const transformed = apiWatches.map((watch) =>
            transformApiWatchFull(watch, 'EUR')
          );

          if (transformed.length > MAX_WISHLIST_ITEMS) {
            dispatch({
              type: 'SET_ITEMS',
              payload: transformed.slice(0, MAX_WISHLIST_ITEMS),
            });
          } else {
            dispatch({ type: 'SET_ITEMS', payload: transformed });
          }
        })
        .catch((err) => {
          console.error('Failed to load wishlist from API:', err);
          if (cachedItems.length === 0) {
            setError(
              err instanceof Error ? err.message : 'Failed to load wishlist'
            );
          }
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

    if (wishlistItems.length === 0) {
      localStorage.removeItem('wishlist-watches');
      return;
    }

    localStorage.setItem('wishlist-watches', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback(
    (watch: WatchItem | string) => {
      if (wishlistItems.length >= MAX_WISHLIST_ITEMS) {
        setToastMessage(t(wishlistKeys.toast.maxItems));
        setShowToast(true);
        return;
      } else if (typeof watch === 'string') {
        const id = watch;
        if (wishlistIds.includes(id)) return;
        getWatchById(id, 'EUR')
          .then((apiWatch) => {
            const transformed = transformApiWatchFull(apiWatch, 'EUR');
            dispatch({ type: 'ADD_TO_WISHLIST', payload: transformed });
          })
          .catch((err) => {
            console.error('❌ [Wishlist] Failed to add watch:', err);
            setError(
              err instanceof Error ? err.message : 'Failed to add watch'
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        if (wishlistIds.includes(watch.id)) {
          return;
        }
        dispatch({ type: 'ADD_TO_WISHLIST', payload: watch });
      }
    },
    [wishlistIds, wishlistItems.length]
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
    showToast,
    toastMessage,
    setShowToast,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
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

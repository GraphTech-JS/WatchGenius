'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';

interface CompareContextType {
  selectedWatches: string[];
  addToCompare: (watchId: string) => void;
  removeFromCompare: (watchId: string) => void;
  clearCompare: () => void;
  isInCompare: (watchId: string) => boolean;
}

type CompareAction =
  | { type: 'ADD_TO_COMPARE'; payload: string }
  | { type: 'REMOVE_FROM_COMPARE'; payload: string }
  | { type: 'CLEAR_COMPARE' }
  | { type: 'LOAD_FROM_STORAGE'; payload: string[] };

const CompareContext = createContext<CompareContextType | undefined>(undefined);


const compareReducer = (state: string[], action: CompareAction): string[] => {
  switch (action.type) {
    case 'ADD_TO_COMPARE':
      return state.includes(action.payload)
        ? state
        : [...state, action.payload];
    case 'REMOVE_FROM_COMPARE':
      return state.filter((id) => id !== action.payload);
    case 'CLEAR_COMPARE':
      return [];
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    default:
      return state;
  }
};

export const CompareProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedWatches, dispatch] = useReducer(compareReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('compare-watches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      } catch (error) {
        console.error('Failed to load compare data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compare-watches', JSON.stringify(selectedWatches));
  }, [selectedWatches]);

  const addToCompare = (watchId: string) => {
    dispatch({ type: 'ADD_TO_COMPARE', payload: watchId });
  };

  const removeFromCompare = (watchId: string) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: watchId });
  };

  const clearCompare = () => {
    dispatch({ type: 'CLEAR_COMPARE' });
  };

  const isInCompare = (watchId: string) => {
    return selectedWatches.includes(watchId);
  };

  const value: CompareContextType = {
    selectedWatches,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export const useCompareContext = (): CompareContextType => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error(
      'useCompareContext must be used within a CompareProvider'
    );
  }
  return context;
};
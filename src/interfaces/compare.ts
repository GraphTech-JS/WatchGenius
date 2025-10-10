import type { Product } from './product';

export interface CompareProduct extends Product {
  comparisonId: string;
  isSelected?: boolean;
}

export interface CompareAnalytics {
  priceComparison: {
    min: number;
    max: number;
    average: number;
    trend: 'up' | 'down' | 'stable';
  };
  demandComparison: {
    highest: number;
    lowest: number;
    average: number;
  };
  liquidityComparison: {
    highest: number;
    lowest: number;
    average: number;
  };
  dynamicsComparison: {
    highest: number;
    lowest: number;
    average: number;
  };
}

export interface CompareHeroProps {
  products: CompareProduct[];
  onRemoveProduct: (productId: string) => void;
  onAddProduct: () => void;
  onBackToCatalog: () => void;
}

export interface CompareAnalyticsProps {
  products: CompareProduct[];
  analytics: CompareAnalytics;
}

export interface CompareTableProps {
  products: CompareProduct[];
  onRemoveProduct: (productId: string) => void;
}

export interface CompareCardProps {
  product: CompareProduct;
  onRemove: () => void;
  onSave: () => void;
  onPriceNotification: () => void;
  onShare: () => void;
  onBuy: () => void;
  onGetQuote: () => void;
}

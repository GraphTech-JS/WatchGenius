import type { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  reference: string;
  index?: 'A' | 'B' | 'C';
  price: {
    min: number;
    max: number;
    currency: '€' | '$' | '₴';
  };
  priceTrend: {
    value: number;
    period: string;
    isPositive: boolean;
  };
  image: string | StaticImageData;
  thumbnails: (string | StaticImageData)[];
  description?: string;

  details: ProductDetail[];
  
  analytics: ProductAnalytics;
  
  similarModels: SimilarModel[];
  
  sellerOffers: SellerOffer[];
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface ProductAnalytics {
  demand: number;
  liquidity: number;
  dynamics: number;
  ads: string;
  trendGauge: number;
  lastUpdated: string;
  volatility: 'Низька' | 'Середня' | 'Висока';
  liquidityLabel: 'Низька' | 'Середня' | 'Висока';
  popularity: number; 
  reportPeak: number;
  reportMin: number;
  reportChangePct: number; 
}

export interface SimilarModel {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceTrend: string;
  image: string | StaticImageData;
  index: 'A' | 'B' | 'C';
}

export interface SellerOffer {
  id: string;
  sellerName: string;
  sellerLogo?: string | StaticImageData;
  rating: number;
  reviewsCount: number;
  location: string;
  details: string;
  shipping: string;
  price: string;
  currency: '€' | '$' | '₴';
  isSecure: boolean; 
}

export interface ProductHeroProps {
  product: Product;
  onSave: () => void;
  onCompare: () => void;
  onPriceNotification: () => void;
  onShare: () => void;
  onBuy: () => void;
  onGetQuote: () => void;
  layout?: 'horizontal' | 'vertical'; 
}

export interface ProductAnalyticsProps {
  analytics: ProductAnalytics;
  activeTab: 'parameters' | 'brand' | 'price' | 'trend';
  onTabChange: (tab: 'parameters' | 'brand' | 'price' | 'trend') => void;
  details: ProductDetail[];
  brand: string;
}

export interface SimilarModelsProps {
  models: SimilarModel[];
  onCompare: () => void;
}

export interface SellerOffersProps {
  offers: SellerOffer[];
  onSortChange: (sort: string) => void;
  onRegionChange: (region: string) => void;
  onConditionChange: (condition: string) => void;
  onPurchase: (offerId: string) => void;
}

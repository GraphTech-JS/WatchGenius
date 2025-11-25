export interface ApiBrand {
  id: number;
  name: string;
  country: string;
  description: string;
  segment: string;
  brandIndex: number;
}

export interface ApiWatchResponse {
  id: string;
  name: string;
  model?: string;
  chronoUrl: string;
  image: string;
  brand: ApiBrand;
  price: number;
  defaultPrice: number; 
  currency: string;
  analytics?: ApiWatchAnalytics;
  trend90d?: number;
  priceHistory?: ApiPriceHistory[]; 
}

export interface ApiWatchListResponse {
  data: ApiWatchResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}


export interface GetWatchesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  brands?: string;
  conditions?: string;
  mechanisms?: string;
  materials?: string;
  locations?: string;
  hasDocumentsOptions?: string;
  priceRange?: string;  
  years?: string;
  currency?: string;
}

export interface ApiFiltersResponse {
  brands: string[];
  priceRange: { min: number; max: number };
  conditions: string[];
  mechanisms: string[];
  materials: string[];
  braceletMaterials: string[];
  years: number[];
  locations: string[];
  hasDocumentsOptions: string[];
}

export interface ApiErrorResponse {
  message: string;
  error: Record<string, unknown>;  
}

export interface ApiDealerResponse {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  location: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  badges: Array<Record<string, unknown>>;
  createdAt: string;
}

export interface ApiDealerFullResponse {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  location: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  badges: Array<Record<string, unknown>>;
  createdAt: string;
}

export interface ApiPriceHistory {
  price: number;
  currency: string;
  recordedAt: string;
}

export interface ApiWatchFullResponse {
  id: string;
  name: string;
  model: string;
  description: string;
  ref: string;
  chronoUrl: string;
  imageUrls: string[];
  year: number;
  mechanism: string;
  material: string;
  hasDocuments: string;
  location: string;
  condition: string;
  braceletMaterial: string;
  caseDiameter: string;
  isChronograph: boolean;
  waterResistance: boolean;
  brand: ApiBrand;
  dealer: ApiDealerFullResponse;
  priceHistory: ApiPriceHistory[];
  analytics?: ApiWatchAnalytics;
  price?: number; 
  defaultPrice?: number; 
  currency?: string; 
}

export interface ApiPopularWatchItem {
  id: string;
  name: string;
  chronoUrl: string;
  imageUrls: string[];
  brand: ApiBrand;
  dealer: ApiDealerFullResponse;
  priceHistory: ApiPriceHistory[];
}

export interface ApiPopularWatchResponse {
  popularity: number;
  watch: ApiPopularWatchItem;
}

export interface ApiPopularByBrandResponse {
  brand: string;
  watches: ApiWatchFullResponse[];
}

export interface SearchSuggestion {
  type: 'brand' | 'model' | 'watch';
  value: string;
}

export interface ApiWatchAnalytics {
  id: string;
  watchId: string;
  trend90d: number;
  trend30d: number;
  volatility: number;
  liquidity: string;
  popularity: number;
  updatedAt: string; 
}

export interface ApiWatchAnalyticsResponse {
  success: boolean;
  analytics: ApiWatchAnalytics;
}
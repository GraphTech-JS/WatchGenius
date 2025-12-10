export type ApiCurrency = 'USD' | 'EUR' | 'PLN' | 'UAH' | 'KZT';

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
  segment?: string;
  sort?: string;
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
  badges: {
    premium?: boolean;
    certified?: boolean;
  };
  createdAt: string;
  visits?: number;
}

export interface ApiDealerOffer {
  id: string;
  price: number;
  currency: string;
  buyUrl: string;
  shippingPrice: number;
  createdAt: string;
  dealer: ApiDealerFullResponse;
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
  dealerOffers?: ApiDealerOffer[];
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
  analytics?: {
    trend90d?: number;
    trend30d?: number;
    liquidity?: string;
    popularity?: number;
    volatility?: number;
  };
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

export interface ApiBrandModel{
  brand: string;
  model:string;
}

export interface CreatePriceAlertRequest {
brand: string;
model: string;
targetPrice: number;
currency: ApiCurrency;
email: string;
}

export interface ApiPriceAlertResponse {
    id: string;
  brand: string;
  model: string;
  targetPrice: number;
  currency: ApiCurrency;
  email: string;
  isActive: boolean;
  triggered: boolean;
  createdAt: string;
}


export interface ApiSegmentTrendResponse {
  segments: {
    A: ApiSegmentStats;
    B: ApiSegmentStats;
    C: ApiSegmentStats;
  };
  totalTrend: number;
  history: ApiTrendHistoryRecord[];
}

export interface ApiSegmentStats {
  trend90avg: number;
}

export interface ApiTrendHistoryRecord{
date: string;
A: number;
B: number;
C: number;
overall: number;
}


export interface ChatContextFilters {
  maxPrice?: number;
  minPrice?: number;
  brands?: string[];
  materials?: string[];
  conditions?: string[];
  mechanisms?: string[];
  maxYear?: number;
  minYear?: number;
  hasDocuments?: string[];
  locations?: string[];
}

export interface ChatContext {
  type: 'product' | 'search';
  entityId?: string;
  filters?: ChatContextFilters;
}

export interface ChatMessageRequest {
  message: string;
  guestId: string | null;
  context?: ChatContext;
}

export interface ChatMessageResponse {
  success: boolean;
  answer: string;
  role: 'assistant';
  sessionId: string;
  guestId: string;
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatHistoryResponse {
  success: boolean;
  guestId: string;
  history: ChatHistoryItem[];
}

export interface ChatClearHistoryResponse {
  success: boolean;
  message: string;
}

export interface LiquidVolumeHistoryItem {
  date: string;
  liquiditySum: number;
  volumeSum: number;
  currency: string;
}

export interface LiquidVolumeWatchItem extends ApiWatchFullResponse {
  volumeSum: number;
}

export interface LiquidVolumeResponse {
  watches: LiquidVolumeWatchItem[];
  totalLiquidity: number;
  totalVolume: {
    value: number;
    currency: string;
  };
  history: LiquidVolumeHistoryItem[];
}
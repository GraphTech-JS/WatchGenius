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
  chronoUrl: string;
  image: string;
  brand: ApiBrand;
  price: number;
  defaultPrice: number; 
  currency: string;
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
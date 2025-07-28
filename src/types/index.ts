export type Watch = {
  id: string;
  brand: string;
  model?: string;
  description?: string;
  image_url?: string;
  ref?: string;
  name?: string;
  created_at?: string;
  price_history?: PriceHistory[];
};
export type PriceHistory = {
  id: string;
  price: number;
  recorded_at: string;
};
export interface WatchesResponse {
  watches: Watch[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

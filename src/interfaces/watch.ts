export type WatchIndex = 'A' | 'B' | 'C';
export type Currency = '€' | '$' | '₴';

export type WatchItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: Currency;
  index: WatchIndex;
  image: string | import('next/image').StaticImageData;
  brandLogo?: import('next/image').StaticImageData;
  buttonLabel: string;
  trend: { value: number; period: string };
  variant?: 'product' | 'brand';

  volatility?: number;        
  volatilityLabel?: 'Низька' | 'Середня' | 'Висока'; 
  liquidity?: string;          
  liquidityLabel?: 'Низька' | 'Середня' | 'Висока'; 
  trend30d?: number;          
  trend90d?: number;          
  popularity?: number;        

  brand: string;
  condition: string;
  mechanism: string;
  material: string;
  braceletMaterial: string;
  documents: string;
  location: string;
  year: number;
  reference?: string;
  diameterMm: number;         
  waterResistance: boolean;   
  chronograph: boolean;     
  chronoUrl?:string;  
};
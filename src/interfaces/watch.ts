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

  brand: string;
  condition: string;
  mechanism: string;
  material: string;
  documents: string;
  location: string;
  year: number;
  reference?: string;
  diameterMm: number;         
  waterResistance: boolean;   
  chronograph: boolean;     
  chronoUrl?:string;  
};
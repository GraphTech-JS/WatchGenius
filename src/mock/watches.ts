import type { StaticImageData } from 'next/image';
import { RolexCatalog, RolexBrand } from '../../public/watch';

export type WatchIndex = 'A' | 'B' | 'C';
export type Currency = '€' | '$' | '₴';

export type WatchItem = {
  id: string;
  title: string;
  price: number;
  currency: Currency;
  index: WatchIndex;
  image: string | StaticImageData;
  brandLogo?: StaticImageData;
  buttonLabel: string; 
  trend: { value: number; period: string }; 
  variant?: 'product' | 'brand';
  
  // Фільтри сайдбару
  brand: string;
  condition: string;
  mechanism: string;
  material: string;
  documents: string;
  location: string;
  year: number;
};

const createWatches = (): WatchItem[] => {
  const brands = ['Rolex', 'Patek Philippe', 'Omega', 'Tudor', 'Cartier'];
  const conditions = ['Новий', 'Відмінний', 'Б/у'];
  const mechanisms = ['Механічний', 'Кварцовий', 'Автоматичний'];
  const materials = ['Золото', 'Срібло', 'Титан', 'Кераміка'];
  const documents = ['Тільки з документами і коробкою'];
  const locations = ['Європа', 'Азія', 'Америка'];
  const years = [2000, 2001, 2002, 2003, 2004, 2005]; // Роки з макету
  const indices: WatchIndex[] = ['A', 'B', 'C'];
  
  const items: WatchItem[] = [];
  
  for (let i = 0; i < 24; i++) {
    const brand = brands[i % brands.length];
    const index = indices[i % indices.length];
    const condition = conditions[i % conditions.length];
    const mechanism = mechanisms[i % mechanisms.length];
    const material = materials[i % materials.length];
    const location = locations[i % locations.length];
    const year = years[i % years.length];
    
    const isBrandCard = i % 6 === 2;
    const variant: 'product' | 'brand' = isBrandCard ? 'brand' : 'product';
    const image = isBrandCard ? RolexBrand : RolexCatalog;
    const buttonLabel = index === 'B' ? 'Get Quote' : 'Buy on Chrono24';
    const trendValue = index === 'B' ? 0 : 7;
    const price = 15000 + (i * 1000); // Різні ціни

    items.push({
      id: `w-${i + 1}`,
      title: `${brand} Submariner Oyster Perpetual`,
      price,
      currency: '€',
      index,
      image,
      brandLogo: isBrandCard ? (RolexBrand as StaticImageData) : undefined,
      buttonLabel,
      trend: { value: trendValue, period: '90d' },
      variant,
      
      brand,
      condition,
      mechanism,
      material,
      documents: documents[0],
      location,
      year,
    });
  }
  
  return items;
};

export const watchesMock: WatchItem[] = createWatches();
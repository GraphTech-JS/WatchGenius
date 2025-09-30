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
};

const baseTitle = 'Rolex Submariner Oyster Perpetual';

const createWatches = (count: number): WatchItem[] => {
  const items: WatchItem[] = [];
  for (let i = 0; i < count; i++) {
    const index = (['A', 'B', 'A', 'C'] as const)[i % 4];
    const isBrandCard = i % 6 === 2;
    const variant: 'product' | 'brand' = isBrandCard ? 'brand' : 'product';
    const image = isBrandCard ? RolexBrand : RolexCatalog;

    const buttonLabel = index === 'B' ? 'Get Quote' : 'Buy on Chrono24';
    const trendValue = index === 'B' ? 0 : 7;

    items.push({
      id: `w-${i + 1}`,
      title: baseTitle,
      price: 19500,
      currency: '€',
      index,
      image,
      brandLogo: isBrandCard ? (RolexBrand as StaticImageData) : undefined,
      buttonLabel,
      trend: { value: trendValue, period: '90d' },
      variant,
    });
  }
  return items;
};

export const watchesMock: WatchItem[] = createWatches(24);

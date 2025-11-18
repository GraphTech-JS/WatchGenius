
import { ApiWatchResponse, ApiDealerResponse } from '@/interfaces/api';
import { Currency, WatchItem, WatchIndex } from '@/interfaces/watch';
import { DealerData } from '@/types/dealers';

export function transformApiWatch(apiWatch: ApiWatchResponse): WatchItem {
  return {
    id: apiWatch.id,
    title: apiWatch.name,
    slug: generateSlug(apiWatch.name),
    price: apiWatch.price,
    currency: apiWatch.currency as Currency,
    brand: apiWatch.brand.name,
    index: calculateIndex(apiWatch.brand.brandIndex),
    image: apiWatch.image,
    chronoUrl: apiWatch.chronoUrl,    
    buttonLabel: 'Buy on Chrono24',  
    trend: calculateTrend(apiWatch.price, apiWatch.defaultPrice),  
    variant: undefined,  
    
    condition: '',  
    mechanism: '',  
    material: '',   
    documents: '',  
    location: '',   
    year: 2020,     
    diameterMm: 40, 
    waterResistance: false,  
    chronograph: false,     
    
 
    brandLogo: undefined,  
    reference: undefined, 
  };
}


function calculateIndex(brandIndex: number): WatchIndex {
  if (brandIndex <= 33) return 'A';
  if (brandIndex <= 66) return 'B';
  return 'C';
}

function calculateTrend(price: number, defaultPrice: number) {
  const change = ((price - defaultPrice) / defaultPrice) * 100;
  return {
    value: Math.round(change * 10) / 10,  
    period: '90d'
  };
}


function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function transformApiDealer(apiDealer: ApiDealerResponse): DealerData {
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext));
  };

  const imageUrl = apiDealer.logoUrl && isValidImageUrl(apiDealer.logoUrl)
    ? apiDealer.logoUrl
    : '/dealers/Dealer.webp';

  return {
    id: uuidToNumber(apiDealer.id),
    name: apiDealer.name,
    description: apiDealer.description,
    address: apiDealer.location,
    rating: `${apiDealer.rating}/5 рейтинг`,
    listings: `${apiDealer.reviewsCount}+ активних оголошень`,
    image: imageUrl,
    websiteUrl: apiDealer.websiteUrl,
  };
}

function uuidToNumber(uuid: string): number {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
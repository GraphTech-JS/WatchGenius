
import { ApiWatchResponse } from '@/interfaces/api';
import { Currency, WatchItem, WatchIndex } from '@/interfaces/watch';

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
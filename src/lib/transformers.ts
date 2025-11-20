
import { ApiWatchResponse, ApiDealerResponse, ApiWatchFullResponse } from '@/interfaces/api';
import { Currency, WatchItem, WatchIndex } from '@/interfaces/watch';
import { DealerData } from '@/types/dealers';

function convertCurrency(currency: string): Currency {
  const upperCurrency = currency.toUpperCase();
  if (upperCurrency === 'EUR' || upperCurrency === '€') return '€';
  if (upperCurrency === 'USD' || upperCurrency === '$') return '$';
  if (upperCurrency === 'UAH' || upperCurrency === '₴') return '₴';
  return '€';
}

export function transformApiWatch(apiWatch: ApiWatchResponse): WatchItem {
  return {
    id: apiWatch.id,
    title: apiWatch.name,
    slug: generateSlug(apiWatch.name),
    price: Math.round(apiWatch.price),
    currency: convertCurrency(apiWatch.currency),
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

export function transformApiWatchFull(apiWatch: ApiWatchFullResponse): WatchItem {
  const latestPrice = apiWatch.priceHistory && apiWatch.priceHistory.length > 0
    ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
    : null;

  const price = Math.round(latestPrice?.price || 0);
  const currencyCode = latestPrice?.currency || apiWatch.dealer?.location || 'EUR';
  const currency = convertCurrency(currencyCode);
  
  const defaultPrice = apiWatch.priceHistory && apiWatch.priceHistory.length > 1
    ? apiWatch.priceHistory[0].price
    : price;

  const imageUrl = apiWatch.imageUrls && apiWatch.imageUrls.length > 0
    ? apiWatch.imageUrls[0]
    : '';

  const caseDiameter = apiWatch.caseDiameter 
    ? parseFloat(apiWatch.caseDiameter.replace(/[^0-9.]/g, ''))
    : 40;

  return {
    id: apiWatch.id,
    title: apiWatch.name,
    slug: generateSlug(apiWatch.name),
    price: price,
    currency: currency,
    brand: apiWatch.brand.name,
    index: calculateIndex(apiWatch.brand.brandIndex),
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl,
    buttonLabel: 'Buy on Chrono24',
    trend: calculateTrend(price, defaultPrice),
    variant: undefined,
    condition: apiWatch.condition || '',
    mechanism: apiWatch.mechanism || '',
    material: apiWatch.material || '',
    documents: apiWatch.hasDocuments || '',
    location: apiWatch.location || '',
    year: apiWatch.year || 2020,
    diameterMm: caseDiameter,
    waterResistance: apiWatch.waterResistance || false,
    chronograph: apiWatch.isChronograph || false,
    brandLogo: undefined,
    reference: apiWatch.ref || undefined,
  };
}
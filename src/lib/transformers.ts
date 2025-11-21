import {
  ApiWatchResponse,
  ApiDealerResponse,
  ApiWatchFullResponse,
  ApiPopularWatchItem,
} from '@/interfaces/api';
import { Currency, WatchItem, WatchIndex } from '@/interfaces/watch';
import { DealerData } from '@/types/dealers';
import { getRandomWatchImage } from '@/lib/imageUtils';

function convertCurrency(currency: string): Currency {
  const upperCurrency = currency.toUpperCase();
  if (upperCurrency === 'EUR' || upperCurrency === '€') return '€';
  if (upperCurrency === 'USD' || upperCurrency === '$') return '$';
  if (upperCurrency === 'UAH' || upperCurrency === '₴') return '₴';
  return '€';
}

export function transformApiWatch(apiWatch: ApiWatchResponse): WatchItem {
  let watchTitle = apiWatch.model || apiWatch.name || '';
  watchTitle = cleanWatchTitle(watchTitle);
  const fullTitle = `${apiWatch.brand.name} ${watchTitle}`.trim();
  
  const hasValidImage = apiWatch.image &&
    apiWatch.image.trim() !== '' &&
    apiWatch.image !== 'null' &&
    apiWatch.image !== 'undefined';
  
  const imageUrl = hasValidImage
    ? apiWatch.image
    : getRandomWatchImage(apiWatch.id);
  
  return {
    id: apiWatch.id,
    title: fullTitle,
    slug: generateSlug(apiWatch.name),
    price: Math.round(apiWatch.price),
    currency: convertCurrency(apiWatch.currency),
    brand: apiWatch.brand.name,
    index: calculateIndex(apiWatch.brand.brandIndex),
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: calculateTrend(apiWatch.price, apiWatch.defaultPrice),
    variant: undefined,

    condition: '',
    mechanism: '',
    material: '',
    braceletMaterial: '',
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
    period: '90d',
  };
}

function cleanWatchTitle(title: string, condition?: string, maxLength: number = 80): string {
  if (!title || title.trim() === '') return title;
  
  let cleaned = title.trim();
  
  // Remove duplicate words/phrases (case-insensitive)
  const words = cleaned.split(/\s+/);
  const seen = new Set<string>();
  const uniqueWords: string[] = [];
  
  for (const word of words) {
    const lowerWord = word.toLowerCase();
    if (!seen.has(lowerWord)) {
      seen.add(lowerWord);
      uniqueWords.push(word);
    }
  }
  
  cleaned = uniqueWords.join(' ');
  
  // Remove phrases that are redundant with condition
  if (condition) {
    const conditionUpper = condition.toUpperCase();
    cleaned = cleaned
      .replace(/\bNEW\/UNWORN\b/gi, '')
      .replace(/\bNEW\s+UNWORN\b/gi, '')
      .replace(/\bUNWORN\b/gi, '');
    
    if (conditionUpper === 'NEW') {
      cleaned = cleaned.replace(/\bNEW\b/gi, '');
    }
  }
  
  // Remove redundant phrases
  cleaned = cleaned
    .replace(/\bwith\s+New\s+style\s+box\b/gi, '')
    .replace(/\bwith\s+box\b/gi, '')
    .replace(/\bwith\s+papers\b/gi, '')
    .replace(/\bwith\s+original\s+box\b/gi, '')
    .replace(/\bwith\s+original\s+papers\b/gi, '')
    .replace(/\b\[.*?\]\s*/g, '') // Remove text in brackets like [Bruce Wayne]
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .trim();
  
  // Limit length, but try to cut at word boundary
  if (cleaned.length > maxLength) {
    const truncated = cleaned.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.5) {
      cleaned = truncated.substring(0, lastSpace) + '...';
    } else {
      cleaned = truncated + '...';
    }
  }
  
  return cleaned.trim();
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function transformApiDealer(apiDealer: ApiDealerResponse): DealerData {
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.gif',
      '.svg',
      '.avif',
    ];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some((ext) => lowerUrl.includes(ext));
  };

  const imageUrl =
    apiDealer.logoUrl && isValidImageUrl(apiDealer.logoUrl)
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
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function transformApiPopularWatchItem(
  apiWatch: ApiPopularWatchItem
): WatchItem {
  const latestPrice =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 0
      ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
      : null;

  const price = Math.round(latestPrice?.price || 0);
  const currencyCode =
    latestPrice?.currency || apiWatch.dealer?.location || 'EUR';
  const currency = convertCurrency(currencyCode);

  const defaultPrice =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 1
      ? apiWatch.priceHistory[0].price
      : price;

  const hasValidImage = apiWatch.imageUrls && 
    apiWatch.imageUrls.length > 0 && 
    apiWatch.imageUrls[0] && 
    apiWatch.imageUrls[0].trim() !== '' &&
    apiWatch.imageUrls[0] !== 'null' &&
    apiWatch.imageUrls[0] !== 'undefined';
  
  const imageUrl = hasValidImage
    ? apiWatch.imageUrls[0]
    : getRandomWatchImage(apiWatch.id);

  let watchTitle = apiWatch.name || apiWatch.id;
  watchTitle = cleanWatchTitle(watchTitle);
  const fullTitle = `${apiWatch.brand.name} ${watchTitle}`.trim();

  return {
    id: apiWatch.id,
    title: fullTitle,
    slug: generateSlug(apiWatch.name),
    price: price,
    currency: currency,
    brand: apiWatch.brand.name,
    index: calculateIndex(apiWatch.brand.brandIndex),
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: calculateTrend(price, defaultPrice),
    variant: undefined,
    condition: '',
    mechanism: '',
    material: '',
    braceletMaterial: '',
    documents: '',
    location: apiWatch.dealer?.location || '',
    year: 2020,
    diameterMm: 40,
    waterResistance: false,
    chronograph: false,
    brandLogo: undefined,
    reference: undefined,
  };
}

export function transformApiWatchFull(
  apiWatch: ApiWatchFullResponse
): WatchItem {
  const latestPrice =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 0
      ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
      : null;

  const price = Math.round(latestPrice?.price || 0);
  const currencyCode =
    latestPrice?.currency || apiWatch.dealer?.location || 'EUR';
  const currency = convertCurrency(currencyCode);

  const defaultPrice =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 1
      ? apiWatch.priceHistory[0].price
      : price;

  const hasValidImage = apiWatch.imageUrls && 
    apiWatch.imageUrls.length > 0 && 
    apiWatch.imageUrls[0] && 
    apiWatch.imageUrls[0].trim() !== '' &&
    apiWatch.imageUrls[0] !== 'null' &&
    apiWatch.imageUrls[0] !== 'undefined';
  
  const imageUrl = hasValidImage
    ? apiWatch.imageUrls[0]
    : getRandomWatchImage(apiWatch.id);

  const caseDiameter = apiWatch.caseDiameter
    ? parseFloat(apiWatch.caseDiameter.replace(/[^0-9.]/g, ''))
    : 40;

  let watchTitle = '';
  
  // Prefer model if it exists and is meaningful
  if (apiWatch.model && apiWatch.model.trim() !== '' && apiWatch.model.length > 3) {
    watchTitle = apiWatch.model;
  } else if (apiWatch.name && apiWatch.name.trim() !== '' && apiWatch.name.length > 5) {
    // Check if name is just a reference (only uppercase letters, numbers, dashes)
    if (!/^[A-Z0-9-]+$/.test(apiWatch.name)) {
      watchTitle = apiWatch.name;
    } else {
      // If name is just a ref, try to use model or description
      if (apiWatch.model && apiWatch.model.trim() !== '') {
        watchTitle = apiWatch.model;
      } else if (apiWatch.description) {
        const descWords = apiWatch.description.split(' ').slice(0, 5).join(' ');
        watchTitle = descWords.length > 10 ? descWords : apiWatch.ref || apiWatch.name;
      } else {
        watchTitle = apiWatch.ref || apiWatch.name;
      }
    }
  } else if (apiWatch.description) {
    const descWords = apiWatch.description.split(' ').slice(0, 5).join(' ');
    watchTitle = descWords.length > 10 ? descWords : apiWatch.ref || '';
  } else {
    watchTitle = apiWatch.ref || apiWatch.id;
  }
  
  // Clean the title (remove duplicates, redundant info)
  // Use 80 chars for cards to show more complete names
  watchTitle = cleanWatchTitle(watchTitle, apiWatch.condition, 80);
  
  // If cleaned title is too short or empty, use ref as fallback
  if (!watchTitle || watchTitle.length < 3) {
    watchTitle = apiWatch.ref || apiWatch.model || apiWatch.name || '';
  }
  
  const fullTitle = `${apiWatch.brand.name} ${watchTitle}`.trim();

  return {
    id: apiWatch.id,
    title: fullTitle,
    slug: generateSlug(apiWatch.name),
    price: price,
    currency: currency,
    brand: apiWatch.brand.name,
    index: calculateIndex(apiWatch.brand.brandIndex),
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: calculateTrend(price, defaultPrice),
    variant: undefined,
    condition: apiWatch.condition || '',
    mechanism: apiWatch.mechanism || '',
    material: apiWatch.material || '',
    braceletMaterial: apiWatch.braceletMaterial || '',
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

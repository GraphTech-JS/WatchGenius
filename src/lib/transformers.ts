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

function convertVolatilityToLabel(
  volatility?: number
): 'Низька' | 'Середня' | 'Висока' {
  if (volatility === undefined || volatility === null) {
    return 'Середня';
  }
  if (volatility < 10) return 'Низька';
  if (volatility < 30) return 'Середня';
  return 'Висока';
}

function convertLiquidityToLabel(
  liquidity?: string
): 'Низька' | 'Середня' | 'Висока' {
  if (!liquidity) {
    return 'Середня';
  }

  const num = parseFloat(liquidity);
  if (isNaN(num)) {
    return 'Середня';
  }

  if (num < 50) return 'Низька';
  if (num < 80) return 'Середня';
  return 'Висока';
}

export function transformApiWatch(apiWatch: ApiWatchResponse): WatchItem {
  let watchTitle = apiWatch.model || apiWatch.name || '';
  watchTitle = cleanWatchTitle(watchTitle);
  const fullTitle = `${apiWatch.brand.name} ${watchTitle}`.trim();
  const analytics = apiWatch.analytics;

  const hasValidImage = apiWatch.image &&
    apiWatch.image.trim() !== '' &&
    apiWatch.image !== 'null' &&
    apiWatch.image !== 'undefined';

  const imageUrl = hasValidImage
    ? apiWatch.image
    : getRandomWatchImage(apiWatch.id);

  let trendValue: number;
  
  if (analytics?.trend90d !== undefined && analytics?.trend90d !== null && 
      !isNaN(analytics.trend90d) && isFinite(analytics.trend90d)) {
    trendValue = analytics.trend90d;
  } else if (apiWatch.trend90d !== undefined && apiWatch.trend90d !== null && 
             !isNaN(apiWatch.trend90d) && isFinite(apiWatch.trend90d)) {
    trendValue = apiWatch.trend90d;
  } else if (apiWatch.priceHistory && apiWatch.priceHistory.length >= 2) {
    const firstPrice = apiWatch.priceHistory[0].price; 
    const lastPrice = apiWatch.priceHistory[apiWatch.priceHistory.length - 1].price; 
    if (firstPrice > 0 && !isNaN(firstPrice) && isFinite(firstPrice) && 
        !isNaN(lastPrice) && isFinite(lastPrice)) {
      trendValue = ((lastPrice - firstPrice) / firstPrice) * 100;
    } else {
      trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
    }
  } else {
    trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
  }
  

  if (isNaN(trendValue) || !isFinite(trendValue)) {
    trendValue = 0;
  }

  const latestPriceFromHistory =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 0
      ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
      : null;
  
  const finalPrice = Math.round(
    latestPriceFromHistory?.price || apiWatch.price || 0
  );
  
  const finalCurrencyCode =
    latestPriceFromHistory?.currency || apiWatch.currency || 'EUR';
  const finalCurrency = convertCurrency(finalCurrencyCode);

  const brandSegment = apiWatch.brand.segment;
  const watchIndex: WatchIndex = 
    brandSegment && (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
      ? brandSegment
      : calculateIndex(apiWatch.brand.brandIndex);

  return {
    id: apiWatch.id,
    title: fullTitle,
    slug: generateSlug(apiWatch.name),
    price: finalPrice,
    currency: finalCurrency,
    brand: apiWatch.brand.name,
    index: watchIndex,
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: {
      value: trendValue,
      period: '90d',
    },
    variant: undefined,
    volatility: analytics?.volatility,
    volatilityLabel: convertVolatilityToLabel(analytics?.volatility),
    liquidity: analytics?.liquidity,
    liquidityLabel: convertLiquidityToLabel(analytics?.liquidity),
    trend30d: analytics?.trend30d,
    trend90d: analytics?.trend90d ?? apiWatch.trend90d, 
    popularity: analytics?.popularity,
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
  if (!defaultPrice || defaultPrice === 0 || isNaN(defaultPrice) || !isFinite(defaultPrice)) {
    return {
      value: 0,
      period: '90d',
    };
  }
  if (isNaN(price) || !isFinite(price)) {
    return {
      value: 0,
      period: '90d',
    };
  }
  const change = ((price - defaultPrice) / defaultPrice) * 100;
  const roundedValue = Math.round(change * 10) / 10;
  if (isNaN(roundedValue) || !isFinite(roundedValue)) {
    return {
      value: 0,
      period: '90d',
    };
  }
  return {
    value: roundedValue,
    period: '90d',
  };
}

function cleanWatchTitle(title: string, condition?: string, maxLength: number = 80): string {
  if (!title || title.trim() === '') return title;
  
  let cleaned = title.trim();
  
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
  
  cleaned = cleaned
    .replace(/\bwith\s+New\s+style\s+box\b/gi, '')
    .replace(/\bwith\s+box\b/gi, '')
    .replace(/\bwith\s+papers\b/gi, '')
    .replace(/\bwith\s+original\s+box\b/gi, '')
    .replace(/\bwith\s+original\s+papers\b/gi, '')
    .replace(/\b\[.*?\]\s*/g, '') 
    .replace(/\s+/g, ' ')   
    .trim();
  
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
    originalId: apiDealer.id,
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
  const priceHistory = apiWatch?.priceHistory;
  const latestPrice =
    priceHistory && Array.isArray(priceHistory) && priceHistory.length > 0
      ? priceHistory[priceHistory.length - 1]
      : null;

  const price = Math.round(latestPrice?.price || 0);
  const currencyCode =
    latestPrice?.currency || apiWatch?.dealer?.location || 'EUR';
  const currency = convertCurrency(currencyCode);

  const defaultPrice =
    priceHistory && Array.isArray(priceHistory) && priceHistory.length > 1
      ? priceHistory[0].price
      : price;

  const imageUrls = apiWatch?.imageUrls;
  const hasValidImage = imageUrls && 
    Array.isArray(imageUrls) &&
    imageUrls.length > 0 && 
    imageUrls[0] && 
    typeof imageUrls[0] === 'string' &&
    imageUrls[0].trim() !== '' &&
    imageUrls[0] !== 'null' &&
    imageUrls[0] !== 'undefined';
  
  const imageUrl = hasValidImage
    ? imageUrls[0]
    : getRandomWatchImage(apiWatch?.id || 'unknown');

  let watchTitle = apiWatch?.name || apiWatch?.id || 'Unknown Watch';
  watchTitle = cleanWatchTitle(watchTitle);
  const brandName = apiWatch?.brand?.name || 'Unknown Brand';
  const fullTitle = `${brandName} ${watchTitle}`.trim();

  const analytics = apiWatch?.analytics;
  
  const trendValue = analytics?.trend90d !== undefined && analytics?.trend90d !== null
    ? analytics.trend90d
    : calculateTrend(price, defaultPrice).value;

  const brandSegment = apiWatch?.brand?.segment;
  const brandIndex = apiWatch?.brand?.brandIndex || 50;
  const watchIndex: WatchIndex = 
    brandSegment && (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
      ? brandSegment
      : calculateIndex(brandIndex);

  return {
    id: apiWatch?.id || 'unknown',
    title: fullTitle,
    slug: generateSlug(apiWatch?.name || 'unknown'),
    price: price,
    currency: currency,
    brand: brandName,
    index: watchIndex,
    image: imageUrl,
    chronoUrl: apiWatch?.chronoUrl && typeof apiWatch.chronoUrl === 'string' && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: {
      value: trendValue,
      period: '90d',
    },
    variant: undefined,
    volatility: analytics?.volatility,
    volatilityLabel: convertVolatilityToLabel(analytics?.volatility),
    liquidity: analytics?.liquidity,
    liquidityLabel: convertLiquidityToLabel(analytics?.liquidity),
    trend30d: analytics?.trend30d,
    trend90d: analytics?.trend90d,
    popularity: analytics?.popularity,
    condition: '',
    mechanism: '',
    material: '',
    braceletMaterial: '',
    documents: '',
    location: apiWatch?.dealer?.location || '',
    year: 2020,
    diameterMm: 40,
    waterResistance: false,
    chronograph: false,
    brandLogo: undefined,
    reference: undefined,
    priceHistory: priceHistory,
  };
}

export function transformApiWatchFull(
  apiWatch: ApiWatchFullResponse,
  requestedCurrency?: string
): WatchItem {
  const latestPrice =
    apiWatch.priceHistory && apiWatch.priceHistory.length > 0
      ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
      : null;

  const apiPrice = apiWatch.price;
  const historyPrice = latestPrice?.price;
  const price = Math.round(apiPrice || historyPrice || 0);
  
  const currencyCode =
    apiWatch.currency || latestPrice?.currency || requestedCurrency || apiWatch.dealer?.location || 'EUR';
  const currency = convertCurrency(currencyCode);
  const defaultPrice =
    apiWatch.defaultPrice ||
    (apiWatch.priceHistory && apiWatch.priceHistory.length > 1
      ? apiWatch.priceHistory[0].price
      : price);

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
  
  if (apiWatch.model && apiWatch.model.trim() !== '' && apiWatch.model.length > 3) {
    watchTitle = apiWatch.model;
  } else if (apiWatch.name && apiWatch.name.trim() !== '' && apiWatch.name.length > 5) {
    if (!/^[A-Z0-9-]+$/.test(apiWatch.name)) {
      watchTitle = apiWatch.name;
    } else {
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
  
  watchTitle = cleanWatchTitle(watchTitle, apiWatch.condition, 80);
  
  if (!watchTitle || watchTitle.length < 3) {
    watchTitle = apiWatch.ref || apiWatch.model || apiWatch.name || '';
  }
  

  let brandName = apiWatch.brand?.name;
  if (!brandName && apiWatch.name) {
    const nameParts = apiWatch.name.trim().split(/\s+/);
    if (nameParts.length > 0) {
      brandName = nameParts[0];
    }
  }
  brandName = brandName || 'Unknown';
  
 const brandSegment = apiWatch.brand?.segment;
const watchIndex: WatchIndex = 
  (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
    ? brandSegment
    : 'A'
  const fullTitle = `${brandName} ${watchTitle}`.trim();
  const analytics = apiWatch.analytics;

  return {
    id: apiWatch.id,
    title: fullTitle,
    slug: generateSlug(apiWatch.name),
    price: price,
    currency: currency,
    brand: brandName,
    index: watchIndex,
    image: imageUrl,
    chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
    buttonLabel: 'Buy on Chrono24',
    trend: {
      value: (() => {
        let trendValue: number;
        if (analytics?.trend90d !== undefined && analytics?.trend90d !== null && 
            !isNaN(analytics.trend90d) && isFinite(analytics.trend90d)) {
          trendValue = analytics.trend90d;
        } else {
          trendValue = calculateTrend(price, defaultPrice).value;
        }
        
        if (isNaN(trendValue) || !isFinite(trendValue)) {
          trendValue = 0;
        }
        return trendValue;
      })(),
      period: '90d',
    },
    variant: undefined,
    volatility: analytics?.volatility,
    volatilityLabel: convertVolatilityToLabel(analytics?.volatility),
    liquidity: analytics?.liquidity,
    liquidityLabel: convertLiquidityToLabel(analytics?.liquidity),
    trend30d: analytics?.trend30d,
    trend90d: analytics?.trend90d,
    popularity: analytics?.popularity,
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
    priceHistory: apiWatch.priceHistory,
  };
}
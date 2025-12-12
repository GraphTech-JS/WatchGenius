import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import {
  ApiDealerResponse,
  ApiErrorResponse,
  ApiFiltersResponse,
  ApiWatchListResponse,
  GetWatchesParams,
  ApiWatchFullResponse,
  ApiWatchResponse,
  SearchSuggestion,
  ApiWatchAnalyticsResponse,
  ApiPopularByBrandResponse,
  ApiBrandModel,
  ApiPriceAlertResponse,
  CreatePriceAlertRequest,
  ApiSegmentTrendResponse,
  ChatMessageRequest,
  ChatMessageResponse,
  ChatHistoryResponse,
  ChatClearHistoryResponse,
  LiquidVolumeResponse,
} from '@/interfaces/api';
import { generateSlug } from '@/lib/transformers';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const error: ApiErrorResponse = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      errorMessage = `${response.status}: ${response.statusText}`;
    }

    console.error('❌ [API] API Error:', errorMessage);
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}

export async function getWatches(
  params: GetWatchesParams
): Promise<ApiWatchListResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.brands) searchParams.set('brands', params.brands);
  if (params.conditions) searchParams.set('conditions', params.conditions);
  if (params.mechanisms) searchParams.set('mechanisms', params.mechanisms);
  if (params.materials) searchParams.set('materials', params.materials);
  if (params.locations) searchParams.set('locations', params.locations);
  if (params.hasDocumentsOptions)
    searchParams.set('hasDocumentsOptions', params.hasDocumentsOptions);
  if (params.priceRange) searchParams.set('priceRange', params.priceRange);
  if (params.years) searchParams.set('years', params.years);
  if (params.currency) searchParams.set('currency', params.currency);
  if (params.segment) searchParams.set('segment', params.segment);
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.sortByLiquidity !== undefined) {
    searchParams.set('sortByLiquidity', params.sortByLiquidity.toString());
  }

  const url = `/api/watches?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await handleResponse<ApiWatchListResponse>(response);
    
    if (params.sortByLiquidity) {
      console.log('🔍 LIQUIDITY SORT DEBUG:');
      console.log('📤 Request URL:', url);
      console.log('📥 Response - First 10 watches with liquidity:');
      const first10 = data.data.slice(0, 10).map((watch, index) => ({
        position: index + 1,
        id: watch.id,
        title: `${watch.brand?.name || ''} ${watch.model || watch.name}`,
        liquidity: watch.analytics?.liquidity || null,
        liquidityNum: watch.analytics?.liquidity ? parseFloat(watch.analytics.liquidity) || 0 : 0,
      }));
      console.table(first10);
      console.log('✅ Expected: Sorted by liquidity DESC (highest first, e.g., 90+, 80+, 70+)');
      console.log('❌ Actual: First watch has liquidity =', first10[0].liquidity);
      
      const liquidityValues = first10.map(w => w.liquidityNum);
      const nonNullValues = liquidityValues.filter(v => v > 0);
      const maxLiquidity = Math.max(...liquidityValues, 0);
      const firstLiquidity = liquidityValues[0];
      
      console.log('📊 Analysis:');
      console.log('  - First watch liquidity:', firstLiquidity);
      console.log('  - Max liquidity in first 10:', maxLiquidity);
      console.log('  - Watches with non-null liquidity:', nonNullValues.length, 'out of 10');
      
      const isCorrectlySorted = firstLiquidity >= 80 && firstLiquidity === maxLiquidity;
      console.log('  - Is correctly sorted?', isCorrectlySorted ? '✅ YES' : '❌ NO');
      
      if (!isCorrectlySorted) {
        console.warn('⚠️ PROBLEM: First watch should have HIGH liquidity (80+), but has:', firstLiquidity);
        console.warn('⚠️ This means backend sorting is NOT working correctly!');
      }
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getFilters(): Promise<ApiFiltersResponse> {
  const url = `/api/watches/filters`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiFiltersResponse>(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getDealers(): Promise<ApiDealerResponse[]> {
  const url = `/api/dealers`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiDealerResponse[]>(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getDealerById(id: string): Promise<ApiDealerResponse> {
  const url = `/api/dealers/${id}`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiDealerResponse>(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function searchDealers(
  query: string
): Promise<ApiDealerResponse[]> {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);

  const url = `/api/dealers/search?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiDealerResponse[]>(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

const MECHANISM_MAP: Record<string, string> = {
  automatic: 'Automatic',
  mechanical: 'Manual winding',
  manual: 'Manual winding',
  'manual winding': 'Manual winding',
};

const MATERIAL_MAP: Record<string, string> = {
  gold: 'Gold',
  ceramic: 'Ceramic',
  silver: 'Steel',
  steel: 'Steel',
  platinum: 'Platinum',
  rose: 'Rose',
  white: 'White',
  yellow: 'Yellow',
  titanium: 'Steel',
};

const LOCATION_MAP: Record<string, string> = {
  america: 'United States of America',
  'united states of america': 'United States of America',
  usa: 'United States of America',
  us: 'United States of America',
};

const DOCUMENT_MAP: Record<string, string> = {
  fullset: 'Original box, original papers',
  'full set': 'Original box, original papers',
  'original box, original papers': 'Original box, original papers',
  'original box, no original papers': 'Original box, no original papers',
  'no original box, no original papers': 'No original box, no original papers',
};

function normalizeValue(
  value: string,
  map: Record<string, string>
): string | null {
  const normalized = value.toLowerCase().trim();
  return map[normalized] || null;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function convertFiltersToApiParams(
  filters: UseCatalogFiltersReturn
): GetWatchesParams {
  const params: GetWatchesParams = {};
  const defaultYearFrom = '2000';
  const defaultYearTo = '2005';
  const defaultPriceFrom = '0';
  const defaultPriceTo = '150000';

  const priceFrom = filters.priceFrom || defaultPriceFrom;
  const priceTo = filters.priceTo || defaultPriceTo;

  const yearFrom = filters.yearFrom || defaultYearFrom;
  const yearTo = filters.yearTo || defaultYearTo;

  if (filters.selectedBrands?.length) {
    params.brands = filters.selectedBrands.join('/');
  }

  if (filters.selectedConditions?.length) {
    const validConditions = filters.selectedConditions
      .map((c) => c.toUpperCase())
      .filter((c) => c === 'NEW' || c === 'USED');
    if (validConditions.length > 0) {
      params.conditions = validConditions.join('/');
    }
  }

  if (filters.selectedMechanisms?.length) {
    const validMechanisms = filters.selectedMechanisms
      .map((m) => {
        const mapped = normalizeValue(m, MECHANISM_MAP);
        return mapped || capitalizeFirst(m);
      })
      .filter(Boolean) as string[];
    if (validMechanisms.length > 0) {
      params.mechanisms = validMechanisms.join('/');
    }
  }

  if (filters.selectedMaterials?.length) {
    const validMaterials = filters.selectedMaterials
      .map((m) => {
        const mapped = normalizeValue(m, MATERIAL_MAP);
        return mapped || capitalizeFirst(m);
      })
      .filter(Boolean) as string[];
    if (validMaterials.length > 0) {
      params.materials = validMaterials.join('/');
    }
  }

  if (filters.selectedLocations?.length) {
    const validLocations = filters.selectedLocations
      .map((l) => {
        const mapped = normalizeValue(l, LOCATION_MAP);
        return mapped || capitalizeFirst(l);
      })
      .filter(Boolean) as string[];
    if (validLocations.length > 0) {
      params.locations = validLocations.join('/');
    }
  }

  if (yearFrom !== defaultYearFrom || yearTo !== defaultYearTo) {
    params.years = `${yearFrom}-${yearTo}`;
  }

  const priceFromNum = Number(priceFrom);
  const priceToNum = Number(priceTo);
  const defaultPriceFromNum = Number(defaultPriceFrom);
  const defaultPriceToNum = Number(defaultPriceTo);

  if (
    priceFromNum !== defaultPriceFromNum ||
    priceToNum !== defaultPriceToNum
  ) {
    params.priceRange = `${priceFrom}-${priceTo}`;
  }

  if (filters.selectedDocuments?.length) {
    const validDocuments = filters.selectedDocuments
      .map((d) => {
        const mapped = normalizeValue(d, DOCUMENT_MAP);
        return mapped || d;
      })
      .filter(Boolean) as string[];
    if (validDocuments.length > 0) {
      params.hasDocumentsOptions = validDocuments.join('/');
    }
  }

  if (filters.selectedIndexes?.length) {
    const validSegments = filters.selectedIndexes.filter(
      (index): index is 'A' | 'B' | 'C' =>
        index === 'A' || index === 'B' || index === 'C'
    );
    if (validSegments.length > 0) {
      params.segment = validSegments.join('/');
    }
  }

  return params;
}

export async function getWatchesByIds(
  ids: string[],
  currency?: string
): Promise<ApiWatchFullResponse[]> {
  if (ids.length === 0) {
    return [];
  }

  const searchParams = new URLSearchParams();
  searchParams.set('ids', ids.join(','));
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/by-ids?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Response is not an array');
    }
    return data as ApiWatchFullResponse[];
  } catch (error) {
    console.error('Failed to fetch watches by IDs:', error);
    throw error;
  }
}

export async function getWatchById(
  id: string,
  currency?: string
): Promise<ApiWatchFullResponse> {
  if (!id) {
    throw new Error('Watch ID is required');
  }

  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/${id}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);
    const data = await handleResponse<ApiWatchFullResponse>(response);
    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch watch by ID:', error);
    throw error;
  }
}

export async function getSimilarWatches(
  id: string,
  currency?: string
): Promise<ApiWatchFullResponse[]> {
  if (!id) {
    throw new Error('Watch ID is required');
  }

  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/${id}/similar${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);
    const data = await handleResponse<ApiWatchFullResponse[]>(response);
    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch similar watches:', error);
    throw error;
  }
}

export async function getWatchBySlug(
  slug: string,
  currency?: string
): Promise<ApiWatchFullResponse | null> {
  if (!slug || slug.trim().length === 0) {
    return null;
  }

  try {
    const searchStrategies = [
      slug,
      slug.split('-').slice(0, 3).join('-'),
      slug.split('-').slice(0, 2).join('-'),
      slug.split('-')[0],
    ];

    let matchedWatch: ApiWatchResponse | null = null;
    let searchResponse: ApiWatchListResponse | null = null;

    for (const searchQuery of searchStrategies) {
      if (!searchQuery || searchQuery.trim().length === 0) continue;

      try {
        searchResponse = await getWatches({
          search: searchQuery,
          pageSize: 100,
          currency: currency,
        });

        if (!searchResponse?.data || searchResponse.data.length === 0) {
          continue;
        }

        for (const watch of searchResponse.data) {
          const generatedSlug = generateSlug(watch.name);

          if (generatedSlug === slug) {
            matchedWatch = watch;
            break;
          }
        }

        if (matchedWatch) break;

        const slugWords = slug.split('-').filter((word) => word.length > 0);

        for (const watch of searchResponse.data) {
          const watchSlug = generateSlug(watch.name);
          const watchSlugWords = watchSlug
            .split('-')
            .filter((word) => word.length > 0);

          const allWordsMatch = slugWords.every((word) =>
            watchSlugWords.some(
              (watchWord) =>
                watchWord.includes(word) || word.includes(watchWord)
            )
          );

          if (allWordsMatch && slugWords.length > 0) {
            matchedWatch = watch;
            break;
          }
        }

        if (matchedWatch) break;
      } catch (searchError) {
        console.error('❌ [API] getWatchBySlug - Search error:', searchError);
        continue;
      }
    }

    if (!matchedWatch) {
      return null;
    }

    const fullWatch = await getWatchById(matchedWatch.id, currency);

    if (fullWatch && matchedWatch.price && matchedWatch.id === fullWatch.id) {
      fullWatch.price = matchedWatch.price;
      fullWatch.defaultPrice = matchedWatch.defaultPrice;
      fullWatch.currency = matchedWatch.currency;
    }

    return fullWatch;
  } catch (error) {
    console.error('❌ [API] getWatchBySlug - Error:', error);
    return null;
  }
}

export async function getSearchSuggestions(
  query: string
): Promise<SearchSuggestion[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchParams = new URLSearchParams();
  searchParams.set('q', query.trim());

  const url = `/api/search/suggestions?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    return handleResponse<SearchSuggestion[]>(response);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function trackWatchView(
  id: string
): Promise<ApiWatchAnalyticsResponse> {
  if (!id) {
    throw new Error('Watch ID is required');
  }

  const url = `/api/watches/${id}/view`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<ApiWatchAnalyticsResponse>(response);
    return data;
  } catch (error) {
    console.error('❌ [API] Failed to track watch view:', error);
    throw error;
  }
}

export async function getPopularWatches(
  type: 'popular' | 'liquidity' | 'trend90' = 'popular',
  currency?: string
): Promise<ApiWatchFullResponse[]> {
  const searchParams = new URLSearchParams();
  searchParams.set('type', type);
  if (currency) {
    searchParams.set('currency', currency);
  }
  const url = `/api/watches/popular${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);
    const data = await handleResponse<ApiWatchFullResponse[]>(response);
    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch popular watches:', error);
    throw error;
  }
}

export async function getPopularWatchesByBrand(
  currency?: string
): Promise<ApiPopularByBrandResponse[]> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/popular-by-brand${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);
    const data = await handleResponse<ApiPopularByBrandResponse[]>(response);
    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch popular watches by brand:', error);
    throw error;
  }
}

export async function getTrendingWatch30d(
  currency?: string
): Promise<ApiWatchFullResponse | null> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/trending/30d${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    const data = await handleResponse<ApiWatchFullResponse>(response);

    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch trending watch (30d):', error);
    throw error;
  }
}

export async function getTrendingWatch90d(
  currency?: string
): Promise<ApiWatchFullResponse | null> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/trending/90d${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    const data = await handleResponse<ApiWatchFullResponse>(response);

    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch trending watch (90d):', error);
    throw error;
  }
}

export async function getStableWatch(
  currency?: string
): Promise<ApiWatchFullResponse | null> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/stable${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    const data = await handleResponse<ApiWatchFullResponse>(response);

    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch stable watch:', error);
    throw error;
  }
}

export async function getLiquidWatch(
  currency?: string
): Promise<ApiWatchFullResponse | null> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  }

  const url = `/api/watches/liquid${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    const data = await handleResponse<ApiWatchFullResponse>(response);

    return data;
  } catch (error) {
    console.error('❌ [API] Failed to fetch liquid watch:', error);
    throw error;
  }
}

export async function trackDealerVisit(
  dealerId: string
): Promise<{ success: boolean; visits: number }> {
  if (!dealerId) {
    throw new Error('Dealer ID is required');
  }

  const url = `/api/dealers/${dealerId}/visit`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<{ success: boolean; visits: number }>(response);
  } catch (error) {
    console.error('❌ [API] Failed to track dealer visit:', error);
    throw error;
  }
}

export async function getWatchModels(): Promise<ApiBrandModel[]> {
  const url = `/api/watches/models`;
  try {
    const response = await fetch(url);
    return handleResponse<ApiBrandModel[]>(response);
  } catch (error) {
    console.error(' [API] Failed to fetch watch models:', error);
    throw error;
  }
}

export async function createPriceAlert(
  data: CreatePriceAlertRequest
): Promise<ApiPriceAlertResponse> {
  const url = `/api/alerts`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<ApiPriceAlertResponse>(response);
  } catch (error) {
    console.error(' [API] Failed to create price alert:', error);
    throw error;
  }
}

export async function getCheapestWatches(
  currency?: string,
  limit: number = 3
): Promise<ApiWatchFullResponse[]> {
  const searchParams = new URLSearchParams();

  if (currency) {
    searchParams.set('currency', currency);
  }

  searchParams.set('limit', limit.toString());

  const url = `/api/watches/cheapest?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiWatchFullResponse[]>(response);
  } catch (error) {
    console.error(' [API] Failed to fetch cheapest watches:', error);
    throw error;
  }
}

export async function getSegmentsTrend(): Promise<ApiSegmentTrendResponse> {
  const url = `/api/watches/segments/trend`;
  try {
    const response = await fetch(url);
    return handleResponse<ApiSegmentTrendResponse>(response);
  } catch (error) {
    console.error(' [API] Failed to fetch segments trend:', error);
    throw error;
  }
}

export async function sendChatMessage(
  data: ChatMessageRequest
): Promise<ChatMessageResponse> {
  const url = `/api/chat/message`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<ChatMessageResponse>(response);
  } catch (error) {
    console.error('❌ [API] Failed to send chat message:', error);
    throw error;
  }
}

export async function getChatHistory(
  guestId: string
): Promise<ChatHistoryResponse> {
  if (!guestId) {
    throw new Error('Guest ID is required');
  }

  const url = `/api/chat/history/${guestId}`;

  try {
    const response = await fetch(url);
    return handleResponse<ChatHistoryResponse>(response);
  } catch (error) {
    console.error('❌ [API] Failed to fetch chat history:', error);
    throw error;
  }
}

export async function clearChatHistory(
  guestId: string
): Promise<ChatClearHistoryResponse> {
  if (!guestId) {
    throw new Error('Guest ID is required');
  }

  const url = `/api/chat/history/${guestId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return handleResponse<ChatClearHistoryResponse>(response);
  } catch (error) {
    console.error('❌ [API] Failed to clear chat history:', error);
    throw error;
  }
}

export async function getLiquidVolume(currency?: string): Promise<LiquidVolumeResponse> {
  const searchParams = new URLSearchParams();
  if (currency) {
    searchParams.set('currency', currency);
  } else {
    searchParams.set('currency', 'EUR');
  }

  const url = `/api/watches/liquid/volume?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    return handleResponse<LiquidVolumeResponse>(response);
  } catch (error) {
    console.error('❌ [API] Failed to fetch liquid volume:', error);
    throw error;
  }
}
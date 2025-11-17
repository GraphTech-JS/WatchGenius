import { UseCatalogFiltersReturn } from '@/hooks/useCatalogFilters';
import {
  ApiErrorResponse,
  ApiFiltersResponse,
  ApiWatchListResponse,
  GetWatchesParams,
} from '@/interfaces/api';

const API_URL = '';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const error: ApiErrorResponse = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      errorMessage = `${response.status}: ${response.statusText}`;
    }

    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
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

  const url = `/api/watches?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    return handleResponse<ApiWatchListResponse>(response);
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

const MECHANISM_MAP: Record<string, string> = {
  'automatic': 'Automatic',
  'mechanical': 'Manual winding',
  'manual': 'Manual winding',
  'manual winding': 'Manual winding',
};

const MATERIAL_MAP: Record<string, string> = {
  'gold': 'Gold',
  'ceramic': 'Ceramic',
  'silver': 'Steel', 
  'steel': 'Steel',
  'platinum': 'Platinum',
  'rose': 'Rose',
  'white': 'White',
  'yellow': 'Yellow',
  'titanium': 'Steel', 
};

const LOCATION_MAP: Record<string, string> = {
  'america': 'United States of America',
  'united states of america': 'United States of America',
  'usa': 'United States of America',
  'us': 'United States of America',
};

const DOCUMENT_MAP: Record<string, string> = {
  'fullset': 'Original box, original papers',
  'full set': 'Original box, original papers',
  'original box, original papers': 'Original box, original papers',
  'original box, no original papers': 'Original box, no original papers',
  'no original box, no original papers': 'No original box, no original papers',
};

function normalizeValue(value: string, map: Record<string, string>): string | null {
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
  const defaultPriceTo = '50000';

  const priceFrom = filters.priceFrom || defaultPriceFrom;
  const priceTo = filters.priceTo || defaultPriceTo;

  const yearFrom = filters.yearFrom || defaultYearFrom;
  const yearTo = filters.yearTo || defaultYearTo;

  if (filters.selectedBrands?.length) {
    params.brands = filters.selectedBrands.join('/');
  }

  if (filters.selectedConditions?.length) {
    const validConditions = filters.selectedConditions
      .map(c => c.toUpperCase())
      .filter(c => c === 'NEW' || c === 'USED');
    if (validConditions.length > 0) {
      params.conditions = validConditions.join('/');
    }
  }

  if (filters.selectedMechanisms?.length) {
    const validMechanisms = filters.selectedMechanisms
      .map(m => {
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
      .map(m => {
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
      .map(l => {
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

  if (priceFrom !== defaultPriceFrom || priceTo !== defaultPriceTo) {
    params.priceRange = `${priceFrom}-${priceTo}`;
  }

  if (filters.selectedDocuments?.length) {
    const validDocuments = filters.selectedDocuments
      .map(d => {
        const mapped = normalizeValue(d, DOCUMENT_MAP);
        return mapped || d;
      })
      .filter(Boolean) as string[];
    if (validDocuments.length > 0) {
      params.hasDocumentsOptions = validDocuments.join('/');
    }
  }

  return params;
}

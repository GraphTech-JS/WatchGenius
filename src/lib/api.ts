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
    params.conditions = filters.selectedConditions.join('/');
  }

  if (filters.selectedMechanisms?.length) {
    params.mechanisms = filters.selectedMechanisms.join('/');
  }

  if (filters.selectedMaterials?.length) {
    params.materials = filters.selectedMaterials.join('/');
  }

  if (filters.selectedLocations?.length) {
    params.locations = filters.selectedLocations.join('/');
  }

  if (yearFrom !== defaultYearFrom || yearTo !== defaultYearTo) {
    params.years = `${yearFrom}-${yearTo}`;
  }

  if (priceFrom !== defaultPriceFrom || priceTo !== defaultPriceTo) {
    params.priceRange = `${priceFrom}-${priceTo}`;
  }

  if (filters.selectedDocuments?.length) {
    params.hasDocumentsOptions = filters.selectedDocuments.join('/');
  }

  return params;
}

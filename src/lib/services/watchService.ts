import { NextRequest } from 'next/server';
import { BaseApiService } from './baseApiService';
import { NextResponse } from 'next/server';

export class WatchService extends BaseApiService {
  async getWatches(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;

    const endpoint = `/api/watches?${searchParams.toString()}`;

    return this.handleApiRequest(endpoint);
  }

  async getWatchById(id: string, currency?: string): Promise<NextResponse> {
    if (!id) {
      return this.createErrorResponse('Missing id parameter', 400);
    }

    const endpoint = currency
      ? `/api/watches/${id}?currency=${currency}`
      : `/api/watches/${id}`;

    return this.handleApiRequest(endpoint);
  }

  async getSimilarWatches(id: string, currency?: string): Promise<NextResponse>
  {
    if(!id){
      return this.createErrorResponse('Missing id parameter', 400);
    }

    const endpoint = currency
    ? `/api/watches/${id}/similar?currency=${currency}`
    : `/api/watches/${id}/similar`

    return this.handleApiRequest(endpoint);
  }

  async getWatchesByIds(
    ids: string[],
    currency?: string
  ): Promise<NextResponse> {
    if (!ids || ids.length === 0) {
      return this.createErrorResponse('Missing ids parameter', 400);
    }

    const params = new URLSearchParams();

    params.set('ids', ids.join(','));

    if (currency) {
      params.set('currency', currency);
    }

    const endpoint = `/api/watches/by-ids?${params.toString()}`;

    return this.handleApiRequest(endpoint);
  }

   async getFilters(): Promise<NextResponse> {
    const endpoint = '/api/watches/filters';
    
    return this.handleApiRequest(endpoint);
  }
}




export const watchService = new WatchService();
import { NextRequest } from 'next/server';
import { BaseApiService } from './baseApiService';
import { NextResponse } from 'next/server';

export class DealerService extends BaseApiService {
  async getDealers(): Promise<NextResponse> {
    const endpoint = '/api/dealers';
    return this.handleApiRequest(endpoint);
  }

  async getDealerById(id: string): Promise<NextResponse> {
    if (!id) {
      return this.createErrorResponse('Missing id parameter', 400);
    }

    const endpoint = `/api/dealers/${id}`;
    return this.handleApiRequest(endpoint);
  }

  async searchDealers(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return this.createErrorResponse('Missing query parameter "query"', 400);
    }

    const endpoint = `/api/dealers/search?query=${encodeURIComponent(query)}`;
    return this.handleApiRequest(endpoint);
  }
}

export const dealerService = new DealerService();
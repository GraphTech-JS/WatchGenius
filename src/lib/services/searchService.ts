import { NextRequest } from 'next/server';
import { BaseApiService } from './baseApiService';
import { NextResponse } from 'next/server';



export class SearchService extends BaseApiService {
     async getSuggestions(request: NextRequest): Promise<NextResponse> {
        const searchParams = request.nextUrl.searchParams;
        const q = searchParams.get('q');


        if(!q) {
             return this.createErrorResponse('Missing query parameter', 400);
        }

       const endpoint = `/api/search/suggestions?q=${encodeURIComponent(q)}`;
    
    return this.handleApiRequest(endpoint);
     }
}

export const searchService = new SearchService();
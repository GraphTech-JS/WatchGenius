import { NextRequest } from 'next/server';
import { searchService } from '@/lib/services/searchService';

export async function GET(request: NextRequest) {
  return searchService.getSuggestions(request);
}

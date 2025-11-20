import { NextRequest } from 'next/server';
import { watchService } from '@/lib/services/watchService';

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : [];
  const currency = request.nextUrl.searchParams.get('currency');
  return watchService.getWatchesByIds(ids, currency || undefined);
}
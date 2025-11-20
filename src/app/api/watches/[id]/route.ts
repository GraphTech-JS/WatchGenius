import { NextRequest } from 'next/server';
import { watchService } from '@/lib/services/watchService';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currency = request.nextUrl.searchParams.get('currency');
  return watchService.getWatchById(id, currency || undefined);
}
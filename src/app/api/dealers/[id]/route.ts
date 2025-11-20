import { NextRequest } from 'next/server';
import { dealerService } from '@/lib/services/dealerService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return dealerService.getDealerById(id);
}
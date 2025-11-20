import { NextRequest } from 'next/server';
import { dealerService } from '@/lib/services/dealerService';

export async function GET(request: NextRequest) {
  return dealerService.searchDealers(request);
}
import { dealerService } from '@/lib/services/dealerService';

export async function GET() {
  return dealerService.getDealers();
}


import { watchService } from '@/lib/services/watchService';


export async function GET() {
  return watchService.getFilters();
}


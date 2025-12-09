import { NextRequest } from 'next/server';
import { chatService } from '@/lib/services/chatService';

export async function POST(request: NextRequest) {
  return chatService.sendMessage(request);
}

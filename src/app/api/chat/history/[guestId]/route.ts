import { NextRequest } from 'next/server';
import { chatService } from '@/lib/services/chatService';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ guestId: string }> }
) {
  const { guestId } = await params;
  return chatService.getHistory(guestId);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ guestId: string }> }
) {
    const { guestId } = await params;
    return chatService.clearHistory(guestId);
}
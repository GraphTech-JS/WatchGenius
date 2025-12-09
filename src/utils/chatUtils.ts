
export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const STORAGE_KEY = 'chatGuestId';
  
  try {
        
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return saved;
    }

    const newGuestId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, newGuestId);
    return newGuestId;
  } catch (error) {
    console.error('❌ [ChatUtils] Failed to get/create guestId:', error);
    const fallbackId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, fallbackId);
    return fallbackId;
  }
}


export function chatHistoryItemToMessage(
  item: { role: string; content: string; createdAt: string },
  id: number
): { content: string; by: 'me' | 'ai'; id: number; time: string } {
  return {
    content: item.content,
    by: item.role === 'user' ? 'me' : 'ai',
    id,
    time: new Date(item.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}


export function messageToChatHistoryItem(message: { content: string; by: string }): {
  role: 'user' | 'assistant';
  content: string;
} {
  return {
    role: message.by === 'me' ? 'user' : 'assistant',
    content: message.content,
  };
}
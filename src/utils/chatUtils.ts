import { Message } from '@/interfaces';
import type { ChatContext, ChatContextFilters } from '@/interfaces/api';


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

const SAVED_SEARCHES_KEY = 'savedChatSearches';

export function getSavedSearches(): Message[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = localStorage.getItem(SAVED_SEARCHES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('❌ [ChatUtils] Failed to get saved searches:', error);
  }

  return [];
}

export function saveSearchToStorage(message: Message): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedSearches();
    const exists = saved.some(msg => msg.id === message.id || msg.content === message.content);
    
    if (!exists) {
      saved.push(message);
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('❌ [ChatUtils] Failed to save search:', error);
  }
}

export function removeSavedSearch(messageId: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = getSavedSearches();
    const filtered = saved.filter(msg => msg.id !== messageId);
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('❌ [ChatUtils] Failed to remove saved search:', error);
  }
}

export function convertFiltersToContext(
  filters: string[]
): ChatContextFilters {
  const result: ChatContextFilters = {};
  
  filters.forEach((filter) => {
    const [group, value] = filter.split(':');
    
    switch (group) {
      case 'brand':
        if (!result.brands) result.brands = [];
        result.brands.push(value);
        break;
      case 'material':
        if (!result.materials) result.materials = [];
        result.materials.push(value);
        break;
      case 'condition':
        if (!result.conditions) result.conditions = [];
        result.conditions.push(value);
        break;
      case 'mechanism':
        if (!result.mechanisms) result.mechanisms = [];
        result.mechanisms.push(value);
        break;
      case 'location':
        if (!result.locations) result.locations = [];
        result.locations.push(value);
        break;
      case 'document':
        if (!result.hasDocuments) result.hasDocuments = [];
        result.hasDocuments.push(value);
        break;
    }
  });
  
  return result;
}

export function getChatContext(
  currentPath: string,
  watchId?: string,
  savedFilters?: { searchTerm: string; filters: string[] } | null
): ChatContext | undefined {
  if (currentPath.includes('/product/') && watchId) {
    const context: ChatContext = {
      type: 'product',
      entityId: watchId,
    };
    
    if (savedFilters && savedFilters.filters.length > 0) {
      context.filters = convertFiltersToContext(savedFilters.filters);
    }
    
    return context;
  }

  if (
    currentPath.includes('/catalog') &&
    !currentPath.includes('/product/') &&
    savedFilters &&
    savedFilters.filters.length > 0
  ) {
    return {
      type: 'search',
      filters: convertFiltersToContext(savedFilters.filters),
    };
  }

  return undefined;
}
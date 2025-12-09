import { NextRequest } from 'next/server';
import { BaseApiService } from './baseApiService';
import { NextResponse } from 'next/server';
import {
  ChatMessageRequest,
  ChatMessageResponse,
  ChatHistoryResponse,
  ChatClearHistoryResponse,
} from '@/interfaces/api';

export class ChatService extends BaseApiService {
  async sendMessage(
    request: NextRequest
  ): Promise<NextResponse<ChatMessageResponse>> {
    try {
      const body: ChatMessageRequest = await request.json();

      if (!body.message || !body.message.trim()) {
        return this.createErrorResponse<ChatMessageResponse>(
          'Message is required',
          400
        );
      }

      const endpoint = '/api/chat/message';

      return this.handleApiRequest<ChatMessageResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error('❌ [ChatService] Error parsing request body:', error);
      return this.createErrorResponse<ChatMessageResponse>(
        'Invalid request body',
        400
      );
    }
  }

  async getHistory(
    guestId: string
  ): Promise<NextResponse<ChatHistoryResponse>> {
    if (!guestId) {
      return this.createErrorResponse<ChatHistoryResponse>(
        'Guest ID is required',
        400
      );
    }

    const endpoint = `/api/chat/history/${guestId}`;

    return this.handleApiRequest<ChatHistoryResponse>(endpoint, {
      method: 'GET',
    });
  }

  async clearHistory(
    guestId: string
  ): Promise<NextResponse<ChatClearHistoryResponse>> {
    if (!guestId) {
      return this.createErrorResponse<ChatClearHistoryResponse>(
        'Guest ID is required',
        400
      );
    }

    const endpoint = `/api/chat/history/${guestId}`;

    return this.handleApiRequest<ChatClearHistoryResponse>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const chatService = new ChatService();

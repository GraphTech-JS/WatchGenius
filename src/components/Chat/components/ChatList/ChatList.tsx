'use client';

import React, { useContext } from 'react';
import styles from './ChatList.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { MainContext } from '@/context';
import { Message } from '@/interfaces';

interface ChatListProps {
  isTyping?: boolean;
  showSavedMessages?: boolean;
}

export const ChatList = ({
  isTyping,
  showSavedMessages = true,
}: ChatListProps) => {
  const { messages } = useContext(MainContext);

  const filteredMessages = showSavedMessages
    ? messages
    : messages.filter((msg) => !msg.isSaved);

  return (
    <div className={styles.chatList}>
      {filteredMessages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isTyping && <div className={styles.typing}>Geni друкує…</div>}
    </div>
  );
};

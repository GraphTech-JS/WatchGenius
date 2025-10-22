'use client';

import React, { useContext } from 'react';
import styles from './ChatList.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { MainContext } from '@/context';
import { Message } from '@/interfaces';

interface ChatListProps {
  isTyping?: boolean;
}

export const ChatList = ({ isTyping }: ChatListProps) => {
  const { messages } = useContext(MainContext);

  return (
    <div className={styles.chatList}>
      {messages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isTyping && <div className={styles.typing}>Geni друкує…</div>}
    </div>
  );
};

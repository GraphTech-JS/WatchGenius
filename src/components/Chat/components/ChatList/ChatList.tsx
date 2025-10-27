"use client";

import React, { useContext } from "react";
import styles from "./ChatList.module.css";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { MainContext } from "@/context";
import { Message } from "@/interfaces";
import { t } from "@/i18n";
import { chatKeys } from "@/i18n/keys/chat";

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
      {isTyping && (
        <div className={styles.typing}>{t(chatKeys.messages.typing)}</div>
      )}
    </div>
  );
};

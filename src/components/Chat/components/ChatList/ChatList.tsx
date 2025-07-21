"use client";

import React, { useEffect, useRef, useContext } from "react";
import styles from "./ChatList.module.css";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { MainContext } from "@/context";
import { Message } from "@/interfaces";

export const ChatList = () => {
  const { messages } = useContext(MainContext);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={chatListRef} className={styles.chatList}>
      {messages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

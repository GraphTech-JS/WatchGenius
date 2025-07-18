"use client";

import React, { useContext } from "react";
import styles from "./ChatList.module.css";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { MainContext } from "@/context";
import { Message } from "@/interfaces";

export const ChatList = () => {
  const { messages } = useContext(MainContext);
  return (
    <div className={styles.chatList}>
      {messages.map((message: Message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

import { Message } from "@/interfaces";
import styles from "./ChatMessage.module.css";
import React from "react";

export const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`${styles.message} ${
        message.by === "me" ? styles.messageMe : styles.messageAi
      }`}
    >
      <div className={styles.messageContainer}>
        <span>{message.content}</span>
      </div>
    </div>
  );
};

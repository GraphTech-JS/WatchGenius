"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./ChatMenu.module.css";
import { RobotWhiteIcon, CloseIcon } from "../../../public/chat/Icon";
import { ChatAttachIcon } from "../../../public/chat";
import { MainContext } from "@/context";
import Image from "next/image";
import { SendBtn } from "../../../public/icons";
import { ChatList } from "./components/ChatList/ChatList";

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { message, messages, setMessage, setMessages } =
    useContext(MainContext);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      content: e.target.value,
      by: "me",
      id: messages.length + 1 + Math.random() * 1000,
    });
  };

  const handleSend = () => {
    if (!message.content.trim()) return;
    setIsTyping(true);
    const baseId = messages.length + 1 + Math.floor(Math.random() * 1000);
    const aiResponse =
      "Готовий допомогти! Оберіть опцію нижче або напишіть питання — підкажу моделі, тренди, бюджет і перевірку справжності.";
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          content: message.content,
          by: "me",
          id: baseId,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          content: aiResponse,
          by: "ai",
          id: baseId + 1,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage({ content: "", by: "me", id: baseId + 2 });
      setIsTyping(false);
    }, 800);
  };

  const handleInlineButtonClick = (buttonText: string) => {
    setIsTyping(true);
    const baseId = messages.length + 1 + Math.floor(Math.random() * 1000);
    const aiResponse = "Ось що можу запропонувати далі. Продовжимо?";
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          content: buttonText,
          by: "me",
          id: baseId,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          content: aiResponse,
          by: "ai",
          id: baseId + 1,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div
      ref={ref}
      className={`${styles.chatMenu} ${
        isAnimating ? styles.open : ""
      } pointer-events-auto`}
    >
      <div
        className={`${styles.chatMenuHeader} w-full flex justify-between px-4.5 pt-2 pb-3`}
      >
        <div
          className={`${styles.chatMenuHeaderName} flex w-full items-center gap-5`}
        >
          <div
            className={`${styles.chatMenuHeaderRobotIcon} flex items-center justify-center w-11.5 h-11.5 rounded-full`}
          >
            <RobotWhiteIcon
              className={`${styles.RobotIcon} w-7 h-7 md:text-white `}
            />
          </div>
          <div className={`${styles.chatMenuHeaderNameTitle}`}>
            Geni - ваш AI-асистент
          </div>
        </div>
        <button
          className={`${styles.chatMenuClose} flex items-center justify-center cursor-pointer`}
          onClick={handleClose}
        >
          <CloseIcon className={`${styles.CloseIcon} w-4 h-4 `} />
        </button>
      </div>

      <div ref={chatBodyRef} className={styles.chatBody}>
        <ChatList isTyping={isTyping} />
      </div>

      <div className={styles.chatMenuButtons}>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() => handleInlineButtonClick("Порівняти моделі")}
        >
          <span className={styles.chatMenuBtnIcon}>🔍</span>
          Порівняти моделі
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() => handleInlineButtonClick("Показати тренди ринку")}
        >
          <span className={styles.chatMenuBtnIcon}>📈</span>
          Показати тренди ринку
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() => handleInlineButtonClick("Знайти годинник по бюджету")}
        >
          <span className={styles.chatMenuBtnIcon}>💡</span>
          Знайти годинник по бюджету
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() => handleInlineButtonClick("Як перевірити справжність?")}
        >
          <span className={styles.chatMenuBtnIcon}>✅</span>
          Як перевірити справжність?
        </button>
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Напишіть питання про годинники…"
            value={message.content}
            onChange={handleChange}
            className={styles.chatInput}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div className={styles.attachIconWrapper}>
            <Image
              src={ChatAttachIcon.src}
              alt="attach"
              width={27}
              height={14}
              className={styles.attachIcon}
            />
          </div>
        </div>
        <button
          className={styles.sendButton}
          onClick={handleSend}
          aria-label="Надіслати"
        >
          <Image
            src={SendBtn.src}
            alt="send"
            width={29}
            height={30}
            className="brightness-0 invert"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      </div>
    </div>
  );
};

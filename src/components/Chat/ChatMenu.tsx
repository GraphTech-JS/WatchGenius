"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./ChatMenu.module.css";
import { CloseIcon } from "../../../public/chat/Icon";
import { ChatAttachIcon } from "../../../public/chat";
import { MainContext } from "@/context";
import Image from "next/image";
import { SendBtn } from "../../../public/icons";
import RobotChatMenuIcon from "../../../public/icons/robot_chat_menu.svg";
import { ChatList } from "./components/ChatList/ChatList";
import { t } from "@/i18n";
import { chatKeys } from "@/i18n/keys/chat";

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
    const aiResponse = t(chatKeys.messages.greeting);
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
    const aiResponse = t(chatKeys.messages.inlineResponse);
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
            <Image
              src={RobotChatMenuIcon}
              alt="Geni AI"
              width={28}
              height={28}
              className={styles.RobotIcon}
            />
          </div>
          <div className={`${styles.chatMenuHeaderNameTitle}`}>
            {t(chatKeys.header.title)}
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
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.compare))
          }
        >
          <span className={styles.chatMenuBtnIcon}>🔍</span>
          {t(chatKeys.inlineButtons.compare)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.trends))
          }
        >
          <span className={styles.chatMenuBtnIcon}>📈</span>
          {t(chatKeys.inlineButtons.trends)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.budget))
          }
        >
          <span className={styles.chatMenuBtnIcon}>💡</span>
          {t(chatKeys.inlineButtons.budget)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.authenticity))
          }
        >
          <span className={styles.chatMenuBtnIcon}>✅</span>
          {t(chatKeys.inlineButtons.authenticity)}
        </button>
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <input
            placeholder={t(chatKeys.input.placeholder)}
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
          aria-label={t(chatKeys.input.send)}
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

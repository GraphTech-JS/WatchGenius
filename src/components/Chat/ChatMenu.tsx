"use client";

import React, {
  RefObject,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { Button } from "../Button/Button";
import styles from "./ChatMenu.module.css";
import { useClickOutside } from "@/utils/useClickOutside";
import Link from "next/link";
import { Close, Robot } from "../../../public/icons";
import { MainContext } from "@/context";
import { ThemedText } from "../ThemedText/ThemedText";

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { message, messages, setMessage } = useContext(MainContext);

  useClickOutside(ref as RefObject<HTMLDivElement>, onClose);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      content: e.target.value,
      by: "me",
      id: messages.length + 1 + Math.random() * 1000,
    });
  };

  return (
    <div
      ref={ref}
      className={`${styles.chatMenu} ${isAnimating ? styles.open : ""}`}
    >
      <button className={styles.chatMenuClose} onClick={handleClose}>
        <img
          src={Close.src}
          alt="close menu button"
          className={styles.chatMenuCloseIcon}
        />
      </button>
      <div className={styles.chatMenuContainer}>
        <img src={Robot.src} alt="ai robot" className={styles.chatMenuIcon} />
        <ThemedText type="h1">AI-агент</ThemedText>
        <p className={styles.chatMenuDescription}>
          Швидко, точно та без нав’язливих порад. Просто запитайте.
        </p>
        <input
          placeholder="Введіть Ваш запит"
          value={message?.content}
          onChange={handleMessage}
          className={styles.chatHeaderInput}
        />
        <ThemedText type="h2" className="text-center">
          Що я можу для Вас зробити?
        </ThemedText>
        <div className={styles.chatMenuButtons}>
          <Button variant="outline" classNames={styles.chatMenuBtn}>
            <Link href="/chat">Порівняти моделі</Link>
          </Button>
          <Button variant="outline" classNames={styles.chatMenuBtn}>
            <Link href="/chat">Підібрати годинник</Link>
          </Button>

          <Button variant="outline" classNames={styles.chatMenuBtn}>
            <Link href="/chat">Показати хіти продажу</Link>
          </Button>
          <Button variant="outline" classNames={styles.chatMenuBtn}>
            <Link href="/chat">Обрати подарунок</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useEffect, useContext, useId } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import styles from "./ChatMenu.module.css";
import Link from "next/link";
import { Close, Robot } from "../../../public/icons";
import { MainContext } from "@/context";
import { ThemedText } from "../ThemedText/ThemedText";

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ isOpen, onClose }) => {
  const id = useId();
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { message, messages, setMessage, setMessages } =
    useContext(MainContext);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

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
    const aiResponse =
      "Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?";

    setMessages([
      ...messages,
      message,
      {
        content: aiResponse,
        by: "ai",
        id: messages.length + 1 + Math.random() * 1000,
      },
    ]);

    setMessage({
      content: "",
      by: "me",
      id: messages.length + 1 + Math.random() * 1000,
    });

    router.push(`/chat/${id}`);
  };
  return (
    <div
      ref={ref}
      className={`${styles.chatMenu} ${isAnimating ? styles.open : ""}`}
      style={{ height: "100%" }}
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
          Швидко, точно та без нав'язливих порад. Просто запитайте.
        </p>
        <input
          placeholder="Введіть Ваш запит"
          value={message.content}
          onChange={handleChange}
          className={styles.chatHeaderInput}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className={styles.chatMenuSandBtn} onClick={handleSend}>
          <span className={styles.chatMenuSandBtnText}>Надіслати</span>
        </button>
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

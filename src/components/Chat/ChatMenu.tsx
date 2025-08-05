/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import styles from "./ChatMenu.module.css";
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

    router.push(`/chat/${Date.now()}`);
  };

  const handleInlineButtonClick = (buttonText: string) => {
    const aiResponse =
      "Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?";
    setMessages([
      ...messages,
      {
        content: buttonText,
        by: "me",
        id: Date.now() + Math.random(),
      },
      {
        content: aiResponse,
        by: "ai",
        id: Date.now() + Math.random() + 1,
      },
    ]);
    handleClose();
    router.push(`/chat/${Date.now()}`);
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
        <Button
          variant="solid"
          classNames={styles.chatMenuSandBtn}
          onClick={handleSend}
        >
          Відправити
        </Button>
        <ThemedText type="h2" className="text-center font-semibold">
          Що я можу для Вас зробити?
        </ThemedText>
        <div className={styles.chatMenuButtons}>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Порівняти моделі")}
          >
            Порівняти моделі
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Підібрати годинник")}
          >
            Підібрати годинник
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Показати хіти продажу")}
          >
            Показати хіти продажу
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Обрати подарунок")}
          >
            Обрати подарунок
          </Button>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import styles from "./ChatMenu.module.css";
import { RobotWhiteIcon, CloseIcon } from "../../../public/chat/Icon";
import { MainContext } from "@/context";
// import { ThemedText } from "../ThemedText/ThemedText";

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
      className={`${styles.chatMenu} ${
        isAnimating ? styles.open : ""
      } flex flex-col h-full min-h-screen`}
      style={{ height: "100%" }}
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

          <div className={`${styles.chatMenuHeaderNameTitle} `}>
            Geni - ваш AI-асистент
          </div>
        </div>

        <button
          className={`${styles.chatMenuClose} flex items-center justify-center`}
          onClick={handleClose}
        >
          <CloseIcon className={`${styles.CloseIcon} w-4 h-4 `} />
        </button>
      </div>

      <div className={`${styles.chatMenuContainer} flex flex-col items-center`}>
        {/* <ThemedText type="h1">AI-агент</ThemedText>
        <p className={styles.chatMenuDescription}>
          Швидко, точно та без нав'язливих порад. Просто запитайте.
        </p> */}

        {/* <ThemedText type="h2" className="text-center font-semibold">
          Що я можу для Вас зробити?
        </ThemedText> */}

        <div
          className={`${styles.chatMenuButtons} w-full flex flex-col gap-2.5 px-5 py-3.5`}
        >
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Порівняти моделі")}
          >
            <span className={`${styles.chatMenuBtnIcon}`}>🔍 </span>
            Порівняти моделі
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Показати тренди ринку")}
          >
            <span className={`${styles.chatMenuBtnIcon}`}>📈 </span>
            Показати тренди ринку
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() =>
              handleInlineButtonClick("Знайти годинник по бюджету")
            }
          >
            <span className={`${styles.chatMenuBtnIcon}`}>💰 </span>
            Знайти годинник по бюджету
          </Button>
          <Button
            variant="outline"
            classNames={styles.chatMenuBtn}
            onClick={() => handleInlineButtonClick("Як перевірити справжність")}
          >
            <span className={`${styles.chatMenuBtnIcon}`}>✅ </span>
            Як перевірити справжність?
          </Button>
        </div>
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
      </div>
    </div>
  );
};

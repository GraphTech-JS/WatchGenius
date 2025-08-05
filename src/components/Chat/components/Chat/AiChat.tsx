/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useRef, useEffect } from "react";
import styles from "./AiChat.module.css";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { ChatList } from "../ChatList/ChatList";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { MainContext } from "@/context";
import { Button } from "@/components/Button/Button";
import { ArrowLeft, Robot, Send } from "../../../../../public/icons";
import { ThemedText } from "@/components/ThemedText/ThemedText";
// import { useSearchParams } from "next/navigation";

interface IAiChat {
  type: "general" | "chat";
}

// export const AiChat = () => {
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type") === "chat" ? "chat" : "general";

export const AiChat = ({ type }: IAiChat) => {
  const { push } = useRouter();
  const screenWidth = useScreenWidth();
  const { message, messages, setMessage, setMessages } =
    useContext(MainContext);

  // Создаем ref для input и для последнего сообщения
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Функция для фокуса на input и его позиционирования внизу экрана
  const focusOnInput = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 100);
  };

  // Эффект для фокуса на input при изменении сообщений
  useEffect(() => {
    if (messages.length > 0 && type === "chat") {
      focusOnInput();
    }
  }, [messages.length, type]);

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      content: e.target.value,
      by: "me",
      id: messages.length + 1 + Math.random() * 1000,
    });
  };

  const onClickOnInlineBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    if (!target.textContent) return;

    const aiResponse =
      "Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?";

    setMessages([
      ...messages,
      {
        content: target.textContent,
        by: "me",
        id: Date.now() + Math.random(),
      },
      {
        content: aiResponse,
        by: "ai",
        id: Date.now() + Math.random() + 1,
      },
    ]);

    // Фокусируемся на input
    focusOnInput();

    // Если мы в режиме general - переходим на новую страницу
    if (type === "general") {
      push(`/chat/${Date.now()}`);
    }
  };

  const handleSend = () => {
    if (!message.content.trim()) return;

    const aiResponse =
      "Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?";

    // Добавляем пользовательское сообщение и ответ AI
    setMessages([
      ...messages,
      message,
      { content: aiResponse, by: "ai", id: Date.now() + Math.random() + 1 },
    ]);

    // Очищаем инпут
    setMessage({ content: "", by: "me", id: Date.now() + Math.random() + 2 });

    // Если общий режим — переходим на новую страницу чата
    if (type === "general") {
      push(`/chat/${Date.now()}`);
    }
    // В режиме чата useEffect автоматически сделает фокус на input
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <Link
            href={type === "general" ? "/" : "/chat"}
            prefetch={false}
            className={styles.chatHeaderBack}
          >
            <img
              src={ArrowLeft.src}
              alt="back navigation"
              className={styles.chatHeaderBackIcon}
            />
          </Link>
          <img
            src={Robot.src}
            alt="ai robot"
            className={styles.chatHeaderIcon}
          />
          <ThemedText type="h1">AI-агент</ThemedText>
          <p className={styles.chatHeaderDescription}>
            Швидко, точно та без нав'язливих порад. Просто запитайте.
          </p>
          <div className={styles.chatContent}>
            {type === "chat" && <ChatList />}
            {/* Невидимый элемент для скролла к последнему сообщению */}
            {messages.length > 0 && <div ref={lastMessageRef} />}
          </div>
          <div
            className={`${
              type === "general" ? styles.chatForm : styles.chatAiForm
            }`}
          >
            <input
              ref={inputRef}
              placeholder="Введіть Ваш запит"
              value={message?.content}
              onChange={handleMessage}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className={`${
                type === "general"
                  ? styles.chatHeaderInput
                  : styles.chatAiHeaderInput
              }`}
            />
            <Button
              type="submit"
              variant={screenWidth <= 900 && type === "chat" ? "text" : "solid"}
              classNames={
                screenWidth <= 900 && type === "chat"
                  ? styles.chatFormSendBtn
                  : styles.chatFormBtn
              }
              onClick={handleSend}
            >
              {screenWidth <= 900 && type === "chat" ? (
                <img
                  src={Send.src}
                  alt="send message"
                  className={styles.chatFormSendIcon}
                />
              ) : (
                "Відправити"
              )}
            </Button>
          </div>
        </div>
        <div className={styles.chatFooter}>
          <ThemedText type="h2">Що я можу для Вас зробити?</ThemedText>
          <div className={styles.chatFooterButtons}>
            <Button
              variant="outline"
              classNames={styles.chatFooterBtn}
              onClick={onClickOnInlineBtn}
            >
              Підібрати годинник
            </Button>
            <Button
              variant="outline"
              classNames={styles.chatFooterBtn}
              onClick={onClickOnInlineBtn}
            >
              Порівняти моделі
            </Button>
            <Button
              variant="outline"
              classNames={styles.chatFooterBtn}
              onClick={onClickOnInlineBtn}
            >
              Показати хіти продажу
            </Button>
            <Button
              variant="outline"
              classNames={styles.chatFooterBtn}
              onClick={onClickOnInlineBtn}
            >
              Обрати подарунок
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

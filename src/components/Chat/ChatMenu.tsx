"use client";

import React, { RefObject, useRef, useState, useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./ChatMenu.module.css";
import { useClickOutside } from "@/app/utils/useClickOutside";
import Link from "next/link";
import { Close, Robot } from "../../../public/icons";

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref as RefObject<HTMLDivElement>, onClose);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
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
        <h3 className={styles.chatMenuTitle}>AI-агент</h3>
        <p className={styles.chatMenuDescription}>
          Швидко, точно та без нав’язливих порад. Просто запитайте.
        </p>

        <h1 className=" text-[32px] text-center">Що я можу для Вас зробити?</h1>
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

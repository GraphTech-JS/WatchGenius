"use client";
import React, { useState } from "react";
import styles from "./SaveToChatButton.module.css";
import { StarIcon, StarIconHover } from "../../../../../public/catalogPage";
import Image from "next/image";
import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";
import { a11yKeys } from '@/i18n/keys/accessibility';

interface SaveToChatButtonProps {
  onClick: () => void;
}

export const SaveToChatButton: React.FC<SaveToChatButtonProps> = ({
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    setIsSaved(true);
    onClick();

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.saveToChatButton} w-full md:w-[194px] lg:w-[252px] ${
        isSaved ? styles.saved : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isSaved}
      aria-label={
        isSaved ? t(a11yKeys.catalog.saved) : t(a11yKeys.catalog.saveToChat)
      }
    >
      <Image
        src={isSaved ? StarIconHover : isHovered ? StarIconHover : StarIcon}
        alt="StarIcon"
        width={18}
        height={18}
        className="w-[18px] h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] flex-shrink-0"
        aria-hidden='true'
      />
      <span className="text-[16px] md:text-[13px] lg:text-[16px] leading-tight">
        {isSaved
          ? t(catalogKeys.controls.savedBtn)
          : t(catalogKeys.controls.saveBtn)}
      </span>
    </button>
  );
};

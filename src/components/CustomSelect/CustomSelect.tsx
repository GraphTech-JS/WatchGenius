"use client";
import React, { useState } from "react";
import styles from "./CustomSelect.module.css";
import { ArrowIcon } from "../../../public/social/Icon";

interface CustomSelectProps {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Оберіть...",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className={`${styles.wrapper} relative w-full `}>
      <div
        className={`${styles.control} ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        } flex items-center justify-between cursor-pointer px-4 py-3.5 `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selected || (
            <span className={styles.selectPlaceholder}>{placeholder}</span>
          )}
        </span>
        <ArrowIcon
          className={`${
            styles.selectArrow
          } w-[14px] h-[26px] transform rotate-90 transition-transform ${
            isOpen ? "rotate-270" : ""
          } `}
        />
      </div>

      <div
        className={`${
          styles.menu
        } absolute transition-all duration-300 ease-in-out  ${
          isOpen ? styles.menuOpen : styles.menuClosed
        }`}
      >
        {options.map((opt, i) => (
          <div
            key={i}
            className={`
      ${styles.option} 
      cursor-pointer px-4 py-3.5
      ${i !== options.length - 1 ? styles.optionDivider : ""}
    `}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

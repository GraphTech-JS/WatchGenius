"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    if (onChange) onChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className={`${styles.wrapper} relative w-full`}>
      <div
        className={`${styles.control} ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        } flex items-center justify-between px-4 py-3.5 lg:px-5.5 lg:py-4.5`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="flex-1 outline-none bg-transparent text-base"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span className="truncate">
            {selected || (
              <span className={styles.selectPlaceholder}>{placeholder}</span>
            )}
          </span>
        )}

        <ArrowIcon
          className={`${
            styles.selectArrow
          } w-[14px] h-[26px] transform rotate-90 transition-transform cursor-pointer ${
            isOpen ? "rotate-270" : ""
          }`}
        />
      </div>

      <div
        className={`
          ${styles.menu}
          absolute transition-all duration-300 ease-in-out
          ${isOpen ? styles.menuOpen : styles.menuClosed}
        `}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt, i) => (
            <div
              key={i}
              className={`
                ${styles.option}
                cursor-pointer px-4 py-3.5
                ${i !== filteredOptions.length - 1 ? styles.optionDivider : ""}
              `}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))
        ) : (
          <div className="px-4 py-3.5 text-gray-400 text-sm">
            Нічого не знайдено
          </div>
        )}
      </div>
    </div>
  );
};

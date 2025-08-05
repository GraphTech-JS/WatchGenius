import React, { useState, useRef, RefObject } from "react";
import styles from "./Select.module.css";
import { useClickOutside } from "@/utils/useClickOutside";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Select = ({
  placeholder,
  options,
  value,
  onChange,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef as RefObject<HTMLDivElement>, () =>
    setIsOpen(false)
  );

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayText =
    value !== "" && selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`${styles.select} ${className || ""}`} ref={selectRef}>
      <button
        className={styles.selectButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.selectText}>{displayText}</span>
        <svg
          className={`${styles.selectArrow} ${
            isOpen ? styles.selectArrowOpen : ""
          }`}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.selectDropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.selectOption} ${
                selectedValue === option.value
                  ? styles.selectOptionSelected
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

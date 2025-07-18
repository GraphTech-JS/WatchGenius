import React from "react";
import styles from "./Switch.module.css";

export interface SwitchProps {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  variant?: "green" | "dark";
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  isOn,
  onToggle,
  variant = "green",
  onLabel = "ON",
  offLabel = "OFF",
  disabled = false,
  className = "",
}: SwitchProps) => {
  // const handleToggle = () => {
  //   if (!disabled) {
  //     onToggle(!isOn);
  //   }
  // };

  const switchClasses = [
    styles.switch,
    styles[variant],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={switchClasses}>
      <button
        type="button"
        className={`${styles.option} ${styles.onOption} ${
          isOn ? styles.active : ""
        }`}
        onClick={() => !disabled && onToggle(true)}
        disabled={disabled}
      >
        {onLabel}
      </button>
      <button
        type="button"
        className={`${styles.option} ${styles.offOption} ${
          !isOn ? styles.active : ""
        }`}
        onClick={() => !disabled && onToggle(false)}
        disabled={disabled}
      >
        {offLabel}
      </button>
    </div>
  );
};

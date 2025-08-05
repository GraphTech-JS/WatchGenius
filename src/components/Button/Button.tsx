import React, { RefObject } from "react";
import styles from "./Button.module.css";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text" | "link";
  bgColor?: string;
  color?: string;
  classNames?: string;
  ref?: RefObject<HTMLButtonElement | null>;
}

export const Button = ({
  children,
  variant,
  bgColor = "#000",
  color = "#fff",
  classNames,
  ref,
  ...props
}: IButton) => {
  let variantClass = styles.solid;
  let style: React.CSSProperties = { background: bgColor, color };

  if (variant === "outline") {
    variantClass = styles.outline;
    style = { borderColor: bgColor, color: bgColor, background: "transparent" };
  } else if (variant === "text") {
    variantClass = styles.text;
    style = {
      background: "transparent",
      color,
      border: "none",
      boxShadow: "none",
    };
  } else if (variant === "link") {
    return;
  }

  return (
    <button
      {...props}
      className={`${styles.btn} ${variantClass} ${classNames || ""}`.trim()}
      ref={ref}
      style={style && props.style ? { ...style, ...props.style } : style}
      type="button"
    >
      {children}
    </button>
  );
};

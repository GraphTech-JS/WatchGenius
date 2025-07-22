// components/ThemedText.tsx
import React from "react";
import { cn } from "@/utils";
import styles from "./ThemedText.module.css";

export type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "empty";

export interface ThemedTextProps extends React.HTMLAttributes<HTMLElement> {
  type?: TextType;
  className?: string;
}

export function ThemedText({
  type = "h5",
  className = "",
  ...rest
}: ThemedTextProps) {
  return (
    <span
      className={cn(styles.themedText, styles[type], className)}
      {...rest}
    />
  );
}

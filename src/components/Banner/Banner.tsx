"use client";
import React from "react";
import styles from "./Banner.module.css";
import { ThemedText } from "../ThemedText/ThemedText";

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <ThemedText type="h2">Банер</ThemedText>
      </div>
    </div>
  );
};

"use client";
import React from "react";
import styles from "./Banner.module.css";

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h4 className={styles.bannerTitle}>Банер</h4>
      </div>
    </div>
  );
};

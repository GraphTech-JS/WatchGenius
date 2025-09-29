"use client";
import React from "react";
import styles from "./Trending.module.css";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { mockTrending } from "@/mock/watch";
import { ProductCarousel } from "@/components/ProductsTable/ProductCarousel/ProductCarousel";
import { SettingsIcon } from "../../../../public/social/Icon";

export const Trending = () => {
  return (
    <section
      id="trending"
      className={`${styles.trending} max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
    >
      <div className={styles.trendingContainer}>
        <div
          className={`${styles.trendingTitle} flex mb-6 justify-between items-center`}
        >
          <ThemedText type="h2">Trending now</ThemedText>
          <SettingsIcon className={`w-[24px] h-[24px] cursor-pointer`} />
        </div>

        <ProductCarousel items={mockTrending} />
      </div>
    </section>
  );
};

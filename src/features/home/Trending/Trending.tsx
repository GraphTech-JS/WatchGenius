"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Trending.module.css";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { mockTrending } from "@/mock/watch";
import { ProductCarousel } from "@/components/ProductsTable/ProductCarousel/ProductCarousel";
import { SettingsIcon } from "../../../../public/social/Icon";

export const Trending = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen((prev) => !prev);

  // Закриваємо при кліку поза меню
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return (
    <section
      id="trending"
      className={`${styles.trending} max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
    >
      <div className={styles.trendingContainer}>
        <div
          className={`${styles.trendingTitle} relative flex mb-6 justify-between items-center`}
        >
          <ThemedText type="h2">Trending now</ThemedText>
          <div ref={menuRef} className="relative">
            <SettingsIcon
              onClick={toggleMenu}
              className="mr-2 w-[24px] h-[24px] cursor-pointer"
            />

            <div
              className={`${
                styles.trendingSettings
              } absolute right-[-10px] top-[-8px] z-10 min-w-[12.5rem] flex flex-col text-center rounded-xl border-1 transition-all duration-300 ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div
                className={`${styles.trendingSettingsItem} py-2 px-5 flex items-center justify-end gap-6 border-b cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>За трендом</span>
                <SettingsIcon className="w-[24px] h-[24px] cursor-pointer" />
              </div>
              <div
                className={`${styles.trendingSettingsItem} py-2 border-b cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>За ціною</span>
              </div>
              <div
                className={`${styles.trendingSettingsItem} py-2 cursor-pointer`}
                onClick={toggleMenu}
              >
                <span>За рейтингом</span>
              </div>
            </div>
          </div>
        </div>

        <ProductCarousel items={mockTrending} />
      </div>
    </section>
  );
};

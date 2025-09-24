"use client";
import React, { useState, useEffect } from "react";
import styles from "./Market.module.css";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { mockCards } from "@/mock/watch";
import { MarketCard } from "./MarketCard/MarketCard";

export const Market = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // useEffect(() => {
  //   if (!isDesktop) {
  //     const interval = setInterval(() => {
  //       setActiveIndex((prev) =>
  //         prev === mockCards.length - 1 ? 0 : prev + 1
  //       );
  //     }, 4000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isDesktop]);

  if (isDesktop) {
    return (
      <section
        id="market"
        className={`${styles.market} px-[1.25rem] pt-6 pb-10 `}
      >
        <div className={`${styles.marketContainer}`}>
          <div className={`${styles.marketTitle} mb-6`}>
            <ThemedText type="h2">Market overview</ThemedText>
          </div>
          <div className={`${styles.marketContent} grid md:grid-cols-3 gap-6`}>
            {mockCards.slice(0, 3).map((card, idx) => (
              <MarketCard key={idx} {...card} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const ActiveCard = mockCards[activeIndex];

  return (
    <section id="market" className={`${styles.market} px-[1.25rem] pt-6 pb-10`}>
      <div className={`${styles.marketContainer}`}>
        <div className={`${styles.marketTitle} mb-6`}>
          <ThemedText type="h2">Market overview</ThemedText>
        </div>
        <div className={`${styles.marketContent} flex justify-center`}>
          <MarketCard {...ActiveCard} />
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {mockCards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === idx ? "bg-[#04694F] scale-110" : "bg-gray-300"
              }`}
              aria-label={`Показати товар ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

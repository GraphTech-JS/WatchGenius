"use client";
import React, { useState, useEffect } from "react";
import styles from "./Market.module.css";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { mockCards } from "@/mock/watch";
import { MarketCard } from "@/components/Main/Market/MarketCard/MarketCard";
import { MarketTotal } from "@/components/Main/Market/MarketCard/MarketTotal";

export const Market = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const allCards = [
    ...mockCards.map((card, idx) => ({
      type: "card" as const,
      content: <MarketCard key={`card-${idx}`} {...card} />,
    })),
    {
      type: "total" as const,
      content: (
        <MarketTotal
          key="total"
          title="Liquidity Leaders"
          deals={120}
          amount={12545000}
          chartData={[7, 6, 7, 6, 7.5, 7, 8]}
        />
      ),
    },
  ];

  if (isDesktop) {
    return (
      <section
        id="market"
        className={`${styles.market} max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6.25rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
      >
        <div className={`${styles.marketContainer}`}>
          <div className={`${styles.marketTitle} mb-6`}>
            <ThemedText type="h2">Market overview</ThemedText>
          </div>
          <div className={`${styles.marketContent} grid md:grid-cols-3 gap-6`}>
            {allCards.map((card) => card.content)}
          </div>
        </div>
      </section>
    );
  }

  const ActiveCard = allCards[activeIndex];

  return (
    <section
      id="market"
      className={`${styles.market} px-[1.25rem] pt-6 lg:pt-12 pb-10`}
    >
      <div className={`${styles.marketContainer}`}>
        <div className={`${styles.marketTitle} mb-6`}>
          <ThemedText type="h2">Market overview</ThemedText>
        </div>

        <div className={`${styles.marketContent} flex justify-center`}>
          {ActiveCard.content}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {allCards.map((_, idx) => (
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

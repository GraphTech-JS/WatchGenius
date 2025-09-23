"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { HeroChartsCarousel } from "@/components/Main/Hero/HeroChartsCarousel/HeroChartsCarousel";

import { ThemedText } from "@/components/ThemedText/ThemedText";
import { RobotIcon } from "../../../../public/chat/Icon";

export const Hero = () => {
  return (
    <section className={`${styles.hero}`}>
      <div
        className={`${styles.heroContainer} px-5 pt-25 pb-15 flex items-center relative w-full bg-[url('/hero-section/hero.png')] bg-no-repeat bg-bottom-right md:bg-[bottom] bg-cover`}
      >
        <div
          className={`${styles.heroLeft} w-full flex flex-col text-center gap-17`}
        >
          <div className={`${styles.heroText} flex flex-col gap-6`}>
            <ThemedText type="h1" className=" flex text-white ">
              Зрозумілий ринок годинників з Data+ AI
            </ThemedText>
            <p className={styles.heroSubtitle}>
              Аналітика цін та трендів для 300+ моделей. Персональний
              чат-асистент допоможе обрати годинник та купити безпечно
            </p>
          </div>
          <div className={`${styles.heroMenu} flex flex-col gap-6`}>
            <Link href="/catalog" className={styles.heroLink}>
              <button
                className={`${styles.heroCatalogBtn} w-full py-[12px] rounded-[10px]`}
              >
                <div>Каталог</div>
              </button>
            </Link>
            <Link href="/chat" className={styles.heroLink}>
              <button
                className={`${styles.heroChatBtn} py-[8px] flex items-center justify-center w-full rounded-[10px] gap-[10px]`}
              >
                <RobotIcon
                  className={`${styles.footerSocialLinkItem} w-8 h-8 md:text-white `}
                />
                <div>Geni - AI chat</div>
              </button>
            </Link>
          </div>
          <div className={`${styles.heroCharts} `}>
            <HeroChartsCarousel />
            {/* <div className={`${styles.heroChartsCarousel} w-full`}>
              <div
                className={`${styles.heroChartContainer} w-full h-[108px] rounded-[15px] p-[6px]`}
              >
                <div
                  className={`${styles.heroChartItem} flex rounded-[10px] h-full w-full`}
                >
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

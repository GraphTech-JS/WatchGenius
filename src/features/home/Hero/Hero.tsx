"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { HeroChartsCarousel } from "@/components/Main/Hero/HeroChartsCarousel/HeroChartsCarousel";

import { ThemedText } from "@/components/ThemedText/ThemedText";
import { RobotWhiteIcon } from "../../../../public/chat/Icon";

export const Hero = () => {
  return (
    <section className={`${styles.hero}`}>
      <div
        className={`${styles.heroContainer} w-full relative bg-[url('/hero-section/Hero.png')] bg-no-repeat bg-[68%] md:bg-[82%] lg:bg-top bg-cover`}
      >
        <div
          className={`${styles.heroWrap} max-w-[90rem] mx-auto w-full  overflow-hidden px-5 md:px-10 
        lg:px-25 pt-25 md:pt-28 lg:pt-36 pb-15 lg:pb-6 flex flex-col items-center 
        md:items-start gap-17 md:gap-18 lg:gap-12`}
        >
          <div
            className={`${styles.heroLeft} w-full flex flex-col text-center md:text-start gap-17 md:max-w-[66%] md:items-start  lg:max-w-[590px] `}
          >
            <div className={`${styles.heroText} flex flex-col gap-6 `}>
              <ThemedText
                type="h1"
                className={`${styles.heroTextTitle} flex text-white `}
              >
                Зрозумілий ринок годинників з Data+ AI
              </ThemedText>
              <p className={styles.heroTextSubtitle}>
                Аналітика цін та трендів для 300+ моделей. Персональний
                чат-асистент допоможе обрати годинник та купити безпечно
              </p>
            </div>
            <div
              className={`${styles.heroMenu} md:w-[90%] flex flex-col md:flex-row gap-6 items-center`}
            >
              <Link href="/catalog" className={styles.heroLink}>
                <button
                  className={`${styles.heroCatalogBtn} w-full py-[12px] rounded-[10px] cursor-pointer`}
                >
                  <div>Каталог</div>
                </button>
              </Link>
              <Link href="/chat" className={styles.heroLink}>
                <button
                  className={`${styles.heroChatBtn} py-[8px] flex items-center justify-center w-full rounded-[10px] gap-[10px] cursor-pointer`}
                >
                  <RobotWhiteIcon
                    className={`${styles.footerSocialLinkItem} w-8 h-8 md:text-white `}
                  />
                  <div>Geni - AI chat</div>
                </button>
              </Link>
            </div>
          </div>
          <div className={`${styles.heroCharts} w-full`}>
            <HeroChartsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

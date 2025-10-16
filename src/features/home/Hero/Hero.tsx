"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { HeroChartsCarousel } from "@/components/Main/Hero/HeroChartsCarousel/HeroChartsCarousel";
import { RobotWhiteIcon } from "../../../../public/chat/Icon";

export const Hero = () => {
  return (
    <section className={`${styles.hero} `}>
      <div
        className={`${styles.heroContainer} 
        w-full relative 
        bg-[url('/hero-section/HeroBgBig.png')] md:bg-[url('/hero-section/HeroBgBig.png')] lg:bg-[url('/hero-section/HeroBgBig.png')] 
        bg-position-[center_right_-230px] sm:bg-position-[center_right_-200px] md:bg-position-[top_-70px_right_-120px] lg:bg-position-[center_left_204px]
        bg-no-repeat bg-cover md:bg-size-[auto_620px] lg:bg-cover `}
      >
        <div className="absolute inset-0 z-0 backdrop-blur-xs md:hidden" />
        <div
          className={`${styles.heroWrap} relative z-[2] max-w-[90rem] mx-auto w-full overflow-hidden px-3.5 md:pl-10 md:pr-0 pb-6 md:pb-4 lg:px-25
          pt-24 md:pt-28 lg:pt-36 lg:pb-6 flex flex-col items-center 
          md:items-start gap-17 lg:gap-12`}
        >
          <div
            className={`${styles.heroLeft} w-full flex flex-col text-center md:text-start gap-22 md:gap-7.5 lg:gap-17 md:max-w-[63%] md:items-start  lg:max-w-[590px] `}
          >
            <div className={`${styles.heroText} flex flex-col gap-6 md:gap-1 `}>
              <h1 className={`${styles.heroTextTitle} flex text-white `}>
                Зрозумілий ринок годинників з Data+ AI
              </h1>
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
          <div className={`${styles.heroCharts} w-full z-10`}>
            <HeroChartsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

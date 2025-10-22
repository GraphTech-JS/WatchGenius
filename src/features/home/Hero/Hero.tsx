"use client";
import React, { useContext } from "react";
import styles from "./Hero.module.css";
// import Link from 'next/link';
import { LocalizedLink } from "@/components/LocalizedLink";
import { HeroChartsCarousel } from "@/components/Main/Hero/HeroChartsCarousel/HeroChartsCarousel";
import { RobotWhiteIcon } from "../../../../public/chat/Icon";
import { MainContext } from "@/context";
import { t } from "@/i18n";
import { heroKeys } from "@/i18n/keys/home";

export const Hero = () => {
  const { setSideChatOpened } = useContext(MainContext);

  const handleChatClick = () => {
    setSideChatOpened(true);
  };

  return (
    <section className={`${styles.hero} `}>
      <div
        className={`${styles.heroContainer} 
        w-full relative 
        bg-[url('/hero-section/HeroBgBig.webp')] md:bg-[url('/hero-section/HeroBgBig.webp')] lg:bg-[url('/hero-section/HeroBgBig.webp')] 
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
                {t(heroKeys.title)}
              </h1>
              <p className={styles.heroTextSubtitle}>{t(heroKeys.subtitle)}</p>
            </div>
            <div
              className={`${styles.heroMenu} md:w-[90%] flex flex-col md:flex-row gap-6 items-center`}
            >
              <LocalizedLink href="/catalog" className={styles.heroLink}>
                <button
                  className={`${styles.heroCatalogBtn} w-full py-[12px] rounded-[10px] cursor-pointer`}
                >
                  <div>{t(heroKeys.buttons.catalog)}</div>
                </button>
              </LocalizedLink>
              <button
                onClick={handleChatClick}
                className={`${styles.heroChatBtn} py-[8px] flex items-center justify-center w-full rounded-[10px] gap-[10px] cursor-pointer`}
              >
                <RobotWhiteIcon
                  className={`${styles.footerSocialLinkItem} w-8 h-8 md:text-white `}
                />
                <div>{t(heroKeys.buttons.chat)}</div>
              </button>
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

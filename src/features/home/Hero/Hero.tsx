'use client';
import React, { useContext } from 'react';
import { useRef, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';
import styles from './Hero.module.css';
import { LocalizedLink } from '@/components/LocalizedLink';
import { HeroChartsCarousel } from '@/components/Main/Hero/HeroChartsCarousel/HeroChartsCarousel';
import { RobotWhiteIcon } from '../../../../public/chat/Icon';
import { MainContext } from '@/context';
import { t } from '@/i18n';
import { heroKeys } from '@/i18n/keys/home';
import { a11yKeys } from '@/i18n/keys/accessibility';

export const Hero = () => {
  const { setSideChatOpened } = useContext(MainContext);
  const heroRef = useRef<HTMLDivElement>(null);
  const handleChatClick = () => {
    trackEvent('cta_click', {
      button_type: 'chat',
      position: 'hero',
    });
    trackEvent('chat_open', {
      source: 'hero',
    });
    setSideChatOpened(true);
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent('hero_exposed', {
            timestamp: Date.now(),
            viewport_height: window.innerHeight,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className={`${styles.hero} `}>
      <div className={`${styles.heroContainer} w-full relative`}>
        <Image
          src='/hero-section/HeroBgBig.webp'
          alt=''
          fill
          priority
          fetchPriority='high'
          quality={85}
          sizes='100vw'
          placeholder='blur'
          blurDataURL='data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
          className={styles.heroBgImage}
          role='presentation'
        />
        <div className='absolute inset-0 z-0 backdrop-blur-xs md:hidden' />
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
              <LocalizedLink href='/catalog' className={styles.heroLink}>
                <button
                  onClick={() => {
                    trackEvent('cta_click', {
                      button_type: 'catalog',
                      position: 'hero',
                    });
                  }}
                  className={`${styles.heroCatalogBtn} w-full py-[12px] rounded-[10px] cursor-pointer`}
                >
                  <div>{t(heroKeys.buttons.catalog)}</div>
                </button>
              </LocalizedLink>
              <button
                onClick={handleChatClick}
                className={`${styles.heroChatBtn} py-[8px] flex items-center justify-center w-full rounded-[10px] gap-[10px] cursor-pointer max-w-[346px] md:max-w-full`}
                aria-label={t(a11yKeys.ai.chat)}
              >
                <RobotWhiteIcon
                  className={`${styles.footerSocialLinkItem} w-8 h-8 md:text-white `}
                  aria-hidden='true'
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

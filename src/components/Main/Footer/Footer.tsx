import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { LogoWhite, Chrono } from "../../../../public/icons";
import {
  DiscordIcon,
  TelegramIcon,
  InstagramIcon,
} from "../../../../public/social/Icon";

export const Footer = () => {
  return (
    <footer className={`${styles.footer} pb-[49px] md:pb-[30px]`} id="footer">
      <div
        className={`${styles.footerContainer} flex flex-col md:flex-row md:justify-between items-center gap-[30px]`}
      >
        <div
          className={`${styles.footerLeft} flex flex-col lg:gap-12 md:gap-20 gap-12 items-center justify-start p-1 `}
        >
          <nav>
            <Link
              href="/"
              className={`${styles.footerLogo} flex items-center md:gap-1 gap-2`}
            >
              <Image
                src={LogoWhite.src}
                className={`${styles.footerLogoIcom}`}
                alt="logo"
                width={40}
                height={40}
              />
              <div className={styles.logoName}>WATCHGENIUS</div>
            </Link>
          </nav>
          <div className="hidden md:flex flex-col items-center gap-3">
            <Image src={Chrono.src} alt="chrono24" width={190} height={40} />
            <div className={styles.chronoName}>Powered by Chrono 24</div>
          </div>
        </div>
        <div
          className={`${styles.footerRightLinks} w-full md:max-w-[60%] flex flex-col md:flex-row lg:justify-start md:justify-center md:items-start items-center lg:gap-18 gap-7`}
        >
          <div
            className={`${styles.footerLinks} md:w-1/3  flex flex-col md:gap-3 md:items-start items-center`}
          >
            <div className={styles.footerLinkTitle}>Меню</div>
            <nav className="hidden md:flex flex-col gap-5 items-start">
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Каталог
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Тренди
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Дилери
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Контакти
              </Link>
            </nav>
          </div>

          <div
            className={`${styles.footerLinks} md:w-1/3   flex flex-col gap-3 items-start`}
          >
            <div className={styles.footerLinkTitle}>Допомога</div>
            <nav className="hidden md:flex flex-col gap-5 items-start">
              <Link href="#" className={styles.footerLink} prefetch={false}>
                FAQ
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Як це працює
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Гайд з безпечної купівлі
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Підтримка
              </Link>
            </nav>
          </div>
          <div
            className={`${styles.footerLinks} md:w-1/3 hidden lg:flex flex-col gap-3 items-start`}
          >
            <div className={styles.footerLinkTitle}>Спільнота</div>
            <nav className="flex flex-col gap-5 items-start">
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Блог
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Discord
              </Link>
              <Link href="#" className={styles.footerLink} prefetch={false}>
                Телеграм - канал
              </Link>
            </nav>
          </div>
          <div className="md:hidden flex flex-col items-center gap-3">
            <Image
              className={styles.chronoIcon}
              src={Chrono.src}
              alt="chrono24"
              width={190}
              height={40}
            />
            <div className={styles.chronoName}>Powered by Chrono 24</div>
          </div>
        </div>
        <nav className={`${styles.footerSupportWrapper}`}>
          <div className="flex md:flex-col flex-row gap-8">
            <Link href="#" className={styles.footerSocialLink} prefetch={false}>
              <DiscordIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50`}
              />
            </Link>
            <Link href="#" className={styles.footerSocialLink} prefetch={false}>
              <TelegramIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50`}
              />
            </Link>
            <Link href="#" className={styles.footerSocialLink} prefetch={false}>
              <InstagramIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50`}
              />
            </Link>
          </div>
        </nav>
      </div>
      <div
        className={`${styles.footerBottom} mx-auto max-w-[90rem] px-[2rem] md:px-[2.5rem] lg:px-[6.25rem] flex md:flex-row flex-col-reverse md:justify-between text-center gap-6`}
      >
        <div>© 2025 WatchGenius. Всі права захищено</div>
        <div className=" flex md:flex-row flex-col-reverse gap-6">
          <div>Політика конфіденційності</div>
          <div>Умови використання</div>
        </div>
      </div>
    </footer>
  );
};

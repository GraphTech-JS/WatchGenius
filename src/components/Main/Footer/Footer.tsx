import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { LogoWhite, Chrono } from "../../../../public/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContainer}>
        <div
          className={`${styles.footerLeft} flex flex-col gap-12 items-center`}
        >
          <nav>
            <Link
              href="/"
              className={`${styles.footerLogo} flex items-center gap-1`}
            >
              <Image src={LogoWhite.src} alt="logo" width={40} height={40} />
              <div className={styles.logoName}>WATCHGENIUS</div>
            </Link>
          </nav>
          <div className="flex flex-col items-center">
            <Image src={Chrono.src} alt="chrono24" width={160} height={40} />
            <div className={styles.chronoName}>Powered by Chrono 24</div>
          </div>
        </div>
        <div className={styles.footerRightLinks}>
          <nav>
            <Link href="#" className={styles.footerLink} prefetch={false}>
              Політика конфіденційності
            </Link>
          </nav>
          <nav>
            <Link
              href="tel:+380956156714"
              className={styles.footerLink}
              prefetch={false}
            >
              +380 95 615 6714
            </Link>
          </nav>
        </div>
        <nav className={styles.footerSupportWrapper}>
          {/* <div className="flex items-center">
            <Link href="#" prefetch={false} className={styles.footerLink}>
              Support the project
            </Link>
            <img
              src={Coffee.src}
              alt="coffee icon"
              className={styles.footerSupport}
            />
          </div> */}
          <div className="flex gap-[43px] xl:gap-[112px]">
            {/* <img
              src={Discord.src}
              alt="Discord icon"
              className=" w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
            />
            <img
              src={Telegram.src}
              alt="Telegram icon"
              className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
            />
            <img
              src={Instagram.src}
              alt="Telegram icon"
              className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
            /> */}
          </div>
        </nav>
      </div>
    </footer>
  );
};

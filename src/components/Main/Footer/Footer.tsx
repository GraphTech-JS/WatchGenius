import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Coffee, Discord, Telegram } from "../../../../public/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContainer}>
        <nav>
          <Link href="/" className={styles.footerLogo}>
            <img src="/logo.png" alt="logo" width={204} height={40} />
          </Link>
        </nav>
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
          <div className="flex items-center">
            <Link href="#" prefetch={false} className={styles.footerLink}>
              Support the project
            </Link>
            <img
              src={Coffee.src}
              alt="coffee icon"
              className={styles.footerSupport}
            />
          </div>
          <div className="flex gap-[43px] xl:gap-[112px]">
            <img
              src={Discord.src}
              alt="Discord icon"
              className=" w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
            />
            <img
              src={Telegram.src}
              alt="Telegram icon"
              className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
            />
          </div>
        </nav>
      </div>
    </footer>
  );
};

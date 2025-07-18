import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Coffee } from "../../../../public/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <nav>
          <Link href="/" className={styles.footerLogo}>
            WatchGenius
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
          <nav>
            <Link
              href="#contacts"
              className={styles.footerLink + " " + styles.footerContactsLink}
              prefetch={false}
            >
              Контакти
            </Link>
          </nav>
        </div>
        <nav className={styles.footerSupportWrapper}>
          <Link href="#" prefetch={false} className={styles.footerLink}>
            Support the project
          </Link>
          <img
            src={Coffee.src}
            alt="coffee icon"
            className={styles.footerSupport}
          />
        </nav>
      </div>
    </footer>
  );
};

"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Globe, Menu, Close } from "../../../../public/icons";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpening = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <header className={`${styles.header} ${open && styles.fixedHeader}`}>
      <div className={styles.headerContainer}>
        <nav>
          <Link href="/" className={styles.headerLogo}>
            WatchGenius
          </Link>
        </nav>
        <div className={styles.headerRightLinks}>
          <nav>
            <Link
              href="/about-us"
              className={styles.headerLink}
              prefetch={false}
            >
              Про нас
            </Link>
          </nav>
          <nav>
            <Link
              href="/catalog"
              className={styles.headerLink}
              prefetch={false}
            >
              Каталог
            </Link>
          </nav>
          <nav>
            <Link
              href="#contacts"
              className={styles.headerLink}
              prefetch={false}
            >
              Контакти
            </Link>
          </nav>
        </div>
        <button className={styles.headerLangSwitchBtn}>
          <img
            src={Globe.src}
            alt="globe icon"
            className={styles.headerLangSwitchIcon}
          />
        </button>
        <button className={styles.headerMobileMenuBtn} onClick={handleOpening}>
          <img
            src={open ? Close.src : Menu.src}
            alt="menu icon"
            className={
              open
                ? styles.headerMobileMenuIconClose
                : styles.headerMobileMenuIcon
            }
          />
        </button>
        {open && (
          <div className={styles.headerMobileMenu}>
            <div className={styles.headerMobileMenuWrapper}>
              <nav>
                <Link
                  href="/about-us"
                  className={styles.headerMobileMenuLink}
                  prefetch={false}
                >
                  Про нас
                </Link>
              </nav>
              <nav>
                <Link
                  href="/catalog"
                  className={styles.headerMobileMenuLink}
                  prefetch={false}
                >
                  Каталог
                </Link>
              </nav>
              <nav>
                <Link
                  href="#contacts"
                  className={styles.headerMobileMenuLink}
                  prefetch={false}
                >
                  Контакти
                </Link>
              </nav>
              <button className={styles.headerMobileLangSwitchBtn}>
                <img
                  src={Globe.src}
                  alt="globe icon"
                  className={styles.headerMobileLangSwitchIcon}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

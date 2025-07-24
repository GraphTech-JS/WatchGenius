"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Globe, Menu, Close } from "../../../../public/icons";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} ${open ? styles.fixedHeader : ""}`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.headerLogo}>
          <ThemedText type="h3">WatchGenius</ThemedText>
        </Link>
        <nav className={styles.headerRightLinks}>
          <Link href="/about-us" className={styles.headerLink} prefetch={false}>
            Про нас
          </Link>
          <Link href="/catalog" className={styles.headerLink} prefetch={false}>
            Каталог
          </Link>
          <Link href="#contacts" className={styles.headerLink} prefetch={false}>
            Контакти
          </Link>
        </nav>

        <button className={styles.headerLangSwitchBtn}>
          <img src={Globe.src} alt="Переключить язык" />
        </button>
        <button
          className={styles.headerMobileMenuBtn}
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="mobileMenu"
        >
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
          <div id="mobileMenu" className={styles.headerMobileMenu}>
            <div className={styles.headerMobileMenuWrapper}>
              <Link
                href="/about-us"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Про нас
              </Link>
              <Link
                href="/catalog"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Каталог
              </Link>
              <Link
                href="#contacts"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Контакти
              </Link>
              <button className={styles.headerMobileLangSwitchBtn}>
                <img src={Globe.src} alt="Переключить язык" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

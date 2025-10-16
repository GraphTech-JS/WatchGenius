"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import {
  SearchNormal,
  SearchWhite,
  Logo,
  Robot,
  Heart,
  Close,
  Menu,
} from "../../../../public/icons";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className={`${styles.header} w-full`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={`flex items-center gap-[4px]`}>
          <Image
            src={Logo.src}
            className={`${styles.headerLogoIcon}`}
            alt="logo"
            width={40}
            height={40}
          />

          <div className={styles.logoName}>WATCHGENIUS</div>
        </Link>

        <nav className={`hidden lg:flex gap-11 lg:pl-12 `}>
          <Link href="/catalog" className={styles.headerLink} prefetch={false}>
            Каталог
          </Link>
          <Link href="/dealers" className={styles.headerLink} prefetch={false}>
            Дилери
          </Link>
          <Link href="#treands" className={styles.headerLink} prefetch={false}>
            Тренди
          </Link>
          <Link href="#contacts" className={styles.headerLink} prefetch={false}>
            Контакти
          </Link>
        </nav>
        <div className="flex ml-4 gap-4">
          <div className="hidden md:flex gap-5">
            <button className={styles.headerLangSwitchBtn}>
              <div>EUR</div>
            </button>
            <button className={styles.headerLangSwitchBtn}>
              <div>УКР</div>
            </button>
            <button
              className={`${styles.headerLangSwitchBtn} xl:flex lg:flex hidden shrink-0`}
            >
              <Image
                src={SearchNormal.src}
                alt="Пошук"
                width={18}
                height={18}
              />
            </button>
          </div>
          <div className="lg:hidden md:flex hidden rounded-xl border border-black pl-4 py-2">
            <input
              type="text"
              className={`${styles.headerMobileSearchInput} max-w-[150px]`}
              placeholder="Пошук"
            />
            <button className={`${styles.headerLangSwitchBtn} shrink-0 mr-3`}>
              <Image
                src={SearchNormal.src}
                alt="Пошук"
                width={18}
                height={18}
              />
            </button>
          </div>
          <div className="hidden lg:flex gap-3">
            <button className={`${styles.headerLangSwitchBtn} shrink-0`}>
              <Image src={Robot.src} alt="AI агент" width={22} height={22} />
            </button>
            <button className={`${styles.headerLangSwitchBtn} shrink-0`}>
              <Image
                src={Heart.src}
                alt="Heart"
                width={20}
                height={18}
                className=""
              />
            </button>
          </div>
          <div className="lg:hidden flex ml-4 w-8">
            <button
              className={styles.headerMobileMenuBtn}
              onClick={toggleMenu}
              aria-expanded={open}
              aria-controls="mobileMenu"
            >
              <Image
                src={open ? Close.src : Menu.src}
                alt="menu icon"
                className={
                  open
                    ? styles.headerMobileMenuIconClose
                    : styles.headerMobileMenuIcon
                }
                width={32}
                height={14}
              />
            </button>
          </div>
        </div>
        {open && (
          <div
            id="mobileMenu"
            className={`${styles.headerMobileMenu} fixed lg:hidden flex flex-col py-8 rounded-b-xl`}
          >
            <div
              className={`${styles.headerMobileMenuTop} flex w-full justify-center `}
            >
              <div className={`${styles.headerMobileMenuSearch} flex `}></div>
              <div className="md:hidden flex gap-5 p-3">
                <div className=" flex rounded-xl border border-white pl-4 py-3">
                  <input
                    type="text"
                    className={`${styles.headerMobileSearchInput} max-w-[200px]`}
                    placeholder="Пошук"
                  />
                  <button
                    className={`${styles.headerLangSwitchBtn} shrink-0 mr-4`}
                  >
                    <Image
                      src={SearchWhite.src}
                      alt="Пошук"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>

                <button className={styles.headerMobileLangSwitchBtn}>
                  <div>EUR</div>
                </button>
                <button className={styles.headerMobileLangSwitchBtn}>
                  <div>УКР</div>
                </button>
              </div>
            </div>
            <div
              className={`${styles.headerMobileMenuWrapper} md:mt-12 flex h-full flex-col items-center justify-center`}
            >
              <Link
                href="/catalog"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Каталог
              </Link>
              <Link
                href="/dealers"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Дилери
              </Link>
              <Link
                href="#treands"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Тренди
              </Link>
              <Link
                href="#contacts"
                onClick={closeMenu}
                className={styles.headerMobileMenuLink}
              >
                Контакти
              </Link>
              <button className={styles.headerMobileLangSwitchBtn}>
                {/* <img src={Globe.src} alt="Переключить язык" /> */}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const openMenu = () => {
    setMenuClosing(false);
    setOpen(true);
  };

  const startCloseMenu = () => {
    // запускаємо анімацію закриття
    setMenuClosing(true);
    // після завершення transition (200ms) — відмонтовуємо
    setTimeout(() => {
      setOpen(false);
      setMenuClosing(false);
    }, 200);
  };

  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [selectedLang, setSelectedLang] = useState("УКР");

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (currencyRef.current && !currencyRef.current.contains(target)) {
        setShowCurrency(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setShowLang(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSearch) {
      timer = setTimeout(() => setShowSearch(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showSearch]);

  const currencies = ["EUR", "USD", "UAH", "PL", "KZT"];
  const languages = ["УКР", "АНГЛ", "ПЛ"];

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
        <div className="flex ml-4 gap-4 relative">
          <div className="hidden md:flex gap-5 ">
            <div
              className={`relative ${
                showSearch ? "lg:hidden" : "lg:flex"
              } flex items-center w-8 text-center`}
              ref={currencyRef}
            >
              <button
                className={styles.headerLangSwitchBtn}
                onClick={() => {
                  setShowCurrency((prev) => !prev);
                  setShowLang(false);
                }}
              >
                <div>{selectedCurrency}</div>
              </button>
              {showCurrency && (
                <div className="absolute top-[-2px] lg:top-[-8px] left-[-14px] lg:left-[-14px] flex flex-col bg-white rounded-[10px] z-20">
                  {currencies.map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setSelectedCurrency(cur);
                        setShowCurrency(false);
                      }}
                      className={`${
                        styles.headerLangSwitchBtn
                      } text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] ${
                        cur !== selectedCurrency ? styles.inactiveOption : ""
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              className={`relative ${
                showSearch ? "lg:hidden" : "lg:flex"
              } flex items-center w-10 text-center`}
              ref={langRef}
            >
              <button
                className={styles.headerLangSwitchBtn}
                onClick={() => {
                  setShowLang((prev) => !prev);
                  setShowCurrency(false);
                }}
              >
                <div>{selectedLang}</div>
              </button>
              {showLang && (
                <div className="absolute top-[-2px] lg:top-[-8px] left-[-17px] lg:left-[-17px] flex flex-col bg-white rounded-[10px] z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowLang(false);
                      }}
                      className={`${
                        styles.headerLangSwitchBtn
                      } px-3 py-2 hover:bg-gray-100 rounded-[10px] text-center ${
                        lang !== selectedLang ? styles.inactiveOption : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className={`lg:${showSearch ? "hidden" : "flex"} ${
                styles.headerLangSwitchBtn
              }  hidden shrink-0`}
              onClick={() => {
                setShowSearch((prev) => !prev);
                setShowCurrency(false);
                setShowLang(false);
              }}
            >
              <Image
                src={SearchNormal.src}
                alt="Пошук"
                width={18}
                height={18}
              />
            </button>
          </div>
          <div
            ref={searchRef}
            className={`md:flex
            ${
              showSearch
                ? "lg:opacity-100 lg:translate-y-0 lg:relative lg:pointer-events-auto"
                : "lg:opacity-0 lg:translate-y-4 lg:absolute lg:pointer-events-none"
            }
            hidden rounded-xl border border-black pl-4 py-2 items-center gap-2
            transition-all duration-300 ease-out`}
          >
            <input
              type="text"
              className={`${styles.headerMobileSearchInput} w-full max-w-[150px] `}
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
              onClick={() => (open ? startCloseMenu() : openMenu())}
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
        {mounted &&
          (open || menuClosing) &&
          createPortal(
            <div
              id="mobileMenu"
              className={`${
                styles.headerMobileMenu
              } fixed lg:hidden flex flex-col py-8 rounded-none md:rounded-b-xl
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }
        transition-all duration-200 ease-out will-change-transform`}
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
                  <div
                    className="relative flex w-10 items-center text-center"
                    ref={currencyRef}
                  >
                    <button
                      className={styles.headerMobileLangSwitchBtn}
                      onClick={() => {
                        setShowCurrency((prev) => !prev);
                        setShowLang(false);
                      }}
                    >
                      <div>{selectedCurrency}</div>
                    </button>
                    {showCurrency && (
                      <div className="absolute top-[5px] left-[-14px] flex flex-col bg-white rounded-[10px] z-20">
                        {currencies.map((cur) => (
                          <button
                            key={cur}
                            onClick={() => {
                              setSelectedCurrency(cur);
                              setShowCurrency(false);
                            }}
                            className={`${
                              styles.headerLangSwitchBtn
                            } text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] ${
                              cur !== selectedCurrency
                                ? styles.inactiveOption
                                : ""
                            }`}
                          >
                            {cur}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="relative flex w-10 items-center text-center"
                    ref={langRef}
                  >
                    <button
                      className={styles.headerMobileLangSwitchBtn}
                      onClick={() => {
                        setShowLang((prev) => !prev);
                        setShowCurrency(false);
                      }}
                    >
                      <div>{selectedLang}</div>
                    </button>
                    {showLang && (
                      <div className="absolute top-[5px] left-[-17px] flex flex-col bg-white rounded-[10px] z-20">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setSelectedLang(lang);
                              setShowLang(false);
                            }}
                            className={`${
                              styles.headerLangSwitchBtn
                            } px-3 py-2 hover:bg-gray-100 rounded-[10px] text-center ${
                              lang !== selectedLang ? styles.inactiveOption : ""
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`${styles.headerMobileMenuWrapper} md:mt-12 flex h-full flex-col items-center justify-center`}
              >
                <Link
                  href="/catalog"
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  Каталог
                </Link>
                <Link
                  href="/dealers"
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  Дилери
                </Link>
                <Link
                  href="#treands"
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  Тренди
                </Link>
                <Link
                  href="#contacts"
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  Контакти
                </Link>
              </div>
            </div>,
            document.body
          )}
      </div>
    </header>
  );
};

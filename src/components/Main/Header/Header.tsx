"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
// import Link from "next/link";
import { LocalizedLink } from "@/components/LocalizedLink";
import Image from "next/image";
import styles from "./Header.module.css";
import {
  SearchNormal,
  SearchWhite,
  Logo,
  Robot,
  Close,
  Menu,
} from "../../../../public/icons";
import { HeartIcon } from "../../../../public/header/Icon";
import { t } from "@/i18n";
import { headerKeys } from "@/i18n/keys/header";

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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("mobileMenu");
        if (el) el.classList.add(styles.menuOpen);
      });
    });
  };

  const startCloseMenu = () => {
    const el = document.getElementById("mobileMenu");
    if (el) {
      el.classList.remove(styles.menuOpen);
      el.classList.add(styles.menuClosing);
    }

    setMenuClosing(true);
    setTimeout(() => {
      setOpen(false);
      setMenuClosing(false);
    }, 400);
  };

  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [selectedLang, setSelectedLang] = useState("УКР");

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const cleanPathname = pathname?.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const router = useRouter();

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    if (cleanPathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const locale = pathname.split("/")[1];
      router.push(`/${locale}/#${id}`);
    }
  };

  useEffect(() => {
    if (cleanPathname !== "/") return;

    const sections = ["dealers", "treands", "contacts"];
    const handleScroll = () => {
      let currentSection = null;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cleanPathname]);

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
        <LocalizedLink href="/" className={`flex items-center gap-[4px]`}>
          <Image
            src={Logo.src}
            className={`${styles.headerLogoIcon}`}
            alt="logo"
            width={40}
            height={40}
          />

          <div className={styles.logoName}>WATCHGENIUS</div>
        </LocalizedLink>

        <nav className={`hidden lg:flex gap-11 lg:pl-12 `}>
          {[
            {
              href: "/catalog",
              label: t(headerKeys.nav.catalog),
              type: "page",
            },
            {
              href: "#dealers",
              label: t(headerKeys.nav.dealers),
              type: "section",
            },
            {
              href: "#treands",
              label: t(headerKeys.nav.trends),
              type: "section",
            },
            {
              href: "#contacts",
              label: t(headerKeys.nav.contacts),
              type: "section",
            },
          ].map(({ href, label, type }) => {
            const isCatalog = cleanPathname === "/catalog";
            const isMain = cleanPathname === "/";
            const sectionId = href.replace("#", "");
            const isActive =
              (isCatalog && href === "/catalog") ||
              (isMain && activeSection === sectionId);

            const isInactive =
              (isCatalog && href !== "/catalog") ||
              (isMain && activeSection && activeSection !== sectionId);

            const commonClass = `${styles.headerLink} ${
              isActive ? styles.headerLinkActive : ""
            } ${isInactive ? styles.headerLinkInactive : ""}`;

            return type === "page" ? (
              <LocalizedLink
                key={label}
                href={href}
                className={commonClass}
                prefetch={false}
              >
                {label}
              </LocalizedLink>
            ) : (
              <a
                key={label}
                href={href}
                onClick={(e) => handleSectionClick(e, sectionId)}
                className={commonClass}
              >
                {label}
              </a>
            );
          })}
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
                alt={t(headerKeys.search.button)}
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
              placeholder={t(headerKeys.search.placeholder)}
            />
            <button className={`${styles.headerLangSwitchBtn} shrink-0 mr-3`}>
              <Image
                src={SearchNormal.src}
                alt={t(headerKeys.search.button)}
                width={18}
                height={18}
              />
            </button>
          </div>
          <div className="hidden lg:flex gap-3">
            <button
              className={`${styles.headerLangSwitchBtn} shrink-0`}
              onClick={() => window.dispatchEvent(new Event("openChat"))}
            >
              <Image
                src={Robot.src}
                alt={t(headerKeys.aiAgent.tooltip)}
                width={22}
                height={22}
              />
            </button>
            <button className={`${styles.headerLangSwitchBtn} shrink-0`}>
              <HeartIcon className={`w-5 h-5 text-green-800 `} />
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
                alt="menu"
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
              className={`${styles.headerMobileMenu} fixed flex flex-col py-8 rounded-none md:rounded-b-xl`}
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
                      placeholder={t(headerKeys.search.placeholder)}
                    />
                    <button
                      className={`${styles.headerLangSwitchBtn} shrink-0 mr-4`}
                    >
                      <Image
                        src={SearchWhite.src}
                        alt={t(headerKeys.search.button)}
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
                <LocalizedLink
                  href="/catalog"
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.catalog)}
                </LocalizedLink>
                <a
                  href="#dealers"
                  onClick={(e) => {
                    handleSectionClick(e, "dealers");
                    startCloseMenu();
                  }}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.dealers)}
                </a>
                <a
                  href="#treands"
                  onClick={(e) => {
                    handleSectionClick(e, "treands");
                    startCloseMenu();
                  }}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.trends)}
                </a>
                <a
                  href="#contacts"
                  onClick={(e) => {
                    handleSectionClick(e, "contacts");
                    startCloseMenu();
                  }}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.contacts)}
                </a>
              </div>
            </div>,
            document.body
          )}
      </div>
    </header>
  );
};

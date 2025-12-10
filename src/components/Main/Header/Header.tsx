'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import styles from './Header.module.css';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';
import { useWishlistContext } from '@/context/WishlistContext';
import { WishlistModal } from '@/components/WishlistModal/WishlistModal';
import { SuccessModal } from '@/components/SuccessModal/SuccessModal';
import {
  SearchNormal,
  SearchWhite,
  Logo,
  Robot,
  Close,
  Menu,
} from '../../../../public/icons';
import { HeartIcon } from '../../../../public/header/Icon';
import { headerKeys } from '@/i18n/keys/header';

export const Header = () => {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const prevWishlistCountRef = useRef(0);
  const { wishlistIds } = useWishlistContext();
  const wishlistCount = wishlistIds.length;

  const openMenu = () => {
    setMenuClosing(false);
    setOpen(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById('mobileMenu');
        if (el) el.classList.add(styles.menuOpen);
      });
    });
  };

  const startCloseMenu = () => {
    const el = document.getElementById('mobileMenu');
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

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedCurrency');
      if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
        return stored;
      }
    }
    return 'EUR';
  });
  const [selectedLang, setSelectedLang] = useState('УКР');

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const router = useRouter();

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    if (pathname === `/${locale}`) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${locale}/#${id}`);
    }
  };

  useEffect(() => {
    if (pathname !== `/${locale}`) return;

    const sections = ['dealers', 'treands', 'contacts'];
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, locale]);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSearch) {
      timer = setTimeout(() => setShowSearch(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showSearch]);

  useEffect(() => {
    if (prevWishlistCountRef.current === 0) {
      prevWishlistCountRef.current = wishlistCount;
      return;
    }

    if (wishlistCount > prevWishlistCountRef.current) {
      setSuccessMessage('Годинник додано до списку бажань');
      setShowSuccessModal(true);
    }

    prevWishlistCountRef.current = wishlistCount;
  }, [wishlistCount]);

  const currencies = ['EUR', 'USD', 'UAH', 'PL', 'KZT'];
  const languages = ['УКР', 'АНГЛ', 'ПЛ'];

  return (
    <header className={`${styles.header} w-full`}>
      <div className={styles.headerContainer}>
        <Link href={`/${locale}`} className={`flex items-center gap-[4px]`}>
          <Image
            src={Logo.src}
            className={`${styles.headerLogoIcon}`}
            alt='logo'
            width={40}
            height={40}
          />

          <div className={styles.logoName}>WATCHGENIUS</div>
        </Link>

        <nav className={`hidden gap-11 lg:flex lg:pl-12`}>
          {[
            {
              href: `/${locale}/catalog`,
              label: t(headerKeys.nav.catalog),
              type: 'page',
            },
            {
              href: '#dealers',
              label: t(headerKeys.nav.dealers),
              type: 'section',
            },
            {
              href: '#treands',
              label: t(headerKeys.nav.trends),
              type: 'section',
            },
            {
              href: '#contacts',
              label: t(headerKeys.nav.contacts),
              type: 'section',
            },
          ].map(({ href, label, type }) => {
            const isCatalog = pathname === `/${locale}/catalog`;
            const isMain = pathname === `/${locale}`;
            const sectionId = href.replace('#', '');
            const isActive =
              (isCatalog && href === `/${locale}/catalog`) ||
              (isMain && activeSection === sectionId);

            const isInactive =
              (isCatalog && href !== `/${locale}/catalog`) ||
              (isMain && activeSection && activeSection !== sectionId);

            const commonClass = `${styles.headerLink} ${
              isActive ? styles.headerLinkActive : ''
            } ${isInactive ? styles.headerLinkInactive : ''}`;

            return type === 'page' ? (
              <Link
                key={label}
                href={href}
                className={commonClass}
                prefetch={false}
              >
                {label}
              </Link>
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
        <div className='flex relative gap-4 ml-4'>
          <div className='hidden gap-5 md:flex'>
            <div
              className={`relative ${
                showSearch ? 'lg:hidden' : 'lg:flex'
              } flex items-center w-8 text-center`}
              ref={currencyRef}
            >
              <button
                className={styles.headerLangSwitchBtn}
                onClick={() => {
                  setShowCurrency((prev) => !prev);
                  setShowLang(false);
                }}
                aria-label={t(a11yKeys.currency.select)}
                aria-expanded={showCurrency}
                aria-haspopup='true'
              >
                <div>{selectedCurrency}</div>
              </button>
              {showCurrency && (
                <div className='absolute top-[-2px] lg:top-[-8px] left-[-14px] lg:left-[-14px] flex flex-col bg-white rounded-[10px] z-20'>
                  {currencies.map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setSelectedCurrency(cur);
                        setShowCurrency(false);
                        // Зберігаємо в localStorage
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('selectedCurrency', cur);
                          // Відправляємо custom event для оновлення компонентів
                          window.dispatchEvent(new Event('currencyChanged'));
                        }
                      }}
                      className={`${
                        styles.headerLangSwitchBtn
                      } text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] ${
                        cur !== selectedCurrency ? styles.inactiveOption : ''
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
                showSearch ? 'lg:hidden' : 'lg:flex'
              } flex items-center w-10 text-center`}
              ref={langRef}
            >
              <button
                className={styles.headerLangSwitchBtn}
                onClick={() => {
                  setShowLang((prev) => !prev);
                  setShowCurrency(false);
                }}
                aria-label={t(a11yKeys.language.select)}
                aria-expanded={showLang}
                aria-haspopup='true'
              >
                <div>{selectedLang}</div>
              </button>
              {showLang && (
                <div className='absolute top-[-2px] lg:top-[-8px] left-[-17px] lg:left-[-17px] flex flex-col bg-white rounded-[10px] z-20'>
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
                        lang !== selectedLang ? styles.inactiveOption : ''
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className={`lg:${showSearch ? 'hidden' : 'flex'} ${
                styles.headerLangSwitchBtn
              }  hidden shrink-0`}
              onClick={() => {
                setShowSearch((prev) => !prev);
                setShowCurrency(false);
                setShowLang(false);
              }}
              aria-label={t(a11yKeys.search.open)}
              aria-expanded={showSearch}
            >
              <Image
                src={SearchNormal.src}
                alt=''
                width={18}
                height={18}
                aria-hidden='true'
              />
            </button>
          </div>
          <button
            className={`${styles.headerLangSwitchBtn} shrink-0 relative cursor-pointer items-center justify-centers-center md:flex lg:hidden`}
            aria-label={t(a11yKeys.favorites.view)}
            onClick={() => setIsWishlistModalOpen(true)}
          >
            <HeartIcon className='w-5 h-5 text-green-800' aria-hidden='true' />
            {wishlistCount > 0 && (
              <span
                className='flex absolute -top-2 -right-2  rig md:-top-0 md:-right-2 justify-center items-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full'
                aria-label={`${wishlistCount} товарів у списку бажань`}
              >
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </button>
          <div
            ref={searchRef}
            className={`md:flex
            ${
              showSearch
                ? 'lg:opacity-100 lg:translate-y-0 lg:relative lg:pointer-events-auto'
                : 'lg:opacity-0 lg:translate-y-4 lg:absolute lg:pointer-events-none'
            }
            hidden rounded-xl border border-black pl-4 py-2 items-center gap-2
            transition-all duration-300 ease-out`}
          >
            <label htmlFor='desktop-search' className='sr-only'>
              {t(a11yKeys.search.catalog)}
            </label>
            <input
              id='desktop-search'
              type='search'
              className={`${styles.headerMobileSearchInput} w-full max-w-[150px] `}
              placeholder={t(headerKeys.search.placeholder)}
            />
            <button
              className={`${styles.headerLangSwitchBtn} shrink-0 mr-3`}
              aria-label={t(a11yKeys.search.submit)}
            >
              <Image
                src={SearchNormal.src}
                alt={t(headerKeys.search.placeholder)}
                width={18}
                height={18}
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='hidden gap-3 lg:flex'>
            <button
              className={`${styles.headerLangSwitchBtn} shrink-0`}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('toggleChat', { detail: true })
                )
              }
              aria-label={t(a11yKeys.ai.open)}
            >
              <Image
                src={Robot.src}
                alt={t(headerKeys.aiAgent.tooltip)}
                width={22}
                height={22}
                aria-hidden='true'
              />
            </button>
            <button
              className={`${styles.headerLangSwitchBtn} ${styles.headerWishlistBtn} shrink-0 relative cursor-pointer`}
              aria-label={t(a11yKeys.favorites.view)}
              onClick={() => setIsWishlistModalOpen(true)}
            >
              <HeartIcon
                className={`w-5 h-5 text-green-800`}
                aria-hidden='true'
              />

              {wishlistCount > 0 && (
                <span
                  className='flex absolute -top-2 -right-2 justify-center items-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full'
                  aria-label={`${wishlistCount} товарів у списку бажань`}
                >
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>
          </div>
          <div className='flex ml-4 w-8 lg:hidden'>
            <button
              className={styles.headerMobileMenuBtn}
              onClick={() => (open ? startCloseMenu() : openMenu())}
              aria-expanded={open}
              aria-controls='mobileMenu'
              aria-label={open ? t(a11yKeys.menu.close) : t(a11yKeys.menu.open)}
            >
              <Image
                src={open ? Close.src : Menu.src}
                alt=''
                className={
                  open
                    ? styles.headerMobileMenuIconClose
                    : styles.headerMobileMenuIcon
                }
                width={32}
                height={14}
                aria-hidden='true'
              />
            </button>
          </div>
        </div>
        {mounted &&
          (open || menuClosing) &&
          createPortal(
            <div
              id='mobileMenu'
              className={`${styles.headerMobileMenu} fixed flex flex-col py-8 rounded-none md:rounded-b-xl`}
            >
              <div
                className={`${styles.headerMobileMenuTop} flex w-full justify-center `}
              >
                <div className={`${styles.headerMobileMenuSearch} flex `}></div>
                <div className='flex gap-5 p-3 md:hidden'>
                  <div className='flex py-3 pl-4 rounded-xl border border-white'>
                    <label htmlFor='mobile-search' className='sr-only'>
                      {t(a11yKeys.search.catalog)}
                    </label>
                    <input
                      id='mobile-search'
                      type='search'
                      className={`${styles.headerMobileSearchInput} max-w-[200px]`}
                      placeholder={t(headerKeys.search.placeholder)}
                    />
                    <button
                      className={`${styles.headerLangSwitchBtn} shrink-0 mr-4`}
                      aria-label={t(a11yKeys.search.submit)}
                    >
                      <Image
                        src={SearchWhite.src}
                        alt={t(headerKeys.search.placeholder)}
                        width={18}
                        height={18}
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                  <div
                    className='flex relative items-center w-10 text-center'
                    ref={currencyRef}
                  >
                    <button
                      className={styles.headerMobileLangSwitchBtn}
                      onClick={() => {
                        setShowCurrency((prev) => !prev);
                        setShowLang(false);
                      }}
                      aria-label={t(a11yKeys.currency.select)}
                      aria-expanded={showCurrency}
                      aria-haspopup='true'
                    >
                      <div>{selectedCurrency}</div>
                    </button>
                    {showCurrency && (
                      <div className='absolute top-[5px] left-[-14px] flex flex-col bg-white rounded-[10px] z-20'>
                        {currencies.map((cur) => (
                          <button
                            key={cur}
                            onClick={() => {
                              setSelectedCurrency(cur);
                              setShowCurrency(false);
                              if (typeof window !== 'undefined') {
                                localStorage.setItem('selectedCurrency', cur);

                                window.dispatchEvent(
                                  new Event('currencyChanged')
                                );
                              }
                            }}
                            className={`${
                              styles.headerLangSwitchBtn
                            } text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] ${
                              cur !== selectedCurrency
                                ? styles.inactiveOption
                                : ''
                            }`}
                          >
                            {cur}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className='flex relative items-center w-10 text-center'
                    ref={langRef}
                  >
                    <button
                      className={styles.headerMobileLangSwitchBtn}
                      onClick={() => {
                        setShowLang((prev) => !prev);
                        setShowCurrency(false);
                      }}
                      aria-label={t(a11yKeys.language.select)}
                      aria-expanded={showLang}
                      aria-haspopup='true'
                    >
                      <div>{selectedLang}</div>
                    </button>
                    {showLang && (
                      <div className='absolute top-[5px] left-[-17px] flex flex-col bg-white rounded-[10px] z-20'>
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
                              lang !== selectedLang ? styles.inactiveOption : ''
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
                  href={`/${locale}/catalog`}
                  onClick={startCloseMenu}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.catalog)}
                </Link>
                <a
                  href='#dealers'
                  onClick={(e) => {
                    handleSectionClick(e, 'dealers');
                    startCloseMenu();
                  }}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.dealers)}
                </a>
                <a
                  href='#treands'
                  onClick={(e) => {
                    handleSectionClick(e, 'treands');
                    startCloseMenu();
                  }}
                  className={styles.headerMobileMenuLink}
                >
                  {t(headerKeys.mobileMenu.trends)}
                </a>
                <a
                  href='#contacts'
                  onClick={(e) => {
                    handleSectionClick(e, 'contacts');
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
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
      />
      <SuccessModal
        isVisible={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </header>
  );
};

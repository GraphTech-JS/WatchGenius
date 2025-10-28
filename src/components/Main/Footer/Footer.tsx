'use client';
import React from 'react';
import { LocalizedLink } from '@/components/LocalizedLink';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import styles from './Footer.module.css';
import { LogoWhite, Chrono } from '../../../../public/icons';
import {
  DiscordIcon,
  TelegramIcon,
  InstagramIcon,
} from '../../../../public/social/Icon';
import { t } from '@/i18n';
import { footerKeys } from '@/i18n/keys/footer';

export const Footer = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
  return (
    <footer className={`${styles.footer} pb-[49px] md:pb-[30px]`} id='contacts'>
      <div
        className={`${styles.footerContainer} flex flex-col md:flex-row md:justify-between items-center gap-[30px]`}
      >
        <div
          className={`${styles.footerLeft} flex flex-col lg:gap-12 md:gap-20 gap-12 items-center justify-start p-1 `}
        >
          <nav>
            <LocalizedLink
              href='/'
              prefetch={false}
              className={`${styles.footerLogo} flex items-center md:gap-1 gap-2`}
            >
              <Image
                src={LogoWhite.src}
                className={`${styles.footerLogoIcom}`}
                alt={t(footerKeys.logo.alt)}
                width={40}
                height={40}
              />
              <div className={styles.logoName}>WATCHGENIUS</div>
            </LocalizedLink>
          </nav>
          <div className='hidden flex-col gap-3 items-center md:flex'>
            <Image
              src={Chrono.src}
              alt={t(footerKeys.chrono.alt)}
              width={190}
              height={40}
            />
            <div className={styles.chronoName}>{t(footerKeys.poweredBy)}</div>
          </div>
        </div>
        <div
          className={`${styles.footerRightLinks} w-full md:max-w-[60%] flex flex-col md:flex-row lg:justify-start md:justify-center md:items-start items-center lg:gap-18 gap-7`}
        >
          <div
            className={`${styles.footerLinks} md:w-1/3  flex flex-col md:gap-3 md:items-start items-center`}
          >
            <div className={styles.footerLinkTitle}>
              {t(footerKeys.sections.menu.title)}
            </div>
            <nav className='hidden flex-col gap-5 items-start md:flex'>
              <LocalizedLink
                href='/catalog'
                className={styles.footerLink}
                prefetch={false}
              >
                {t(footerKeys.sections.menu.catalog)}
              </LocalizedLink>
              <a
                href='#treands'
                className={styles.footerLink}
                onClick={(e) => handleSectionClick(e, 'treands')}
              >
                {t(footerKeys.sections.menu.trends)}
              </a>
              <a
                href='#dealers'
                className={styles.footerLink}
                onClick={(e) => handleSectionClick(e, 'dealers')}
              >
                {t(footerKeys.sections.menu.dealers)}
              </a>

              <a
                href='#contacts'
                className={styles.footerLink}
                onClick={(e) => handleSectionClick(e, 'contacts')}
              >
                {t(footerKeys.sections.menu.contacts)}
              </a>
            </nav>
          </div>

          <div
            className={`${styles.footerLinks} md:w-1/3   flex flex-col gap-3 items-start`}
          >
            <div className={styles.footerLinkTitle}>
              {t(footerKeys.sections.help.title)}
            </div>
            <nav className='hidden flex-col gap-5 items-start md:flex'>
              <LocalizedLink
                href='#faq'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.help.faq)}
              >
                {t(footerKeys.sections.help.faq)}
              </LocalizedLink>
              <LocalizedLink
                href='#how-it-works'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.help.howItWorks)}
              >
                {t(footerKeys.sections.help.howItWorks)}
              </LocalizedLink>
              <LocalizedLink
                href='#safe-guide'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.help.safeGuide)}
              >
                {t(footerKeys.sections.help.safeGuide)}
              </LocalizedLink>
              <LocalizedLink
                href='#support'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.help.support)}
              >
                {t(footerKeys.sections.help.support)}
              </LocalizedLink>
            </nav>
          </div>
          <div
            className={`${styles.footerLinks} md:w-1/3 hidden lg:flex flex-col gap-3 items-start`}
          >
            <div className={styles.footerLinkTitle}>
              {t(footerKeys.sections.community.title)}
            </div>
            <nav className='flex flex-col gap-5 items-start'>
              <LocalizedLink
                href='#blog'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.community.blog)}
              >
                {t(footerKeys.sections.community.blog)}
              </LocalizedLink>
              <LocalizedLink
                href='#discord'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.community.discord)}
              >
                {t(footerKeys.sections.community.discord)}
              </LocalizedLink>
              <LocalizedLink
                href='#telegram'
                className={styles.footerLink}
                prefetch={false}
                aria-label={t(footerKeys.sections.community.telegram)}
              >
                {t(footerKeys.sections.community.telegram)}
              </LocalizedLink>
            </nav>
          </div>
          <div className='flex flex-col gap-3 items-center md:hidden'>
            <Image
              className={styles.chronoIcon}
              src={Chrono.src}
              alt='chrono24'
              width={190}
              height={40}
            />
            <div className={`${styles.chronoName} text-nowrap`}>
              {t(footerKeys.poweredBy)}
            </div>
          </div>
        </div>
        <nav
          className={`${styles.footerSupportWrapper}`}
          aria-label='Соціальні мережі'
        >
          <div className='flex flex-row gap-8 md:flex-col'>
            <LocalizedLink
              href='#discord-social'
              className={styles.footerSocialLink}
              prefetch={false}
              aria-label='Приєднатися до Discord спільноти'
            >
              <DiscordIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50 hover:text-white/90`}
                aria-hidden='true'
              />
            </LocalizedLink>
            <LocalizedLink
              href='#telegram-social'
              className={styles.footerSocialLink}
              prefetch={false}
              aria-label='Підписатися на Telegram канал'
            >
              <TelegramIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50 hover:text-white/90`}
                aria-hidden='true'
              />
            </LocalizedLink>
            <LocalizedLink
              href='#instagram-social'
              className={styles.footerSocialLink}
              prefetch={false}
              aria-label='Слідкувати в Instagram'
            >
              <InstagramIcon
                className={`${styles.footerSocialLinkItem} w-10 h-10 md:text-white/50 hover:text-white/90`}
                aria-hidden='true'
              />
            </LocalizedLink>
          </div>
        </nav>
      </div>
      <div
        className={`${styles.footerBottom} mx-auto max-w-[90rem] px-[2rem] md:px-[2.5rem] lg:px-[6.25rem] flex md:flex-row flex-col-reverse md:justify-between text-center gap-6`}
      >
        <div>{t(footerKeys.copyright)}</div>
        <div className='flex flex-col-reverse gap-6  md:flex-row'>
          <LocalizedLink
            href='/privacy'
            className={styles.footerSocialLink}
            prefetch={false}
          >
            <div className='hover:underline'>{t(footerKeys.legal.privacy)}</div>
          </LocalizedLink>
          <LocalizedLink
            href='/terms'
            className={styles.footerSocialLink}
            prefetch={false}
          >
            <div className='hover:underline'>{t(footerKeys.legal.terms)}</div>
          </LocalizedLink>
        </div>
      </div>
    </footer>
  );
};

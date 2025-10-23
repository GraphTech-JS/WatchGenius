// SidebarAdmin.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SidebarAdmin.module.css';
import {
  Box,
  Book,
  Document,
  History,
  SettingsCog,
  Money,
} from '../../../../../public/icons';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOn, setIsOn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggle = () => setIsOn((x) => !x);
  const toggleMenu = () => setIsOpen((x) => !x);

  // Detect mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { href: '/ua/admin/products', icon: Box, label: 'Товари' },
    { href: '/ua/admin/knowledge-base', icon: Book, label: 'База знань' },
    { href: '/ua/admin/prompts', icon: Document, label: 'Промпти' },
    {
      href: '/ua/admin/session-history',
      icon: History,
      label: 'Історія сесій',
    },
    { href: '/ua/admin/settings', icon: SettingsCog, label: 'Налаштування' },
  ];

  return (
    <>
      {/* Settings button for mobile */}
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <Image src={SettingsCog} alt='Налаштування' width={28} height={28} />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={styles.sidebar}
        initial={false}
        animate={{ x: isMobile ? (isOpen ? 0 : '-100%') : 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Адмін панель</h2>
          <button className={styles.closeButton} onClick={toggleMenu}>
            ✕
          </button>
        </div>
        <nav className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className={styles.navItemWrapper}>
                {isActive && (
                  <motion.div
                    layoutId='sidebar-indicator'
                    className={styles.indicator}
                    initial={false}
                    transition={{ type: 'tween', duration: 0.4 }}
                  />
                )}
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                  </div>
                  {item.label}
                </Link>
              </div>
            );
          })}

          <div className={styles.monetizeWrapper}>
            <div className={styles.navItem}>
              <div className={styles.icon}>
                <Image src={Money} alt='Monetization' width={24} height={24} />
              </div>
              Monetization
            </div>
            <div
              onClick={toggle}
              style={{
                width: '40px',
                height: '20px',
                background: isOn ? '#04694f' : '#666',
                borderRadius: '10px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.3s',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: isOn ? '22px' : '2px',
                  transition: 'left 0.3s',
                }}
              />
            </div>
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

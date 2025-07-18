"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./SidebarAdmin.module.css";
import {
  BoxIcon,
  DocsIcon,
  DocIcon,
  SettingsIcon,
  MonetizeIcon,
  HistoryIcon,
} from "../../../../../public/icons";
import Image from "next/image";
import { Switch } from "@/components/Switch";

export const Sidebar = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Адмін панель</h2>
      <nav className={styles.navLinks}>
        <Link href="/admin/products" className={styles.navLink}>
          <div className={styles.icon}>
            <Image src={BoxIcon.src} alt="box icon" width={30} height={30} />
          </div>
          Товари
        </Link>
        <Link href="/admin/knowledge-base" className={styles.navLink}>
          <div className={styles.icon}>
            <Image src={DocIcon.src} alt="doc icon" width={30} height={30} />
          </div>
          База знань
        </Link>
        <Link href="/admin/prompts" className={styles.navLink}>
          <div className={styles.icon}>
            <Image src={DocsIcon.src} alt="docs icon" width={30} height={30} />
          </div>
          Промпти
        </Link>
        <Link href="/admin/session-history" className={styles.navLink}>
          <div className={styles.icon}>
            <Image
              src={HistoryIcon.src}
              alt="history icon"
              width={30}
              height={30}
            />
          </div>
          Історія сесій
        </Link>
        <Link href="/admin/settings" className={styles.navLink}>
          <div className={styles.icon}>
            <Image
              src={SettingsIcon.src}
              alt="settings icon"
              width={30}
              height={30}
            />
          </div>
          Налаштування
        </Link>
        <div className={styles.monetizeWrapper}>
          <div className={styles.navItem}>
            <div className={styles.icon}>
              <Image
                src={MonetizeIcon.src}
                alt="monetize icon"
                width={30}
                height={30}
              />
            </div>
            Monetization
          </div>
          {/* <div className={styles.switchWrapper}>
            <button className={styles.switchButton} onClick={toggleSwitch}>
              <span className={isOn ? styles.switchOnActive : styles.switchOn}>
                {"ON"}
              </span>
              <span
                className={isOn ? styles.switchOff : styles.switchOffActive}
              >
                {"OFF"}
              </span>
            </button>
          </div> */}
          <Switch isOn={isOn} onToggle={toggleSwitch} />
        </div>
      </nav>
    </aside>
  );
};

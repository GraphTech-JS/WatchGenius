// SidebarAdmin.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./SidebarAdmin.module.css";
import {
  BoxIcon,
  DocIcon,
  DocsIcon,
  HistoryIcon,
  SettingsIcon,
  MonetizeIcon,
} from "../../../../../public/icons";
import { Switch } from "@/components/Switch";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOn, setIsOn] = useState(true);

  const toggle = () => setIsOn((x) => !x);

  const navItems = [
    { href: "/admin/products", icon: BoxIcon, label: "Товари" },
    { href: "/admin/knowledge-base", icon: DocIcon, label: "База знань" },
    { href: "/admin/prompts", icon: DocsIcon, label: "Промпти" },
    {
      href: "/admin/session-history",
      icon: HistoryIcon,
      label: "Історія сесій",
    },
    { href: "/admin/settings", icon: SettingsIcon, label: "Налаштування" },
  ];

  return (
    <aside className={styles.sidebar}>
      <ThemedText type="h2" className="text-white text-center">
        Адмін панель
      </ThemedText>
      <nav className={styles.navLinks}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.href} className={styles.navItemWrapper}>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className={styles.indicator}
                  initial={false}
                  transition={{ type: "tween", duration: 0.4 }}
                />
              )}
              <Link
                href={item.href}
                className={styles.navLink}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={styles.icon}>
                  <Image
                    src={item.icon.src}
                    alt={item.label}
                    width={30}
                    height={30}
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
              <Image
                src={MonetizeIcon.src}
                alt="Monetize"
                width={30}
                height={30}
              />
            </div>
            Monetization
          </div>
          <Switch isOn={isOn} onToggle={toggle} />
        </div>
      </nav>
    </aside>
  );
};

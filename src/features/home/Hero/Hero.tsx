"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";

import { Button } from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Hero = () => {
  return (
    <section
      className={`${styles.hero} relative w-full min-h-[676px] md:min-h-[476px] lg:min-h-[557px]
     bg-[url('/hero-section/hero.png')] bg-no-repeat bg-[bottom] md:bg-[bottom] bg-cover`}
    >
      <div className={styles.heroLeft}>
        <div className={styles.heroText}>
          <ThemedText type="h1" className="text-white">
            Зрозумілий ринок годинників з Data+ AI
          </ThemedText>
          <p className={styles.heroSubtitle}>
            Аналітика цін та трендів для 300+ моделей. Персональний чат-асистент
            допоможе обрати годинник та купити безпечно
          </p>
        </div>
        <Link href="/catalog" className={styles.heroLink}>
          <Button
            variant="solid"
            color="#000"
            bgColor="#fff"
            classNames={styles.heroBtn}
          >
            Каталог
          </Button>
        </Link>
      </div>
    </section>
  );
};

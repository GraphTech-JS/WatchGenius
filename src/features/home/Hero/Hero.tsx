"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";

import { Button } from "@/components/Button/Button";

export const Hero = () => {
  return (
    <section
      className={`${styles.hero} relative w-full min-h-[676px] md:min-h-[476px] lg:min-h-[557px]
     bg-[url('/hero-section/watch-small.png')] sm:bg-[url('/hero-section/watch-big.png')] bg-no-repeat bg-center bg-cover`}
    >
      <div className={styles.heroLeft}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Обери свій годинник</h1>
          <p className={styles.heroSubtitle}>
            Годинники від світових брендів. Якість, точність і безкомпромісна
            елегантність.
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

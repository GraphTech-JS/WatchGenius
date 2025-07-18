"use client";
import React from "react";
import { Watch } from "../../../../public/hero-section";
import styles from "./Hero.module.css";
import Link from "next/link";

import { Button } from "@/components/Button/Button";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
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
        <div className={styles.heroRight}>
          <img src={Watch.src} alt="watch bg" className={styles.heroImg} />
        </div>
      </div>
    </section>
  );
};

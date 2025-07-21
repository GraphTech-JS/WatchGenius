"use client";
import React from "react";
import styles from "./Watch.module.css";

import Link from "next/link";
import { Button } from "@/components/Button/Button";

export const Watch = () => {
  return (
    <section className={styles.watch}>
      <div className={styles.watchLeft}>
        <div className={styles.watchText}>
          <h2 className={styles.watchHeading}>Годинник, що говорить за вас</h2>
          <p className={styles.watchSubtitle}>
            Вибрані моделі від легендарних брендів. Стиль, точність, статус — у
            кожній деталі.
          </p>
        </div>
        <Link href="/catalog" prefetch={false} className={styles.watchLink}>
          <Button
            variant="solid"
            color="#000"
            bgColor="#fff"
            classNames={styles.watchBtn}
          >
            Переглянути каталог
          </Button>
        </Link>
      </div>
    </section>
  );
};

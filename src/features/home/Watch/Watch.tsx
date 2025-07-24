"use client";
import React from "react";
import styles from "./Watch.module.css";

import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Watch = () => {
  return (
    <section className={styles.watch}>
      <div className={styles.watchLeft}>
        <div className={styles.watchText}>
          <ThemedText type="h2" className="text-[#EDEDED]">
            Годинник, що говорить за вас
          </ThemedText>
          <ThemedText type="h5" className="text-white max-w-[520px]">
            Вибрані моделі від легендарних брендів. Стиль, точність, статус — у
            кожній деталі.
          </ThemedText>
        </div>
        <Link href="/catalog" prefetch={false} className={styles.watchLink}>
          <Button
            variant="solid"
            color="#000"
            bgColor="#EDEDED"
            classNames={styles.watchBtn}
          >
            Переглянути каталог
          </Button>
        </Link>
      </div>
    </section>
  );
};

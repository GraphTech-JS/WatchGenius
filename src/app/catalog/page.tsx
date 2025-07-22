"use client";
import React from "react";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";
import { mockData } from "@/mock/watch";
import { ThemedText } from "@/components/ThemedText/ThemedText";

const Catalog = () => {
  return (
    <>
      <section className={styles.catalog}>
        <div className={styles.catalogContainer}>
          <div className={styles.catalogContent}>
            <div className={styles.catalogText}>
              <ThemedText type="h2">Каталог</ThemedText>
              <ThemedText type="h4">
                Інтернет-магазин годинників, де стиль зустрічається з точністю.
                Ми пропонуємо широкий вибір чоловічих, жіночих та дитячих
                годинників{" "}
              </ThemedText>
            </div>
          </div>
          <Search type="catalog" searchList={mockData} />
        </div>
      </section>
    </>
  );
};

export default Catalog;

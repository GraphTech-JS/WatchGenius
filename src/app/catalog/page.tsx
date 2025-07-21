"use client";
import React from "react";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";
import { mockData } from "@/mock/watch";

const Catalog = () => {
  return (
    <>
      <section className={styles.catalog}>
        <div className={styles.catalogContainer}>
          <div className={styles.catalogContent}>
            <div className={styles.catalogText}>
              <h1 className={styles.catalogTitle}>Каталог</h1>
              <p className={styles.catalogSubtitle}>
                Інтернет-магазин годинників, де стиль зустрічається з точністю.
                Ми пропонуємо широкий вибір чоловічих, жіночих та дитячих
                годинників{" "}
              </p>
            </div>
          </div>
          <Search type="catalog" searchList={mockData} />
        </div>
      </section>
    </>
  );
};

export default Catalog;

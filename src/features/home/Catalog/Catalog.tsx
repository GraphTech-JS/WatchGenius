"use client";
import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import { Card } from "./components/Card/Card";
import { mockData } from "@/mock/watch";
import { Button } from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Catalog = () => {
  const [limit, setLimit] = useState<number>(4);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 1719px)");

      const updateLimit = () => {
        if (mediaQuery.matches) {
          setLimit(6);
        } else {
          setLimit(4);
        }
      };

      updateLimit();
      mediaQuery.addEventListener("change", updateLimit);

      return () => {
        mediaQuery.removeEventListener("change", updateLimit);
      };
    }
  }, []);

  const showMore = () => {
    if (limit === 4 || limit === 6) {
      setLimit(mockData.length);
    } else if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 1719px)");
      setLimit(mediaQuery.matches ? 6 : 4);
    }
  };

  return (
    <section id="catalog" className={styles.catalog}>
      <div className={styles.catalogContainer}>
        <div className={styles.catalogContent}>
          <div className={styles.catalogText}>
            <ThemedText type="h2">Каталог</ThemedText>
            <div className={styles.catalogCards}>
              {mockData
                .slice(0, isClient ? limit : 4)
                .map(({ id, title, image, price, slug }) => (
                  <Card
                    key={id}
                    title={title}
                    image={image}
                    price={price}
                    slug={slug}
                  />
                ))}
            </div>
            <Button
              variant="text"
              color="#000"
              classNames={styles.catalogBtn}
              onClick={showMore}
            >
              {limit === 4 || limit === 6 ? "Більше" : "Менше"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import React, { useState } from "react";
import styles from "./Catalog.module.css";
import { Card } from "./components/Card/Card";
import { mockData } from "@/mock/watch";
import { Button } from "@/components/Button/Button";

export const Catalog = () => {
  const [limit, setLimit] = useState<number>(4);
  const showMore = () => {
    if (limit === 4) {
      setLimit(mockData.length);
    } else {
      setLimit(4);
    }
  };
  return (
    <>
      <section id="catalog" className={styles.catalog}>
        <div className={styles.catalogContainer}>
          <div className={styles.catalogContent}>
            <div className={styles.catalogText}>
              <h2 className={styles.catalogHeading}>Каталог</h2>
              <div className={styles.catalogCards}>
                {mockData
                  .slice(0, limit)
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
                {limit === 4 ? "Більше" : "Менше"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

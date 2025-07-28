"use client";
import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import { Card } from "./components/Card/Card";
import { Button } from "@/components/Button/Button";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { useGetWatchesPaginated } from "@/hooks/useGetWatchesPaginated";
import { Watch } from "@/types";
import { useExchangeRate } from "@/hooks/useExchangeRate";

export const Catalog = () => {
  const [limit, setLimit] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchesAccumulated, setWatchesAccumulated] = useState<Watch[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading, isError } = useGetWatchesPaginated(
    currentPage,
    limit
  );

  useEffect(() => {
    setIsClient(true);

    const mediaQuery = window.matchMedia("(min-width: 1536px)");

    const updateLimit = () => {
      if (mediaQuery.matches) {
        setLimit(6);
      } else {
        setLimit(4);
      }
      setCurrentPage(1);
      setWatchesAccumulated([]);
    };

    updateLimit();
    mediaQuery.addEventListener("change", updateLimit);

    return () => {
      mediaQuery.removeEventListener("change", updateLimit);
    };
  }, []);

  useEffect(() => {
    if (data?.watches) {
      if (currentPage === 1) {
        setWatchesAccumulated(data.watches);
      } else {
        setWatchesAccumulated((prev) => [...prev, ...data.watches]);
      }
    }
  }, [data, currentPage]);

  const showMore = () => {
    if (data?.pagination) {
      if (currentPage < data.pagination.totalPages) {
        setCurrentPage((prev) => prev + 1);
      } else {
        setCurrentPage(1);
        setWatchesAccumulated([]);
      }
    }
  };
  const { rate: usdToUah } = useExchangeRate("USD");
  if (usdToUah === null) {
    return <p>Завантаження</p>;
  }
  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження даних</div>;

  return (
    <section id="catalog" className={styles.catalog}>
      <div className={styles.catalogContainer}>
        <div className={styles.catalogContent}>
          <div className={styles.catalogText}>
            <ThemedText type="h2">Каталог</ThemedText>
            <div className={styles.catalogCards}>
              {(isClient ? watchesAccumulated : []).map((item) => (
                <Card key={item.id} item={item} exchangeRate={usdToUah} />
              ))}
            </div>
            <Button
              variant="text"
              color="#000"
              classNames={styles.catalogBtn}
              onClick={showMore}
            >
              {currentPage < (data?.pagination?.totalPages || 1)
                ? "Більше"
                : "Менше"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

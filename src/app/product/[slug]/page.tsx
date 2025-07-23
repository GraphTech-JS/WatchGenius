"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import MockWatch from "../../../../public/catalog-section/mock.png";
import MockWatchMobile from "../../../../public/catalog-section/mock-small.png";
import { Button } from "@/components/Button/Button";
import { CustomAreaChart } from "@/components/Chart/AreaChart/AreaChart";
import Link from "next/link";
import { ArrowLeftDark } from "../../../../public/icons";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { Indicators } from "@/features/home/Indicators/Indicators";
import { StarDarkIcon } from "../../../../public/icons";

const Product = () => {
  const { back } = useRouter();

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productBreadcrumbs} onClick={back}>
          <img src={ArrowLeftDark.src} alt="back to page" />
          Назад
        </div>
        <div className={styles.productContent}>
          <div className={styles.productLeft}>
            <picture>
              <source media="(max-width: 640px)" srcSet={MockWatchMobile.src} />
              <img
                src={MockWatch.src}
                alt="mock watch"
                className={styles.productImg}
              />
            </picture>
          </div>
          <div className={styles.cardElement}>
            <img
              src={StarDarkIcon.src}
              alt="star icon"
              className={styles.cardElementStarIcon}
            />
            <span className={styles.cardElementText}>Надійний бренд</span>
          </div>
          <div className={styles.productRight}>
            <div className={styles.productText}>
              <ThemedText type="h2">
                Rolex Submariner Oyster Perpetual Date 41mm 126610LV-0002
              </ThemedText>
              <div className={styles.productDescContent}>
                <ThemedText type="h4">
                  Корпус: Нержавіюча сталь Oystersteel (сплав 904L)
                </ThemedText>
                <ThemedText type="h4">
                  Скло: Сапфірове з циклоп-лінзою над датою
                </ThemedText>
                <ThemedText type="h4">
                  Категорія: Дайверський годинник
                </ThemedText>
                <ThemedText type="h4">Діаметр: 41 мм</ThemedText>
              </div>
            </div>
            <div className={styles.productPrice}>
              <Button variant="solid" classNames={styles.productPriceBtn}>
                Купити в Chrono24
              </Button>
              <ThemedText type="h2" className=" text-nowrap">
                19 500 грн
              </ThemedText>
            </div>
          </div>
        </div>
        <div className={styles.productGraph}>
          <ThemedText type="h2">Графік цін</ThemedText>
          <div className={styles.productGraphSection}>
            <div className={styles.productGraphChart}>
              <div className={styles.productGraphButtons}>
                <Button
                  variant="solid"
                  classNames={styles.productGraphSwitchBtn}
                >
                  1 рік
                </Button>
                <Button
                  variant="solid"
                  classNames={styles.productGraphSwitchBtn}
                >
                  3 міс.
                </Button>
              </div>
              <CustomAreaChart
                containerClassName={styles.productChartContainer}
                controls={true}
              />
            </div>

            <Button
              variant="text"
              color="#000"
              classNames={styles.productPDFBtn}
            >
              <Link href="#">Завантажити PDF-гайд</Link>
            </Button>
          </div>
        </div>
        <Indicators />
      </div>
    </>
  );
};

export default Product;

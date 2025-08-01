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
import { data, threeMonthDataMock, yearDataMock } from "@/mock/data";
import ProductDetails from "@/features/product/ProductDetails";
import { FloatingButton } from "@/components/FloatingButton";

const Product = () => {
  const { back } = useRouter();
  const priceChangePercent: number = 7;
  const isPositive = priceChangePercent > 0;
  const isNegative = priceChangePercent < 0;
  const arrow = isPositive ? "↑" : isNegative ? "↓" : "";
  const changeColor = isPositive
    ? "#00c853"
    : isNegative
    ? "#d32f2f"
    : "#9e9e9e";

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
              <ProductDetails data={data} />
              <ThemedText className=" text-start underline text-[#A8A6A6]">
                Не знайшли параметр? Напишіть в чат
              </ThemedText>
            </div>

            <div className={styles.productPrice}>
              <div className={styles.productPriceWrapper}>
                <ThemedText type="h2" className="text-nowrap">
                  19 500 грн
                </ThemedText>
                {priceChangePercent !== 0 && (
                  <span
                    className={styles.productPriceChange}
                    style={{ color: changeColor }}
                  >
                    {arrow} {Math.abs(priceChangePercent)} %
                  </span>
                )}
              </div>

              <FloatingButton
                watchedIds={["ai-agent", "footer"]}
                safeOffset={20}
                initialOffsetPercent={0.02}
                extraOffset={0}
                staticAt="sm"
              >
                {({ bottom }) => (
                  <Button
                    variant="solid"
                    classNames={styles.productPriceBtn}
                    style={{ bottom }}
                  >
                    Купити в Chrono24
                  </Button>
                )}
              </FloatingButton>
            </div>
          </div>
        </div>
        <div className={styles.productGraph}>
          <ThemedText type="h2">Графік цін</ThemedText>
          <div className={styles.productGraphSection}>
            <div className={styles.productGraphChart}>
              <CustomAreaChart
                controls
                yearData={yearDataMock}
                threeMonthData={threeMonthDataMock}
                variant="area"
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

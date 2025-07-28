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
import { useParams } from "next/navigation";
import { useGetWatchById } from "@/hooks/useGetWatchById";

const Product = () => {
  const { back } = useRouter();
  const params = useParams();
  const watchId = params?.slug as string;

  const { data: item } = useGetWatchById(watchId);

  const sorted = item?.price_history
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    );

  const latest = sorted?.[0]?.price;
  const previous = sorted?.[1]?.price;

  const priceChangePercent =
    latest && previous
      ? Number((((latest - previous) / previous) * 100).toFixed(2))
      : 0;

  const isPositive = priceChangePercent > 0;
  const isNegative = priceChangePercent < 0;
  const arrow = isPositive ? "↑" : isNegative ? "↓" : "";
  const changeColor = isPositive
    ? "#00c853"
    : isNegative
    ? "#d32f2f"
    : "#9e9e9e";

  const image = item?.image_url?.trim() || MockWatch.src;

  return (
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
              src={image}
              alt={item?.name || "watch"}
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
              {item?.name || item?.model || "Невідомий годинник"}
            </ThemedText>
            <div className={styles.productDescContent}>
              <ThemedText type="h4">
                Корпус: Нержавіюча сталь Oystersteel (сплав 904L)
              </ThemedText>
              <ThemedText type="h4">
                Скло: Сапфірове з циклоп-лінзою над датою
              </ThemedText>
              <ThemedText type="h4">Категорія: Дайверський годинник</ThemedText>
              <ThemedText type="h4">Діаметр: 41 мм</ThemedText>
            </div>
            <ThemedText className=" text-center underline">
              Показати все
            </ThemedText>
            <ThemedText className=" text-center md:text-right underline text-[#A8A6A6]">
              Не знайшли параметр? Напишіть в чат
            </ThemedText>
          </div>

          <div className={styles.productPrice}>
            <div className={styles.productPriceWrapper}>
              <ThemedText type="h2" className="text-nowrap">
                {latest ? `${latest.toLocaleString()} грн` : "Невідомо"}
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

            <Button variant="solid" classNames={styles.productPriceBtn}>
              Купити в Chrono24
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.productGraph}>
        <ThemedText type="h2">Графік цін</ThemedText>
        <div className={styles.productGraphSection}>
          <div className={styles.productGraphChart}>
            <CustomAreaChart
              containerClassName={styles.productChartContainer}
              controls={true}
            />
          </div>

          <Button variant="text" color="#000" classNames={styles.productPDFBtn}>
            <Link href="#">Завантажити PDF-гайд</Link>
          </Button>
        </div>
      </div>

      <Indicators />
    </div>
  );
};

export default Product;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";
import styles from "./Market.module.css";
import { IWatch } from "@/interfaces";

const ArrowUp = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <path
      d="M6 15 V1 M6 1 L2 5 M6 1 L10 5"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const ArrowDown = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <path
      d="M6 1 V15 M6 15 L2 11 M6 15 L10 11"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const MarketCard: React.FC<IWatch> = ({
  title,
  image,
  changePercent,
  brand,
  chartData,
  chartId,
}) => {
  let color = "#EED09D";
  let ArrowIcon: React.FC | null = null;

  if (changePercent > 0) {
    color = "#22c55e";
    ArrowIcon = ArrowUp;
  } else if (changePercent < 0) {
    color = "#F4CBC7";
    ArrowIcon = ArrowDown;
  }

  const [chartHeight, setChartHeight] = useState(70);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setChartHeight(90); // desktop
      } else if (width >= 834) {
        setChartHeight(70); // tablets large
      } else if (width >= 768) {
        setChartHeight(60); // tablets small
      } else {
        setChartHeight(70); // mobile
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={`${styles.marketCard} flex flex-col gap-4 md:gap-2 rounded-2xl h-[12.5rem] md:h-[10rem] lg:h-[13.5rem] px-[1.25rem] md:px-[0.6rem] lg:px-[1.25rem] py-[1rem] md:py-[0.6rem] lg:py-[1rem] max-w-[30rem]`}
    >
      <div
        className={`${styles.marketCardHead} flex w-full justify-between items-start`}
      >
        <div className={`${styles.marketCardHeadName}`}>{title}</div>
        <div
          className={`${styles.marketCardHeadPercent} flex items-center gap-1 font-bold`}
          style={{ color }}
        >
          {ArrowIcon && <ArrowIcon />}
          {changePercent}%
        </div>
      </div>
      <div className={`${styles.marketCardBody} flex gap-2 items-center`}>
        <Image
          src={image}
          alt={brand}
          width={134}
          height={142}
          className="w-auto max-h-[125px] md:max-h-[84px] lg:max-h-[140px]"
        />
        <div className="flex flex-col gap-2 md:gap-0">
          <div className={`${styles.cardWatchName} text-center max-h-[54px]`}>
            {brand}
          </div>
          <LineChart
            data={chartData || []}
            color={color}
            id={chartId}
            height={chartHeight}
          />
        </div>
      </div>
    </div>
  );
};

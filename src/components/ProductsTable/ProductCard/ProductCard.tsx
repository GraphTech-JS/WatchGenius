"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";
import styles from "./ProductCard.module.css";
import { IWatch } from "@/interfaces";
import { HeartIcon, BellIcon } from "../../../../public/social/Icon";

const ArrowUp = () => (
  <svg width="10" height="10" viewBox="0 0 12 14" fill="none">
    <path
      d="M6 15 V1 M6 1 L2 5 M6 1 L10 5"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ArrowDown = () => (
  <svg width="10" height="10" viewBox="0 0 12 14" fill="none">
    <path
      d="M6 1 V15 M6 15 L2 11 M6 15 L10 11"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const ProductCard: React.FC<IWatch> = ({
  image,
  changePercent,
  brand,
  price,
  chartData,
  chartId,
}) => {
  let chartColor = "#EED09D";
  let percentClass = styles.percentNeutral;
  let score = "B";
  let scoreClass = styles.scoreNeutral;
  let ArrowIcon: React.FC | null = null;

  if (changePercent > 0) {
    chartColor = "#22c55e";
    percentClass = styles.percentPositive;
    score = "A";
    scoreClass = styles.scorePositive;
    ArrowIcon = ArrowUp;
  } else if (changePercent < 0) {
    chartColor = "#F4CBC7";
    percentClass = styles.percentNegative;
    score = "C";
    scoreClass = styles.scoreNegative;
    ArrowIcon = ArrowDown;
  }

  const [chartHeight, setChartHeight] = useState(70);
  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width >= 1024) setChartHeight(70);
      else if (width >= 834) setChartHeight(70);
      else if (width >= 768) setChartHeight(60);
      else setChartHeight(50);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={`${styles.productCard} flex flex-col rounded-2xl h-[15rem] md:h-[21rem] px-2 md:px-4 py-3 md:py-3 max-w-[30rem] justify-between`}
    >
      {/* header */}
      <div className="relative mb-1 md:mb-4 flex w-full justify-center items-center">
        <div
          className={`${styles.productCardScore} absolute top-0 left-0 flex items-center justify-center w-8 h-8`}
        >
          <HeartIcon
            className={`${styles.productCardHeart} w-[20px] h-[18px] cursor-pointer`}
          />
        </div>

        <Image
          src={image}
          alt={brand}
          width={134}
          height={142}
          className="w-auto  max-h-[84px] md:max-h-[125px] lg:max-h-[140px]"
        />

        <div
          className={`${styles.productCardScore} ${scoreClass} absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-md font-bold`}
        >
          {score}
        </div>
      </div>

      {/* body */}
      <div className=" mb-0 md:mb-1 flex gap-2 items-center">
        <div className="flex flex-col gap-0 md:gap-2">
          <div
            className={`${styles.cardWatchName} text-center max-h-[54px] font-bold`}
          >
            {brand}
          </div>
          <LineChart
            data={chartData || []}
            color={chartColor}
            id={chartId}
            height={chartHeight}
          />
        </div>
      </div>

      {/* footer */}
      <div className="flex gap-2 items-center w-full">
        <div className="relative text-center max-h-[54px] w-full flex flex-row justify-between">
          <div className={`${styles.Price}`}>{price} €</div>
          <div
            className={`${styles.marketCardHeadPercent} ${percentClass} absolute bottom-3 left-15 flex items-center gap-1 font-bold`}
          >
            {ArrowIcon && <ArrowIcon />}
            {changePercent}%
          </div>
          <BellIcon
            className={`${styles.productCardBell} w-[21px] h-[22px] cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
};

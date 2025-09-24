"use client";
import React from "react";
import Image from "next/image";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";
import styles from "./Market.module.css";
import { IWatch } from "@/interfaces";

export const MarketCard: React.FC<IWatch> = ({
  title,
  image,
  changePercent,
  brand,
  chartData,
  chartColor,
  chartId,
}) => {
  return (
    <div
      className={`${styles.marketCard} flex flex-col gap-4 md:gap-2 rounded-2xl h-[12.5rem] md:h-[10rem] lg:h-[13.5rem] px-[1.25rem] md:px-[0.6rem] lg:px-[1.25rem] py-[1rem] md:py-[0.6rem] lg:py-[1rem] max-w-[30rem]`}
    >
      <div
        className={`${styles.marketCardHead} flex w-full justify-between items-start`}
      >
        <div className={`${styles.marketCardHeadName}`}>{title}</div>
        <div className={`${styles.marketCardHeadPercent}`}>
          {changePercent}%
        </div>
      </div>
      <div className={`${styles.marketCardBody} flex gap-2  items-center`}>
        <Image
          src={image}
          alt={brand}
          width={134}
          height={142}
          className="w-auto max-h-[125px] md:max-h-[84px] lg:max-h-[140px]"
        />
        <div className="flex flex-col gap-2 md:gap-0">
          <div className={`${styles.cardWatchName} text-center`}>{brand}</div>
          <LineChart data={chartData || []} color={chartColor} id={chartId} />
        </div>
      </div>
    </div>
  );
};

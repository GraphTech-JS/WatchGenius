"use client";
import React, { useEffect, useState } from "react";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";
import styles from "./Market.module.css";
import Image from "next/image";
import { GreenCup } from "../../../../../public/icons";

interface IMarketTotal {
  title: string;
  deals: number;
  amount: number;
  chartData: number[];
}

export const MarketTotal: React.FC<IMarketTotal> = ({
  title,
  deals,
  amount,
  chartData,
}) => {
  const color = "#D2F7D0";
  const percentColor = "#009C05";
  const [chartHeight, setChartHeight] = useState(70);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setChartHeight(120);
      } else if (width >= 834) {
        setChartHeight(70);
      } else if (width >= 768) {
        setChartHeight(60);
      } else {
        setChartHeight(100);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={`${styles.marketCard} relative flex flex-col gap-4 md:gap-2 lg:gap-0 rounded-2xl h-[12.5rem] md:h-[10rem] lg:h-[13.5rem] px-[1.25rem] md:px-[0.6rem] lg:px-[1.25rem] py-[1rem] md:py-[0.6rem] lg:py-[1rem] max-w-[30rem]`}
    >
      <div className="flex flex-col md:flex-row lg:flex-col">
        <div
          className={`${styles.marketCardHead} flex w-full md:w-2/3 lg:w-full md:flex-col lg:flex-row justify-between items-start`}
        >
          <div className={`${styles.marketCardHeadName}`}>{title}</div>
          <div
            className={`${styles.marketCardHeadPercent} flex items-center gap-1 font-bold`}
            style={{ color: percentColor }}
          >
            €{amount.toLocaleString()}
          </div>
        </div>
        <div
          className={`${styles.marketCardDetails} flex w-full md:w-1/3 lg:w-full md:flex-col lg:flex-row justify-between items-start md:items-end lg-items-start`}
        >
          <div className="flex gap-2">
            <Image src={GreenCup.src} alt="" width={19} height={19} />

            <div className={`${styles.marketCardDetailsName} hidden lg:flex`}>
              Обсяг угод
            </div>
          </div>
          <div
            className={`${styles.marketCardHeadDeals} flex items-center gap-1 `}
          >
            {deals} угод
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between w-full">
        <LineChart
          data={chartData || []}
          color={color}
          height={chartHeight}
          width={500}
        />
      </div>
      <div
        className={`${styles.marketCardLink} absolute bottom-[16px] md:bottom-[20px] w-full left-1/2 transform -translate-x-1/2  text-center font-medium cursor-pointer`}
      >
        Перейти в каталог
      </div>
    </div>
  );
};

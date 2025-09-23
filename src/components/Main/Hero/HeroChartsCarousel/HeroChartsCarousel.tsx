"use client";
import React, { useState, useEffect } from "react";
import styles from "./HeroChartsCarousel.module.css";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";

const Chart1 = () => (
  <div className="relative flex items-center justify-between w-full h-full rounded-[10px] px-3">
    <div
      className={`${styles.chartGreen} absolute top-[6px] flex items-center justify-center w-8 h-8 rounded-md font-bold`}
    >
      A
    </div>
    <LineChart data={[2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7]} color="#22c55e" />
    <div className="absolute top-[6px] right-[15px] flex flex-row items-end text-right text-sm gap-2">
      <span className="font-bold text-black">+7%</span>
      <span className="text-gray-500">за 90 днів</span>
    </div>
  </div>
);
// const Chart2 = () => (
//   <div className="flex items-center justify-between w-full h-full rounded-[10px] px-3">
//     <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-md text-green-700 font-bold">
//       B
//     </div>
//     <LineChart data={[7, 6, 7, 6, 7.5, 7, 8]} color="#EED09D" />
//     <div className="flex flex-col items-end text-right text-sm">
//       <span className="font-bold text-black">+7%</span>
//       <span className="text-gray-500">за 90 днів</span>
//     </div>
//   </div>
// );
// const Chart3 = () => (
//   <div className="flex items-center justify-between w-full h-full rounded-[10px] px-3">
//     <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-md text-green-700 font-bold">
//       C
//     </div>
//     <LineChart data={[5, 6, 7, 6, 7.5, 7, 8]} color="#F4CBC7" />
//     <div className="flex flex-col items-end text-right text-sm">
//       <span className="font-bold text-black">+7%</span>
//       <span className="text-gray-500">за 90 днів</span>
//     </div>
//   </div>
// );

const charts = [Chart1];

export const HeroChartsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === charts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const ActiveChart = charts[activeIndex];

  return (
    <div className={`${styles.heroChartsCarousel} w-full`}>
      <div
        className={`${styles.heroChartContainer} w-full h-[108px] rounded-[15px] p-[6px]`}
      >
        <div
          className={`${styles.heroChartItem} flex rounded-[10px] h-full w-full`}
        >
          <ActiveChart />
        </div>
      </div>

      <div className={styles.dotsWrapper}>
        {charts.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.dot} ${
              activeIndex === index ? styles.activeDot : styles.inactiveDot
            }`}
            aria-label={`Показати графік ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

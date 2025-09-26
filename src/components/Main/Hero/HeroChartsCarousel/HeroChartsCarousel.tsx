"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroChartsCarousel.module.css";
import { LineChart } from "@/components/Main/Hero/Chart/LineChart";

const Chart1 = () => (
  <div className="relative flex items-center justify-between w-[350px] lg:w-[210px] h-full rounded-[10px] px-3 lg:pt-[40px] shrink-0">
    <div
      className={`${styles.chartGreen} absolute top-[6px] lg:top-3 flex items-center justify-center w-8 lg:w-12 h-8 lg:h-11 rounded-md font-bold`}
    >
      A
    </div>
    <LineChart
      data={[2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7]}
      color="#22c55e"
      id="chart1"
    />
    <div className="absolute top-[6px] lg:top-3 right-[15px] flex flex-row items-center text-right text-sm gap-2">
      <span className={`${styles.chartPersent} font-bold text-black`}>+7%</span>
      <span className="text-gray-500">за 90 днів</span>
    </div>
  </div>
);

const Chart2 = () => (
  <div className="relative flex items-center justify-between w-[350px] lg:w-[210px] h-full rounded-[10px] px-3 lg:pt-[40px] shrink-0">
    <div
      className={`${styles.chartOrange} absolute top-[6px] lg:top-3 flex items-center justify-center w-8 lg:w-12 h-8 lg:h-11 rounded-md font-bold`}
    >
      B
    </div>
    <LineChart data={[7, 6, 7, 6, 7.5, 7, 8]} color="#EED09D" id="chart2" />
    <div className="absolute top-[6px] lg:top-3 right-[15px] flex flex-row items-center text-right text-sm gap-2">
      <span className={`${styles.chartPersent} font-bold text-black`}>+0%</span>
      <span className="text-gray-500">за 90 днів</span>
    </div>
  </div>
);

const Chart3 = () => (
  <div className="relative flex items-center justify-between w-[350px] lg:w-[210px] h-full rounded-[10px] px-3 lg:pt-[40px] shrink-0 ">
    <div
      className={`${styles.chartRed} absolute top-[6px] lg:top-3 flex items-center justify-center w-8 lg:w-12 h-8 lg:h-11 rounded-md font-bold`}
    >
      C
    </div>
    <LineChart data={[5, 6, 7, 6, 7.5, 7, 8]} color="#F4CBC7" id="chart3" />
    <div className="absolute top-[6px] lg:top-3 right-[15px] flex flex-row items-center text-right text-sm gap-2">
      <span className={`${styles.chartPersent} font-bold text-black`}>-7%</span>
      <span className="text-gray-500">за 90 днів</span>
    </div>
  </div>
);
const Chart4 = () => (
  <div className="relative flex items-center justify-between w-[350px] lg:w-[210px] h-full rounded-[10px] px-3 lg:pt-[40px] shrink-0">
    <div
      className={`${styles.chartOverall} absolute top-[0px] left-[8px] flex items-center justify-center rounded-md font-bold`}
    >
      Overall
    </div>
    <LineChart data={[5, 6, 7, 6, 7.5, 7, 8]} color="#22c55e" id="chart4" />
    <div className="absolute top-[6px] right-[15px] flex flex-row lg:flex-col items-center lg:items-end text-right text-sm gap-2 lg:gap-0">
      <span className={`${styles.chartPersent} font-bold text-black`}>
        + 1,2%
      </span>
      <span className="text-gray-500">за 90 днів</span>
    </div>
  </div>
);

const charts = [Chart1, Chart2, Chart3, Chart4];

export const HeroChartsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === charts.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isDesktop]);

  const scrollToChart = (index: number) => {
    setActiveIndex(index);
    if (isDesktop && containerRef.current) {
      const chartWidth = 350 + 16;
      containerRef.current.scrollTo({
        left: index * chartWidth,
        behavior: "smooth",
      });
    }
  };

  if (isDesktop) {
    return (
      <div
        className={`${styles.heroChartsCarousel} flex lg:w-fit flex-col gap-3`}
      >
        <div
          ref={containerRef}
          className={`${styles.heroChartContainer} flex gap-4 h-[108px] lg:h-[160px] rounded-[15px] p-[6px] overflow-hidden`}
        >
          {charts.map((Chart, idx) => (
            <div
              key={idx}
              className={`${styles.heroChartItem} flex rounded-[10px]`}
            >
              <Chart />
            </div>
          ))}
        </div>
        <div
          className={`${styles.dotsWrapper} lg:hidden flex justify-center gap-2`}
        >
          {charts.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToChart(index)}
              className={`${styles.dot} ${
                activeIndex === index ? styles.activeDot : styles.inactiveDot
              }`}
              aria-label={`Показати графік ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const ActiveChart = charts[activeIndex];
  return (
    <div
      className={`${styles.heroChartsCarousel} w-full flex flex-col items-center`}
    >
      <div
        className={`${styles.heroChartContainer} w-full h-[108px] max-w-[360px] rounded-[15px] p-[6px]`}
      >
        <div
          className={`${styles.heroChartItem} flex rounded-[10px] h-full w-full`}
        >
          <ActiveChart />
        </div>
      </div>
      <div className={`${styles.dotsWrapper}  flex justify-center gap-2`}>
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

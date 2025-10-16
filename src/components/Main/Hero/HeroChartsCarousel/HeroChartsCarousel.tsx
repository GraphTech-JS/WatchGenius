"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroChartsCarousel.module.css";
import { HeroChartItem } from "./HeroChartItem";
import { HeroChartItemProps } from "./HeroChartItem";

const charts: HeroChartItemProps[] = [
  {
    id: "chart1",
    label: "A",
    data: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
    variant: "green",
    percent: "+7%",
    period: "за 90 днів",
  },
  {
    id: "chart2",
    label: "B",
    data: [7, 6, 7, 6, 7.5, 7, 8],
    variant: "orange",
    percent: "+0%",
    period: "за 90 днів",
  },
  {
    id: "chart3",
    label: "C",
    data: [5, 6, 7, 6, 7.5, 7, 8],
    variant: "red",
    percent: "-7%",
    period: "за 90 днів",
  },
  {
    id: "chart4",
    label: "Overall",
    data: [5, 6, 7, 6, 7.5, 7, 8],
    variant: "overall",
    percent: "+1,2%",
    period: "за 90 днів",
    isSpecial: true,
  },
];

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
      }, 4000000);
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
      <div className={`${styles.heroChartsCarousel} flex lg:w-fit flex-col`}>
        <div
          ref={containerRef}
          className={`${styles.heroChartContainer} flex gap-4 h-[108px] lg:h-[160px] rounded-[15px] p-[6px] lg:p-[15px] overflow-hidden`}
        >
          {charts.map((chart) => (
            <div
              key={chart.id}
              className={`${styles.heroChartItem} flex rounded-[10px]`}
            >
              <HeroChartItem {...chart} />
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

  const activeChart = charts[activeIndex];
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
          <HeroChartItem {...activeChart} />
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

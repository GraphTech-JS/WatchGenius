"use client";

import { useState } from "react";
import styles from "./Slider.module.css";

interface ISliderProps {
  items: { name: string; logo: string; id: number }[];
}

const slidesView = 4;

export const Slider = ({ items }: ISliderProps) => {
  const [currentSlide] = useState(0);

  // Duplicate slides for infinite effect
  const extendedItems = [...items, ...items.slice(0, slidesView)];

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div
          className={styles.slidesWrapper}
          style={{
            width: `${extendedItems.length * 200}px`,
            transform: `translateX(-${currentSlide * 200}px)`,
          }}
        >
          {extendedItems.map(({ logo, id }, idx: number) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={`${id}-${idx}`}
                className={`${styles.slide} ${
                  isActive ? styles.slideActive : ""
                }`}
              >
                <img src={logo} alt="logo" className={styles.slideImg} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

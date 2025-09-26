"use client";
import React from "react";
import styles from "./BestPrice.module.css";
import Link from "next/link";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { CustomSelect } from "@/components/CustomSelect/CustomSelect";

export const BestPrice = () => {
  const brands = [
    "Rolex Submariner",
    "Omega Speedmaster",
    "Patek Philippe",
    "Seiko 5",
    "Seiko 5",
    "Seiko 5",
  ];
  return (
    <section
      id="bestPrice"
      className={`${styles.best} px-[1.25rem] lg:px-[6rem] pt-6 lg:pt-12 pb-10 lg:pb-16`}
    >
      <div className={`${styles.bestContainer} w-full`}>
        <div className={`${styles.bestTitle} mb-6`}>
          <ThemedText type="h2">
            {" "}
            <span className={`${styles.bestTitleHighlighted} mb-6`}>
              Best
            </span>{" "}
            price today
          </ThemedText>
        </div>
        <div className={`${styles.bestModules} flex flex-col gap-6`}>
          <div
            className={`${styles.bestAlert} flex flex-col items-center gap-4`}
          >
            <div className={`${styles.bestAlertTitle}`}>Set price alert</div>
            <div
              className={`${styles.bestAlertForm} flex flex-col gap-6 w-full`}
            >
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  Оберіть модель годинника
                </div>
                <CustomSelect
                  options={brands}
                  placeholder="Rolex Submariner Oyster Perpetual"
                />
              </div>
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  Відповідатиме вартості
                </div>
                <div
                  className={`${styles.FormItemInput} flex items-center justify-center w-full h-12 rounded-xl px-4 py-3.5`}
                >
                  <input
                    type="number"
                    placeholder="50 000"
                    className="w-full"
                  />
                </div>
              </div>
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  Email для сповіщень
                </div>
                <div
                  className={`${styles.FormItemInput} flex items-center justify-center w-full h-12 rounded-xl px-4 py-3.5 `}
                >
                  <input
                    type="email"
                    placeholder="xxxxxxxx@gmail.com"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                className={`${styles.FormBtn} flex items-center justify-center py-3.5 rounded-xl `}
              >
                <div>Отимувати сповіщення</div>
              </button>
              <div className={`${styles.Text}`}>
                <p>
                  Ми надсилатимемо сповіщення не частіше 1 разу на день.
                  Натискаючи “Встановити”, Ви погоджуєтесь{" "}
                  <Link href="./" className={`${styles.TextLink}`}>
                    з умовами використання
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.bestWatches}`}></div>
        </div>
      </div>
    </section>
  );
};

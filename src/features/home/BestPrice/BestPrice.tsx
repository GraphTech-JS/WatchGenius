"use client";
import React from "react";
import styles from "./BestPrice.module.css";
import Link from "next/link";
import { CustomSelect } from "@/components/CustomSelect/CustomSelect";
import { mockBest } from "@/mock/watch";
import { ProductBest } from "@/components/ProductsTable/ProductBest/ProductBest";

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
      className={`${styles.best} max-w-[90rem] mx-auto px-[1.25rem] md:pl-[50px] md:pr-[32px] lg:px-[6rem] pb-12 md:pb-15`}
    >
      <div className={`${styles.bestContainer} w-full`}>
        <div
          className={`${styles.bestTitle} flex justify-between items-end mb-6 w-full md:w-[54%] md:max-w-[38.75rem]`}
        >
          <div className={`${styles.bestSectionTitle}`}>
            {" "}
            <span className={`${styles.bestTitleHighlighted} mb-6`}>
              Best
            </span>{" "}
            price today
          </div>
          <div className={`${styles.bestDate} hidden md:flex`}>08.08.2025</div>
        </div>
        <div
          className={`${styles.bestModules} flex flex-col md:flex-row-reverse gap-6`}
        >
          <div
            className={`${styles.bestAlert} flex flex-col items-center gap-4`}
          >
            <div className={`${styles.bestAlertTitle} `}>Set price alert</div>
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
                    id="cost"
                    type="number"
                    placeholder="50 000"
                    className={`${styles.Input} w-full`}
                  />
                  <div
                    className={`${styles.FormItemInputCurr} hidden md:flex cursor-pointer`}
                  >
                    EUR
                  </div>
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
                    id="userMail"
                    type="email"
                    placeholder="xxxxxxxx@gmail.com"
                    className={`${styles.Input} w-full`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <button
                className={`${styles.FormBtn} flex items-center justify-center py-3.5 rounded-xl cursor-pointer `}
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
          <div
            className={`${styles.bestWatches} flex flex-col justify-center w-full md:min-w-[54%]`}
          >
            <div className={`${styles.bestWatchesContainer}`}>
              <ProductBest items={mockBest} />
            </div>
            <Link
              href="./"
              className={`${styles.bestWatchesLink} cursor-pointer`}
            >
              Найкращі пропозиції дня →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import React from "react";
import styles from "./DealerCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { DetailsIcon, LetterIcon } from "../../../../public/dealers/Icon";
import { DealerData } from "@/types/dealers";

export const DealerCard: React.FC<{ dealer: DealerData }> = ({ dealer }) => {
  return (
    <div
      className={`${styles.dealerCard} flex flex-col lg:flex-row items-center px-4 py-7 rounded-[20px] gap-7`}
    >
      <Image
        src={dealer.image}
        alt={dealer.name}
        width={240}
        height={240}
        className="w-[92px] h-[92px] rounded-full lg:self-start"
      />
      <div className={`${styles.CardContent} flex flex-col lg:flex-row gap-6`}>
        <div
          className={`${styles.CardDesc} flex flex-col text-center lg:text-start`}
        >
          <div className={`${styles.CardDescTitle} mb-2.5`}>{dealer.name}</div>
          <div className={`${styles.CardDescText}`}>{dealer.description}</div>

          <div
            className={`${styles.CardInfo} mt-6 lg:mt-4.5 grid grid-cols-2 lg:flex gap-x-2.5 gap-y-5 lg:gap-5 text-center`}
          >
            <div
              className={`${styles.CardInfoItem} rounded-[10px] py-1.5 lg:px-6`}
            >
              📍{dealer.address}
            </div>
            <div
              className={`${styles.CardInfoItem} rounded-[10px] py-1.5 lg:px-6`}
            >
              ⭐ {dealer.rating}
            </div>
            <div
              className={`${styles.CardInfoItem} col-span-2 lg:col-span-1 rounded-[10px] py-1.5 lg:px-5.5`}
            >
              📢 {dealer.listings}
            </div>
          </div>
        </div>

        <div
          className={`${styles.CardButtons} w-full lg:max-w-[14rem] flex flex-col gap-4 text-center`}
        >
          <Link
            href="/dealer"
            prefetch={false}
            className={`${styles.dealerCardLink} w-full `}
          >
            <button
              className={`${styles.dealerBtn} w-full py-4 lg:py-[16px] flex items-center justify-center rounded-[10px] gap-[10px] cursor-pointer`}
            >
              <DetailsIcon className={`${styles.DealerIcon} w-4 h-4`} />
              <div>Перейти на сайт</div>
            </button>
          </Link>
          <Link
            href="/price"
            prefetch={false}
            className={`${styles.dealerCardLink} w-full `}
          >
            <button
              className={`${styles.priceBtn} w-full py-4 lg:py-[16px] flex items-center justify-center rounded-[10px] gap-[10px] cursor-pointer`}
            >
              <LetterIcon className={`${styles.BookIcon} w-5.5 h-5.5`} />
              <div>Запит ціни</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

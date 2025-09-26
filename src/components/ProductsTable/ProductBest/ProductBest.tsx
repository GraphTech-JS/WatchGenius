"use client";
import React from "react";
import styles from "./ProductBest.module.css";
import { BestProductCard } from "@/components/ProductsTable/ProductBest/BestProductCard/BestProductCard";
import type { IWatch } from "@/interfaces";

type Props = {
  items: IWatch[];
};

export const ProductBest: React.FC<Props> = ({ items }) => {
  return (
    <div className={`${styles.section} mb-6`}>
      <div className={`${styles.col} flex flex-col gap-4 items-center`}>
        {items.map((card, i) => (
          <BestProductCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
};

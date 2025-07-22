"use client";
import React from "react";
import styles from "./TopBrands.module.css";
import { Rolex, Patek, Omega, TagHeuer } from "../../../../public/icons";
import { Slider } from "@/components/Slider/Slider";
import { CustomAreaChart } from "@/components/Chart/AreaChart/AreaChart";
import { Indicators } from "../Indicators/Indicators";
import { ThemedText } from "@/components/ThemedText/ThemedText";

const brands = [
  { name: "Rolex", logo: Rolex.src, id: 1 },
  { name: "Patek Philippe", logo: Patek.src, id: 2 },
  { name: "Omega", logo: Omega.src, id: 3 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 4 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 5 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 6 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 7 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 8 },
  { name: "TAG Heuer", logo: TagHeuer.src, id: 9 },
];

export const TopBrands = () => {
  return (
    <section className={styles.topBrands}>
      <div className={styles.topBrandsContainer}>
        <ThemedText type="h2">Топ 5 брендів</ThemedText>
        <Slider items={brands} />
        <CustomAreaChart />
        <Indicators />
      </div>
    </section>
  );
};

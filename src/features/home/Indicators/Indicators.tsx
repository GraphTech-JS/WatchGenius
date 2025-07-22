import React from "react";
import styles from "./Indicators.module.css";
import PieChart from "../../../components/Chart/PieChart/PieChart";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const Indicators = () => {
  return (
    <div className={styles.indicatorsContainer}>
      <div className={styles.indicatorsText}>
        <ThemedText type="h2">Індикатор Rolex 92</ThemedText>
        <ThemedText type="h5">
          Надійність, статус і безпеганна якість — головні причини, чому 92%
          покупців обирають Rolex.
        </ThemedText>
        <ThemedText type="h5">
          80% позитивних відгуків, лише 20% мають зауваження — здебільшого до
          ціни або очікування доставки.
        </ThemedText>
      </div>
      <div className={styles.pieChartSection}>
        <PieChart />
      </div>
    </div>
  );
};

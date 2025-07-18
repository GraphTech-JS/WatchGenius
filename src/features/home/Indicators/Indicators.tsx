import React from "react";
import styles from "./Indicators.module.css";
import { PieChart } from "recharts";

export const Indicators = () => {
  return (
    <div className={styles.indicators}>
      <div className={styles.indicatorsContainer}>
        <div className={styles.indicatorsText}>
          <h3 className={styles.pieChartTitle}>Індикатор Rolex 92</h3>
          <p className={styles.pieChartDescription}>
            Надійність, статус і безпеганна якість — головні причини, чому 92%
            покупців обирають Rolex.
          </p>
          <p className={styles.pieChartSubtext}>
            80% позитивних відгуків, лише 20% мають зауваження — здебільшого до
            ціни або очікування доставки.
          </p>
        </div>
        <div className={styles.pieChartSection}>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

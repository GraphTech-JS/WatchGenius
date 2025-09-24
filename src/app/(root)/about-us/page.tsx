import React from "react";

import styles from "./page.module.css";
import { Market } from "@/features/home/Market/Market";

const MarketOverview = () => {
  return (
    <div className={styles.aboutUs}>
      <Market />
    </div>
  );
};

export default MarketOverview;

import React from "react";

import styles from "./page.module.css";
import { About } from "@/features/home/About/About";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <About />
    </div>
  );
};

export default AboutUs;

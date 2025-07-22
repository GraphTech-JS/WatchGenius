import React from "react";
import styles from "./About.module.css";
import { ThemedText } from "@/components/ThemedText/ThemedText";

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutText}>
        <div className={styles.aboutHeadingWrapper}>
          <ThemedText type="h2">Про нас</ThemedText>
          <div className={styles.divider} />
        </div>
        <ThemedText type="h5">
          Інтернет-магазин годинників, де стиль зустрічається з точністю. Ми
          пропонуємо широкий вибір чоловічих та жіночих годинників — від
          класичних моделей до сучасних смарт-годинників.
          <br />
          <br /> У нашому каталозі ви знайдете тільки оригінальні бренди з
          офіційною гарантією. Працюємо швидко, надійно та з турботою про
          кожного клієнта.
        </ThemedText>
      </div>
    </section>
  );
};

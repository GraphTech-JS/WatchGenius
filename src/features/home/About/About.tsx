import React from "react";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutText}>
        <div className={styles.aboutHeadingWrapper}>
          <h2 className={styles.aboutHeading}>Про нас</h2>
          <div className={styles.divider} />
        </div>
        <p className={styles.aboutDescription}>
          Інтернет-магазин годинників, де стиль зустрічається з точністю. Ми
          пропонуємо широкий вибір чоловічих та жіночих годинників — від
          класичних моделей до сучасних смарт-годинників.
          <br />
          <br /> У нашому каталозі ви знайдете тільки оригінальні бренди з
          офіційною гарантією. Працюємо швидко, надійно та з турботою про
          кожного клієнта.
        </p>
      </div>
    </section>
  );
};

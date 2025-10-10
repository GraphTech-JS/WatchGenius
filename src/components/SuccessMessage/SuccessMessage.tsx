import React from 'react';
import styles from './SuccessMessage.module.css';

export const SuccessMessage: React.FC = () => {
  return (
    <div className={styles.successContainer}>
      <h2 className={styles.successTitle}>Ваш запит надіслано</h2>
      <p className={styles.successSubtitle}>
        Дилер зв&apos;яжеться з Вами протягом 3 годин
      </p>
    </div>
  );
};

'use client';

import React, { useEffect } from 'react';
import styles from './ComparisonModal.module.css';

interface ComparisonModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.modalText}>Додано до порівняння</span>
      </div>
    </div>
  );
};

export default ComparisonModal;

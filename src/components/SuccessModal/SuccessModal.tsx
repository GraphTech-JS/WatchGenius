'use client';

import React, { useEffect } from 'react';
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.modalText}>{message}</span>
      </div>
    </div>
  );
};

'use client';

import React, { useEffect } from 'react';
import styles from './Toast.module.css';
import { wishlistKeys } from '@/i18n/keys/wishlist';
import { t } from '@/i18n';

interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
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
    <div className={styles.toast}>
      <span className={styles.toastMessage}>{message}</span>
      <button
        className={styles.toastClose}
        onClick={onClose}
        aria-label={t(wishlistKeys.toast.close)}
      >
        ×
      </button>
    </div>
  );
};

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CustomSelect } from '@/components/CustomSelect/CustomSelect';
import styles from './PriceAlertModal.module.css';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  productTitle = 'Rolex Submariner Oyster Perpetual',
}) => {
  const [formData, setFormData] = useState({
    watchModel: productTitle,
    targetPrice: '',
    email: '',
  });

  const brands = [
    'Rolex Submariner',
    'Omega Speedmaster',
    'Patek Philippe',
    'Seiko 5',
    'Audemars Piguet',
    'Cartier',
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        watchModel: productTitle,
        targetPrice: '',
        email: '',
      });
    }
  }, [isOpen, productTitle]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Відправка форми сповіщення про ціну:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleClose();
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label='Закрити модальне вікно'
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.title}>Set price alert</div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>
                Оберіть модель годинника
              </div>
              <CustomSelect options={brands} placeholder={productTitle} />
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Відповідатиме вартості</div>
              <div className={styles.priceInputContainer}>
                <input
                  type='number'
                  placeholder='50 000'
                  value={formData.targetPrice}
                  onChange={(e) =>
                    handleInputChange('targetPrice', e.target.value)
                  }
                  className={styles.priceInput}
                />
                <div className={styles.currency}>EUR</div>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Email для сповіщень</div>
              <div className={styles.emailInputContainer}>
                <input
                  type='email'
                  placeholder='xxxxxxxx@gmail.com'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={styles.emailInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.submitButton}>
              Отимувати сповіщення
            </button>
            <div className={styles.disclaimer}>
              <p>
                Ми надсилатимемо сповіщення не частіше 1 разу на день.
                Натискаючи &quot;Встановити&quot;, Ви погоджуєтесь{' '}
                <Link href='/terms' className={styles.disclaimerLink}>
                  з умовами використання
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceAlertModal;

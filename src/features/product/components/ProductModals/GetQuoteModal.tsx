'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './GetQuoteModal.module.css';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

const GetQuoteModal: React.FC<GetQuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [isOpen]);

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
      console.log('Відправка форми запиту:', formData);
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
          <div className={styles.title}>Get quote</div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Введіть ім&apos;я</div>
              <input
                type='text'
                placeholder="Ваше ім'я"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Введіть пошту</div>
              <input
                type='email'
                placeholder='your@email.com'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Введіть номер телефону</div>
              <input
                type='tel'
                placeholder='+380 50 123 45 67'
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.submitButton}>
              Відправити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetQuoteModal;

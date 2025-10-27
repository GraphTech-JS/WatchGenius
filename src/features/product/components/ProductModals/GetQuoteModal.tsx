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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError("Ім'я обов'язкове");
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmailLocal = (value: string): boolean => {
    if (!value) {
      setEmailError("Email обов'язковий");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Введіть коректний email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhone = (value: string): boolean => {
    if (!value.trim()) {
      setPhoneError("Телефон обов'язковий");
      return false;
    }
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      setPhoneError('Введіть коректний номер телефону');
      return false;
    }
    setPhoneError('');
    return true;
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setShowSuccessModal(false);
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

    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmailLocal(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      return;
    }

    try {
      console.log('Відправка форми запиту:', formData);

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        handleClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
        setNameError('');
        setEmailError('');
        setPhoneError('');
      }, 3000);
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
              <div className={styles.formFieldWrapper}>
                <input
                  type='text'
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={(e) => {
                    handleInputChange('name', e.target.value);
                    if (nameError) setNameError('');
                  }}
                  onBlur={() => validateName(formData.name)}
                  className={`${styles.input} ${
                    nameError ? styles.inputError : ''
                  }`}
                />
                {nameError && (
                  <div className={styles.errorMessage}>{nameError}</div>
                )}
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Введіть пошту</div>
              <div className={styles.formFieldWrapper}>
                <input
                  type='email'
                  placeholder='your@email.com'
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange('email', e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onBlur={() => validateEmailLocal(formData.email)}
                  className={`${styles.input} ${
                    emailError ? styles.inputError : ''
                  }`}
                />
                {emailError && (
                  <div className={styles.errorMessage}>{emailError}</div>
                )}
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>Введіть номер телефону</div>
              <div className={styles.formFieldWrapper}>
                <input
                  type='tel'
                  placeholder='+380 50 123 45 67'
                  value={formData.phone}
                  onChange={(e) => {
                    handleInputChange('phone', e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  onBlur={() => validatePhone(formData.phone)}
                  className={`${styles.input} ${
                    phoneError ? styles.inputError : ''
                  }`}
                />
                {phoneError && (
                  <div className={styles.errorMessage}>{phoneError}</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.submitButton}>
              Відправити
            </button>
          </div>
        </form>

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                Дякуємо за ваш запит! Ми зв&apos;яжемось з вами найближчим
                часом!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuoteModal;

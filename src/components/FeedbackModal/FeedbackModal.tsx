import React, { useEffect, useCallback, useState } from 'react';
import { FeedbackModalProps, FeedbackFormData } from '@/types/feedback';
import { FeedbackForm } from '@/components/FeedbackForm/FeedbackForm';
import styles from './FeedbackModal.module.css';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  watchTitle,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError("Ім'я обов'язкове");
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (value: string): boolean => {
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

  const validateMessage = (value: string): boolean => {
    if (!value.trim()) {
      setMessageError("Повідомлення обов'язкове");
      return false;
    }
    setMessageError('');
    return true;
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', message: '' });
      setNameError('');
      setEmailError('');
      setMessageError('');
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

  const handleUpdateFormData = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isMessageValid = validateMessage(formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    try {
      console.log('Відправка форми:', formData);

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        handleClose();
        setFormData({ name: '', email: '', message: '' });
        setNameError('');
        setEmailError('');
        setMessageError('');
      }, 3000);
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    }
  };

  const handleClearError = (field: keyof FeedbackFormData) => {
    if (field === 'name') setNameError('');
    if (field === 'email') setEmailError('');
    if (field === 'message') setMessageError('');
  };

  const handleBlur = (field: keyof FeedbackFormData) => {
    if (field === 'name') validateName(formData.name);
    if (field === 'email') validateEmail(formData.email);
    if (field === 'message') validateMessage(formData.message);
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

        <FeedbackForm
          watchTitle={watchTitle}
          formData={formData}
          onUpdateFormData={handleUpdateFormData}
          onSubmit={handleSubmit}
          errors={{
            name: nameError,
            email: emailError,
            message: messageError,
          }}
          onClearError={handleClearError}
          onBlur={handleBlur}
        />

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                Дякуємо за ваше повідомлення! Ми зв&apos;яжемось з вами
                найближчим часом!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

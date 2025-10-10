import React, { useEffect, useCallback } from 'react';
import { FeedbackModalProps, FeedbackModalState } from '@/types/feedback';
import { FeedbackForm } from '@/components/FeedbackForm/FeedbackForm';
import { SuccessMessage } from '@/components/SuccessMessage/SuccessMessage';
import styles from './FeedbackModal.module.css';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  watchTitle,
}) => {
  const [modalState, setModalState] =
    React.useState<FeedbackModalState>('form');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      setModalState('form');
      setFormData({ name: '', email: '', message: '' });
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
    try {
      console.log('Відправка форми:', formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setModalState('success');
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${
          modalState === 'success' ? styles.success : ''
        }`}
      >
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label='Закрити модальне вікно'
        >
          ×
        </button>

        {modalState === 'form' ? (
          <FeedbackForm
            watchTitle={watchTitle}
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
            onSubmit={handleSubmit}
          />
        ) : (
          <SuccessMessage />
        )}
      </div>
    </div>
  );
};

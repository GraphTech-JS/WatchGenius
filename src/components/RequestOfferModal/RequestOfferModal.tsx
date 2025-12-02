import React, { useEffect, useCallback, useState } from 'react';
import { FeedbackFormData } from '@/types/feedback';
import { RequestOfferForm } from '@/components/RequestOfferForm/RequestOfferForm';
import { t } from '@/i18n';
import { formKeys } from '@/i18n/keys/common';
import { productKeys } from '@/i18n/keys/product';
import styles from './RequestOfferModal.module.css';

interface RequestOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchTitle: string;
  onSuccess?: () => void;
}

export const RequestOfferModal: React.FC<RequestOfferModalProps> = ({
  isOpen,
  onClose,
  watchTitle,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: '',
    consent: false,
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [consentError, setConsentError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const defaultMessage = t(productKeys.offers.requestOfferDefaultMessage, {
    model: watchTitle,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        message: defaultMessage,
        consent: false,
      });
      setNameError('');
      setEmailError('');
      setMessageError('');
      setConsentError('');
      setShowSuccessModal(false);
    }
  }, [isOpen, defaultMessage]);

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError(t(productKeys.offers.requestOfferErrors.nameRequired));
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError(t(productKeys.offers.requestOfferErrors.emailRequired));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(t(productKeys.offers.requestOfferErrors.emailInvalid));
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateMessage = (value: string): boolean => {
    if (!value.trim()) {
      setMessageError(t(productKeys.offers.requestOfferErrors.messageRequired));
      return false;
    }
    setMessageError('');
    return true;
  };

  const validateConsent = (value: boolean): boolean => {
    if (!value) {
      setConsentError(t(formKeys.consent.error));
      return false;
    }
    setConsentError('');
    return true;
  };

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
    field: keyof FeedbackFormData,
    value: string | boolean
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
    const isConsentValid = validateConsent(formData.consent || false);

    if (!isNameValid || !isEmailValid || !isMessageValid || !isConsentValid) {
      return;
    }

    try {
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        handleClose();
        setFormData({
          name: '',
          email: '',
          message: defaultMessage,
          consent: false,
        });
        setNameError('');
        setEmailError('');
        setMessageError('');
        setConsentError('');
        if (onSuccess) {
          onSuccess();
        }
      }, 3000);
    } catch (error) {
      console.error('Помилка відправки запиту:', error);
    }
  };

  const handleClearError = (field: keyof FeedbackFormData | 'consent') => {
    if (field === 'name') setNameError('');
    if (field === 'email') setEmailError('');
    if (field === 'message') setMessageError('');
    if (field === 'consent') setConsentError('');
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

        <RequestOfferForm
          watchTitle={watchTitle}
          formData={formData}
          onUpdateFormData={handleUpdateFormData}
          onSubmit={handleSubmit}
          errors={{
            name: nameError,
            email: emailError,
            message: messageError,
            consent: consentError,
          }}
          onClearError={handleClearError}
          onBlur={handleBlur}
        />

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                {t(productKeys.offers.requestOfferSuccess)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { t } from '@/i18n';
import { formKeys } from '@/i18n/keys/common';
import { modalsKeys } from '@/i18n/keys/modals';
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
    consent: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [consentError, setConsentError] = useState('');

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError(t(modalsKeys.getQuote.errors.nameRequired));
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmailLocal = (value: string): boolean => {
    if (!value) {
      setEmailError(t(modalsKeys.getQuote.errors.emailRequired));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(t(modalsKeys.getQuote.errors.emailInvalid));
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhone = (value: string): boolean => {
    if (!value.trim()) {
      setPhoneError(t(modalsKeys.getQuote.errors.phoneRequired));
      return false;
    }
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      setPhoneError(t(modalsKeys.getQuote.errors.phoneInvalid));
      return false;
    }
    setPhoneError('');
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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        consent: false,
      });
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setConsentError('');
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
    const isConsentValid = validateConsent(formData.consent);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isConsentValid) {
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
          phone: '',
          consent: false,
        });
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setConsentError('');
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
          <div className={styles.title}>{t(modalsKeys.getQuote.title)}</div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>
                {t(modalsKeys.getQuote.nameLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <input
                  type='text'
                  placeholder={t(modalsKeys.getQuote.namePlaceholder)}
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
              <div className={styles.formItemTitle}>
                {t(modalsKeys.getQuote.emailLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <input
                  type='email'
                  placeholder={t(modalsKeys.getQuote.emailPlaceholder)}
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
              <div className={styles.formItemTitle}>
                {t(modalsKeys.getQuote.phoneLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <input
                  type='tel'
                  placeholder={t(modalsKeys.getQuote.phonePlaceholder)}
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

          <div className={styles.consentWrapper}>
            <label className={styles.consentLabel}>
              <input
                type='checkbox'
                checked={formData.consent}
                onChange={(e) => {
                  setFormData({ ...formData, consent: e.target.checked });
                  if (e.target.checked) {
                    setConsentError('');
                  }
                }}
                className={styles.checkbox}
              />
              <span className={consentError ? styles.consentTextError : ''}>
                {t(formKeys.consent.label)}{' '}
                <Link href='/' className={styles.consentLink}>
                  {t(formKeys.consent.link)}
                </Link>
              </span>
            </label>
            {consentError && (
              <div className={styles.errorMessage}>{consentError}</div>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.submitButton}>
              {t(modalsKeys.getQuote.button)}
            </button>
          </div>
        </form>

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                <span>{t(modalsKeys.getQuote.success)}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuoteModal;

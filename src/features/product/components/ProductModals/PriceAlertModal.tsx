'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { CustomSelect } from '@/components/CustomSelect/CustomSelect';
import { useFormValidation } from '@/hooks/useFormValidation';
import { createPriceAlert, getWatchModels } from '@/lib/api';
import type { ApiCurrency, ApiBrandModel } from '@/interfaces/api';
import { trackEvent } from '@/lib/analytics';
import styles from './PriceAlertModal.module.css';
import { t } from '@/i18n';
import { modalsKeys } from '@/i18n/keys/modals';

interface PriceAlertFormData {
  watchModel: string;
  targetPrice: string;
  email: string;
  consent: boolean;
}

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
  const [formData, setFormData] = useState<PriceAlertFormData>({
    watchModel: productTitle,
    targetPrice: '',
    email: '',
    consent: false,
  });

  const [consentError, setConsentError] = useState('');
  const [models, setModels] = useState<string[]>([]);

  const currencies = ['USD', 'EUR', 'UAH', 'PLN', 'KZT'];

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);

  const {
    errors,
    validateForm,
    validateEmail,
    clearErrors,
    clearEmailError,
    clearPriceError,
    clearModelError,
  } = useFormValidation();

  const validateConsent = (value: boolean): boolean => {
    if (!value) {
      setConsentError(t(modalsKeys.priceAlert.consentError));
      return false;
    }
    setConsentError('');
    return true;
  };

  useEffect(() => {
    async function loadModels() {
      try {
        const data: ApiBrandModel[] = await getWatchModels();
        const transformed = data.map((item) => `${item.brand} ${item.model}`);
        setModels(transformed);
      } catch (error) {
        console.error('❌ [PriceAlertModal] Failed to load models:', error);
        setModels([]);
      }
    }
    loadModels();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        watchModel: productTitle,
        targetPrice: '',
        email: '',
        consent: false,
      });
      clearErrors();
      setConsentError('');
      setSelectedCurrency('USD');
      setIsCurrencyOpen(false);
    }
  }, [isOpen, productTitle, clearErrors]);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(e.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setFormData((prev) => ({
      ...prev,
      targetPrice: formatted,
    }));
    if (errors.price) {
      clearPriceError();
    }
  };

  const handleModelChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      watchModel: value,
    }));
    if (errors.model) {
      clearModelError();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    if (value) {
      validateEmail(value);
    } else {
      clearEmailError();
    }
  };

  const handleEmailBlur = () => {
    validateEmail(formData.email);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm({
      email: formData.email,
      price: formData.targetPrice,
      selectedModel: formData.watchModel,
    });

    const isConsentValid = validateConsent(formData.consent);

    if (!isValid || !isConsentValid) {
      return;
    }

    const parts = formData.watchModel.split(' ');
    if (parts.length < 2) {
      return;
    }

    const brand = parts[0];
    const model = parts.slice(1).join(' ');

    const priceWithoutSpaces = formData.targetPrice.replace(/\s/g, '');
    const targetPrice = Number(priceWithoutSpaces);

    if (isNaN(targetPrice) || targetPrice <= 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const alertData = {
        brand,
        model,
        targetPrice,
        currency: selectedCurrency as ApiCurrency,
        email: formData.email,
      };

      await createPriceAlert(alertData);

      trackEvent('price_alert_sub', {
        product_id: productTitle,
        target_price: targetPrice,
        currency: selectedCurrency,
      });

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        handleClose();
        setFormData({
          watchModel: productTitle,
          targetPrice: '',
          email: '',
          consent: false,
        });
        setSelectedCurrency('USD');
        clearErrors();
        setConsentError('');
      }, 3000);
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    } finally {
      setIsSubmitting(false);
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
          <div className={styles.title}>{t(modalsKeys.priceAlert.title)}</div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>
                {t(modalsKeys.priceAlert.modelLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <CustomSelect
                  options={models.length > 0 ? models : [productTitle]}
                  placeholder={productTitle}
                  onChange={handleModelChange}
                />
                {errors.model && (
                  <div className={styles.errorMessage}>{errors.model}</div>
                )}
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>
                {t(modalsKeys.priceAlert.priceLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <div
                  className={`${styles.priceInputContainer} ${
                    errors.price ? styles.inputError : ''
                  }`}
                >
                  <input
                    type='text'
                    placeholder='50 000'
                    value={formData.targetPrice}
                    onChange={handlePriceChange}
                    className={styles.priceInput}
                  />
                  <div ref={currencyRef} className={styles.currencySelect}>
                    <div
                      className={styles.currencyButton}
                      onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    >
                      <span className={styles.currency}>
                        {selectedCurrency}
                      </span>
                    </div>
                    {isCurrencyOpen && (
                      <div className={styles.currencyDropdown}>
                        {currencies.map((currency) => (
                          <div
                            key={currency}
                            className={`${styles.currencyOption} ${
                              selectedCurrency === currency
                                ? styles.currencyOptionActive
                                : ''
                            }`}
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            {currency}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {errors.price && (
                  <div className={styles.errorMessage}>{errors.price}</div>
                )}
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formItemTitle}>
                {t(modalsKeys.priceAlert.emailLabel)}
              </div>
              <div className={styles.formFieldWrapper}>
                <div
                  className={`${styles.emailInputContainer} ${
                    errors.email ? styles.inputError : ''
                  }`}
                >
                  <input
                    type='email'
                    placeholder={t(modalsKeys.priceAlert.placeholderEmail)}
                    value={formData.email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={styles.emailInput}
                  />
                </div>
                {errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
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
                {t(modalsKeys.priceAlert.consentText)}{' '}
                <Link href='/terms' className={styles.consentLink}>
                  {t(modalsKeys.priceAlert.consentLink)}
                </Link>
              </span>
            </label>
            {consentError && (
              <div className={styles.errorMessage}>{consentError}</div>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <button
              type='submit'
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t(modalsKeys.priceAlert.buttonSubmitting)
                : t(modalsKeys.priceAlert.button)}
            </button>
          </div>
        </form>

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                {t(modalsKeys.priceAlert.success)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlertModal;

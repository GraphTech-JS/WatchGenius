import { useState, useCallback } from 'react';
import { t } from '@/i18n';
import { formKeys } from '@/i18n/keys/common';

interface FormData {
  email: string;
  price: string;
  selectedModel: string;
  consent?: boolean;
}

export const useFormValidation = () => {
  const [emailError, setEmailError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [modelError, setModelError] = useState('');
  const [consentError, setConsentError] = useState('');

  const validateEmail = useCallback((value: string): boolean => {
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
  }, []);

  const validatePrice = useCallback((price: string): boolean => {
    const numericPrice = parseFloat(price.replace(/\s/g, ''));
    if (!price || numericPrice <= 0) {
      setPriceError('Введіть коректну ціну');
      return false;
    }
    setPriceError('');
    return true;
  }, []);

  const validateModel = useCallback((model: string): boolean => {
    if (!model) {
      setModelError('Будь ласка, оберіть модель годинника');
      return false;
    }
    setModelError('');
    return true;
  }, []);

  const validateConsent = useCallback((consent: boolean): boolean => {
    if (!consent) {
      setConsentError(t(formKeys.consent.error));
      return false;
    }
    setConsentError('');
    return true;
  }, []);

  const validateForm = useCallback(
    (formData: FormData): boolean => {
      const isModelValid = validateModel(formData.selectedModel);
      const isPriceValid = validatePrice(formData.price);
      const isEmailValid = validateEmail(formData.email);
      const isConsentValid = formData.consent !== undefined ? validateConsent(formData.consent) : true;

      return isModelValid && isPriceValid && isEmailValid && isConsentValid;
    },
    [validateEmail, validateModel, validatePrice, validateConsent]
  );

  const clearErrors = useCallback(() => {
    setEmailError('');
    setPriceError('');
    setModelError('');
    setConsentError('');
  }, []);

  const clearEmailError = useCallback(() => setEmailError(''), []);
  const clearPriceError = useCallback(() => setPriceError(''), []);
  const clearModelError = useCallback(() => setModelError(''), []);
  const clearConsentError = useCallback(() => setConsentError(''), []);

  return {
    errors: {
      email: emailError,
      price: priceError,
      model: modelError,
      consent: consentError,
    },
    validateEmail,
    validatePrice,
    validateModel,
    validateConsent,
    validateForm,
    clearErrors,
    clearEmailError,
    clearPriceError,
    clearModelError,
    clearConsentError,
  };
};


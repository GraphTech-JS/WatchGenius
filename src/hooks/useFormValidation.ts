import { useState, useCallback } from 'react';

interface FormData {
  email: string;
  price: string;
  selectedModel: string;
}

export const useFormValidation = () => {
  const [emailError, setEmailError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [modelError, setModelError] = useState('');

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

  const validateForm = useCallback((formData: FormData): boolean => {
    const isModelValid = validateModel(formData.selectedModel);
    const isPriceValid = validatePrice(formData.price);
    const isEmailValid = validateEmail(formData.email);

    return isModelValid && isPriceValid && isEmailValid;
  }, [validateEmail, validateModel, validatePrice]);

  const clearErrors = useCallback(() => {
    setEmailError('');
    setPriceError('');
    setModelError('');
  }, []);

  const clearEmailError = useCallback(() => setEmailError(''), []);
  const clearPriceError = useCallback(() => setPriceError(''), []);
  const clearModelError = useCallback(() => setModelError(''), []);

  return {
    errors: {
      email: emailError,
      price: priceError,
      model: modelError,
    },
    validateEmail,
    validatePrice,
    validateModel,
    validateForm,
    clearErrors,
    clearEmailError,
    clearPriceError,
    clearModelError,
  };
};


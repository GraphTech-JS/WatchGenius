'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './BestPrice.module.css';
import { LocalizedLink } from '@/components/LocalizedLink';
import { CustomSelect } from '@/components/CustomSelect/CustomSelect';
import { mockBest } from '@/mock/watch';
import { ProductBest } from '@/components/ProductsTable/ProductBest/ProductBest';
import { t } from '@/i18n';
import { bestPriceKeys } from '@/i18n/keys/home';
import { useFormValidation } from '@/hooks/useFormValidation';
import { SuccessModal } from '@/components/SuccessModal/SuccessModal';

export const BestPrice = () => {
  const brands = [
    'Rolex Submariner',
    'Omega Speedmaster',
    'Patek Philippe',
    'Seiko 5',
    'Seiko 5',
    'Seiko 5',
  ];

  const currencies = ['USD', 'EUR', 'UAH', 'PLN', 'KZT'];

  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [consent, setConsent] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);

  const {
    errors,
    validateForm,
    validateEmail,
    validateConsent,
    clearErrors,
    clearEmailError,
    clearPriceError,
    clearModelError,
    clearConsentError,
  } = useFormValidation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      validateEmail(value);
    } else {
      clearEmailError();
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const formatNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatNumber(value);
    setPrice(formatted);
    if (errors.price) {
      clearPriceError();
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    if (errors.model) {
      clearModelError();
    }
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConsentValid = validateConsent(consent);
    const isValid = validateForm({
      email,
      price,
      selectedModel,
    });

    if (!isValid || !isConsentValid) {
      return;
    }

    console.log({
      model: selectedModel,
      email,
      price,
      currency: selectedCurrency,
    });

    setShowSuccessModal(true);

    setEmail('');
    setPrice('');
    setSelectedModel('');
    setSelectedCurrency('USD');
    setConsent(false);
    clearErrors();
  };

  return (
    <section
      id='bestPrice'
      className={`${styles.best} max-w-[90rem] mx-auto px-[1.25rem] md:pl-[50px] md:pr-[32px] lg:px-[6rem] pb-12 md:pb-15`}
    >
      <div className={`${styles.bestContainer} w-full`}>
        <div
          className={`${styles.bestTitle} flex justify-between items-end mb-6 w-full md:w-[54%] md:max-w-[38.75rem]`}
        >
          <div className={`${styles.bestSectionTitle}`}>
            {' '}
            <span className={`${styles.bestTitleHighlighted} mb-6`}>
              Best
            </span>{' '}
            price today
          </div>
          <div className={`${styles.bestDate} hidden md:flex`}>08.08.2025</div>
        </div>
        <div
          className={`${styles.bestModules} flex flex-col md:flex-row-reverse gap-6`}
        >
          <div
            className={`${styles.bestAlert} flex flex-col items-center gap-4`}
          >
            <div className={`${styles.bestAlertTitle} `}>Set price alert</div>
            <form
              onSubmit={handleSubmit}
              className={`${styles.bestAlertForm} flex flex-col gap-6 w-full`}
            >
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  {t(bestPriceKeys.form.selectModel)}
                </div>
                <div className='flex flex-col gap-1.5 w-full'>
                  <CustomSelect
                    options={brands}
                    placeholder='Rolex Submariner Oyster Perpetual'
                    onChange={handleModelChange}
                  />
                  {errors.model && (
                    <div className={`${styles.ErrorMessage}`}>
                      {errors.model}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  {t(bestPriceKeys.form.matchPrice)}
                </div>
                <div className='flex flex-col gap-1.5 w-full'>
                  <div
                    className={`${styles.FormItemInput} ${
                      errors.price ? styles.FormItemInputError : ''
                    } flex items-center justify-center w-full rounded-xl px-4 py-3.5`}
                  >
                    <input
                      id='cost'
                      type='text'
                      placeholder='50 000'
                      value={price}
                      onChange={handlePriceChange}
                      className={`${styles.Input} w-full`}
                    />
                    <div
                      ref={currencyRef}
                      className={`${styles.CurrencySelect} flex relative`}
                    >
                      <div
                        className={`${styles.CurrencyButton} flex items-center cursor-pointer`}
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                      >
                        <span className={`${styles.FormItemInputCurr}`}>
                          {selectedCurrency}
                        </span>
                      </div>
                      {isCurrencyOpen && (
                        <div className={`${styles.CurrencyDropdown}`}>
                          {currencies.map((currency) => (
                            <div
                              key={currency}
                              className={`${styles.CurrencyOption} ${
                                selectedCurrency === currency
                                  ? styles.CurrencyOptionActive
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
                    <div className={`${styles.ErrorMessage}`}>
                      {errors.price}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${styles.bestAlertFormItem} flex flex-col gap-3.5 `}
              >
                <div className={`${styles.FormItemTitle}`}>
                  {t(bestPriceKeys.form.email)}
                </div>
                <div className='flex flex-col gap-1.5 w-full'>
                  <div
                    className={`${styles.FormItemInput} ${
                      errors.email ? styles.FormItemInputError : ''
                    } flex items-center justify-center w-full rounded-xl px-4 py-3.5 `}
                  >
                    <input
                      id='userMail'
                      type='email'
                      placeholder='xxxxxxxx@gmail.com'
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      className={`${styles.Input} w-full`}
                    />
                  </div>
                  {errors.email && (
                    <div className={`${styles.ErrorMessage}`}>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <button
                  type='submit'
                  className={`${styles.FormBtn} flex items-center justify-center py-3.5 rounded-xl cursor-pointer `}
                >
                  <div>{t(bestPriceKeys.form.button)}</div>
                </button>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-start gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked && errors.consent) {
                          clearConsentError();
                        }
                      }}
                      className={`${styles.Checkbox} mt-0.5 cursor-pointer`}
                    />
                    <div className={`${styles.Text}`}>
                      <p>
                        {t(bestPriceKeys.form.note)}{' '}
                        <LocalizedLink
                          href='/terms'
                          className={`${styles.TextLink}`}
                        >
                          {t(bestPriceKeys.form.terms)}
                        </LocalizedLink>
                      </p>
                    </div>
                  </label>
                  {errors.consent && (
                    <div className={`${styles.ErrorMessage}`}>
                      {errors.consent}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div
            className={`${styles.bestWatches} flex flex-col justify-center w-full md:min-w-[54%]`}
          >
            <div className={`${styles.bestWatchesContainer}`}>
              <ProductBest items={mockBest} />
            </div>
            <LocalizedLink
              href='./'
              className={`${styles.bestWatchesLink} cursor-pointer`}
            >
              {t(bestPriceKeys.link)}
            </LocalizedLink>
          </div>
        </div>
      </div>

      <SuccessModal
        isVisible={showSuccessModal}
        message='Дякуємо за ваш запит! Ми повідомимо вас про зниження ціни!'
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
};

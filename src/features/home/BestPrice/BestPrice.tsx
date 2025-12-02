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
import {
  getWatchModels,
  createPriceAlert,
  getCheapestWatches,
} from '@/lib/api';
import { ClockLoader } from 'react-spinners';
import {
  ApiBrandModel,
  ApiCurrency,
  ApiWatchFullResponse,
} from '@/interfaces/api';
import { IWatch } from '@/interfaces';
import { generateSlug } from '@/lib/transformers';

export const BestPrice = () => {
  const WATCH_MODELS_CACHE_KEY = 'watch-models-cache';
  const CACHE_TTL = 5 * 60 * 1000;

  function getCachedModels(): string[] | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(WATCH_MODELS_CACHE_KEY);

      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);

      const now = Date.now();

      if (now - timestamp > CACHE_TTL) {
        localStorage.removeItem(WATCH_MODELS_CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  function setCachedModels(models: string[]): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheData = {
        data: models,
        timestamp: Date.now(),
      };

      localStorage.setItem(WATCH_MODELS_CACHE_KEY, JSON.stringify(cacheData));
    } catch {
      // Ignore
    }
  }

  const CHEAPEST_CACHE_PREFIX = 'cheapest-watches-cache-';

  function getCachedCheapestWatches(currency: string): IWatch[] | null {
    if (typeof window === 'undefined') return null;

    try {
      const cacheKey = `${CHEAPEST_CACHE_PREFIX}${currency}`;
      const cached = localStorage.getItem(cacheKey);

      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > CACHE_TTL) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  function setCachedCheapestWatches(currency: string, watches: IWatch[]): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheKey = `${CHEAPEST_CACHE_PREFIX}${currency}`;
      const cacheData = {
        data: watches,
        timestamp: Date.now(),
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch {
      // Ignore
    }
  }

  function getCurrencyFromStorage(): string {
    if (typeof window === 'undefined') return 'EUR';
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const validCurrencies = ['EUR', 'USD', 'PLN', 'UAH', 'KZT'];
    return savedCurrency && validCurrencies.includes(savedCurrency)
      ? savedCurrency
      : 'EUR';
  }

  const currencies = ['USD', 'EUR', 'UAH', 'PLN', 'KZT'];

  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [consent, setConsent] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [models, setModels] = useState<string[]>([]);
  const [cheapestWatches, setCheapestWatches] = useState<IWatch[]>([]);
  const [loadingCheapest, setLoadingCheapest] = useState(false);

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

  useEffect(() => {
    async function loadModels() {
      const cached = getCachedModels();

      if (cached) {
        setModels(cached);
        return;
      }

      try {
        const data: ApiBrandModel[] = await getWatchModels();

        const transformed = data.map((item) => `${item.brand} ${item.model}`);

        setCachedModels(transformed);
        setModels(transformed);
      } catch (error) {
        console.error('❌ [BestPrice] Failed to load models:', error);
        setModels([]);
      }
    }
    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadCheapestWatches() {
      const currency = getCurrencyFromStorage();

      const cached = getCachedCheapestWatches(currency);

      if (cached) {
        setCheapestWatches(cached);
        return;
      }

      setLoadingCheapest(true);

      try {
        const data: ApiWatchFullResponse[] = await getCheapestWatches(
          currency,
          3
        );

        const transformed = data.map((item, index) =>
          transformCheapestWatchToIWatch(item, index)
        );

        setCachedCheapestWatches(currency, transformed);
        setCheapestWatches(transformed);
      } catch (error) {
        console.error('❌ [BestPrice] Failed to load cheapest watches:', error);
        setCheapestWatches([]);
      } finally {
        setLoadingCheapest(false);
      }
    }
    loadCheapestWatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const parts = selectedModel.split(' ');
    if (parts.length < 2) {
      return;
    }

    const brand = parts[0];

    const model = parts.slice(1).join(' ');

    const priceWithoutSpaces = price.replace(/\s/g, '');
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
        email,
      };

      await createPriceAlert(alertData);

      setShowSuccessModal(true);

      setEmail('');
      setPrice('');
      setSelectedModel('');
      setSelectedCurrency('USD');
      setConsent(false);
      clearErrors();
    } catch (error) {
      console.error('❌ [BestPrice] Failed to create alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function getCurrencySymbol(currencyCode: string): string {
    const upperCurrency = currencyCode.toUpperCase();
    if (upperCurrency === 'EUR') return '€';
    if (upperCurrency === 'USD') return '$';
    if (upperCurrency === 'UAH') return '₴';
    if (upperCurrency === 'PLN') return 'zł';
    if (upperCurrency === 'KZT') return '₸';
    return '€';
  }

  function transformCheapestWatchToIWatch(
    apiWatch: ApiWatchFullResponse,
    index: number
  ): IWatch & { currency?: string } {
    const lastPriceHistory =
      apiWatch.priceHistory?.[apiWatch.priceHistory.length - 1];
    const price = lastPriceHistory?.price || apiWatch.price || 0;
    const currencyCode =
      lastPriceHistory?.currency || apiWatch.currency || 'EUR';
    const currencySymbol = getCurrencySymbol(currencyCode);

    const image = apiWatch.imageUrls?.[0] || '';

    const brand = `${apiWatch.brand.name} ${apiWatch.model}`.trim();

    const slug = generateSlug(apiWatch.name);

    const id = parseInt(apiWatch.id.replace(/\D/g, '')) || index + 1;
    return {
      id,
      slug,
      image,
      brand,
      price: Math.round(price),
      rating: 10,
      changePercent: 0,
      currency: currencySymbol,
      description: apiWatch.description,
    } as IWatch & { currency?: string };
  }

  return (
    <section
      id='bestPrice'
      className={`${styles.best} max-w-[90rem] mx-auto px-[1.25rem] md:pl-[50px] md:pr-[32px] lg:px-[6rem] pb-12 md:pb-15`}
      suppressHydrationWarning
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
                    options={models}
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
                  className={`${
                    styles.FormBtn
                  } flex items-center justify-center py-3.5 rounded-xl cursor-pointer ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <div>
                    {isSubmitting
                      ? 'Відправка...'
                      : t(bestPriceKeys.form.button)}
                  </div>
                </button>
                <div className='flex flex-col gap-2'>
                  <label className='flex gap-2 items-start cursor-pointer'>
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
              {loadingCheapest ? (
                <div className='flex justify-center items-center py-8'>
                  <ClockLoader
                    size={60}
                    color={'#04694f'}
                    speedMultiplier={0.9}
                  />
                </div>
              ) : (
                <ProductBest
                  items={
                    cheapestWatches.length > 0 ? cheapestWatches : mockBest
                  }
                />
              )}
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

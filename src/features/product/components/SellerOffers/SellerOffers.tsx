'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { SellerOffersProps } from '@/interfaces/product';
import {
  SafetyIcon,
  StarFillIcon,
  BxMapIcon,
  QuillLinkOutIcon,
} from '@/product-icons';
import styles from './SellerOffers.module.css';
import { t } from '@/i18n';
import { productKeys } from '@/i18n/keys/product';
import { RequestOfferModal } from '@/components/RequestOfferModal/RequestOfferModal';

const SellerOffers: React.FC<SellerOffersProps> = ({
  offers,
  onSortChange,
  onRegionChange,
  onConditionChange,
  onPurchase,
  watchTitle,
  onRequestOfferSuccess,
}) => {
  const [sortBy, setSortBy] = useState('price');
  const [region, setRegion] = useState('all');
  const [condition, setCondition] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filteredOffers, setFilteredOffers] = useState(offers);
  const [isRequestOfferModalOpen, setIsRequestOfferModalOpen] = useState(false);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    onRegionChange(value);
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
    onConditionChange(value);
  };

  const filterAndSortOffers = useCallback(() => {
    let filtered = [...offers];

    if (region !== 'all') {
      filtered = filtered.filter((offer) => {
        const offerRegion = offer.location.toLowerCase();
        switch (region) {
          case 'europe':
            return (
              offerRegion.includes('європа') ||
              offerRegion.includes('europe') ||
              offerRegion.includes('німеччина') ||
              offerRegion.includes('франція') ||
              offerRegion.includes('італія') ||
              offerRegion.includes('швейцарія') ||
              offerRegion.includes('мюнхен') ||
              offerRegion.includes('париж') ||
              offerRegion.includes('цюрих')
            );
          case 'usa':
            return (
              offerRegion.includes('сша') ||
              offerRegion === 'us' ||
              offerRegion.includes('usa') ||
              offerRegion.includes('united states') ||
              offerRegion.includes('америка') ||
              offerRegion.includes('атланта') ||
              offerRegion.includes('нью-йорк')
            );
          case 'asia':
            return (
              offerRegion.includes('азія') ||
              offerRegion.includes('asia') ||
              offerRegion.includes('японія') ||
              offerRegion.includes('сингапур') ||
              offerRegion.includes('токіо')
            );
          default:
            return true;
        }
      });
    }

    if (condition !== 'all') {
      filtered = filtered.filter((offer) => {
        const offerCondition = offer.details.toLowerCase();
        switch (condition) {
          case 'new':
            return (
              offerCondition.includes('новий') ||
              offerCondition.includes('new') ||
              offerCondition.includes('гарантією') ||
              offerCondition.includes('сертифікатом') ||
              offerCondition.includes('документами')
            );
          case 'used':
            return (
              offerCondition.includes('відмінний') ||
              offerCondition.includes('excellent')
            );
          case 'refurbished':
            return (
              offerCondition.includes('б/у') ||
              offerCondition.includes('used') ||
              offerCondition.includes('відновлений')
            );
          default:
            return true;
        }
      });
    }

    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));

      switch (sortBy) {
        case 'price':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewsCount - a.reviewsCount;
        default:
          return 0;
      }
    });

    setFilteredOffers(filtered);
  }, [offers, sortBy, region, condition]);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.filterDropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    filterAndSortOffers();
  }, [filterAndSortOffers]);

  const CustomDropdown: React.FC<{
    name: string;
    value: string;
    options: { value: string; label: string; displayLabel?: string }[];
    onChange: (value: string) => void;
  }> = ({ name, value, options, onChange }) => {
    const isOpen = openDropdown === name;
    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div className={`filterDropdown ${styles.filterDropdown}`}>
        <button
          type='button'
          className={`${styles.filterDropdownButton} ${
            isOpen ? styles.open : ''
          }`}
          onClick={() => toggleDropdown(name)}
        >
          <span>
            {selectedOption?.displayLabel || selectedOption?.label || value}
          </span>
          <ChevronDown
            size={26}
            className={`absolute right-[20px] top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-180 text-black' : 'text-[#8b8b8b]'
            }`}
          />
        </button>

        <div
          className={`${styles.filterDropdownList} ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type='button'
              className={styles.filterDropdownOption}
              onClick={() => {
                onChange(option.value);
                closeDropdown();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='overflow-hidden max-w-full bg-white rounded-lg'>
      <div className='mb-6'>
        <h3
          className={`${styles.titleFont} mb-2 font-semibold text-gray-900 text-[20px] xl:text-[36px]`}
        >
          {t(productKeys.offers.title, {
            count: filteredOffers.filter((offer) => offer.isSecure).length,
          })}
        </h3>
      </div>

      <div className='flex flex-col sm:flex-row items-center sm:items-center mb-6 gap-[5px] xl:gap-[35px] w-full max-w-full flex-wrap'>
        <div className='flex flex-row justify-between sm:flex-row items-center sm:items-center gap-2 xl:gap-[26px] w-full sm:w-auto min-w-0'>
          <label
            className={`${styles.labelFont} text-base font-medium text-gray-500 text-[16px] sm:text-[15px] xl:text-[20px]`}
          >
            {t(productKeys.offers.sort)}:
          </label>
          <CustomDropdown
            name='sort'
            value={sortBy}
            onChange={handleSortChange}
            options={[
              {
                value: 'price',
                label: t(productKeys.offers.sortOptions.priceAsc),
                displayLabel: t(productKeys.offers.sortOptions.priceBy),
              },
              {
                value: 'price-desc',
                label: t(productKeys.offers.sortOptions.priceDesc),
                displayLabel: t(productKeys.offers.sortOptions.priceBy),
              },
              {
                value: 'rating',
                label: t(productKeys.offers.sortOptions.rating),
              },
              {
                value: 'reviews',
                label: t(productKeys.offers.sortOptions.reviews),
              },
            ]}
          />
        </div>

        <div className='flex flex-row justify-between sm:flex-row items-center sm:items-center gap-2 xl:gap-[26px] w-full sm:w-auto min-w-0'>
          <label
            className={`${styles.labelFont} text-base font-medium text-gray-500 text-[16px] xl:text-[20px]`}
          >
            {t(productKeys.offers.region)}:
          </label>
          <CustomDropdown
            name='region'
            value={region}
            onChange={handleRegionChange}
            options={[
              { value: 'all', label: t(productKeys.offers.regionOptions.all) },
              {
                value: 'europe',
                label: t(productKeys.offers.regionOptions.europe),
              },
              { value: 'usa', label: t(productKeys.offers.regionOptions.usa) },
              {
                value: 'asia',
                label: t(productKeys.offers.regionOptions.asia),
              },
            ]}
          />
        </div>

        <div className='flex flex-row justify-between sm:flex-row items-center sm:items-center gap-2 xl:gap-[26px] w-full sm:w-auto min-w-0'>
          <label
            className={`${styles.labelFont} text-base font-medium text-gray-500 xl:text-[20px]`}
          >
            {t(productKeys.offers.condition)}:
          </label>
          <CustomDropdown
            name='condition'
            value={condition}
            onChange={handleConditionChange}
            options={[
              {
                value: 'all',
                label: t(productKeys.offers.conditionOptions.all),
              },
              {
                value: 'new',
                label: t(productKeys.offers.conditionOptions.new),
              },
              {
                value: 'used',
                label: t(productKeys.offers.conditionOptions.used),
              },
              {
                value: 'refurbished',
                label: t(productKeys.offers.conditionOptions.refurbished),
              },
            ]}
          />
        </div>
      </div>

      <div className={styles.safetyBlock}>
        <Image
          src={SafetyIcon}
          alt='Safety'
          width={33}
          height={33}
          className='mr-3'
        />
        <p
          className={`${styles.textFont} text-sm font-normal text-gray-600 sm:text-[15px] lg:text-[16px]`}
        >
          {t(productKeys.offers.secureWarning)}
        </p>
      </div>

      {filteredOffers.length > 0 ? (
        <div className='grid grid-cols-1 gap-[18px] xl:gap-[21px] md:grid-cols-2'>
          {filteredOffers.map((offer) => (
            <div key={offer.id} className={styles.sellerCard}>
              <div className={styles.sellerCardContent}>
                <div className={styles.sellerCardHeader}>
                  <h4
                    className={`${styles.textFont} text-[20px] font-semibold text-black`}
                  >
                    {offer.sellerName}
                  </h4>
                  {offer.isSecure && (
                    <div
                      style={{
                        borderRadius: '15px',
                        width: '36px',
                        height: '34px',
                        backgroundColor: '#dceae6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={SafetyIcon}
                        alt='Safety'
                        width={18}
                        height={18}
                      />
                    </div>
                  )}
                  <div
                    className={styles.sellerCardPriceDesktop}
                    style={{
                      color: offer.isSecure ? '#4cba9e' : '#f25454',
                    }}
                  >
                    {offer.price} {offer.currency}
                  </div>
                </div>

                <div className='flex items-center'>
                  <Image
                    src={StarFillIcon}
                    alt='Star'
                    width={26}
                    height={26}
                    className={`lg:w-[26px] lg:h-[26px] w-[22px] h-[22px] ${styles.starIcon}`}
                  />
                  <span
                    className={`${styles.textFont} text-[15px] font-normal text-gray-600 mr-4`}
                  >
                    {offer.rating}/5 ({offer.reviewsCount} відгуків)
                  </span>
                  <Image
                    src={BxMapIcon}
                    alt='Location'
                    width={24}
                    height={24}
                    style={{ marginRight: '8px' }}
                  />
                  <span
                    className={`${styles.textFont} text-[15px] font-normal text-gray-600`}
                  >
                    {offer.location}
                  </span>
                </div>

                <div
                  className={`${styles.textFont} mb-2 text-[15px] font-normal text-gray-600`}
                >
                  {offer.details}
                </div>

                <div
                  className={`${styles.textFont} mb-4 text-[15px] font-normal text-gray-600`}
                >
                  {offer.shipping}
                </div>

                <div className={styles.sellerCardFooter}>
                  <div
                    className={styles.sellerCardPriceMobile}
                    style={{
                      color: offer.isSecure ? '#4cba9e' : '#f25454',
                    }}
                  >
                    {offer.price} {offer.currency}
                  </div>
                  <button
                    onClick={() => onPurchase(offer.id)}
                    className={styles.sellerCardButton}
                  >
                    <Image
                      src={QuillLinkOutIcon}
                      alt='Link'
                      width={16}
                      height={16}
                    />
                    {t(productKeys.offers.purchase)}
                  </button>
                  <button
                    onClick={() => onPurchase(offer.id)}
                    className={styles.sellerCardButtonDesktop}
                  >
                    <Image
                      src={QuillLinkOutIcon}
                      alt='Link'
                      width={16}
                      height={16}
                    />
                    {t(productKeys.offers.purchase)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyOffersContainer}>
          <p className={styles.emptyOffersText}>
            {t(productKeys.offers.noOffers)}
          </p>
          <button
            className={styles.requestOfferButton}
            onClick={() => setIsRequestOfferModalOpen(true)}
          >
            <Image
              src={QuillLinkOutIcon}
              alt='Request'
              width={16}
              height={16}
            />
            {t(productKeys.offers.requestOffer)}
          </button>
        </div>
      )}

      <RequestOfferModal
        isOpen={isRequestOfferModalOpen}
        onClose={() => setIsRequestOfferModalOpen(false)}
        watchTitle={watchTitle || ''}
        onSuccess={() => {
          setIsRequestOfferModalOpen(false);
          if (onRequestOfferSuccess) {
            onRequestOfferSuccess();
          }
        }}
      />
    </div>
  );
};

export default SellerOffers;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { SellerOffersProps } from '@/interfaces/product';
import {
  SafetyIcon,
  StarFillIcon,
  BxMapIcon,
  QuillLinkOutIcon,
} from '@/product-icons';
import styles from './SellerOffers.module.css';

const SellerOffers: React.FC<SellerOffersProps> = ({
  offers,
  onSortChange,
  onRegionChange,
  onConditionChange,
  onPurchase,
}) => {
  const [sortBy, setSortBy] = useState('price');
  const [region, setRegion] = useState('all');
  const [condition, setCondition] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
          <FaChevronDown
            className={`${styles.filterDropdownArrow} ${
              isOpen ? styles.open : ''
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
    <div className='p-6 bg-white rounded-lg'>
      <div className='mb-6'>
        <h3
          className='mb-2 font-semibold text-gray-900'
          style={{
            fontFamily: 'Roboto Flex, sans-serif',
            fontSize: '36px',
            fontWeight: 600,
            color: '#171414',
          }}
        >
          Пропозиції продавців ({offers.length}шт.)
        </h3>
      </div>

      <div className='flex items-center mb-6' style={{ gap: '35px' }}>
        <div className='flex items-center' style={{ gap: '26px' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            Сортувати:
          </label>
          <CustomDropdown
            name='sort'
            value={sortBy}
            onChange={handleSortChange}
            options={[
              {
                value: 'price',
                label: 'Ціна: по зростанню',
                displayLabel: 'Ціна: по...',
              },
              { value: 'price-desc', label: 'Ціна: по спаданню' },
              { value: 'rating', label: 'Рейтинг' },
              { value: 'reviews', label: 'Кількість відгуків' },
            ]}
          />
        </div>

        <div className='flex items-center' style={{ gap: '26px' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            Регіон:
          </label>
          <CustomDropdown
            name='region'
            value={region}
            onChange={handleRegionChange}
            options={[
              { value: 'all', label: 'Всі' },
              { value: 'europe', label: 'Європа' },
              { value: 'usa', label: 'США' },
              { value: 'asia', label: 'Азія' },
            ]}
          />
        </div>

        <div className='flex items-center' style={{ gap: '26px' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            Стан:
          </label>
          <CustomDropdown
            name='condition'
            value={condition}
            onChange={handleConditionChange}
            options={[
              { value: 'all', label: 'Всі' },
              { value: 'new', label: 'Новий' },
              { value: 'used', label: 'Вживаний' },
              { value: 'refurbished', label: 'Відновлений' },
            ]}
          />
        </div>
      </div>

      <div
        className='flex items-center mb-6'
        style={{
          borderRadius: '15px',
          padding: '16px 25px',
          width: '1240px',
          height: '67px',
          background: '#eeeff1',
        }}
      >
        <Image
          src={SafetyIcon}
          alt='Safety'
          width={33}
          height={33}
          className='mr-3'
        />
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          Використовуйте безпечну угоду. Не переводьте гроші напряму невідомому
          продавцю без гарантії
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              padding: '15px 13px',
              width: '609px',
              height: '180px',
              position: 'relative',
            }}
          >
            <div className='flex justify-between items-start'>
              <div className='flex items-center'>
                <h4
                  className='mr-2'
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#000',
                  }}
                >
                  {offer.sellerName}
                </h4>
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
                  <Image src={SafetyIcon} alt='Safety' width={18} height={18} />
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '32px',
                  fontWeight: 600,
                  color:
                    offer.id === '1'
                      ? '#4cba9e'
                      : offer.id === '2'
                      ? '#f25454'
                      : '#000',
                }}
              >
                {offer.price} {offer.currency}
              </div>
            </div>

            <div className='flex items-center mb-2'>
              <Image
                src={StarFillIcon}
                alt='Star'
                width={26}
                height={26}
                style={{ marginRight: '8px' }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginRight: '16px',
                }}
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
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
              >
                {offer.location}
              </span>
            </div>

            <div
              className='mb-2'
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {offer.details}
            </div>

            <div
              className='mb-4'
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {offer.shipping}
            </div>

            <div className='absolute right-4 bottom-4'>
              <button
                onClick={() => onPurchase(offer.id)}
                style={{
                  borderRadius: '10px',
                  padding: '11px',
                  width: '214px',
                  height: '40px',
                  backgroundColor: '#04694f',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={QuillLinkOutIcon}
                  alt='Link'
                  width={16}
                  height={16}
                  style={{ marginRight: '8px' }}
                />
                Перейти до покупки
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOffers;

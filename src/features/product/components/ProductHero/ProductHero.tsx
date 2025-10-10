'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductHeroProps } from '@/interfaces/product';
import LinkIcon from '../../../../../public/product-icons/link.svg';
import ScalesIcon from '../../../../../public/product-icons/scales.svg';
import BellIcon from '../../../../../public/product-icons/bell.svg';
import CopyIcon from '../../../../../public/product-icons/modals/copy.svg';
import ShareIcon from '../../../../../public/product-icons/modals/share.svg';
import HeartIcon from '/public/icons/Heart.svg';
import styles from './ProductHero.module.css';
import { ComparisonModal } from '../../index';

const ProductHero: React.FC<ProductHeroProps> = ({
  product,
  onSave,
  onPriceNotification,
  onBuy,
  onGetQuote,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCompare = () => {
    setShowComparisonModal(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/product/${product.slug}`
      );
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShareAction = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WatchGenius - Product',
          text: 'Check out this watch!',
          url: `${window.location.origin}/product/${product.slug}`,
        });
        setShowShareModal(false);
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopy();
    }
  };

  const formatPrice = () => {
    const { min, max, currency } = product.price;
    if (min === max) {
      return `${currency} ${min.toLocaleString()}`;
    }
    return `${currency} ${min.toLocaleString()}-${max.toLocaleString()}`;
  };

  return (
    <div className='flex gap-[60px] mb-[20px]'>
      <div className='flex flex-col gap-4 w-[577px]'>
        <div className='relative bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] w-[577px] h-[345px] overflow-hidden flex items-center justify-center'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-contain p-4'
            priority
          />
          <div
            className='absolute top-4 right-4 rounded-[5px] bg-[#b4e1c7] flex items-center justify-center w-[45px] h-[45px] shadow-sm'
            style={{ padding: '6px 9px 7px 8px' }}
          >
            <span
              className='font-bold text-[20px] text-[#067b06]'
              style={{ fontFamily: 'Inter' }}
            >
              A
            </span>
          </div>
        </div>
        <div
          className='flex gap-[36px] overflow-hidden relative cursor-grab active:cursor-grabbing'
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const container = e.currentTarget;
            const startScrollLeft = container.scrollLeft;

            const handleTouchMove = (moveEvent: TouchEvent) => {
              const currentX = moveEvent.touches[0].clientX;
              const diffX = startX - currentX;
              container.scrollLeft = startScrollLeft + diffX;
            };

            const handleTouchEnd = () => {
              document.removeEventListener('touchmove', handleTouchMove);
              document.removeEventListener('touchend', handleTouchEnd);
            };

            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
          }}
          onMouseDown={(e) => {
            const startX = e.clientX;
            const container = e.currentTarget;
            const startScrollLeft = container.scrollLeft;
            let isDragging = true;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              if (!isDragging) return;
              const currentX = moveEvent.clientX;
              const diffX = startX - currentX;
              container.scrollLeft = startScrollLeft + diffX;
            };

            const handleMouseUp = () => {
              isDragging = false;
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          {product.thumbnails.map((thumbnail, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-[117px] h-[102px] bg-[#f7f7f7] rounded-[5px] overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                selectedImage === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <Image
                src={thumbnail}
                alt={`${product.title} ${index + 1}`}
                fill
                className='object-contain p-2'
              />
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-[20px] w-[605px]'>
        <div className='flex flex-col  border-b border-[rgba(0,0,0,0.3)] pb-4'>
          <div className='font-roboto text-[24px] font-extrabold uppercase text-[#04694f] '>
            {product.brand}
          </div>
          <div className='font-inter text-[36px] font-semibold text-[#171414] '>
            {product.model}
          </div>
          <div className='font-inter text-[16px] font-medium text-[rgba(23,20,20,0.5)]'>
            (Ref.: {product.reference})
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className='font-inter text-[40px] font-medium text-black'>
            {formatPrice()}
          </div>
          <div className='flex items-center space-x-1'>
            <span className='font-inter text-[20px] font-semibold text-center text-[#05873b]'>
              ↑ {Math.abs(product.priceTrend.value)}%
            </span>
            <span className='font-inter text-[15px] font-normal text-[#05873b]'>
              за {product.priceTrend.period}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-[17px]'>
          <button onClick={onSave} className={styles.actionButton}>
            <Image
              src={HeartIcon}
              alt='Зберегти'
              width={24}
              height={24}
              className={styles.actionButtonIcon}
            />
            <span className={styles.actionButtonText}>Зберегти</span>
          </button>

          <button onClick={handleCompare} className={styles.actionButton}>
            <Image
              src={ScalesIcon}
              alt='Порівняти'
              width={24}
              height={24}
              className={styles.actionButtonIcon}
            />
            <span className={styles.actionButtonText}>Порівняти</span>
          </button>

          {showShareModal ? (
            <div className={styles.shareInputContainer}>
              <input
                type='text'
                value=''
                readOnly
                className={styles.shareInput}
                placeholder='Link'
              />
              <div className={styles.shareIconsContainer}>
                <button onClick={handleCopy} className={styles.shareIconButton}>
                  <Image
                    src={CopyIcon}
                    alt='Copy'
                    width={20}
                    height={20}
                    className={styles.shareIcon}
                  />
                </button>
                <button
                  onClick={handleShareAction}
                  className={styles.shareIconButton}
                >
                  <Image
                    src={ShareIcon}
                    alt='Share'
                    width={20}
                    height={20}
                    className={styles.shareIcon}
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={onPriceNotification}
                className={styles.actionButton}
              >
                <Image
                  src={BellIcon}
                  alt='Сповіщення про ціну'
                  width={24}
                  height={24}
                  className={styles.actionButtonIcon}
                />
                <span className={styles.actionButtonText}>
                  Сповіщення про ціну
                </span>
              </button>

              <button onClick={handleShare} className={styles.actionButton}>
                <Image
                  src={LinkIcon}
                  alt='Поширити'
                  width={24}
                  height={24}
                  className={styles.actionButtonIcon}
                />
                <span className={styles.actionButtonText}>Поширити</span>
              </button>
            </>
          )}
        </div>
        <div className='space-y-[20px]'>
          <button onClick={onBuy} className={styles.mainButton}>
            <span
              className='font-inter text-[16px] font-bold'
              style={{
                background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Купити в Chrono24
            </span>
          </button>

          <button onClick={onGetQuote} className={styles.secondaryButton}>
            <span className={styles.secondaryButtonText}>Get Quote</span>
          </button>
        </div>
      </div>

      <ComparisonModal
        isVisible={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />
    </div>
  );
};

export default ProductHero;

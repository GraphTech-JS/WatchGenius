'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductHeroProps } from '@/interfaces/product';
import { useCompareContext } from '@/context/CompareContext';
import { t } from '@/i18n';
import { a11yKeys } from '@/i18n/keys/accessibility';
import {
  LinkIcon,
  ScalesIcon,
  BellIcon,
  CopyIcon,
  ShareIcon,
} from '@/product-icons';
import HeartIcon from '/public/icons/Heart.svg';
import styles from './ProductHero.module.css';
import { ComparisonModal } from '../../index';
import { PriceAlertModal, GetQuoteModal } from '../ProductModals';
import { FeedbackModal } from '@/components/FeedbackModal/FeedbackModal';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useLocale } from '@/hooks/useLocale';

const mainButtonTextStyle = {
  background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const ProductHero: React.FC<ProductHeroProps> = ({
  product,
  onSave,
  onPriceNotification,
  onBuy,
  onGetQuote,
  layout = 'horizontal',
}) => {
  const locale = useLocale();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPriceAlertModal, setShowPriceAlertModal] = useState(false);
  const [showGetQuoteModal, setShowGetQuoteModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const screenWidth = useScreenWidth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompareContext();
  const isInComparison = isInCompare(product.id);

  const getIndexBadgeClasses = (index: string) => {
    switch (index) {
      case 'A':
        return { box: styles.indexBadgeBoxA, text: styles.indexBadgeTextA };
      case 'B':
        return { box: styles.indexBadgeBoxB, text: styles.indexBadgeTextB };
      case 'C':
        return { box: styles.indexBadgeBoxC, text: styles.indexBadgeTextC };
      default:
        return { box: styles.indexBadgeBoxA, text: styles.indexBadgeTextA };
    }
  };

  const thumbnailsToRender =
    screenWidth && screenWidth < 1150
      ? product.thumbnails.slice(0, 3)
      : product.thumbnails.slice(0, 4);

  const handleShare = () => setShowShareModal(true);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave();
  };

  const handlePriceNotification = () => {
    setShowPriceAlertModal(true);
    onPriceNotification();
  };

  const handleGetQuote = () => {
    setShowGetQuoteModal(true);
    onGetQuote();
  };

  const handleBuy = () => {
    setShowBuyModal(true);
    onBuy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${locale}/product/${product.slug}`
      );
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShareAction = async () => {
    const url = `${window.location.origin}/${locale}/product/${product.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WatchGenius - Product',
          text: 'Check out this watch!',
          url,
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

  const productIndex =
    product.index ?? product.similarModels?.[0]?.index ?? 'A';

  return (
    <div
      className={`flex ${
        layout === 'vertical'
          ? 'flex-col'
          : 'flex-col md:flex-row lg:flex-row xl:flex-row'
      } gap-[20px] md:gap-[60px] lg:gap-[60px] xl:gap-[60px] mb-[20px]`}
    >
      <div
        className={`flex flex-col gap-4 w-full ${
          layout === 'vertical'
            ? 'sm:w-full lg:w-full xl:w-full'
            : 'sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[577px]'
        }`}
      >
        <div className='relative bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] w-[350px] max-[479px]:w-full min-[480px]:w-full md:w-full lg:w-full xl:w-[577px] h-[250px] max-[479px]:h-[250px] min-[480px]:h-[300px] md:h-[345px] overflow-hidden flex items-center justify-center'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-contain p-4'
            priority
          />
          <div className='absolute top-4 right-4 z-10'>
            <div className='relative group'>
              <div className={styles.indexBadgeContainer}>
                <div className={styles.indexBadgeWrap}>
                  <div
                    className={`${styles.indexBadgeBox} ${
                      getIndexBadgeClasses(productIndex).box
                    }`}
                  >
                    <span
                      className={`${styles.indexBadgeText} ${
                        getIndexBadgeClasses(productIndex).text
                      }`}
                    >
                      {productIndex}
                    </span>
                  </div>
                  <div className={styles.indexTooltip}>
                    {productIndex === 'A' && 'Топ-сегмент'}
                    {productIndex === 'B' && 'Середній сегмент'}
                    {productIndex === 'C' && 'Базовий сегмент'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='flex gap-[21px] max-[479px]:gap-[21px] min-[480px]:justify-center min-[480px]:gap-[24px] md:gap-[21px] lg:gap-[36px] xl:gap-[36px] overflow-hidden relative cursor-grab active:cursor-grabbing'
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
          {thumbnailsToRender.map((thumbnail, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              aria-label={t(a11yKeys.product.selectImage, {
                number: index + 1,
              })}
              className={`relative w-[102px] h-[88px] max-[479px]:w-[102px] max-[479px]:h-[88px] min-[480px]:w-[188px] min-[480px]:h-[104px] md:w-[123px] md:h-[88px] lg:w-[122px] lg:h-[102px] xl:w-[117px] xl:h-[102px] bg-[#f7f7f7] rounded-[5px] overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                selectedImage === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-300 hover:border-sm'
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

      <div
        className={`flex flex-col gap-[20px] w-full ${
          layout === 'vertical'
            ? 'md:w-full lg:w-full xl:w-full'
            : 'md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[605px]'
        }`}
      >
        <div className='flex flex-col border-b border-[rgba(0,0,0,0.3)] pb-4'>
          <div className='font-roboto text-[20px] md:text-[24px] lg:text-[24px] xl:text-[24px] font-extrabold uppercase text-[#04694f]'>
            {product.brand}
          </div>
          <div className='font-inter text-[32px] md:text-[36px] lg:text-[36px] xl:text-[36px] font-semibold text-[#171414]'>
            {product.model}
          </div>
          <div className='font-inter text-[14px] md:text-[15px] lg:text-[16px]    xl:text-[16px] font-medium text-[rgba(23,20,20,0.5)]'>
            (Ref. {product.reference})
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center text-center sm:flex-row sm:justify-between sm:items-center sm:text-left'>
          <div className='font-inter text-[24px]  lg:text-[24px] xl:text-[40px] font-medium text-black'>
            {formatPrice()}
          </div>
          <div className='flex items-center space-x-1'>
            <span
              className='font-inter text-[20px] font-semibold text-center text-[#05873b]'
              style={{
                fontWeight: 600,
                fontSize: '20px',
                textAlign: 'center',
                color: '#05873b',
              }}
            >
              ↑ {Math.abs(product.priceTrend.value)}%
            </span>
            <span
              className='font-inter text-[15px] font-normal text-[#05873b]'
              style={{ fontWeight: 400, fontSize: '15px', color: '#05873b' }}
            >
              за 30 днів
            </span>
          </div>
        </div>
        <div className='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-2 gap-[17px]'>
          <div className='md:col-span-2 md:order-1 xl:col-span-1 xl:order-1'>
            <button
              onClick={handleSave}
              className={`${styles.actionButton} ${
                isSaved ? styles.saved : ''
              } group`}
              aria-label={
                isSaved ? t(a11yKeys.product.saved) : t(a11yKeys.product.save)
              }
              aria-pressed={isSaved}
            >
              <Image
                src={HeartIcon}
                alt=''
                width={24}
                height={24}
                className={`${styles.actionButtonIcon} ${
                  isSaved ? styles.savedIcon : ''
                }`}
                aria-hidden='true'
              />
              <span
                className={`${styles.actionButtonText} ${
                  isSaved ? styles.savedText : ''
                }`}
              >
                {isSaved ? 'Збережено' : 'Зберегти'}
              </span>
            </button>
          </div>

          <div className='md:col-span-2 md:order-2 xl:col-span-1 xl:order-3'>
            <button
              onClick={handlePriceNotification}
              className={`${styles.actionButton} group`}
              aria-label={t(a11yKeys.product.priceAlert)}
            >
              <Image
                src={BellIcon}
                alt=''
                width={24}
                height={24}
                className={styles.actionButtonIcon}
                aria-hidden='true'
              />
              <span className={styles.actionButtonText}>
                Сповіщення про ціну
              </span>
            </button>
          </div>

          {showShareModal ? (
            <div
              className={`${styles.shareInputContainer} md:col-span-2 md:order-3 xl:col-span-2 xl:order-4`}
            >
              <input
                type='text'
                value={
                  typeof window !== 'undefined'
                    ? `${window.location.origin}/${locale}/product/${product.slug}`
                    : ''
                }
                readOnly
                className={styles.shareInput}
                placeholder='Link'
              />
              <div className={styles.shareIconsContainer}>
                <button
                  onClick={handleCopy}
                  className={styles.shareIconButton}
                  aria-label={t(a11yKeys.product.copy)}
                >
                  <Image
                    src={CopyIcon}
                    alt=''
                    width={20}
                    height={20}
                    className={styles.shareIcon}
                    aria-hidden='true'
                  />
                </button>
                <button
                  onClick={handleShareAction}
                  className={styles.shareIconButton}
                  aria-label={t(a11yKeys.product.shareExternal)}
                >
                  <Image
                    src={ShareIcon}
                    alt=''
                    width={20}
                    height={20}
                    className={styles.shareIcon}
                    aria-hidden='true'
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='md:col-span-1 md:order-3 xl:col-span-1 xl:order-2'>
                <button
                  onClick={() => {
                    if (isInComparison) {
                      removeFromCompare(product.id);
                    } else {
                      addToCompare(product.id);
                      setShowComparisonModal(true);
                    }
                  }}
                  className={`${styles.actionButtonNarrow} ${
                    isInComparison ? styles.addedToCompare : ''
                  } group`}
                  aria-label={
                    isInComparison
                      ? t(a11yKeys.product.removeCompare)
                      : t(a11yKeys.product.compare)
                  }
                  aria-pressed={isInComparison}
                >
                  <Image
                    src={ScalesIcon}
                    alt=''
                    width={24}
                    height={24}
                    className={`${styles.actionButtonIcon} ${
                      isInComparison ? styles.addedToCompareIcon : ''
                    }`}
                    aria-hidden='true'
                  />
                  <span
                    className={`${styles.actionButtonText} ${
                      isInComparison ? styles.addedToCompareText : ''
                    }`}
                  >
                    {isInComparison ? 'Прибрати з порівняння' : 'Порівняти'}
                  </span>
                </button>
              </div>

              <div className='md:col-span-1 md:order-4 xl:col-span-1 xl:order-4'>
                <button
                  onClick={handleShare}
                  className={`${styles.actionButtonNarrow} group`}
                  aria-label={t(a11yKeys.product.share)}
                >
                  <Image
                    src={LinkIcon}
                    alt=''
                    width={24}
                    height={24}
                    className={styles.actionButtonIcon}
                    aria-hidden='true'
                  />
                  <span className={styles.actionButtonText}>Поширити</span>
                </button>
              </div>
            </>
          )}
        </div>
        <div className='flex flex-col gap-[17px] xl:gap-[13px]'>
          <button
            onClick={handleBuy}
            className={styles.mainButton}
            aria-label={t(a11yKeys.product.buy)}
          >
            <span
              className='font-inter text-[16px] font-bold'
              style={mainButtonTextStyle}
            >
              Купити в Chrono24
            </span>
          </button>

          <button
            onClick={handleGetQuote}
            className={styles.secondaryButton}
            aria-label={t(a11yKeys.product.getQuote)}
          >
            <span className={styles.secondaryButtonText}>Get Quote</span>
          </button>
        </div>
      </div>

      <ComparisonModal
        isVisible={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        isAdded={isInComparison}
      />

      <PriceAlertModal
        isOpen={showPriceAlertModal}
        onClose={() => setShowPriceAlertModal(false)}
        productTitle={`${product.brand} ${product.model}`}
      />

      <GetQuoteModal
        isOpen={showGetQuoteModal}
        onClose={() => setShowGetQuoteModal(false)}
        productTitle={`${product.brand} ${product.model}`}
      />

      <FeedbackModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        watchTitle={`${product.brand} ${product.model}`}
      />
    </div>
  );
};

export default ProductHero;

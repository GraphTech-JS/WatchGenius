'use client';

import React, { useState } from 'react';
import { Product } from '@/interfaces/product';
import {
  ProductHero,
  ProductAnalytics,
  SimilarModels,
  SellerOffers,
} from './index';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from '@/app/[locale]/product/[slug]/page.module.css';
import { t } from '@/i18n';
import { productKeys } from '@/i18n/keys/product';
import { useWishlistContext } from '@/context/WishlistContext';
import { useCompareContext } from '@/context/CompareContext';
import { Toast } from '@/components/Toast/Toast';
import type { ApiPriceHistory } from '@/interfaces/api';

interface ProductPageProps {
  product: Product;
  loadingSimilar?: boolean;
  priceHistory?: ApiPriceHistory[];
  currentPrice?: number;
  currency?: string;
  apiWatchCurrency?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  loadingSimilar = false,
  priceHistory,
  currentPrice,
  currency,
  apiWatchCurrency,
}) => {
  const [activeTab, setActiveTab] = useState<
    'parameters' | 'brand' | 'price' | 'trend'
  >('trend');

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    showToast,
    toastMessage,
    setShowToast,
  } = useWishlistContext();

  const { addToCompare, removeFromCompare, isInCompare } = useCompareContext();

  const breadcrumbItems = [
    { label: t(productKeys.breadcrumbs.catalog), href: '/catalog' },
    { label: product.brand, href: `/catalog?brand=${product.brand}` },
    { label: 'Submariner', href: `/catalog?model=Submariner` },
    { label: t(productKeys.breadcrumbs.model) },
  ];

  const handleSave = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleCompare = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  const handlePriceNotification = () => {};

  const handleShare = () => {};

  const handleBuy = () => {
    if (product.chronoUrl) {
      window.open(product.chronoUrl, '_blank');
    }
  };

  const handleGetQuote = () => {};

  const handleTabChange = (tab: 'parameters' | 'brand' | 'price' | 'trend') => {
    setActiveTab(tab);
  };

  const handleSortChange = () => {};

  const handleRegionChange = () => {};

  const handleConditionChange = () => {};

  const handlePurchase = (offerId: string) => {
    const offer = product.sellerOffers.find((o) => o.id === offerId);
    if (offer?.buyUrl) {
      window.open(offer.buyUrl, '_blank');
    }
  };

  return (
    <main className='bg-white pt-[27px] pb-[60px] xl:pb-[90px] min-h-screen mx-auto mt-[80px]'>
      <div className={styles.productPage}>
        <Toast
          isVisible={showToast}
          message={toastMessage}
          onClose={() => setShowToast(false)}
          duration={3000}
        />

        <div className='hidden sm:block'>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <h1 className='sr-only'>{product.title} - Деталі продукту</h1>

        <ProductHero
          product={product}
          onSave={handleSave}
          onCompare={handleCompare}
          onPriceNotification={handlePriceNotification}
          onShare={handleShare}
          onBuy={handleBuy}
          onGetQuote={handleGetQuote}
          isSaved={isInWishlist(product.id)}
        />

        <div className='flex flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row gap-[20px] sm:gap-[25px] md:gap-[60px] lg:gap-[60px] xl:gap-[60px] mb-8'>
          <div className='w-full sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-auto'>
            <SimilarModels
              models={product.similarModels}
              loading={loadingSimilar}
              onCompare={handleCompare}
            />
          </div>

          <div className='h-[750px] sm:h-auto  md:h-[640px] lg:h-auto w-full sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[603px]'>
            <ProductAnalytics
              analytics={product.analytics}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              details={product.details}
              brand={product.brand}
              priceHistory={priceHistory}
              currentPrice={currentPrice}
              currency={currency}
              apiWatchCurrency={apiWatchCurrency}
            />
          </div>
        </div>
        <SellerOffers
          offers={product.sellerOffers}
          onSortChange={handleSortChange}
          onRegionChange={handleRegionChange}
          onConditionChange={handleConditionChange}
          onPurchase={handlePurchase}
          watchTitle={product.title}
        />
      </div>
    </main>
  );
};

export default ProductPage;

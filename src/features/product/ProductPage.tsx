'use client';

import React, { useState } from 'react';
import { Product } from '@/interfaces/product';
import {
  ProductBreadcrumbs,
  ProductHero,
  ProductAnalytics,
  SimilarModels,
  SellerOffers,
} from './index';
import styles from '@/app/product/[slug]/page.module.css';

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<
    'parameters' | 'brand' | 'price' | 'trend'
  >('trend');

  const breadcrumbItems = [
    { label: 'Каталог', href: '/catalog' },
    { label: product.brand, href: `/catalog?brand=${product.brand}` },
    { label: 'Submariner', href: `/catalog?model=Submariner` },
    { label: 'Модель' },
  ];
  const handleSave = () => {
    console.log('Зберегти продукт');
  };

  const handleCompare = () => {
    console.log('Порівняти продукт');
  };

  const handlePriceNotification = () => {
    console.log('Сповіщення про ціну');
  };

  const handleShare = () => {
    console.log('Поділитися продуктом');
  };

  const handleBuy = () => {
    console.log('Купити продукт');
  };

  const handleGetQuote = () => {
    console.log('Отримати пропозицію');
  };

  const handleTabChange = (tab: 'parameters' | 'brand' | 'price' | 'trend') => {
    setActiveTab(tab);
  };

  const handleSortChange = (sort: string) => {
    console.log('Зміна сортування:', sort);
  };

  const handleRegionChange = (region: string) => {
    console.log('Зміна регіону:', region);
  };

  const handleConditionChange = (condition: string) => {
    console.log('Зміна стану:', condition);
  };

  const handlePurchase = (offerId: string) => {
    console.log('Покупка пропозиції:', offerId);
  };

  return (
    <div className='bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px]'>
      <div className={styles.productPage}>
        <ProductBreadcrumbs items={breadcrumbItems} />

        <ProductHero
          product={product}
          onSave={handleSave}
          onCompare={handleCompare}
          onPriceNotification={handlePriceNotification}
          onShare={handleShare}
          onBuy={handleBuy}
          onGetQuote={handleGetQuote}
        />

        <div className='flex gap-[60px] mb-8'>
          <div>
            <SimilarModels
              models={product.similarModels}
              onCompare={handleCompare}
            />
          </div>

          <div>
            <ProductAnalytics
              analytics={product.analytics}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
        <SellerOffers
          offers={product.sellerOffers}
          onSortChange={handleSortChange}
          onRegionChange={handleRegionChange}
          onConditionChange={handleConditionChange}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
};

export default ProductPage;

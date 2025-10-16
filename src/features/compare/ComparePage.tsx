'use client';

import React, { useState } from 'react';
import { CompareProduct } from '@/interfaces/compare';
import ProductHero from '../product/components/ProductHero/ProductHero';
import ProductAnalytics from '../product/components/ProductAnalytics/ProductAnalytics';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './ComparePage.module.css';

interface ComparePageProps {
  products: CompareProduct[];
  onBackToCatalog: () => void;
}

const ComparePage: React.FC<ComparePageProps> = ({
  products,
  onBackToCatalog,
}) => {
  const [activeTab1, setActiveTab1] = useState<
    'parameters' | 'brand' | 'price' | 'trend'
  >('price');

  const [activeTab2, setActiveTab2] = useState<
    'parameters' | 'brand' | 'price' | 'trend'
  >('price');

  const breadcrumbItems =
    products.length > 0
      ? [
          { label: 'Каталог', href: '/catalog' },
          {
            label: products[0].brand,
            href: `/catalog?brand=${products[0].brand}`,
          },
          {
            label: products[0].model.split(' ')[0],
            href: `/catalog?model=${products[0].model.split(' ')[0]}`,
          },
          { label: 'Модель', href: `/product/${products[0].slug}` },
          { label: 'Порівняння' },
        ]
      : [{ label: 'Каталог', href: '/catalog' }, { label: 'Порівняння' }];

  const handleSave = (productId: string) => {
    console.log('Зберегти продукт:', productId);
  };

  const handlePriceNotification = (productId: string) => {
    console.log('Сповіщення про ціну:', productId);
  };

  const handleBuy = (productId: string) => {
    console.log('Купити продукт:', productId);
  };

  return (
    <div
      className={`${styles.container} bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16`}
    >
      <div className={styles.content}>
        <Breadcrumbs items={breadcrumbItems} width={564} />

        <div
          className={`${styles.productsGrid} flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row md:gap-[60px]`}
        >
          {products[0] && (
            <div
              className={`${styles.productColumn} w-full md:w-[calc(50%-30px)]`}
            >
              <ProductHero
                product={products[0]}
                layout='vertical'
                onSave={() => handleSave(products[0].id)}
                onCompare={() => {}}
                onPriceNotification={() =>
                  handlePriceNotification(products[0].id)
                }
                onShare={() => {}}
                onBuy={() => handleBuy(products[0].id)}
                onGetQuote={() => handleBuy(products[0].id)}
              />
              <div className={styles.analyticsWrapper}>
                <ProductAnalytics
                  analytics={products[0].analytics}
                  activeTab={activeTab1}
                  onTabChange={setActiveTab1}
                />
              </div>
            </div>
          )}

          {products[1] && (
            <div
              className={`${styles.productColumn} w-full md:w-[calc(50%-30px)]`}
            >
              <ProductHero
                product={products[1]}
                layout='vertical'
                onSave={() => handleSave(products[1].id)}
                onCompare={() => {}}
                onPriceNotification={() =>
                  handlePriceNotification(products[1].id)
                }
                onShare={() => {}}
                onBuy={() => handleBuy(products[1].id)}
                onGetQuote={() => handleBuy(products[1].id)}
              />
              <div className={styles.analyticsWrapper}>
                <ProductAnalytics
                  analytics={products[1].analytics}
                  activeTab={activeTab2}
                  onTabChange={setActiveTab2}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.backButtonContainer}>
          <button onClick={onBackToCatalog} className={styles.backButton}>
            Повернутись в каталог
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;

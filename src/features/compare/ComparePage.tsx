"use client";

import React, { useState } from "react";
import { CompareProduct } from "@/interfaces/compare";
import ProductHero from "../product/components/ProductHero/ProductHero";
import ProductAnalytics from "../product/components/ProductAnalytics/ProductAnalytics";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./ComparePage.module.css";
import { t } from "@/i18n";
import { compareKeys } from "@/i18n/keys/compare";

interface ComparePageProps {
  products: CompareProduct[];
  onBackToCatalog: () => void;
}

const ComparePage: React.FC<ComparePageProps> = ({
  products,
  onBackToCatalog,
}) => {
  const [activeTab1, setActiveTab1] = useState<
    "parameters" | "brand" | "price" | "trend"
  >("price");

  const [activeTab2, setActiveTab2] = useState<
    "parameters" | "brand" | "price" | "trend"
  >("price");

  const breadcrumbItems =
    products.length > 0
      ? [
          { label: t(compareKeys.breadcrumbs.catalog), href: "/catalog" },
          {
            label: products[0].brand,
            href: `/catalog?brand=${products[0].brand}`,
          },
          {
            label: products[0].model.split(" ")[0],
            href: `/catalog?model=${products[0].model.split(" ")[0]}`,
          },
          {
            label: t(compareKeys.breadcrumbs.model),
            href: `/product/${products[0].slug}`,
          },
          { label: t(compareKeys.breadcrumbs.compare) },
        ]
      : [
          { label: t(compareKeys.breadcrumbs.catalog), href: "/catalog" },
          { label: t(compareKeys.breadcrumbs.compare) },
        ];

  const handleSave = (productId: string) => {
    console.log("Зберегти продукт:", productId);
  };

  const handlePriceNotification = (productId: string) => {
    console.log("Сповіщення про ціну:", productId);
  };

  const handleBuy = (productId: string) => {
    console.log("Купити продукт:", productId);
  };

  // Якщо немає продуктів для порівняння
  if (products.length === 0) {
    return (
      <div
        className={`${styles.container} bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16`}
      >
        <div className={styles.content}>
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                {t(compareKeys.empty.title)}
              </h2>
              <p className="mb-8 text-gray-600">
                {t(compareKeys.empty.subtitle)}
              </p>
            </div>

            <button
              onClick={onBackToCatalog}
              className="bg-[#04694f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#035a3f] transition-colors"
            >
              {t(compareKeys.empty.button)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16`}
    >
      <div className={styles.content}>
        <Breadcrumbs items={breadcrumbItems} />

        <div
          className={`${styles.productsGrid} flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row md:gap-[60px]`}
        >
          {products[0] && (
            <div
              className={`${styles.productColumn} w-full md:w-[calc(50%-30px)]`}
            >
              <ProductHero
                product={products[0]}
                layout="vertical"
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
                  details={products[0].details}
                  brand={products[0].brand}
                  isCompare={true}
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
                layout="vertical"
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
                  details={products[1].details}
                  brand={products[1].brand}
                  isCompare={true}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.backButtonContainer}>
          <button onClick={onBackToCatalog} className={styles.backButton}>
            {t(compareKeys.backButton)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;

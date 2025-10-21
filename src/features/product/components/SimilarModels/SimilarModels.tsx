'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SimilarModelsProps } from '@/interfaces/product';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ScalesIcon } from '@/product-icons';
import styles from './SimilarModels.module.css';
import { useCompareContext } from '@/context/CompareContext';

const SimilarModels: React.FC<SimilarModelsProps> = ({ models }) => {
  const router = useRouter();
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const { addToCompare } = useCompareContext();
  const handleCompareModels = () => {
    selectedModels.forEach((modelId) => addToCompare(modelId));
    router.push('/compare');
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(modelId)) {
        newSet.delete(modelId);
      } else {
        newSet.add(modelId);
      }
      return newSet;
    });
  };

  const handleCardClick = (modelSlug: string) => {
    router.push(`/product/${modelSlug}`);
  };

  const getIndexBadgeClass = (index: string) => {
    switch (index) {
      case 'A':
        return styles.indexBadgeA;
      case 'B':
        return styles.indexBadgeB;
      case 'C':
        return styles.indexBadgeC;
      default:
        return styles.indexBadgeA;
    }
  };

  const parseTrend = (trend: string) => {
    const isPositive = trend.includes('+') || trend.includes('↑');
    const value = trend.replace(/[↑↓+%]/g, '');
    const period = '90d';
    return { isPositive, value, period };
  };

  return (
    <div className={styles.section}>
      <div>
        <h3
          className={`${styles.sectionTitle} font-semibold text-[24px]md:text-[20px] lg:text-[24px] xl:text-[24px] text-gray-900`}
        >
          Схожі моделі
        </h3>
        <p
          className={`${styles.sectionSubtitle} font-normal text-base text-gray-500 mb-[19px]`}
        >
          Моделі обираються по ціновому сегменту, бренду та популярності
        </p>
      </div>

      <div className={styles.similarGrid}>
        {models.map((model) => {
          const trend = parseTrend(model.priceTrend);
          return (
            <div
              key={model.id}
              className={styles.similarCard}
              onClick={() => handleCardClick(model.slug)}
            >
              <div className={styles.indexBadgeWrap}>
                <div
                  className={`${styles.indexBadge} ${getIndexBadgeClass(
                    model.index
                  )}`}
                >
                  {model.index}
                </div>
                <div className={styles.indexTooltip}>
                  {model.index === 'A' && 'Топ-сегмент'}
                  {model.index === 'B' && 'Середній сегмент'}
                  {model.index === 'C' && 'Базовий сегмент'}
                </div>
              </div>
              <div
                className={`${styles.comparisonIcon} ${
                  selectedModels.has(model.id)
                    ? styles.comparisonIconSelected
                    : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModelSelect(model.id);
                }}
              >
                <Image
                  src={ScalesIcon}
                  alt='Порівняти'
                  width={20}
                  height={20}
                  unoptimized
                />
              </div>

              <div className={styles.similarImage}>
                <Image
                  src={model.image}
                  alt={model.title}
                  fill
                  className={styles.similarImage}
                />
              </div>

              <h4 className={`${styles.similarTitle}`}>{model.title}</h4>

              <div className={styles.similarPriceAndTrend}>
                <div className={styles.similarPrice}>{model.price}</div>

                <div className={styles.similarTrendContainer}>
                  <span
                    className={`${styles.similarTrendBadge} ${
                      !trend.isPositive ? styles.similarTrendBadgeNegative : ''
                    }`}
                  >
                    <span
                      className={`${
                        trend.isPositive
                          ? styles.similarTrendValue
                          : styles.similarTrendValueNegative
                      }`}
                    >
                      {trend.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                      {trend.value}%
                      <span className={styles.similarTrendPeriod}>
                        {trend.period}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleCompareModels} className={styles.compareButton}>
        Порівняти моделі
      </button>
    </div>
  );
};

export default SimilarModels;

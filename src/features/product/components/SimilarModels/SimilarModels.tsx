'use client';

import React from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { SimilarModelsProps } from '@/interfaces/product';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ScalesIcon } from '../../../../../public/product-icons';
import styles from './SimilarModels.module.css';

const SimilarModels: React.FC<SimilarModelsProps> = ({ models }) => {
  // const router = useRouter();

  // const handleCompareModels = () => {
  //   const modelIds = models.map((model) => model.id).join(',');
  //   router.push(`/compare?models=${modelIds}`);
  // };

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
        <h3 className={styles.sectionTitle}>Схожі моделі</h3>
        <p className={styles.sectionSubtitle}>
          Моделі обираються по ціновому сегменту, бренду та популярності
        </p>
      </div>

      <div className='grid grid-cols-3 gap-[12px] mb-6'>
        {models.map((model) => {
          const trend = parseTrend(model.priceTrend);
          return (
            <div key={model.id} className={styles.watchCard}>
              <div
                className={`${styles.indexBadge} ${getIndexBadgeClass(
                  model.index
                )}`}
              >
                {model.index}
              </div>

              <div className={styles.comparisonIcon}>
                <Image
                  src={ScalesIcon}
                  alt='Порівняти'
                  width={20}
                  height={20}
                  unoptimized
                />
              </div>

              <div className={styles.watchImage}>
                <Image
                  src={model.image}
                  alt={model.title}
                  fill
                  className={styles.watchImage}
                />
              </div>

              <h4 className={styles.watchTitle}>{model.title}</h4>

              <div className={styles.priceAndTrend}>
                <div className={styles.price}>{model.price}</div>

                <div className={styles.trendContainer}>
                  <span
                    className={`${styles.trendBadge} ${
                      trend.isPositive
                        ? styles.trendValue
                        : styles.trendValueNegative
                    }`}
                  >
                    {trend.isPositive ? (
                      <FaArrowUp className='text-[12px]' />
                    ) : (
                      <FaArrowDown className='text-[12px]' />
                    )}
                    {trend.value}%
                    <span className={styles.trendPeriod}>{trend.period}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className={styles.compareButton}>Порівняти моделі</button>
    </div>
  );
};

export default SimilarModels;

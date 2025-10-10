'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductAnalyticsProps } from '@/interfaces/product';
import styles from './ProductAnalytics.module.css';

import {
  MechanismIcon,
  MaterialIcon,
  StanIcon,
  WaterIcon,
  YearIcon,
  DiameterIcon,
  StrapIcon,
  ChronographIcon,
  FluentArrowGrowthIcon,
  StarIcon,
  ZipIcon,
  AdsIcon,
  DinamicIcon,
  TrendWaterIcon,
  DugaIcon,
  PolygonIcon,
  EllipseIcon,
} from '../../../../../public/product-icons';

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({
  analytics,
  activeTab,
  onTabChange,
}) => {
  const [activeChartPeriod, setActiveChartPeriod] = useState<'3M' | '1P'>('3M');
  const [isVolatilityHovered, setIsVolatilityHovered] = useState(false);
  const [isDemandHovered, setIsDemandHovered] = useState(false);

  const tabs = [
    { id: 'parameters', label: 'Параметри' },
    { id: 'brand', label: 'Про бренд' },
    { id: 'price', label: 'Аналітика ціни' },
    { id: 'trend', label: 'Аналітика тренду' },
  ] as const;

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentContainer}>
        {activeTab === 'trend' && (
          <div>
            <h3 className={styles.trendTitle}>Rolex</h3>
            <p className={styles.trendContent}>
              Цей екран відображає аналітику тренду, щоб ви могли швидко оцінити
              поточну ситуацію. Ви бачите загальний стан бренду, його попит
              серед споживачів, ліквідність та динаміку росту бренду.
            </p>

            <div className={styles.trendMetrics}>
              {isDemandHovered ? (
                <div
                  className={styles.trendTooltip}
                  onMouseEnter={() => setIsDemandHovered(true)}
                  onMouseLeave={() => setIsDemandHovered(false)}
                >
                  Показник різниці ціни за обраний період.
                </div>
              ) : (
                <div
                  className={styles.trendCard}
                  onMouseEnter={() => setIsDemandHovered(true)}
                  onMouseLeave={() => setIsDemandHovered(false)}
                >
                  <div className={styles.trendIcon}>
                    <Image src={ZipIcon} alt='Попит' width={32} height={28} />
                  </div>
                  <div className={styles.trendContent}>
                    <div className={styles.trendLabel}>Попит</div>
                    <div className={styles.trendValue}>{analytics.demand}%</div>
                  </div>
                </div>
              )}

              <div className={styles.trendCard}>
                <div className={styles.trendIcon}>
                  <Image
                    src={TrendWaterIcon}
                    alt='Ліквідність'
                    width={36}
                    height={36}
                  />
                </div>
                <div className={styles.trendContent}>
                  <div className={styles.trendLabel}>Ліквідність</div>
                  <div className={styles.trendValue}>
                    {analytics.liquidity}%
                  </div>
                </div>
              </div>

              <div className={styles.trendCard}>
                <div className={styles.trendIcon}>
                  <Image
                    src={DinamicIcon}
                    alt='Динаміка'
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.trendContent}>
                  <div className={styles.trendLabel}>Динаміка</div>
                  <div className={styles.trendValue}>
                    +{analytics.dynamics}%
                  </div>
                </div>
              </div>

              <div className={styles.trendCard}>
                <div className={styles.trendIcon}>
                  <Image src={AdsIcon} alt='ADS' width={30} height={30} />
                </div>
                <div className={styles.trendContent}>
                  <div className={styles.trendLabel}>ADS</div>
                  <div className={styles.trendValue}>{analytics.ads}</div>
                </div>
              </div>
            </div>

            <div className={styles.trendGauge}>
              <div className={styles.gaugeContainer}>
                <div className={styles.gaugeArc}>
                  <Image
                    src={DugaIcon}
                    alt='Gauge Arc'
                    width={600}
                    height={400}
                    className={styles.gaugeArcImage}
                  />
                </div>
                <div className={styles.gaugeNeedle}>
                  <Image
                    src={PolygonIcon}
                    alt='Gauge Needle'
                    width={70}
                    height={135}
                    className={styles.gaugeNeedleImage}
                  />
                </div>
                <div className={styles.gaugeCenter}>
                  <Image
                    src={EllipseIcon}
                    alt='Gauge Center'
                    width={35}
                    height={35}
                    className={styles.gaugeCenterImage}
                  />
                </div>
                <div className={styles.gaugeValue}>65%</div>
                <div className={styles.gaugeLabels}>
                  <span className={styles.gaugeLabelLow}>Low</span>
                  <span className={styles.gaugeLabelHigh}>Hight</span>
                </div>
                <div className={styles.lastUpdated}>
                  Актуально на {analytics.lastUpdated}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div>
            <div className={styles.parametersContainer}>
              <div className={styles.parametersGrid}>
                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={MechanismIcon}
                      alt='Механізм'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Механізм:</div>
                    <div className={styles.parameterValue}>Автоматичний</div>
                  </div>
                </div>
                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image src={YearIcon} alt='Рік' width={25} height={25} />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Рік:</div>
                    <div className={styles.parameterValue}>2021</div>
                  </div>
                </div>

                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={MaterialIcon}
                      alt='Матеріал'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Матеріал:</div>
                    <div className={styles.parameterValue}>Сталь</div>
                  </div>
                </div>

                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={DiameterIcon}
                      alt='Діаметр'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Діаметр:</div>
                    <div className={styles.parameterValue}>41мм</div>
                  </div>
                </div>

                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image src={StanIcon} alt='Стан' width={25} height={25} />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Стан:</div>
                    <div className={styles.parameterValue}>Новий</div>
                  </div>
                </div>

                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={StrapIcon}
                      alt='Ремінець'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Ремінець:</div>
                    <div className={styles.parameterValue}>Залізо</div>
                  </div>
                </div>

                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={WaterIcon}
                      alt='Водостійкість'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Водостійкість:</div>
                    <div className={styles.parameterValue}>Ні</div>
                  </div>
                </div>
                <div className={styles.parameterItem}>
                  <div className={styles.parameterIcon}>
                    <Image
                      src={ChronographIcon}
                      alt='Хронограф'
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className={styles.parameterContent}>
                    <div className={styles.parameterLabel}>Хронограф:</div>
                    <div className={styles.parameterValue}>Ні</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className={styles.brandContent}>
            <div className={styles.brandBackground}>
              <Image
                src='/watch/RolexBrand.png'
                alt='Rolex Brand Background'
                width={592}
                height={329}
                className={styles.brandBackgroundImage}
              />
            </div>
            <div className={styles.brandTextContent}>
              <h3 className={styles.brandTitle}>Rolex</h3>
              <p className={styles.brandText}>
                Rolex — це всесвітньо відомий швейцарський бренд розкішних
                годинників, що є символом престижу, точності та якості.
              </p>
              <p className={styles.brandText}>
                Компанія була заснована у 1905 році Гансом Вільсдорфом і з
                самого початку ставила за мету створення інноваційних та
                надійних наручних годинників.
              </p>
              <p className={styles.brandText}>
                Серед найважливіших досягнень бренду — винахід першого
                водонепроникного годинника Oyster у 1926 році та механізму з
                автоматичним підзаводом Perpetual у 1931 році. Ці інновації
                стали основою для всієї сучасної годинникової індустрії.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'price' && (
          <div>
            <div className={styles.priceChart}>
              <div className={styles.chartControls}>
                <button className={`${styles.chartButton} ${styles.active}`}>
                  3M
                </button>
                <button
                  className={`${styles.chartButton} ${
                    activeChartPeriod === '1P' ? styles.active : ''
                  }`}
                  onClick={() =>
                    setActiveChartPeriod(
                      activeChartPeriod === '1P' ? '3M' : '1P'
                    )
                  }
                >
                  1P
                </button>
              </div>
              <div className={styles.chartPlaceholder}>
                тут повинен бути графік
              </div>
            </div>

            <div className={styles.priceMetrics}>
              {!isVolatilityHovered ? (
                <div
                  className={styles.priceMetricCard}
                  onMouseEnter={() => setIsVolatilityHovered(true)}
                  onMouseLeave={() => setIsVolatilityHovered(false)}
                >
                  <div className={styles.priceMetricIcon}>
                    <Image
                      src={ZipIcon}
                      alt='Волатильність'
                      width={32}
                      height={28}
                    />
                  </div>
                  <div className={styles.priceMetricContent}>
                    <div className={styles.priceMetricLabel}>Волатильність</div>
                    <div className={styles.priceMetricValue}>Низька</div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.volatilityTooltip}
                  onMouseEnter={() => setIsVolatilityHovered(true)}
                  onMouseLeave={() => setIsVolatilityHovered(false)}
                >
                  Показник різниці ціни за обраний період.
                </div>
              )}
              <div className={styles.priceMetricCard}>
                <div className={styles.priceMetricIcon}>
                  <Image
                    src={FluentArrowGrowthIcon}
                    alt='Ліквідність'
                    width={35}
                    height={35}
                  />
                </div>
                <div className={styles.priceMetricContent}>
                  <div className={styles.priceMetricLabel}>Ліквідність</div>
                  <div className={styles.priceMetricValue}>Висока</div>
                </div>
              </div>
              <div className={styles.priceMetricCard}>
                <div className={styles.priceMetricIcon}>
                  <Image
                    src={StarIcon}
                    alt='Популярність'
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.priceMetricContent}>
                  <div className={styles.priceMetricLabel}>Популярність</div>
                  <div className={styles.priceMetricValue}>8.5/10</div>
                </div>
              </div>
            </div>

            <div className={styles.monthlyReport}>
              <div className={styles.reportTitle}>Звіт за місяць</div>
              <div className={styles.reportItems}>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>Пік:</span>
                  <span className={styles.reportItemValue}>€26,500</span>
                </div>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>Мінімум:</span>
                  <span className={styles.reportItemValue}>€25,500</span>
                </div>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>Зміни:</span>
                  <span
                    className={`${styles.reportItemValue} ${styles.reportItemValueGreen}`}
                  >
                    +0.4%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAnalytics;

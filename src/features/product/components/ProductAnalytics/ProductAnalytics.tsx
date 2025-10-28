"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductAnalyticsProps } from "@/interfaces/product";
import styles from "./ProductAnalytics.module.css";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { t } from "@/i18n";
import { productKeys } from "@/i18n/keys/product";

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
} from "@/product-icons";

import PriceChart from "./components/PriceChart";
import TrendGauge from "./components/TrendGauge";
import { BRAND_CONTENT } from "@/data/brands";

const iconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("механізм")) return MechanismIcon;
  if (l.includes("матеріал")) return MaterialIcon;
  if (l.includes("стан")) return StanIcon;
  if (l.includes("водостій")) return WaterIcon;
  if (l.includes("рік")) return YearIcon;
  if (l.includes("діаметр")) return DiameterIcon;
  if (l.includes("ремінець")) return StrapIcon;
  if (l.includes("хронограф")) return ChronographIcon;
  return MechanismIcon;
};

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({
  analytics,
  activeTab,
  onTabChange,
  details,
  brand,
  isCompare = false,
}) => {
  const [activeChartPeriod, setActiveChartPeriod] = useState<"3M" | "1P">("3M");
  const [isVolatilityHovered, setIsVolatilityHovered] = useState(false);
  const [isDemandHovered, setIsDemandHovered] = useState(false);
  const [isLiquidityHovered, setIsLiquidityHovered] = useState(false);
  const [isDynamicsHovered, setIsDynamicsHovered] = useState(false);
  const [isAdsHovered, setIsAdsHovered] = useState(false);
  const [isPriceLiquidityHovered, setIsPriceLiquidityHovered] = useState(false);
  const [isPopularityHovered, setIsPopularityHovered] = useState(false);
  const screenWidth = useScreenWidth();

  const isDesktop = (screenWidth ?? 1280) >= 1280;
  const gaugeW = isDesktop ? 372 : 310;
  const gaugeH = isDesktop ? 338 : 281;

  const tabs = [
    { id: "parameters", label: t(productKeys.analytics.tabs.parameters) },
    { id: "brand", label: t(productKeys.analytics.tabs.brand) },
    { id: "price", label: t(productKeys.analytics.tabs.price) },
    { id: "trend", label: t(productKeys.analytics.tabs.trend) },
  ] as const;

  const visibleTabs =
    screenWidth && screenWidth < 1279
      ? tabs.filter((t) => t.id !== "parameters")
      : tabs;

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.tabsContainer}>
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentContainer}>
        {activeTab === "trend" && (
          <div>
            <h3 className={styles.trendTitle}>{brand}</h3>
            <p
              className={`${styles.trendContent} text-[12px] font-normal text-black leading-relaxed `}
            >
              {t(productKeys.analytics.trend.description)}
            </p>

            <div className={styles.trendMetrics}>
              {isDemandHovered ? (
                <div
                  className={styles.trendTooltip}
                  onMouseEnter={() => setIsDemandHovered(true)}
                  onMouseLeave={() => setIsDemandHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.demand)}
                </div>
              ) : (
                <div
                  className={styles.trendCard}
                  onMouseEnter={() => setIsDemandHovered(true)}
                  onMouseLeave={() => setIsDemandHovered(false)}
                >
                  <div className={styles.trendIcon}>
                    <Image
                      src={ZipIcon}
                      alt={t(productKeys.analytics.trend.demand)}
                      width={32}
                      height={28}
                    />
                  </div>
                  <div className={`${styles.trendContent} flex flex-col`}>
                    <span className={styles.trendLabel}>
                      {t(productKeys.analytics.trend.demand)}
                    </span>
                    <span className={styles.trendValue}>
                      {analytics.demand}%
                    </span>
                  </div>
                </div>
              )}

              {isLiquidityHovered ? (
                <div
                  className={styles.trendTooltipLiquid}
                  onMouseEnter={() => setIsLiquidityHovered(true)}
                  onMouseLeave={() => setIsLiquidityHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.liquidity)}
                </div>
              ) : (
                <div
                  className={styles.trendCard}
                  onMouseEnter={() => setIsLiquidityHovered(true)}
                  onMouseLeave={() => setIsLiquidityHovered(false)}
                >
                  <div className={styles.trendIcon}>
                    <Image
                      src={TrendWaterIcon}
                      alt={t(productKeys.analytics.trend.liquidity)}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div className={`${styles.trendContent} flex flex-col`}>
                    <span className={styles.trendLabel}>
                      {t(productKeys.analytics.trend.liquidity)}
                    </span>
                    <span className={styles.trendValue}>
                      {analytics.liquidity}%
                    </span>
                  </div>
                </div>
              )}

              {isDynamicsHovered ? (
                <div
                  className={styles.trendTooltip}
                  onMouseEnter={() => setIsDynamicsHovered(true)}
                  onMouseLeave={() => setIsDynamicsHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.dynamics)}
                </div>
              ) : (
                <div
                  className={styles.trendCard}
                  onMouseEnter={() => setIsDynamicsHovered(true)}
                  onMouseLeave={() => setIsDynamicsHovered(false)}
                >
                  <div className={styles.trendIcon}>
                    <Image
                      src={DinamicIcon}
                      alt={t(productKeys.analytics.trend.dynamics)}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className={`${styles.trendContent} flex flex-col`}>
                    <span className={styles.trendLabel}>
                      {t(productKeys.analytics.trend.dynamics)}
                    </span>
                    <span className={styles.trendValue}>
                      +{analytics.dynamics}%
                    </span>
                  </div>
                </div>
              )}

              {isAdsHovered ? (
                <div
                  className={styles.trendTooltip}
                  onMouseEnter={() => setIsAdsHovered(true)}
                  onMouseLeave={() => setIsAdsHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.ads)}
                </div>
              ) : (
                <div
                  className={styles.trendCard}
                  onMouseEnter={() => setIsAdsHovered(true)}
                  onMouseLeave={() => setIsAdsHovered(false)}
                >
                  <div className={styles.trendIcon}>
                    <Image
                      src={AdsIcon}
                      alt={t(productKeys.analytics.trend.ads)}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className={`${styles.trendContent} flex flex-col`}>
                    <span className={styles.trendLabel}>
                      {t(productKeys.analytics.trend.ads)}
                    </span>
                    <span className={styles.trendValue}>{analytics.ads}</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.trendGauge}>
              <TrendGauge
                value={analytics.demand}
                lastUpdated={analytics.lastUpdated}
                arcSrc={DugaIcon}
                pointerSrc={PolygonIcon}
                centerSrc={EllipseIcon}
                width={gaugeW}
                height={gaugeH}
                config={{
                  pointerAnchorX: 0.28,
                  pointerAnchorY: 0.915,
                  pointerOffsetX: 1,
                  pointerOffsetY: -1,

                  pivotYR: 0.54,
                  labelsYR: 0.66,
                  labelsLeftXR: 0.0,
                  labelsRightXR: 1.0,
                  valueYR: 0.688,
                  lastUpdatedYR: 0.94,

                  fontFamily: "'Inter', sans-serif",
                  labelFontSizePx: 20,
                  labelFontWeight: 600,
                  labelColor: "#000",

                  valueFontSizePx: 24,
                  valueColor: "#04694f",

                  lastUpdatedFontSizePx: 12,
                  lastUpdatedColor: "rgba(0,0,0,0.6)",
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "parameters" && (
          <div>
            <div className={styles.parametersContainer}>
              <div className={styles.parametersGrid}>
                {details.map(({ label, value }) => (
                  <div key={label} className={styles.parameterItem}>
                    <div className={styles.parameterIcon}>
                      <Image
                        src={iconFor(label)}
                        alt={label}
                        width={25}
                        height={25}
                      />
                    </div>
                    <div className={styles.parameterContent}>
                      <div className={styles.parameterLabel}>{label}:</div>
                      <div className={styles.parameterValue}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "brand" &&
          (() => {
            const content = BRAND_CONTENT[brand] ?? BRAND_CONTENT.default;
            return (
              <div className={styles.brandContent}>
                <div
                  className={`${styles.brandBackground} ${
                    isCompare ? styles.brandBackgroundCompare : ""
                  }`}
                >
                  <Image
                    src={content.image}
                    alt={`${content.title} Brand Background`}
                    width={592}
                    height={329}
                    className={styles.brandBackgroundImage}
                  />
                </div>
                <div className={styles.brandTextContent}>
                  <h3 className={styles.brandTitle}>{content.title}</h3>
                  {content.paragraphs.map((p, idx) => (
                    <p key={idx} className={styles.brandText}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
          })()}

        {activeTab === "price" && (
          <div>
            <PriceChart
              period={activeChartPeriod}
              onPeriodChange={setActiveChartPeriod}
            />

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
                      alt={t(productKeys.analytics.price.volatility)}
                      width={32}
                      height={28}
                    />
                  </div>
                  <div className={styles.priceMetricContent}>
                    <div className={styles.priceMetricLabel}>
                      {t(productKeys.analytics.price.volatility)}
                    </div>
                    <div className={styles.priceMetricValue}>
                      {analytics.volatility}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.volatilityTooltip}
                  onMouseEnter={() => setIsVolatilityHovered(true)}
                  onMouseLeave={() => setIsVolatilityHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.demand)}
                </div>
              )}

              {!isPriceLiquidityHovered ? (
                <div
                  className={styles.priceMetricCard}
                  onMouseEnter={() => setIsPriceLiquidityHovered(true)}
                  onMouseLeave={() => setIsPriceLiquidityHovered(false)}
                >
                  <div className={styles.priceMetricIcon}>
                    <Image
                      src={FluentArrowGrowthIcon}
                      alt={t(productKeys.analytics.price.liquidity)}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className={styles.priceMetricContent}>
                    <div className={styles.priceMetricLabel}>
                      {t(productKeys.analytics.price.liquidity)}
                    </div>
                    <div className={styles.priceMetricValue}>
                      {analytics.liquidityLabel}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.volatilityTooltipLiquid}
                  onMouseEnter={() => setIsPriceLiquidityHovered(true)}
                  onMouseLeave={() => setIsPriceLiquidityHovered(false)}
                >
                  {t(productKeys.analytics.trend.tooltip.liquidity)}
                </div>
              )}

              {!isPopularityHovered ? (
                <div
                  className={`${styles.priceMetricCard} ${styles.priceMetricCardLong}`}
                  onMouseEnter={() => setIsPopularityHovered(true)}
                  onMouseLeave={() => setIsPopularityHovered(false)}
                >
                  <div className={styles.priceMetricIcon}>
                    <Image
                      src={StarIcon}
                      alt={t(productKeys.analytics.price.popularity)}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className={styles.priceMetricContent}>
                    <div className={styles.priceMetricLabel}>
                      {t(productKeys.analytics.price.popularity)}
                    </div>
                    <div className={styles.priceMetricValue}>
                      {analytics.popularity.toFixed(1)}/10
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.volatilityTooltip}
                  onMouseEnter={() => setIsPopularityHovered(true)}
                  onMouseLeave={() => setIsPopularityHovered(false)}
                >
                  {t(productKeys.analytics.price.tooltip.popularity)}
                </div>
              )}
            </div>

            <div className={styles.monthlyReport}>
              <div className={styles.reportTitle}>
                {t(productKeys.analytics.price.report.title)}
              </div>
              <div className={styles.reportItems}>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>
                    {t(productKeys.analytics.price.report.peak)}
                  </span>
                  <span className={styles.reportItemValue}>
                    €{analytics.reportPeak.toLocaleString("uk-UA")}
                  </span>
                </div>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>
                    {t(productKeys.analytics.price.report.min)}
                  </span>
                  <span className={styles.reportItemValue}>
                    €{analytics.reportMin.toLocaleString("uk-UA")}
                  </span>
                </div>
                <div className={styles.reportItem}>
                  <span className={styles.reportItemLabel}>
                    {t(productKeys.analytics.price.report.change)}
                  </span>
                  <span
                    className={`${styles.reportItemValue} ${
                      analytics.reportChangePct >= 0
                        ? styles.reportItemValueGreen
                        : styles.reportItemValueRed
                    }`}
                  >
                    {analytics.reportChangePct >= 0 ? "+" : ""}
                    {Math.abs(analytics.reportChangePct * 100).toFixed(1)}%
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

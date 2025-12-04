'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var ProductAnalytics_module_css_1 = require("./ProductAnalytics.module.css");
var useScreenWidth_1 = require("@/hooks/useScreenWidth");
var i18n_1 = require("@/i18n");
var product_1 = require("@/i18n/keys/product");
var product_icons_1 = require("@/product-icons");
var PriceChart_1 = require("./components/PriceChart");
var TrendGauge_1 = require("./components/TrendGauge");
var brands_1 = require("@/data/brands");
function convertCurrency(currency) {
    var upperCurrency = currency.toUpperCase();
    if (upperCurrency === 'EUR' || upperCurrency === '€')
        return '€';
    if (upperCurrency === 'USD' || upperCurrency === '$')
        return '$';
    if (upperCurrency === 'UAH' || upperCurrency === '₴')
        return '₴';
    return '€';
}
var ProductAnalytics = function (_a) {
    var analytics = _a.analytics, activeTab = _a.activeTab, onTabChange = _a.onTabChange, details = _a.details, brand = _a.brand, _b = _a.isCompare, isCompare = _b === void 0 ? false : _b, priceHistory = _a.priceHistory, currentPrice = _a.currentPrice, currency = _a.currency, apiWatchCurrency = _a.apiWatchCurrency;
    var _c = react_1.useState('3M'), activeChartPeriod = _c[0], setActiveChartPeriod = _c[1];
    var _d = react_1.useState(false), isVolatilityHovered = _d[0], setIsVolatilityHovered = _d[1];
    var _e = react_1.useState(false), isDemandHovered = _e[0], setIsDemandHovered = _e[1];
    var _f = react_1.useState(false), isLiquidityHovered = _f[0], setIsLiquidityHovered = _f[1];
    var _g = react_1.useState(false), isDynamicsHovered = _g[0], setIsDynamicsHovered = _g[1];
    var _h = react_1.useState(false), isAdsHovered = _h[0], setIsAdsHovered = _h[1];
    var _j = react_1.useState(false), isPriceLiquidityHovered = _j[0], setIsPriceLiquidityHovered = _j[1];
    var _k = react_1.useState(false), isPopularityHovered = _k[0], setIsPopularityHovered = _k[1];
    var screenWidth = useScreenWidth_1.useScreenWidth();
    var iconFor = function (label) {
        var l = label.toLowerCase();
        var mechanismKey = i18n_1.t(product_1.productKeys.details.mechanism).toLowerCase();
        var materialKey = i18n_1.t(product_1.productKeys.details.material).toLowerCase();
        var conditionKey = i18n_1.t(product_1.productKeys.details.condition).toLowerCase();
        var waterKey = i18n_1.t(product_1.productKeys.details.waterResistance).toLowerCase();
        var yearKey = i18n_1.t(product_1.productKeys.details.year).toLowerCase();
        var diameterKey = i18n_1.t(product_1.productKeys.details.diameter).toLowerCase();
        var braceletKey = i18n_1.t(product_1.productKeys.details.bracelet).toLowerCase();
        var chronographKey = i18n_1.t(product_1.productKeys.details.chronograph).toLowerCase();
        if (l.includes(mechanismKey) ||
            l.includes('mechanism') ||
            l.includes('механізм'))
            return product_icons_1.MechanismIcon;
        if (l.includes(materialKey) ||
            l.includes('material') ||
            l.includes('матеріал'))
            return product_icons_1.MaterialIcon;
        if (l.includes(conditionKey) ||
            l.includes('condition') ||
            l.includes('стан'))
            return product_icons_1.StanIcon;
        if (l.includes(waterKey) || l.includes('water') || l.includes('водостій'))
            return product_icons_1.WaterIcon;
        if (l.includes(yearKey) || l.includes('year') || l.includes('рік'))
            return product_icons_1.YearIcon;
        if (l.includes(diameterKey) ||
            l.includes('diameter') ||
            l.includes('діаметр'))
            return product_icons_1.DiameterIcon;
        if (l.includes(braceletKey) ||
            l.includes('bracelet') ||
            l.includes('ремінець'))
            return product_icons_1.StrapIcon;
        if (l.includes(chronographKey) ||
            l.includes('chronograph') ||
            l.includes('хронограф'))
            return product_icons_1.ChronographIcon;
        return product_icons_1.MechanismIcon;
    };
    var isDesktop = (screenWidth !== null && screenWidth !== void 0 ? screenWidth : 1280) >= 1280;
    var gaugeW = isDesktop ? 372 : 310;
    var gaugeH = isDesktop ? 338 : 281;
    var tabs = [
        { id: 'parameters', label: i18n_1.t(product_1.productKeys.analytics.tabs.parameters) },
        { id: 'brand', label: i18n_1.t(product_1.productKeys.analytics.tabs.brand) },
        { id: 'price', label: i18n_1.t(product_1.productKeys.analytics.tabs.price) },
        { id: 'trend', label: i18n_1.t(product_1.productKeys.analytics.tabs.trend) },
    ];
    var visibleTabs = screenWidth && screenWidth < 1279
        ? tabs.filter(function (t) { return t.id !== 'parameters'; })
        : tabs;
    return (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].analyticsContainer },
        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].tabsContainer }, visibleTabs.map(function (tab) { return (react_1["default"].createElement("button", { key: tab.id, onClick: function () { return onTabChange(tab.id); }, className: ProductAnalytics_module_css_1["default"].tabButton + " " + (activeTab === tab.id ? ProductAnalytics_module_css_1["default"].active : '') }, tab.label)); })),
        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].contentContainer },
            activeTab === 'trend' && (react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { className: ProductAnalytics_module_css_1["default"].trendTitle }, brand),
                react_1["default"].createElement("p", { className: ProductAnalytics_module_css_1["default"].trendContent + " text-[12px] font-normal text-black leading-relaxed " }, i18n_1.t(product_1.productKeys.analytics.trend.description)),
                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendMetrics },
                    isDemandHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendTooltip, onMouseEnter: function () { return setIsDemandHovered(true); }, onMouseLeave: function () { return setIsDemandHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.demand))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendCard, onMouseEnter: function () { return setIsDemandHovered(true); }, onMouseLeave: function () { return setIsDemandHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.ZipIcon, alt: i18n_1.t(product_1.productKeys.analytics.trend.demand), width: 32, height: 28 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendContent + " flex flex-col" },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendLabel }, i18n_1.t(product_1.productKeys.analytics.trend.demand)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendValue },
                                Math.min(100, Math.max(0, Math.round(analytics.demand * 10) / 10)),
                                "%")))),
                    isLiquidityHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendTooltipLiquid, onMouseEnter: function () { return setIsLiquidityHovered(true); }, onMouseLeave: function () { return setIsLiquidityHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.liquidity))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendCard, onMouseEnter: function () { return setIsLiquidityHovered(true); }, onMouseLeave: function () { return setIsLiquidityHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.TrendWaterIcon, alt: i18n_1.t(product_1.productKeys.analytics.trend.liquidity), width: 36, height: 36 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendContent + " flex flex-col" },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendLabel }, i18n_1.t(product_1.productKeys.analytics.trend.liquidity)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendValue },
                                Math.round(analytics.liquidity * 10) / 10,
                                "%")))),
                    isDynamicsHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendTooltip, onMouseEnter: function () { return setIsDynamicsHovered(true); }, onMouseLeave: function () { return setIsDynamicsHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.dynamics))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendCard, onMouseEnter: function () { return setIsDynamicsHovered(true); }, onMouseLeave: function () { return setIsDynamicsHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.DinamicIcon, alt: i18n_1.t(product_1.productKeys.analytics.trend.dynamics), width: 30, height: 30 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendContent + " flex flex-col" },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendLabel }, i18n_1.t(product_1.productKeys.analytics.trend.dynamics)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendValue },
                                analytics.dynamics >= 0 ? '+' : '',
                                Math.round(analytics.dynamics * 10) / 10,
                                "%")))),
                    isAdsHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendTooltip, onMouseEnter: function () { return setIsAdsHovered(true); }, onMouseLeave: function () { return setIsAdsHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.ads))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendCard, onMouseEnter: function () { return setIsAdsHovered(true); }, onMouseLeave: function () { return setIsAdsHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.AdsIcon, alt: i18n_1.t(product_1.productKeys.analytics.trend.ads), width: 30, height: 30 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendContent + " flex flex-col" },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendLabel }, i18n_1.t(product_1.productKeys.analytics.trend.ads)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].trendValue }, analytics.ads))))),
                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].trendGauge },
                    react_1["default"].createElement(TrendGauge_1["default"], { value: Math.round(analytics.demand * 10) / 10, lastUpdated: analytics.lastUpdated, arcSrc: product_icons_1.DugaIcon, pointerSrc: product_icons_1.PolygonIcon, centerSrc: product_icons_1.EllipseIcon, width: gaugeW, height: gaugeH, config: {
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
                            labelColor: '#000',
                            valueFontSizePx: 24,
                            valueColor: '#04694f',
                            lastUpdatedFontSizePx: 12,
                            lastUpdatedColor: 'rgba(0,0,0,0.6)'
                        } })))),
            activeTab === 'parameters' && (react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parametersContainer },
                    react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parametersGrid }, details.map(function (_a) {
                        var label = _a.label, value = _a.value;
                        return (react_1["default"].createElement("div", { key: label, className: ProductAnalytics_module_css_1["default"].parameterItem },
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parameterIcon },
                                react_1["default"].createElement(image_1["default"], { src: iconFor(label), alt: label, width: 25, height: 25 })),
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parameterContent },
                                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parameterLabel },
                                    label,
                                    ":"),
                                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].parameterValue }, value))));
                    }))))),
            activeTab === 'brand' &&
                (function () {
                    var normalizedBrand = brand.trim();
                    var content = brands_1.BRAND_CONTENT[normalizedBrand];
                    if (!content) {
                        var brandKeys = Object.keys(brands_1.BRAND_CONTENT);
                        var foundKey = brandKeys.find(function (key) { return key.toLowerCase() === normalizedBrand.toLowerCase(); });
                        if (foundKey) {
                            content = brands_1.BRAND_CONTENT[foundKey];
                        }
                    }
                    if (!content) {
                        content = brands_1.BRAND_CONTENT["default"];
                    }
                    var displayTitle = content === brands_1.BRAND_CONTENT["default"] ? brand : content.title;
                    return (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].brandContent },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].brandBackground + " " + (isCompare ? ProductAnalytics_module_css_1["default"].brandBackgroundCompare : '') },
                            react_1["default"].createElement(image_1["default"], { src: content.image, alt: displayTitle + " Brand Background", width: 400, height: 220, className: ProductAnalytics_module_css_1["default"].brandBackgroundImage })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].brandTextContent },
                            react_1["default"].createElement("h3", { className: ProductAnalytics_module_css_1["default"].brandTitle }, displayTitle),
                            content.paragraphs.map(function (p, idx) { return (react_1["default"].createElement("p", { key: idx, className: ProductAnalytics_module_css_1["default"].brandText }, p)); }))));
                })(),
            activeTab === 'price' && (react_1["default"].createElement("div", null,
                react_1["default"].createElement(PriceChart_1["default"], { period: activeChartPeriod, onPeriodChange: setActiveChartPeriod, priceHistory: priceHistory, currency: currency, currentPrice: currentPrice, apiWatchCurrency: apiWatchCurrency }),
                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetrics },
                    !isVolatilityHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricCard, onMouseEnter: function () { return setIsVolatilityHovered(true); }, onMouseLeave: function () { return setIsVolatilityHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.ZipIcon, alt: i18n_1.t(product_1.productKeys.analytics.price.volatility), width: 32, height: 28 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricContent },
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricLabel }, i18n_1.t(product_1.productKeys.analytics.price.volatility)),
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricValue }, typeof analytics.volatility === 'number'
                                ? Math.round(analytics.volatility * 10) / 10
                                : analytics.volatility)))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].volatilityTooltip, onMouseEnter: function () { return setIsVolatilityHovered(true); }, onMouseLeave: function () { return setIsVolatilityHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.demand))),
                    !isPriceLiquidityHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricCard, onMouseEnter: function () { return setIsPriceLiquidityHovered(true); }, onMouseLeave: function () { return setIsPriceLiquidityHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.FluentArrowGrowthIcon, alt: i18n_1.t(product_1.productKeys.analytics.price.liquidity), width: 35, height: 35 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricContent },
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricLabel }, i18n_1.t(product_1.productKeys.analytics.price.liquidity)),
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricValue }, analytics.liquidityLabel)))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].volatilityTooltipLiquid, onMouseEnter: function () { return setIsPriceLiquidityHovered(true); }, onMouseLeave: function () { return setIsPriceLiquidityHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.trend.tooltip.liquidity))),
                    !isPopularityHovered ? (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricCard + " " + ProductAnalytics_module_css_1["default"].priceMetricCardLong, onMouseEnter: function () { return setIsPopularityHovered(true); }, onMouseLeave: function () { return setIsPopularityHovered(false); } },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricIcon },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.StarIcon, alt: i18n_1.t(product_1.productKeys.analytics.price.popularity), width: 30, height: 30 })),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricContent },
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricLabel }, i18n_1.t(product_1.productKeys.analytics.price.popularity)),
                            react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].priceMetricValue }, analytics.popularity === 10
                                ? '10/10'
                                : analytics.popularity.toFixed(1) + "/10")))) : (react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].volatilityTooltip, onMouseEnter: function () { return setIsPopularityHovered(true); }, onMouseLeave: function () { return setIsPopularityHovered(false); } }, i18n_1.t(product_1.productKeys.analytics.price.tooltip.popularity)))),
                react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].monthlyReport },
                    react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].reportTitle }, i18n_1.t(product_1.productKeys.analytics.price.report.title)),
                    react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].reportItems },
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].reportItem },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemLabel }, i18n_1.t(product_1.productKeys.analytics.price.report.peak)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemValue },
                                convertCurrency(currency || 'EUR'),
                                analytics.reportPeak.toLocaleString('uk-UA'))),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].reportItem },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemLabel }, i18n_1.t(product_1.productKeys.analytics.price.report.min)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemValue },
                                convertCurrency(currency || 'EUR'),
                                analytics.reportMin.toLocaleString('uk-UA'))),
                        react_1["default"].createElement("div", { className: ProductAnalytics_module_css_1["default"].reportItem },
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemLabel }, i18n_1.t(product_1.productKeys.analytics.price.report.change)),
                            react_1["default"].createElement("span", { className: ProductAnalytics_module_css_1["default"].reportItemValue + " " + (analytics.reportChangePct >= 0
                                    ? ProductAnalytics_module_css_1["default"].reportItemValueGreen
                                    : ProductAnalytics_module_css_1["default"].reportItemValueRed) },
                                analytics.reportChangePct >= 0 ? '+' : '',
                                Math.abs(analytics.reportChangePct * 100).toFixed(1),
                                "%")))))))));
};
exports["default"] = ProductAnalytics;

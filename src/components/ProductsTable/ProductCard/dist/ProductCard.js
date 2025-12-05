'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ProductCard = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var LineChart_1 = require("@/components/Main/Hero/Chart/LineChart");
var ProductCard_module_css_1 = require("./ProductCard.module.css");
var Icon_1 = require("../../../../public/social/Icon");
var lucide_react_1 = require("lucide-react");
var LocalizedLink_1 = require("@/components/LocalizedLink");
var i18n_1 = require("@/i18n");
var accessibility_1 = require("@/i18n/keys/accessibility");
var WishlistContext_1 = require("@/context/WishlistContext");
var analytics_1 = require("@/lib/analytics");
var ArrowUp = function () { return (react_1["default"].createElement("svg", { width: '16', height: '14', viewBox: '0 0 16 14', fill: 'none', "aria-hidden": 'true' },
    react_1["default"].createElement("path", { d: '\r\n      M8 1 V14\r\n      M8 2 L13 7\r\n      M8 1 L3 7\r\n      ', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'butt', strokeLinejoin: 'miter' }))); };
var ArrowDown = function () { return (react_1["default"].createElement("svg", { width: '16', height: '14', viewBox: '0 0 16 14', fill: 'none', "aria-hidden": 'true' },
    react_1["default"].createElement("path", { d: '\r\n      M8 13 V1 \r\n      M8 12 L13 7 \r\n      M8 12 L3 7', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'butt', strokeLinejoin: 'miter' }))); };
exports.ProductCard = function (_a) {
    var image = _a.image, changePercent = _a.changePercent, brand = _a.brand, price = _a.price, chartData = _a.chartData, chartId = _a.chartId, slug = _a.slug, index = _a.index, title = _a.title, id = _a.id, originalId = _a.originalId, watchItem = _a.watchItem, className = _a.className, cardStyle = _a.cardStyle, height = _a.height, _b = _a.dense, dense = _b === void 0 ? false : _b, _c = _a.priority, priority = _c === void 0 ? false : _c;
    var variant = 'orange';
    var percentClass = ProductCard_module_css_1["default"].percentNeutral;
    var ArrowIcon = null;
    var score = index || (changePercent > 0 ? 'A' : changePercent < 0 ? 'C' : 'B');
    var scoreClass = ProductCard_module_css_1["default"].scoreNeutral;
    if (score === 'A') {
        scoreClass = ProductCard_module_css_1["default"].scorePositive;
    }
    else if (score === 'C') {
        scoreClass = ProductCard_module_css_1["default"].scoreNegative;
    }
    if (changePercent > 0) {
        variant = 'green';
        percentClass = ProductCard_module_css_1["default"].percentPositive;
        ArrowIcon = ArrowUp;
    }
    else if (changePercent < 0) {
        variant = 'red';
        percentClass = ProductCard_module_css_1["default"].percentNegative;
        ArrowIcon = ArrowDown;
    }
    var _d = WishlistContext_1.useWishlistContext(), addToWishlist = _d.addToWishlist, removeFromWishlist = _d.removeFromWishlist, isInWishlist = _d.isInWishlist;
    var watchId = originalId || id.toString();
    var isFavorite = isInWishlist(watchId);
    var _e = react_1.useState(70), chartHeight = _e[0], setChartHeight = _e[1];
    react_1.useEffect(function () {
        var updateHeight = function () {
            var width = window.innerWidth;
            if (width >= 1024)
                setChartHeight(70);
            else if (width >= 834)
                setChartHeight(dense ? 60 : 70);
            else if (width >= 768)
                setChartHeight(dense ? 54 : 60);
            else
                setChartHeight(50);
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return function () { return window.removeEventListener('resize', updateHeight); };
    }, [dense]);
    var getModelName = function () {
        if (!title)
            return '';
        var modelName = title.trim();
        var brandRegex = new RegExp("^" + brand + "\\s+", 'i');
        modelName = modelName.replace(brandRegex, '').trim();
        modelName = modelName.replace(brandRegex, '').trim();
        modelName = modelName.replace(/\b\d{6,}[A-Z0-9]*\b/g, '').trim();
        modelName = modelName.replace(/\b(19|20)\d{2}\b/g, '').trim();
        modelName = modelName
            .replace(/\bNEW\b/gi, '')
            .replace(/\bUNWORN\b/gi, '')
            .replace(/\bOyster\s+Bracelet\b/gi, '')
            .replace(/\b\[.*?\]\s*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        var words = modelName.split(/\s+/).filter(function (word) { return word.length > 0; });
        if (words.length > 3) {
            modelName = words.slice(0, 3).join(' ');
        }
        else {
            modelName = words.join(' ');
        }
        if (modelName.length > 35) {
            var truncated = modelName.substring(0, 35);
            var lastSpace = truncated.lastIndexOf(' ');
            if (lastSpace > 20) {
                modelName = truncated.substring(0, lastSpace) + '...';
            }
            else {
                modelName = truncated + '...';
            }
        }
        return modelName || brand;
    };
    var handleCardClick = function () {
        analytics_1.trackEvent('card_click', {
            product_id: (id === null || id === void 0 ? void 0 : id.toString()) || originalId || '',
            product_slug: slug || '',
            brand: brand || '',
            price: price || 0
        });
    };
    return (react_1["default"].createElement(LocalizedLink_1.LocalizedLink, { href: slug ? "/product/" + slug : '/catalog', prefetch: false, onClick: handleCardClick, "aria-label": i18n_1.t(accessibility_1.a11yKeys.card.product, {
            brand: brand,
            price: price,
            currency: '€',
            change: changePercent
        }) },
        react_1["default"].createElement("article", { className: ProductCard_module_css_1["default"].productCard + " flex flex-col rounded-2xl h-[15rem] md:h-[21rem] px-2 md:px-4 " + (dense ? 'py-2' : 'py-3 md:py-3') + " max-w-[30rem] justify-between " + (className || ''), style: __assign(__assign({}, (cardStyle || {})), (height !== undefined
                ? { height: typeof height === 'number' ? height + "px" : height }
                : {})) },
            react_1["default"].createElement("div", { className: "relative " + (dense ? 'mb-1' : 'mb-1 md:mb-4') + " flex w-full justify-center items-center" },
                react_1["default"].createElement("button", { onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isFavorite) {
                            removeFromWishlist(watchId);
                        }
                        else {
                            if (watchItem) {
                                addToWishlist(watchItem);
                            }
                            else {
                                addToWishlist(watchId);
                            }
                        }
                    }, className: ProductCard_module_css_1["default"].productCardScore + " absolute top-0 left-0 z-10 flex items-center justify-center w-8 h-8", "aria-label": isFavorite
                        ? i18n_1.t(accessibility_1.a11yKeys.favorites.remove)
                        : i18n_1.t(accessibility_1.a11yKeys.favorites.add), "aria-pressed": isFavorite },
                    react_1["default"].createElement(lucide_react_1.Heart, { size: 20, className: "cursor-pointer transition-colors duration-300 " + (isFavorite ? 'text-[#04694f] fill-[#04694f]' : 'text-[#000000]'), "aria-hidden": 'true' })),
                react_1["default"].createElement("div", { className: 'relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] mx-auto overflow-hidden rounded-lg' },
                    react_1["default"].createElement(image_1["default"], { src: image, alt: brand, fill: true, sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw', className: ProductCard_module_css_1["default"].productCardImage, priority: priority })),
                react_1["default"].createElement("div", { className: ProductCard_module_css_1["default"].productCardScore + " " + scoreClass + " absolute top-0 right-0 flex items-center justify-center w-6 md:w-8 h-6 md:h-8 rounded-md font-bold", "aria-label": i18n_1.t(accessibility_1.a11yKeys.rating.label, { rating: score }), role: 'status' }, score)),
            react_1["default"].createElement("div", { className: " mb-0 md:mb-1 flex " + (dense ? 'gap-1' : 'gap-2') + " items-center justify-center" },
                react_1["default"].createElement("div", { className: "flex flex-col " + (dense ? 'gap-0' : 'gap-0 md:gap-2') },
                    react_1["default"].createElement("div", { className: ProductCard_module_css_1["default"].cardWatchName + " text-center font-bold text-sm md:text-base leading-tight" },
                        react_1["default"].createElement("div", { className: 'text-base md:text-lg' }, brand),
                        react_1["default"].createElement("div", { className: 'text-xs md:text-sm font-semibold text-gray-700 mt-0.5' }, getModelName())),
                    react_1["default"].createElement(LineChart_1.LineChart, { data: chartData || [], variant: variant, id: chartId, height: chartHeight, "aria-label": i18n_1.t(accessibility_1.a11yKeys.chart.priceChange, {
                            trend: changePercent > 0
                                ? i18n_1.t(accessibility_1.a11yKeys.chart.trendUp)
                                : changePercent < 0
                                    ? i18n_1.t(accessibility_1.a11yKeys.chart.trendDown)
                                    : i18n_1.t(accessibility_1.a11yKeys.chart.trendStable)
                        }) }))),
            react_1["default"].createElement("div", { className: 'flex gap-2 items-center w-full' },
                react_1["default"].createElement("div", { className: 'relative text-center max-h-[54px] w-full flex flex-row justify-between items-center' },
                    react_1["default"].createElement("div", { className: "" + ProductCard_module_css_1["default"].Price },
                        price,
                        " \u20AC"),
                    react_1["default"].createElement("div", { className: ProductCard_module_css_1["default"].marketCardHeadPercent + " " + percentClass + " absolute " + (dense ? 'bottom-3 left-14' : 'bottom-3 left-16') + " flex items-center justify-center gap-1 min-w-14  font-bold" },
                        ArrowIcon && react_1["default"].createElement(ArrowIcon, null),
                        Math.abs(Math.round(changePercent * 10) / 10),
                        " %"),
                    react_1["default"].createElement("button", { onClick: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.notifications.priceAlert), className: 'p-0 bg-transparent border-0 cursor-pointer' },
                        react_1["default"].createElement(Icon_1.BellIcon, { className: ProductCard_module_css_1["default"].productCardBell + " w-[13px] md:w-[21px] h-[16px] md:h-[22px]", "aria-hidden": 'true' })))))));
};

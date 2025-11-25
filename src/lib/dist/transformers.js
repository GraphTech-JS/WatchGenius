"use strict";
exports.__esModule = true;
exports.transformApiWatchFull = exports.transformApiPopularWatchItem = exports.transformApiDealer = exports.generateSlug = exports.transformApiWatch = void 0;
var imageUtils_1 = require("@/lib/imageUtils");
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
function convertVolatilityToLabel(volatility) {
    if (volatility === undefined || volatility === null) {
        return 'Середня';
    }
    if (volatility < 10)
        return 'Низька';
    if (volatility < 30)
        return 'Середня';
    return 'Висока';
}
function convertLiquidityToLabel(liquidity) {
    if (!liquidity) {
        return 'Середня';
    }
    var num = parseFloat(liquidity);
    if (isNaN(num)) {
        return 'Середня';
    }
    if (num < 50)
        return 'Низька';
    if (num < 80)
        return 'Середня';
    return 'Висока';
}
function transformApiWatch(apiWatch) {
    var _a;
    var watchTitle = apiWatch.model || apiWatch.name || '';
    watchTitle = cleanWatchTitle(watchTitle);
    var fullTitle = (apiWatch.brand.name + " " + watchTitle).trim();
    var analytics = apiWatch.analytics;
    var hasValidImage = apiWatch.image &&
        apiWatch.image.trim() !== '' &&
        apiWatch.image !== 'null' &&
        apiWatch.image !== 'undefined';
    var imageUrl = hasValidImage
        ? apiWatch.image
        : imageUtils_1.getRandomWatchImage(apiWatch.id);
    var trendValue;
    if ((analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== undefined && (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== null) {
        trendValue = analytics.trend90d;
    }
    else if (apiWatch.trend90d !== undefined && apiWatch.trend90d !== null) {
        trendValue = apiWatch.trend90d;
    }
    else if (apiWatch.priceHistory && apiWatch.priceHistory.length >= 2) {
        var firstPrice = apiWatch.priceHistory[0].price;
        var lastPrice = apiWatch.priceHistory[apiWatch.priceHistory.length - 1].price;
        if (firstPrice > 0) {
            trendValue = ((lastPrice - firstPrice) / firstPrice) * 100;
        }
        else {
            trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
        }
    }
    else {
        trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
    }
    var latestPriceFromHistory = apiWatch.priceHistory && apiWatch.priceHistory.length > 0
        ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
        : null;
    var finalPrice = Math.round((latestPriceFromHistory === null || latestPriceFromHistory === void 0 ? void 0 : latestPriceFromHistory.price) || apiWatch.price || 0);
    var finalCurrencyCode = (latestPriceFromHistory === null || latestPriceFromHistory === void 0 ? void 0 : latestPriceFromHistory.currency) || apiWatch.currency || 'EUR';
    var finalCurrency = convertCurrency(finalCurrencyCode);
    return {
        id: apiWatch.id,
        title: fullTitle,
        slug: generateSlug(apiWatch.name),
        price: finalPrice,
        currency: finalCurrency,
        brand: apiWatch.brand.name,
        index: calculateIndex(apiWatch.brand.brandIndex),
        image: imageUrl,
        chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
        buttonLabel: 'Buy on Chrono24',
        trend: {
            value: trendValue,
            period: '90d'
        },
        variant: undefined,
        volatility: analytics === null || analytics === void 0 ? void 0 : analytics.volatility,
        volatilityLabel: convertVolatilityToLabel(analytics === null || analytics === void 0 ? void 0 : analytics.volatility),
        liquidity: analytics === null || analytics === void 0 ? void 0 : analytics.liquidity,
        liquidityLabel: convertLiquidityToLabel(analytics === null || analytics === void 0 ? void 0 : analytics.liquidity),
        trend30d: analytics === null || analytics === void 0 ? void 0 : analytics.trend30d,
        trend90d: (_a = analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== null && _a !== void 0 ? _a : apiWatch.trend90d,
        popularity: analytics === null || analytics === void 0 ? void 0 : analytics.popularity,
        condition: '',
        mechanism: '',
        material: '',
        braceletMaterial: '',
        documents: '',
        location: '',
        year: 2020,
        diameterMm: 40,
        waterResistance: false,
        chronograph: false,
        brandLogo: undefined,
        reference: undefined
    };
}
exports.transformApiWatch = transformApiWatch;
function calculateIndex(brandIndex) {
    if (brandIndex <= 33)
        return 'A';
    if (brandIndex <= 66)
        return 'B';
    return 'C';
}
function calculateTrend(price, defaultPrice) {
    if (!defaultPrice || defaultPrice === 0) {
        return {
            value: 0,
            period: '90d'
        };
    }
    var change = ((price - defaultPrice) / defaultPrice) * 100;
    return {
        value: Math.round(change * 10) / 10,
        period: '90d'
    };
}
function cleanWatchTitle(title, condition, maxLength) {
    if (maxLength === void 0) { maxLength = 80; }
    if (!title || title.trim() === '')
        return title;
    var cleaned = title.trim();
    var words = cleaned.split(/\s+/);
    var seen = new Set();
    var uniqueWords = [];
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        var lowerWord = word.toLowerCase();
        if (!seen.has(lowerWord)) {
            seen.add(lowerWord);
            uniqueWords.push(word);
        }
    }
    cleaned = uniqueWords.join(' ');
    if (condition) {
        var conditionUpper = condition.toUpperCase();
        cleaned = cleaned
            .replace(/\bNEW\/UNWORN\b/gi, '')
            .replace(/\bNEW\s+UNWORN\b/gi, '')
            .replace(/\bUNWORN\b/gi, '');
        if (conditionUpper === 'NEW') {
            cleaned = cleaned.replace(/\bNEW\b/gi, '');
        }
    }
    cleaned = cleaned
        .replace(/\bwith\s+New\s+style\s+box\b/gi, '')
        .replace(/\bwith\s+box\b/gi, '')
        .replace(/\bwith\s+papers\b/gi, '')
        .replace(/\bwith\s+original\s+box\b/gi, '')
        .replace(/\bwith\s+original\s+papers\b/gi, '')
        .replace(/\b\[.*?\]\s*/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (cleaned.length > maxLength) {
        var truncated = cleaned.substring(0, maxLength);
        var lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > maxLength * 0.5) {
            cleaned = truncated.substring(0, lastSpace) + '...';
        }
        else {
            cleaned = truncated + '...';
        }
    }
    return cleaned.trim();
}
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
exports.generateSlug = generateSlug;
function transformApiDealer(apiDealer) {
    var isValidImageUrl = function (url) {
        if (!url)
            return false;
        var imageExtensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.webp',
            '.gif',
            '.svg',
            '.avif',
        ];
        var lowerUrl = url.toLowerCase();
        return imageExtensions.some(function (ext) { return lowerUrl.includes(ext); });
    };
    var imageUrl = apiDealer.logoUrl && isValidImageUrl(apiDealer.logoUrl)
        ? apiDealer.logoUrl
        : '/dealers/Dealer.webp';
    return {
        id: uuidToNumber(apiDealer.id),
        name: apiDealer.name,
        description: apiDealer.description,
        address: apiDealer.location,
        rating: apiDealer.rating + "/5 \u0440\u0435\u0439\u0442\u0438\u043D\u0433",
        listings: apiDealer.reviewsCount + "+ \u0430\u043A\u0442\u0438\u0432\u043D\u0438\u0445 \u043E\u0433\u043E\u043B\u043E\u0448\u0435\u043D\u044C",
        image: imageUrl,
        websiteUrl: apiDealer.websiteUrl
    };
}
exports.transformApiDealer = transformApiDealer;
function uuidToNumber(uuid) {
    var hash = 0;
    for (var i = 0; i < uuid.length; i++) {
        var char = uuid.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}
function transformApiPopularWatchItem(apiWatch) {
    var _a, _b;
    var latestPrice = apiWatch.priceHistory && apiWatch.priceHistory.length > 0
        ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
        : null;
    var price = Math.round((latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.price) || 0);
    var currencyCode = (latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.currency) || ((_a = apiWatch.dealer) === null || _a === void 0 ? void 0 : _a.location) || 'EUR';
    var currency = convertCurrency(currencyCode);
    var defaultPrice = apiWatch.priceHistory && apiWatch.priceHistory.length > 1
        ? apiWatch.priceHistory[0].price
        : price;
    var hasValidImage = apiWatch.imageUrls &&
        apiWatch.imageUrls.length > 0 &&
        apiWatch.imageUrls[0] &&
        apiWatch.imageUrls[0].trim() !== '' &&
        apiWatch.imageUrls[0] !== 'null' &&
        apiWatch.imageUrls[0] !== 'undefined';
    var imageUrl = hasValidImage
        ? apiWatch.imageUrls[0]
        : imageUtils_1.getRandomWatchImage(apiWatch.id);
    var watchTitle = apiWatch.name || apiWatch.id;
    watchTitle = cleanWatchTitle(watchTitle);
    var fullTitle = (apiWatch.brand.name + " " + watchTitle).trim();
    return {
        id: apiWatch.id,
        title: fullTitle,
        slug: generateSlug(apiWatch.name),
        price: price,
        currency: currency,
        brand: apiWatch.brand.name,
        index: calculateIndex(apiWatch.brand.brandIndex),
        image: imageUrl,
        chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
        buttonLabel: 'Buy on Chrono24',
        trend: calculateTrend(price, defaultPrice),
        variant: undefined,
        condition: '',
        mechanism: '',
        material: '',
        braceletMaterial: '',
        documents: '',
        location: ((_b = apiWatch.dealer) === null || _b === void 0 ? void 0 : _b.location) || '',
        year: 2020,
        diameterMm: 40,
        waterResistance: false,
        chronograph: false,
        brandLogo: undefined,
        reference: undefined
    };
}
exports.transformApiPopularWatchItem = transformApiPopularWatchItem;
function transformApiWatchFull(apiWatch, requestedCurrency) {
    var _a;
    var latestPrice = apiWatch.priceHistory && apiWatch.priceHistory.length > 0
        ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
        : null;
    var apiPrice = apiWatch.price;
    var historyPrice = latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.price;
    var price = Math.round(apiPrice || historyPrice || 0);
    var currencyCode = apiWatch.currency || (latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.currency) || requestedCurrency || ((_a = apiWatch.dealer) === null || _a === void 0 ? void 0 : _a.location) || 'EUR';
    var currency = convertCurrency(currencyCode);
    var defaultPrice = apiWatch.defaultPrice ||
        (apiWatch.priceHistory && apiWatch.priceHistory.length > 1
            ? apiWatch.priceHistory[0].price
            : price);
    var hasValidImage = apiWatch.imageUrls &&
        apiWatch.imageUrls.length > 0 &&
        apiWatch.imageUrls[0] &&
        apiWatch.imageUrls[0].trim() !== '' &&
        apiWatch.imageUrls[0] !== 'null' &&
        apiWatch.imageUrls[0] !== 'undefined';
    var imageUrl = hasValidImage
        ? apiWatch.imageUrls[0]
        : imageUtils_1.getRandomWatchImage(apiWatch.id);
    var caseDiameter = apiWatch.caseDiameter
        ? parseFloat(apiWatch.caseDiameter.replace(/[^0-9.]/g, ''))
        : 40;
    var watchTitle = '';
    if (apiWatch.model && apiWatch.model.trim() !== '' && apiWatch.model.length > 3) {
        watchTitle = apiWatch.model;
    }
    else if (apiWatch.name && apiWatch.name.trim() !== '' && apiWatch.name.length > 5) {
        if (!/^[A-Z0-9-]+$/.test(apiWatch.name)) {
            watchTitle = apiWatch.name;
        }
        else {
            if (apiWatch.model && apiWatch.model.trim() !== '') {
                watchTitle = apiWatch.model;
            }
            else if (apiWatch.description) {
                var descWords = apiWatch.description.split(' ').slice(0, 5).join(' ');
                watchTitle = descWords.length > 10 ? descWords : apiWatch.ref || apiWatch.name;
            }
            else {
                watchTitle = apiWatch.ref || apiWatch.name;
            }
        }
    }
    else if (apiWatch.description) {
        var descWords = apiWatch.description.split(' ').slice(0, 5).join(' ');
        watchTitle = descWords.length > 10 ? descWords : apiWatch.ref || '';
    }
    else {
        watchTitle = apiWatch.ref || apiWatch.id;
    }
    watchTitle = cleanWatchTitle(watchTitle, apiWatch.condition, 80);
    if (!watchTitle || watchTitle.length < 3) {
        watchTitle = apiWatch.ref || apiWatch.model || apiWatch.name || '';
    }
    var fullTitle = (apiWatch.brand.name + " " + watchTitle).trim();
    var analytics = apiWatch.analytics;
    return {
        id: apiWatch.id,
        title: fullTitle,
        slug: generateSlug(apiWatch.name),
        price: price,
        currency: currency,
        brand: apiWatch.brand.name,
        index: calculateIndex(apiWatch.brand.brandIndex),
        image: imageUrl,
        chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
        buttonLabel: 'Buy on Chrono24',
        trend: {
            value: (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== undefined
                ? analytics.trend90d
                : calculateTrend(price, defaultPrice).value,
            period: '90d'
        },
        variant: undefined,
        volatility: analytics === null || analytics === void 0 ? void 0 : analytics.volatility,
        volatilityLabel: convertVolatilityToLabel(analytics === null || analytics === void 0 ? void 0 : analytics.volatility),
        liquidity: analytics === null || analytics === void 0 ? void 0 : analytics.liquidity,
        liquidityLabel: convertLiquidityToLabel(analytics === null || analytics === void 0 ? void 0 : analytics.liquidity),
        trend30d: analytics === null || analytics === void 0 ? void 0 : analytics.trend30d,
        trend90d: analytics === null || analytics === void 0 ? void 0 : analytics.trend90d,
        popularity: analytics === null || analytics === void 0 ? void 0 : analytics.popularity,
        condition: apiWatch.condition || '',
        mechanism: apiWatch.mechanism || '',
        material: apiWatch.material || '',
        braceletMaterial: apiWatch.braceletMaterial || '',
        documents: apiWatch.hasDocuments || '',
        location: apiWatch.location || '',
        year: apiWatch.year || 2020,
        diameterMm: caseDiameter,
        waterResistance: apiWatch.waterResistance || false,
        chronograph: apiWatch.isChronograph || false,
        brandLogo: undefined,
        reference: apiWatch.ref || undefined
    };
}
exports.transformApiWatchFull = transformApiWatchFull;

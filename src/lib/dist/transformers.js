"use strict";
exports.__esModule = true;
exports.transformDealerOffers = exports.transformApiWatchFull = exports.transformApiPopularWatchItem = exports.transformApiDealer = exports.generateSlug = exports.transformApiWatch = void 0;
var imageUtils_1 = require("@/lib/imageUtils");
var i18n_1 = require("@/i18n");
var catalog_1 = require("@/i18n/keys/catalog");
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
    if ((analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== undefined && (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== null &&
        !isNaN(analytics.trend90d) && isFinite(analytics.trend90d)) {
        trendValue = analytics.trend90d;
    }
    else if (apiWatch.trend90d !== undefined && apiWatch.trend90d !== null &&
        !isNaN(apiWatch.trend90d) && isFinite(apiWatch.trend90d)) {
        trendValue = apiWatch.trend90d;
    }
    else if (apiWatch.priceHistory && apiWatch.priceHistory.length >= 2) {
        var firstPrice = apiWatch.priceHistory[0].price;
        var lastPrice = apiWatch.priceHistory[apiWatch.priceHistory.length - 1].price;
        if (firstPrice > 0 && !isNaN(firstPrice) && isFinite(firstPrice) &&
            !isNaN(lastPrice) && isFinite(lastPrice)) {
            trendValue = ((lastPrice - firstPrice) / firstPrice) * 100;
        }
        else {
            trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
        }
    }
    else {
        trendValue = calculateTrend(apiWatch.price, apiWatch.defaultPrice).value;
    }
    if (isNaN(trendValue) || !isFinite(trendValue)) {
        trendValue = 0;
    }
    var latestPriceFromHistory = apiWatch.priceHistory && apiWatch.priceHistory.length > 0
        ? apiWatch.priceHistory[apiWatch.priceHistory.length - 1]
        : null;
    var finalPrice = Math.round((latestPriceFromHistory === null || latestPriceFromHistory === void 0 ? void 0 : latestPriceFromHistory.price) || apiWatch.price || 0);
    var finalCurrencyCode = (latestPriceFromHistory === null || latestPriceFromHistory === void 0 ? void 0 : latestPriceFromHistory.currency) || apiWatch.currency || 'EUR';
    var finalCurrency = convertCurrency(finalCurrencyCode);
    var brandSegment = apiWatch.brand.segment;
    var watchIndex = brandSegment && (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
        ? brandSegment
        : calculateIndex(apiWatch.brand.brandIndex);
    return {
        id: apiWatch.id,
        title: fullTitle,
        slug: generateSlug(apiWatch.name),
        price: finalPrice,
        currency: finalCurrency,
        brand: apiWatch.brand.name,
        index: watchIndex,
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
    if (!defaultPrice || defaultPrice === 0 || isNaN(defaultPrice) || !isFinite(defaultPrice)) {
        return {
            value: 0,
            period: '90d'
        };
    }
    if (isNaN(price) || !isFinite(price)) {
        return {
            value: 0,
            period: '90d'
        };
    }
    var change = ((price - defaultPrice) / defaultPrice) * 100;
    var roundedValue = Math.round(change * 10) / 10;
    if (isNaN(roundedValue) || !isFinite(roundedValue)) {
        return {
            value: 0,
            period: '90d'
        };
    }
    return {
        value: roundedValue,
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
        originalId: apiDealer.id,
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
    var _a, _b, _c, _d, _e;
    var priceHistory = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.priceHistory;
    var latestPrice = priceHistory && Array.isArray(priceHistory) && priceHistory.length > 0
        ? priceHistory[priceHistory.length - 1]
        : null;
    var price = Math.round((latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.price) || 0);
    var currencyCode = (latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.currency) || ((_a = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.dealer) === null || _a === void 0 ? void 0 : _a.location) || 'EUR';
    var currency = convertCurrency(currencyCode);
    var defaultPrice = priceHistory && Array.isArray(priceHistory) && priceHistory.length > 1
        ? priceHistory[0].price
        : price;
    var imageUrls = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.imageUrls;
    var hasValidImage = imageUrls &&
        Array.isArray(imageUrls) &&
        imageUrls.length > 0 &&
        imageUrls[0] &&
        typeof imageUrls[0] === 'string' &&
        imageUrls[0].trim() !== '' &&
        imageUrls[0] !== 'null' &&
        imageUrls[0] !== 'undefined';
    var imageUrl = hasValidImage
        ? imageUrls[0]
        : imageUtils_1.getRandomWatchImage((apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.id) || 'unknown');
    var watchTitle = (apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.name) || (apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.id) || 'Unknown Watch';
    watchTitle = cleanWatchTitle(watchTitle);
    var brandName = ((_b = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.brand) === null || _b === void 0 ? void 0 : _b.name) || 'Unknown Brand';
    var fullTitle = (brandName + " " + watchTitle).trim();
    var analytics = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.analytics;
    var trendValue = (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== undefined && (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== null
        ? analytics.trend90d
        : calculateTrend(price, defaultPrice).value;
    var brandSegment = (_c = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.brand) === null || _c === void 0 ? void 0 : _c.segment;
    var brandIndex = ((_d = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.brand) === null || _d === void 0 ? void 0 : _d.brandIndex) || 50;
    var watchIndex = brandSegment && (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
        ? brandSegment
        : calculateIndex(brandIndex);
    return {
        id: (apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.id) || 'unknown',
        title: fullTitle,
        slug: generateSlug((apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.name) || 'unknown'),
        price: price,
        currency: currency,
        brand: brandName,
        index: watchIndex,
        image: imageUrl,
        chronoUrl: (apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.chronoUrl) && typeof apiWatch.chronoUrl === 'string' && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
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
        trend90d: analytics === null || analytics === void 0 ? void 0 : analytics.trend90d,
        popularity: analytics === null || analytics === void 0 ? void 0 : analytics.popularity,
        condition: '',
        mechanism: '',
        material: '',
        braceletMaterial: '',
        documents: '',
        location: ((_e = apiWatch === null || apiWatch === void 0 ? void 0 : apiWatch.dealer) === null || _e === void 0 ? void 0 : _e.location) || '',
        year: 2020,
        diameterMm: 40,
        waterResistance: false,
        chronograph: false,
        brandLogo: undefined,
        reference: undefined,
        priceHistory: priceHistory
    };
}
exports.transformApiPopularWatchItem = transformApiPopularWatchItem;
function transformApiWatchFull(apiWatch, requestedCurrency) {
    var _a, _b, _c;
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
    var brandName = (_b = apiWatch.brand) === null || _b === void 0 ? void 0 : _b.name;
    if (!brandName && apiWatch.name) {
        var nameParts = apiWatch.name.trim().split(/\s+/);
        if (nameParts.length > 0) {
            brandName = nameParts[0];
        }
    }
    brandName = brandName || 'Unknown';
    var brandSegment = (_c = apiWatch.brand) === null || _c === void 0 ? void 0 : _c.segment;
    var watchIndex = (brandSegment === 'A' || brandSegment === 'B' || brandSegment === 'C')
        ? brandSegment
        : 'A';
    var fullTitle = (brandName + " " + watchTitle).trim();
    var analytics = apiWatch.analytics;
    return {
        id: apiWatch.id,
        title: fullTitle,
        slug: generateSlug(apiWatch.name),
        price: price,
        currency: currency,
        brand: brandName,
        index: watchIndex,
        image: imageUrl,
        chronoUrl: apiWatch.chronoUrl && apiWatch.chronoUrl.trim() !== '' ? apiWatch.chronoUrl : undefined,
        buttonLabel: 'Buy on Chrono24',
        trend: {
            value: (function () {
                var trendValue;
                if ((analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== undefined && (analytics === null || analytics === void 0 ? void 0 : analytics.trend90d) !== null &&
                    !isNaN(analytics.trend90d) && isFinite(analytics.trend90d)) {
                    trendValue = analytics.trend90d;
                }
                else {
                    trendValue = calculateTrend(price, defaultPrice).value;
                }
                if (isNaN(trendValue) || !isFinite(trendValue)) {
                    trendValue = 0;
                }
                return trendValue;
            })(),
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
        reference: apiWatch.ref || undefined,
        priceHistory: apiWatch.priceHistory
    };
}
exports.transformApiWatchFull = transformApiWatchFull;
function transformDealerOffers(dealerOffers, watchCondition, targetCurrency) {
    if (!dealerOffers || dealerOffers.length === 0) {
        return [];
    }
    return dealerOffers
        .filter(function (offer) { return offer && offer.dealer; })
        .map(function (offer) {
        var _a, _b, _c, _d, _e, _f;
        var offerCurrency = offer.currency || targetCurrency;
        var currencySymbol = convertCurrency(offerCurrency);
        var formatPrice = function (price) {
            return Math.round(price).toLocaleString('uk-UA', {
                useGrouping: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).replace(/\s/g, ' ').replace(/,/g, ' ');
        };
        var shippingText = offer.shippingPrice === 0
            ? 'Безкоштовна доставка'
            : "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0432\u0456\u0434 " + currencySymbol + formatPrice(offer.shippingPrice);
        var conditionText = watchCondition || 'Новий';
        var translateLocation = function (location) {
            if (!location)
                return '';
            var normalized = location.toLowerCase().trim();
            if (normalized === 'us' || normalized === 'usa' || normalized === 'united states') {
                return 'США';
            }
            var translationKey = catalog_1.catalogKeys.filterData.locations + "." + normalized;
            var translation = i18n_1.t(translationKey);
            if (translation !== translationKey)
                return translation;
            var capitalizedKey = catalog_1.catalogKeys.filterData.locations + "." + (normalized.charAt(0).toUpperCase() + normalized.slice(1));
            var capitalizedTranslation = i18n_1.t(capitalizedKey);
            if (capitalizedTranslation !== capitalizedKey)
                return capitalizedTranslation;
            return location;
        };
        return {
            id: offer.id,
            sellerName: ((_a = offer.dealer) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown Dealer',
            sellerLogo: ((_b = offer.dealer) === null || _b === void 0 ? void 0 : _b.logoUrl) || undefined,
            rating: ((_c = offer.dealer) === null || _c === void 0 ? void 0 : _c.rating) || 0,
            reviewsCount: ((_d = offer.dealer) === null || _d === void 0 ? void 0 : _d.reviewsCount) || 0,
            location: translateLocation(((_e = offer.dealer) === null || _e === void 0 ? void 0 : _e.location) || ''),
            details: conditionText,
            shipping: shippingText,
            price: formatPrice(offer.price),
            currency: currencySymbol,
            isSecure: ((_f = offer.dealer) === null || _f === void 0 ? void 0 : _f.isVerified) || false,
            buyUrl: offer.buyUrl || undefined
        };
    });
}
exports.transformDealerOffers = transformDealerOffers;

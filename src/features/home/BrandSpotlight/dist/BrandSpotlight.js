'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BrandSpotlight = void 0;
var react_1 = require("react");
var BrandSpotlight_module_css_1 = require("./BrandSpotlight.module.css");
var image_1 = require("next/image");
var watch_1 = require("../../../../public/watch");
var BrandCards_1 = require("@/components/Main/BrandSpotlight/BrandCards/BrandCards");
var watch_2 = require("@/mock/watch");
var i18n_1 = require("@/i18n");
var home_1 = require("@/i18n/keys/home");
var api_1 = require("@/lib/api");
var transformers_1 = require("@/lib/transformers");
var react_spinners_1 = require("react-spinners");
function getCurrencyFromStorage() {
    if (typeof window === 'undefined')
        return 'EUR';
    var stored = localStorage.getItem('selectedCurrency');
    var validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
    return stored && validCurrencies.includes(stored) ? stored : 'EUR';
}
var BRANDSPOTLIGHT_CACHE_PREFIX = 'brandspotlight-cache-';
var CACHE_TTL = 5 * 60 * 1000;
function getBrandSpotlightCacheKey(currency) {
    return "" + BRANDSPOTLIGHT_CACHE_PREFIX + currency;
}
function getCachedBrandSpotlight(currency) {
    if (typeof window === 'undefined')
        return null;
    try {
        var cacheKey = getBrandSpotlightCacheKey(currency);
        var cached = localStorage.getItem(cacheKey);
        if (!cached)
            return null;
        var _a = JSON.parse(cached), data = _a.data, timestamp = _a.timestamp;
        var now = Date.now();
        if (now - timestamp > CACHE_TTL) {
            localStorage.removeItem(cacheKey);
            return null;
        }
        return data;
    }
    catch (_b) {
        return null;
    }
}
function setCachedBrandSpotlight(currency, brandData) {
    if (typeof window === 'undefined')
        return;
    try {
        var cacheKey = getBrandSpotlightCacheKey(currency);
        var cacheData = {
            data: brandData,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
    catch (_a) {
        // Silent fail
    }
}
function convertWatchItemToIWatch(watch, index) {
    var _a;
    var imageUrl = typeof watch.image === 'string' ? watch.image : ((_a = watch.image) === null || _a === void 0 ? void 0 : _a.src) || '';
    return {
        id: parseInt(watch.id.replace(/\D/g, '')) || index + 1,
        originalId: watch.id,
        watchItem: watch,
        slug: watch.slug,
        title: watch.title,
        image: imageUrl,
        brand: watch.brand,
        price: watch.price,
        rating: Math.abs(watch.trend.value) % 11,
        changePercent: watch.trend.value,
        chartData: watch.priceHistory && watch.priceHistory.length >= 2
            ? __spreadArrays(watch.priceHistory).sort(function (a, b) {
                return new Date(a.recordedAt).getTime() -
                    new Date(b.recordedAt).getTime();
            })
                .map(function (record) { return record.price; })
            : [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
        chartColor: watch.trend.value > 0 ? '#22c55e' : '#EED09D',
        chartId: "brand-chart-" + watch.id,
        index: watch.index
    };
}
exports.BrandSpotlight = function () {
    var _a = react_1.useState({ brand: 'Rolex', watches: [] }), brandData = _a[0], setBrandData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        var loadBrandWatches = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currency_1, cachedData, data, firstBrand, transformed, iWatchItems, brandData_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError(null);
                        currency_1 = getCurrencyFromStorage();
                        cachedData = getCachedBrandSpotlight(currency_1);
                        if (cachedData) {
                            setBrandData(cachedData);
                            setLoading(false);
                        }
                        return [4 /*yield*/, api_1.getPopularWatchesByBrand(currency_1)];
                    case 1:
                        data = _a.sent();
                        if (data.length === 0) {
                            setBrandData({ brand: 'Rolex', watches: watch_2.mockTrending });
                            return [2 /*return*/];
                        }
                        firstBrand = data[0];
                        transformed = firstBrand.watches.map(function (watch) {
                            return transformers_1.transformApiWatchFull(watch, currency_1);
                        });
                        iWatchItems = transformed.map(function (watch, index) {
                            return convertWatchItemToIWatch(watch, index);
                        });
                        brandData_1 = {
                            brand: firstBrand.brand,
                            watches: iWatchItems
                        };
                        setBrandData(brandData_1);
                        setCachedBrandSpotlight(currency_1, brandData_1);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to load watches');
                        setBrandData({ brand: 'Rolex', watches: watch_2.mockTrending });
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadBrandWatches();
        var handleCurrencyChange = function () {
            loadBrandWatches();
        };
        window.addEventListener('currencyChanged', handleCurrencyChange);
        window.addEventListener('storage', handleCurrencyChange);
        return function () {
            window.removeEventListener('currencyChanged', handleCurrencyChange);
            window.removeEventListener('storage', handleCurrencyChange);
        };
    }, []);
    return (react_1["default"].createElement("section", { id: 'brand', className: BrandSpotlight_module_css_1["default"].brand + " flex justify-center", suppressHydrationWarning: true },
        react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].brandWrap + " max-w-[90rem] flex flex-col items-center px-5 md:px-10 lg:px-15 xl:px-25 py-9 md:py-6 lg:py-5.5" },
            react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].brandTitle + " flex justify-center w-full mb-6 lg:mb-0" }, "Brand Spotlight"),
            react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].brandContainer + " flex flex-col lg:flex-row lg:gap-8 xl:gap-12.5 mb-6 lg:mb-0" },
                react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].brandDescription + " flex flex-col md:flex-row lg:flex-col items-center lg:justify-end gap-3 md:gap-6 md:px-4 lg:px-1 lg:gap-3 lg:max-w-[15.5rem]" },
                    react_1["default"].createElement(image_1["default"], { src: watch_1.RolexBrand, alt: brandData.brand, width: 155, height: 86, className: 'w-[9.75rem] block lg:hidden ' }),
                    react_1["default"].createElement(image_1["default"], { src: watch_1.RolexBrandDark, alt: brandData.brand, width: 155, height: 86, className: 'w-[8.75rem] hidden lg:block' }),
                    react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].DescriptionBrand + " flex flex-col items-center gap-3" },
                        react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].BrandName + " text-center md:w-full md:text-start lg:text-center" }, brandData.brand),
                        react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].BrandDescription + " text-center md:text-start" }, i18n_1.t(home_1.brandSpotlightKeys.description))),
                    react_1["default"].createElement("button", { className: BrandSpotlight_module_css_1["default"].brandViewAllBtn + " hidden lg:block py-4 rounded-xl w-full max-w-[28.25rem] text-center" }, i18n_1.t(home_1.brandSpotlightKeys.viewAll))),
                react_1["default"].createElement("div", { className: BrandSpotlight_module_css_1["default"].brandCards + " mt-8 w-full" }, loading ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                    react_1["default"].createElement(react_spinners_1.ClockLoader, { size: 60, color: '#04694f', speedMultiplier: 0.9 }))) : error && brandData.watches.length === 0 ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                    react_1["default"].createElement("div", { className: 'text-red-500' },
                        "Error: ",
                        error))) : (react_1["default"].createElement(BrandCards_1.BrandCards, { items: brandData.watches })))),
            react_1["default"].createElement("button", { className: BrandSpotlight_module_css_1["default"].brandViewAllBtn + " px-10 py-4 rounded-xl w-full max-w-[28.25rem] lg:hidden" }, i18n_1.t(home_1.brandSpotlightKeys.viewAll)))));
};

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
exports.__esModule = true;
exports.Trending = void 0;
var react_1 = require("react");
var Trending_module_css_1 = require("./Trending.module.css");
var ThemedText_1 = require("@/components/ThemedText/ThemedText");
var api_1 = require("@/lib/api");
var transformers_1 = require("@/lib/transformers");
var ProductCarousel_1 = require("@/components/ProductsTable/ProductCarousel/ProductCarousel");
var Icon_1 = require("../../../../public/social/Icon");
var i18n_1 = require("@/i18n");
var home_1 = require("@/i18n/keys/home");
var watch_1 = require("@/mock/watch");
var react_spinners_1 = require("react-spinners");
function getCurrencyFromStorage() {
    if (typeof window === 'undefined')
        return 'EUR';
    var stored = localStorage.getItem('selectedCurrency');
    if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
        return stored;
    }
    return 'EUR';
}
var TRENDING_CACHE_PREFIX = 'trending-cache-';
var CACHE_TTL = 5 * 60 * 1000;
function getTrendingCacheKey(currency, filterType) {
    return "" + TRENDING_CACHE_PREFIX + currency + "-" + filterType;
}
function getCachedTrending(currency, filterType) {
    if (typeof window === 'undefined')
        return null;
    try {
        var cacheKey = getTrendingCacheKey(currency, filterType);
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
function setCachedTrending(currency, filterType, watches) {
    if (typeof window === 'undefined')
        return;
    try {
        var cacheKey = getTrendingCacheKey(currency, filterType);
        var cacheData = {
            data: watches,
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
        slug: watch.slug,
        title: watch.title,
        image: imageUrl,
        brand: watch.brand,
        price: watch.price,
        rating: Math.abs(watch.trend.value) % 11,
        changePercent: Math.round(watch.trend.value * 10) / 10,
        chartData: [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7],
        chartColor: watch.trend.value > 0 ? '#22c55e' : '#EED09D',
        chartId: "trending-chart-" + watch.id,
        index: watch.index
    };
}
exports.Trending = function () {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    var menuRef = react_1.useRef(null);
    var _b = react_1.useState([]), watches = _b[0], setWatches = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var _e = react_1.useState('popular'), filterType = _e[0], setFilterType = _e[1];
    react_1.useEffect(function () {
        var loadPopularWatches = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currency_1, cachedWatches, data, transformed, iWatchItems, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError(null);
                        currency_1 = getCurrencyFromStorage();
                        cachedWatches = getCachedTrending(currency_1, filterType);
                        if (cachedWatches && cachedWatches.length > 0) {
                            setWatches(cachedWatches);
                        }
                        return [4 /*yield*/, api_1.getPopularWatches(filterType, currency_1)];
                    case 1:
                        data = _a.sent();
                        if (!data || data.length === 0) {
                            setError('No watches found');
                            setWatches(watch_1.mockTrending);
                            setLoading(false);
                            return [2 /*return*/];
                        }
                        transformed = data
                            .filter(function (item) { return item && item.id; })
                            .map(function (item) {
                            try {
                                return transformers_1.transformApiWatchFull(item, currency_1);
                            }
                            catch (_a) {
                                return null;
                            }
                        })
                            .filter(function (watch) { return watch !== null; });
                        iWatchItems = transformed.map(function (watch, index) {
                            return convertWatchItemToIWatch(watch, index);
                        });
                        setWatches(iWatchItems);
                        setCachedTrending(currency_1, filterType, iWatchItems);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to load watches');
                        setWatches(watch_1.mockTrending);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadPopularWatches();
        var handleStorageChange = function () {
            loadPopularWatches();
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('currencyChanged', handleStorageChange);
        return function () {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('currencyChanged', handleStorageChange);
        };
    }, [filterType]);
    var toggleMenu = function () { return setOpen(function (prev) { return !prev; }); };
    react_1.useEffect(function () {
        var handleClick = function (e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return function () { return document.removeEventListener('mousedown', handleClick); };
    }, []);
    return (react_1["default"].createElement("section", { id: 'treands', className: Trending_module_css_1["default"].trending + " max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6.25rem] pt-6 lg:pt-12 pb-10 lg:pb-16", suppressHydrationWarning: true },
        react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingContainer },
            react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingTitle + " relative flex mb-6 lg:mb-[30xp] justify-between items-center" },
                react_1["default"].createElement(ThemedText_1.ThemedText, { type: 'h2' }, "Trending now"),
                react_1["default"].createElement("div", { ref: menuRef, className: 'relative' },
                    react_1["default"].createElement(Icon_1.SettingsIcon, { onClick: toggleMenu, className: 'mr-2 w-[24px] h-[24px] cursor-pointer' }),
                    react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingSettings + " absolute right-[-10px] top-[-8px] z-10 min-w-[12.5rem] flex flex-col text-center rounded-xl border-1 transition-all duration-300 " + (open
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95 pointer-events-none') },
                        react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingSettingsItem + " py-2 px-5 flex items-center justify-end gap-6 border-b cursor-pointer", onClick: function () {
                                setFilterType('trend90');
                                toggleMenu();
                            } },
                            react_1["default"].createElement("span", null, i18n_1.t(home_1.trendingKeys.sort.trend)),
                            react_1["default"].createElement(Icon_1.SettingsIcon, { className: 'w-[24px] h-[24px] cursor-pointer' })),
                        react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingSettingsItem + " py-2 border-b cursor-pointer", onClick: function () {
                                setFilterType('liquidity');
                                toggleMenu();
                            } },
                            react_1["default"].createElement("span", null, i18n_1.t(home_1.trendingKeys.sort.price))),
                        react_1["default"].createElement("div", { className: Trending_module_css_1["default"].trendingSettingsItem + " py-2 cursor-pointer", onClick: function () {
                                setFilterType('popular');
                                toggleMenu();
                            } },
                            react_1["default"].createElement("span", null, i18n_1.t(home_1.trendingKeys.sort.rating)))))),
            loading ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                react_1["default"].createElement(react_spinners_1.ClockLoader, { size: 60, color: '#04694f', speedMultiplier: 0.9 }))) : error && watches.length === 0 ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                react_1["default"].createElement("div", { className: 'text-red-500' },
                    "Error: ",
                    error))) : (react_1["default"].createElement(ProductCarousel_1.ProductCarousel, { items: watches, ctaLabel: i18n_1.t(home_1.trendingKeys.carousel.cta) })))));
};

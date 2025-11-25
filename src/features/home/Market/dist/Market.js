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
exports.Market = void 0;
var react_1 = require("react");
var Market_module_css_1 = require("./Market.module.css");
var ThemedText_1 = require("@/components/ThemedText/ThemedText");
var MarketCard_1 = require("@/components/Main/Market/MarketCard/MarketCard");
var MarketTotal_1 = require("@/components/Main/Market/MarketCard/MarketTotal");
var api_1 = require("@/lib/api");
var transformers_1 = require("@/lib/transformers");
function getCurrencyFromStorage() {
    if (typeof window === 'undefined')
        return 'EUR';
    var stored = localStorage.getItem('selectedCurrency');
    if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
        return stored;
    }
    return 'EUR';
}
var MARKET_CACHE_PREFIX = 'market-cache-';
var CACHE_TTL = 5 * 60 * 1000;
function getMarketCacheKey(currency) {
    return "" + MARKET_CACHE_PREFIX + currency;
}
function getCachedMarket(currency) {
    if (typeof window === 'undefined')
        return null;
    try {
        var cacheKey = getMarketCacheKey(currency);
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
function setCachedMarket(currency, watch) {
    if (typeof window === 'undefined')
        return;
    try {
        var cacheKey = getMarketCacheKey(currency);
        var cacheData = {
            data: watch,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
    catch (_a) {
        // Silent fail
    }
}
var MARKET_STABLE_CACHE_PREFIX = 'market-stable-cache-';
function getCachedStable(currency) {
    if (typeof window === 'undefined')
        return null;
    try {
        var cacheKey = "" + MARKET_STABLE_CACHE_PREFIX + currency;
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
function setCachedStable(currency, watch) {
    if (typeof window === 'undefined')
        return;
    try {
        var cacheKey = "" + MARKET_STABLE_CACHE_PREFIX + currency;
        var cacheData = {
            data: watch,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
    catch (_a) {
        // Silent fail
    }
}
function convertWatchToMarketCard(watch, title, chartId) {
    var _a, _b;
    if (!watch)
        return null;
    var imageUrl = typeof watch.image === 'string' ? watch.image : ((_a = watch.image) === null || _a === void 0 ? void 0 : _a.src) || '';
    var changePercent = ((_b = watch.trend) === null || _b === void 0 ? void 0 : _b.value) ? Math.round(watch.trend.value * 10) / 10
        : 0;
    var chartData = [2.7, 2.4, 2.5, 3, 2.7, 3.2, 2.7];
    return {
        id: parseInt(watch.id.replace(/\D/g, '')) || 1,
        slug: watch.slug,
        title: title,
        image: imageUrl,
        brand: watch.title || watch.brand,
        price: watch.price,
        rating: Math.abs(changePercent) % 11,
        changePercent: changePercent,
        chartData: chartData,
        chartColor: changePercent > 0 ? '#22c55e' : '#EED09D',
        chartId: chartId,
        index: watch.index
    };
}
exports.Market = function () {
    var _a = react_1.useState(0), activeIndex = _a[0], setActiveIndex = _a[1];
    var _b = react_1.useState(false), isDesktop = _b[0], setIsDesktop = _b[1];
    var swipeRef = react_1.useRef(null);
    var _c = react_1.useState(null), topGainer90d = _c[0], setTopGainer90d = _c[1];
    var _d = react_1.useState(null), stable90d = _d[0], setStable90d = _d[1];
    var _e = react_1.useState(true), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(null), error = _f[0], setError = _f[1];
    react_1.useEffect(function () {
        var loadMarketData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currency, cachedTop, cachedStable, _a, trending90d, stable, transformed, transformed, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError(null);
                        currency = getCurrencyFromStorage();
                        cachedTop = getCachedMarket(currency);
                        cachedStable = getCachedStable(currency);
                        if (cachedTop)
                            setTopGainer90d(cachedTop);
                        if (cachedStable)
                            setStable90d(cachedStable);
                        if (cachedTop || cachedStable) {
                            setLoading(false);
                        }
                        return [4 /*yield*/, Promise.all([
                                api_1.getTrendingWatch90d(currency),
                                api_1.getStableWatch(currency),
                            ])];
                    case 1:
                        _a = _b.sent(), trending90d = _a[0], stable = _a[1];
                        if (trending90d) {
                            transformed = transformers_1.transformApiWatchFull(trending90d, currency);
                            setTopGainer90d(transformed);
                            setCachedMarket(currency, transformed);
                        }
                        if (stable) {
                            transformed = transformers_1.transformApiWatchFull(stable, currency);
                            setStable90d(transformed);
                            setCachedStable(currency, transformed);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _b.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to load data');
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadMarketData();
        var handleStorageChange = function () {
            loadMarketData();
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('currencyChanged', handleStorageChange);
        return function () {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('currencyChanged', handleStorageChange);
        };
    }, []);
    react_1.useEffect(function () {
        var checkSize = function () { return setIsDesktop(window.innerWidth >= 768); };
        checkSize();
        window.addEventListener('resize', checkSize);
        return function () { return window.removeEventListener('resize', checkSize); };
    }, []);
    var desktopCards = __spreadArrays((topGainer90d
        ? (function () {
            var marketCard = convertWatchToMarketCard(topGainer90d, 'Top Gainers 90d', 'market-gainer-90d-desktop');
            return marketCard
                ? [
                    {
                        type: 'card',
                        content: (react_1["default"].createElement(MarketCard_1.MarketCard, __assign({ key: 'desktop-gainer-90d' }, marketCard, { priority: true })))
                    },
                ]
                : [];
        })()
        : []), (stable90d
        ? (function () {
            var marketCard = convertWatchToMarketCard(stable90d, 'Stable Picks 90d', 'market-stable-90d-desktop');
            return marketCard
                ? [
                    {
                        type: 'card',
                        content: (react_1["default"].createElement(MarketCard_1.MarketCard, __assign({ key: 'desktop-stable-90d' }, marketCard)))
                    },
                ]
                : [];
        })()
        : []), [
        {
            type: 'total',
            content: (react_1["default"].createElement(MarketTotal_1.MarketTotal, { key: 'desktop-total', title: 'Liquidity Leaders', deals: 120, amount: 12545000, chartData: [7, 6, 7, 6, 7.5, 7, 8], chartId: 'market-total-desktop' }))
        },
    ]);
    var mobileCards = __spreadArrays((topGainer90d
        ? (function () {
            var marketCard = convertWatchToMarketCard(topGainer90d, 'Top Gainers 90d', 'market-gainer-90d-mobile');
            return marketCard
                ? [
                    {
                        type: 'card',
                        content: (react_1["default"].createElement(MarketCard_1.MarketCard, __assign({ key: 'mobile-gainer-90d' }, marketCard)))
                    },
                ]
                : [];
        })()
        : []), (stable90d
        ? (function () {
            var marketCard = convertWatchToMarketCard(stable90d, 'Stable Picks 90d', 'market-stable-90d-mobile');
            return marketCard
                ? [
                    {
                        type: 'card',
                        content: (react_1["default"].createElement(MarketCard_1.MarketCard, __assign({ key: 'mobile-stable-90d' }, marketCard)))
                    },
                ]
                : [];
        })()
        : []), [
        {
            type: 'total',
            content: (react_1["default"].createElement(MarketTotal_1.MarketTotal, { key: 'mobile-total', title: 'Liquidity Leaders', deals: 120, amount: 12545000, chartData: [7, 6, 7, 6, 7.5, 7, 8], chartId: 'market-total-mobile' }))
        },
    ]);
    var scrollToIndex = function (idx) {
        var el = swipeRef.current;
        if (!el)
            return;
        var viewport = el.clientWidth;
        el.scrollTo({ left: idx * viewport, behavior: 'smooth' });
    };
    react_1.useEffect(function () {
        if (isDesktop)
            return;
        var el = swipeRef.current;
        if (!el)
            return;
        var isDown = false;
        var startX = 0;
        var startScroll = 0;
        var pointerId = null;
        var onDown = function (e) {
            var _a, _b;
            isDown = true;
            startX = e.clientX;
            startScroll = el.scrollLeft;
            pointerId = e.pointerId;
            (_b = (_a = e.target).setPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, e.pointerId);
        };
        var onMove = function (e) {
            if (!isDown)
                return;
            el.scrollLeft = startScroll - (e.clientX - startX);
        };
        var onUp = function (e) {
            var _a, _b;
            if (!isDown)
                return;
            isDown = false;
            if (pointerId !== null) {
                try {
                    (_b = (_a = e.target).releasePointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, pointerId);
                }
                catch (_c) { }
                pointerId = null;
            }
            var viewport = el.clientWidth;
            var idx = Math.round(el.scrollLeft / viewport);
            setActiveIndex(idx);
            scrollToIndex(idx);
        };
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onUp);
        return function () {
            el.removeEventListener('pointerdown', onDown);
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onUp);
        };
    }, [isDesktop]);
    react_1.useEffect(function () {
        if (isDesktop)
            return;
        var el = swipeRef.current;
        if (!el)
            return;
        var raf = 0;
        var onScroll = function () {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(function () {
                var viewport = el.clientWidth;
                var idx = Math.round(el.scrollLeft / viewport);
                if (idx !== activeIndex)
                    setActiveIndex(idx);
            });
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        return function () {
            el.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [isDesktop, activeIndex]);
    return (react_1["default"].createElement("section", { id: 'market', className: Market_module_css_1["default"].market + " max-w-[90rem] mx-auto px-[1.25rem] lg:px-[6.25rem] pt-6 lg:pt-12 pb-10 lg:pb-16" },
        react_1["default"].createElement("div", { className: "" + Market_module_css_1["default"].marketContainer },
            react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketTitle + " mb-6" },
                react_1["default"].createElement(ThemedText_1.ThemedText, { type: 'h2' }, "Market overview")),
            loading ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                react_1["default"].createElement("div", { className: 'text-gray-500' }, "Loading..."))) : error ? (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-12' },
                react_1["default"].createElement("div", { className: 'text-red-500' },
                    "Error: ",
                    error))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketContent + " hidden md:grid md:grid-cols-3 gap-6" }, desktopCards.map(function (card) { return card.content; })),
                react_1["default"].createElement("div", { className: 'md:hidden' },
                    react_1["default"].createElement("div", { ref: swipeRef, className: Market_module_css_1["default"].marketContent + " flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth " + Market_module_css_1["default"].swipe + " " + Market_module_css_1["default"].noScrollbar }, mobileCards.map(function (card, idx) { return (react_1["default"].createElement("div", { key: "mob-" + idx, className: 'flex justify-center snap-start shrink-0', style: { flex: '0 0 100%', maxWidth: '100%' } }, card.content)); })),
                    react_1["default"].createElement("div", { className: 'flex gap-2 justify-center mt-4' }, mobileCards.map(function (_, idx) { return (react_1["default"].createElement("button", { key: idx, onClick: function () { return scrollToIndex(idx); }, className: "w-2 h-2 rounded-full transition-all " + (activeIndex === idx
                            ? 'bg-[#04694F] scale-110'
                            : 'bg-gray-300'), "aria-label": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0442\u043E\u0432\u0430\u0440 " + (idx + 1) })); }))))))));
};

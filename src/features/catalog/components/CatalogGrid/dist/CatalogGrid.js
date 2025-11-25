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
exports.CatalogGrid = void 0;
var react_1 = require("react");
var react_spinners_1 = require("react-spinners");
var WatchCard_1 = require("@/features/catalog/components/CatalogGrid/WatchCard/WatchCard");
var EmptyState_1 = require("@/features/catalog/components/CatalogGrid/EmptyState/EmptyState");
var WishlistContext_1 = require("@/context/WishlistContext");
var i18n_1 = require("@/i18n");
var catalog_1 = require("@/i18n/keys/catalog");
var WatchCardSkeleton_1 = require("@/features/catalog/components/CatalogGrid/WatchCard/WatchCardSkeleton");
exports.CatalogGrid = function (_a) {
    var items = _a.items, _b = _a.initialCount, initialCount = _b === void 0 ? 30 : _b, onResetFilters = _a.onResetFilters, onAskGeni = _a.onAskGeni, onOpenFeedback = _a.onOpenFeedback, onLoadMore = _a.onLoadMore, _c = _a.hasMore, hasMore = _c === void 0 ? false : _c, _d = _a.loading, loading = _d === void 0 ? false : _d;
    var _e = react_1.useState(false), showAll = _e[0], setShowAll = _e[1];
    var _f = react_1.useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var sentinelRef = react_1.useRef(null);
    var isLoadingRef = react_1.useRef(false);
    var _g = WishlistContext_1.useWishlistContext(), isInWishlist = _g.isInWishlist, addToWishlist = _g.addToWishlist, removeFromWishlist = _g.removeFromWishlist;
    react_1.useEffect(function () {
        if (!hasMore && items.length > initialCount) {
            setShowAll(true);
        }
    }, [hasMore, items.length, initialCount]);
    var visible = react_1.useMemo(function () {
        if (hasMore) {
            return items;
        }
        if (!showAll && items.length > initialCount) {
            return items.slice(0, initialCount);
        }
        return items;
    }, [items, hasMore, showAll, initialCount]);
    var handleToggleLike = function (id) {
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        }
        else {
            var watch = items.find(function (item) { return item.id === id; });
            if (watch) {
                addToWishlist(watch);
            }
        }
    };
    react_1.useEffect(function () {
        if (!hasMore)
            return;
        if (!onLoadMore)
            return;
        var el = sentinelRef.current;
        if (!el)
            return;
        var io = new IntersectionObserver(function (entries) { return __awaiter(void 0, void 0, void 0, function () {
            var entry, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = entries[0];
                        if (!entry.isIntersecting)
                            return [2 /*return*/];
                        if (isLoading || isLoadingRef.current)
                            return [2 /*return*/];
                        isLoadingRef.current = true;
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, onLoadMore()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error loading more watches:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        isLoadingRef.current = false;
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); }, { root: null, rootMargin: '120px', threshold: 0.01 });
        io.observe(el);
        return function () { return io.disconnect(); };
    }, [hasMore, onLoadMore, isLoading]);
    if (loading && items.length === 0) {
        return (react_1["default"].createElement("div", { className: 'grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4' }, Array.from({ length: 12 }).map(function (_, index) { return (react_1["default"].createElement(WatchCardSkeleton_1.WatchCardSkeleton, { key: "skeleton-" + index })); })));
    }
    if (items.length === 0) {
        return (react_1["default"].createElement(EmptyState_1.EmptyState, { onResetFilters: onResetFilters || (function () { }), onAskGeni: onAskGeni || (function () { }) }));
    }
    var canCollapse = !hasMore && items.length > initialCount;
    var showButton = (hasMore && !!onLoadMore) || canCollapse;
    var buttonText = '';
    var ariaLabel = '';
    if (hasMore) {
        buttonText = i18n_1.t(catalog_1.catalogKeys.page.showMore);
        ariaLabel = 'Показати більше годинників';
    }
    else if (canCollapse && showAll) {
        buttonText = i18n_1.t(catalog_1.catalogKeys.page.showLess);
        ariaLabel = 'Згорнути список годинників';
    }
    else if (canCollapse && !showAll) {
        buttonText = i18n_1.t(catalog_1.catalogKeys.page.showMore);
        ariaLabel = 'Показати більше годинників';
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: 'grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4' }, visible.map(function (item, index) { return (react_1["default"].createElement(WatchCard_1.WatchCard, { key: item.id, item: item, liked: isInWishlist(item.id), onToggleLike: handleToggleLike, onOpenFeedback: onOpenFeedback, priority: index === 0 })); })),
        showButton && (react_1["default"].createElement("div", { className: 'flex justify-center mt-6' },
            react_1["default"].createElement("button", { onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (isLoading)
                                    return [2 /*return*/];
                                if (!(hasMore && onLoadMore && !isLoadingRef.current)) return [3 /*break*/, 6];
                                isLoadingRef.current = true;
                                setIsLoading(true);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, 4, 5]);
                                return [4 /*yield*/, onLoadMore()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 3:
                                error_2 = _a.sent();
                                console.error('Error loading more watches:', error_2);
                                return [3 /*break*/, 5];
                            case 4:
                                isLoadingRef.current = false;
                                setIsLoading(false);
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                            case 6:
                                if (canCollapse) {
                                    setShowAll(function (prev) { return !prev; });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, disabled: isLoading, className: 'w-full text-center text-[20px] text-[#8b8b8b] underline cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2', "aria-label": ariaLabel }, isLoading ? (react_1["default"].createElement(react_spinners_1.ClipLoader, { size: 24, color: '#04694f', speedMultiplier: 0.9 })) : (react_1["default"].createElement(react_1["default"].Fragment, null, buttonText))))),
        hasMore && onLoadMore && react_1["default"].createElement("div", { ref: sentinelRef, style: { height: 1 } })));
};

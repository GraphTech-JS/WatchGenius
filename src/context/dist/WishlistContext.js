'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useWishlistContext = exports.WishlistProvider = void 0;
var react_1 = require("react");
var api_1 = require("@/lib/api");
var transformers_1 = require("@/lib/transformers");
var Toast_1 = require("@/components/Toast/Toast");
var i18n_1 = require("@/i18n");
var wishlist_1 = require("@/i18n/keys/wishlist");
var MAX_WISHLIST_ITEMS = 3;
var WishlistContext = react_1.createContext(undefined);
var wishlistReducer = function (state, action) {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return state.some(function (item) { return item.id === action.payload.id; })
                ? state
                : __spreadArrays(state, [action.payload]);
        case 'REMOVE_FROM_WISHLIST':
            return state.filter(function (item) { return item.id !== action.payload; });
        case 'CLEAR_WISHLIST':
            return [];
        case 'SET_ITEMS':
            return action.payload;
        default:
            return state;
    }
};
exports.WishlistProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useReducer(wishlistReducer, []), wishlistItems = _b[0], dispatch = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var _e = react_1.useState(false), showToast = _e[0], setShowToast = _e[1];
    var _f = react_1.useState(''), toastMessage = _f[0], setToastMessage = _f[1];
    var wishlistIds = react_1.useMemo(function () { return wishlistItems.map(function (item) { return item.id; }); }, [wishlistItems]);
    react_1.useEffect(function () {
        if (typeof window === 'undefined') {
            return;
        }
        var saved = localStorage.getItem('wishlist-watches');
        if (!saved) {
            return;
        }
        try {
            var parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) {
                return;
            }
            var cachedItems_1 = [];
            var ids = [];
            if (parsed.length > 0) {
                if (typeof parsed[0] === 'string') {
                    ids = parsed.filter(function (item) { return typeof item === 'string'; });
                }
                else {
                    cachedItems_1 = parsed.filter(function (item) {
                        return typeof item === 'object' && item !== null && 'id' in item;
                    });
                    ids = cachedItems_1.map(function (item) { return item.id; });
                }
            }
            if (ids.length === 0) {
                return;
            }
            if (cachedItems_1.length > 0) {
                var itemsToShow = cachedItems_1.slice(0, MAX_WISHLIST_ITEMS);
                dispatch({ type: 'SET_ITEMS', payload: itemsToShow });
            }
            setLoading(true);
            setError(null);
            api_1.getWatchesByIds(ids, 'EUR')
                .then(function (apiWatches) {
                var transformed = apiWatches.map(function (watch) {
                    return transformers_1.transformApiWatchFull(watch, 'EUR');
                });
                if (transformed.length > MAX_WISHLIST_ITEMS) {
                    dispatch({
                        type: 'SET_ITEMS',
                        payload: transformed.slice(0, MAX_WISHLIST_ITEMS)
                    });
                }
                else {
                    dispatch({ type: 'SET_ITEMS', payload: transformed });
                }
            })["catch"](function (err) {
                console.error('Failed to load wishlist from API:', err);
                if (cachedItems_1.length === 0) {
                    setError(err instanceof Error ? err.message : 'Failed to load wishlist');
                }
            })["finally"](function () {
                setLoading(false);
            });
        }
        catch (error) {
            console.error('Failed to parse wishlist data:', error);
            setError('Failed to load wishlist data');
        }
    }, []);
    react_1.useEffect(function () {
        if (typeof window === 'undefined')
            return;
        if (wishlistItems.length === 0) {
            localStorage.removeItem('wishlist-watches');
            return;
        }
        localStorage.setItem('wishlist-watches', JSON.stringify(wishlistItems));
    }, [wishlistItems]);
    var addToWishlist = react_1.useCallback(function (watch) {
        if (wishlistItems.length >= MAX_WISHLIST_ITEMS) {
            setToastMessage(i18n_1.t(wishlist_1.wishlistKeys.toast.maxItems));
            setShowToast(true);
            return;
        }
        else if (typeof watch === 'string') {
            var id = watch;
            if (wishlistIds.includes(id))
                return;
            api_1.getWatchById(id, 'EUR')
                .then(function (apiWatch) {
                var transformed = transformers_1.transformApiWatchFull(apiWatch, 'EUR');
                dispatch({ type: 'ADD_TO_WISHLIST', payload: transformed });
            })["catch"](function (err) {
                console.error('❌ [Wishlist] Failed to add watch:', err);
                setError(err instanceof Error ? err.message : 'Failed to add watch');
            })["finally"](function () {
                setLoading(false);
            });
        }
        else {
            if (wishlistIds.includes(watch.id)) {
                return;
            }
            dispatch({ type: 'ADD_TO_WISHLIST', payload: watch });
        }
    }, [wishlistIds, wishlistItems.length]);
    var removeFromWishlist = react_1.useCallback(function (watchId) {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: watchId });
    }, []);
    var clearWishlist = react_1.useCallback(function () {
        dispatch({ type: 'CLEAR_WISHLIST' });
    }, []);
    var isInWishlist = react_1.useCallback(function (watchId) {
        return wishlistItems.some(function (item) { return item.id === watchId; });
    }, [wishlistItems]);
    var value = {
        wishlistItems: wishlistItems,
        wishlistIds: wishlistIds,
        loading: loading,
        error: error,
        addToWishlist: addToWishlist,
        removeFromWishlist: removeFromWishlist,
        clearWishlist: clearWishlist,
        isInWishlist: isInWishlist,
        showToast: showToast,
        toastMessage: toastMessage,
        setShowToast: setShowToast
    };
    return (react_1["default"].createElement(WishlistContext.Provider, { value: value },
        children,
        react_1["default"].createElement(Toast_1.Toast, { isVisible: showToast, message: toastMessage, onClose: function () { return setShowToast(false); }, duration: 3000 })));
};
exports.useWishlistContext = function () {
    var context = react_1.useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlistContext must be used within a WishlistProvider');
    }
    return context;
};

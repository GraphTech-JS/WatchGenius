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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useCatalogSearch = void 0;
var react_1 = require("react");
var useWatches_1 = require("@/hooks/useWatches");
var sorting_1 = require("@/types/sorting");
var sortingUtils_1 = require("@/utils/sortingUtils");
var api_1 = require("@/lib/api");
var i18n_1 = require("@/i18n");
var catalog_1 = require("@/i18n/keys/catalog");
function translateFilterValue(group, value) {
    var translationKeyMap = {
        'brand': catalog_1.catalogKeys.filterData.brands,
        'condition': catalog_1.catalogKeys.filterData.conditions,
        'mechanism': catalog_1.catalogKeys.filterData.mechanisms,
        'material': catalog_1.catalogKeys.filterData.materials,
        'document': catalog_1.catalogKeys.filterData.documents,
        'location': catalog_1.catalogKeys.filterData.locations,
        'index': null,
        'price': null,
        'year': null
    };
    var translationKey = translationKeyMap[group];
    if (!translationKey) {
        return value;
    }
    var fullKey = translationKey + "." + value;
    var translation = i18n_1.t(fullKey);
    return translation !== fullKey ? translation : value;
}
exports.useCatalogSearch = function () {
    var _a = react_1.useState(''), searchTerm = _a[0], setSearchTerm = _a[1];
    var _b = react_1.useState([]), selectedIndexes = _b[0], setSelectedIndexes = _b[1];
    var _c = react_1.useState(null), sidebarFilters = _c[0], setSidebarFilters = _c[1];
    var _d = react_1.useState(sorting_1.SortOption.DEFAULT), sortOption = _d[0], setSortOption = _d[1];
    var chipsRef = react_1.useRef(null);
    var _e = react_1.useState(0), chipsHeight = _e[0], setChipsHeight = _e[1];
    var _f = useWatches_1.useWatches(), watches = _f.watches, loadMore = _f.loadMore, hasMore = _f.hasMore, reloadWithFilters = _f.reloadWithFilters, loading = _f.loading;
    var activeFilters = react_1.useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var chips = [];
        selectedIndexes.forEach(function (idx) {
            chips.push({ id: "index:" + idx, group: 'index', value: idx, label: idx });
        });
        if ((_a = sidebarFilters === null || sidebarFilters === void 0 ? void 0 : sidebarFilters.selectedIndexes) === null || _a === void 0 ? void 0 : _a.length) {
            sidebarFilters.selectedIndexes.forEach(function (idx) {
                chips.push({ id: "sb-index:" + idx, group: 'index', value: idx, label: idx });
            });
        }
        if (sidebarFilters) {
            var f = sidebarFilters;
            (_b = f.selectedBrands) === null || _b === void 0 ? void 0 : _b.forEach(function (b) {
                return chips.push({
                    id: "brand:" + b,
                    group: 'brand',
                    value: b,
                    label: translateFilterValue('brand', b)
                });
            });
            (_c = f.selectedConditions) === null || _c === void 0 ? void 0 : _c.forEach(function (c) {
                return chips.push({
                    id: "condition:" + c,
                    group: 'condition',
                    value: c,
                    label: translateFilterValue('condition', c)
                });
            });
            (_d = f.selectedMechanisms) === null || _d === void 0 ? void 0 : _d.forEach(function (m) {
                return chips.push({
                    id: "mechanism:" + m,
                    group: 'mechanism',
                    value: m,
                    label: translateFilterValue('mechanism', m)
                });
            });
            (_e = f.selectedMaterials) === null || _e === void 0 ? void 0 : _e.forEach(function (m) {
                return chips.push({
                    id: "material:" + m,
                    group: 'material',
                    value: m,
                    label: translateFilterValue('material', m)
                });
            });
            (_f = f.selectedDocuments) === null || _f === void 0 ? void 0 : _f.forEach(function (d) {
                return chips.push({
                    id: "document:" + d,
                    group: 'document',
                    value: d,
                    label: translateFilterValue('document', d)
                });
            });
            (_g = f.selectedLocations) === null || _g === void 0 ? void 0 : _g.forEach(function (l) {
                return chips.push({
                    id: "location:" + l,
                    group: 'location',
                    value: l,
                    label: translateFilterValue('location', l)
                });
            });
            if (f.priceFrom !== '0' || f.priceTo !== '50000') {
                chips.push({
                    id: "price:" + f.priceFrom + "-" + f.priceTo,
                    group: 'price',
                    value: f.priceFrom + "-" + f.priceTo,
                    label: "\u20AC " + f.priceFrom + "\u2013" + f.priceTo
                });
            }
            if (f.yearFrom !== '2000' || f.yearTo !== '2005') {
                chips.push({
                    id: "year:" + f.yearFrom + "-" + f.yearTo,
                    group: 'year',
                    value: f.yearFrom + "-" + f.yearTo,
                    label: "\u0420\u0456\u043A " + f.yearFrom + "\u2013" + f.yearTo
                });
            }
        }
        return chips;
    }, [selectedIndexes, sidebarFilters]);
    var removeFrom = function (arr, v) {
        if (arr === void 0) { arr = []; }
        return arr.filter(function (x) { return x !== v; });
    };
    var removeFilter = react_1.useCallback(function (chip) {
        if (chip.group === 'index') {
            setSelectedIndexes(function (prev) { return prev.filter(function (i) { return i !== chip.value; }); });
            setSidebarFilters(function (prev) {
                var _a;
                if (!prev)
                    return prev;
                if (!((_a = prev.selectedIndexes) === null || _a === void 0 ? void 0 : _a.includes(chip.value)))
                    return prev;
                return __assign(__assign({}, prev), { selectedIndexes: prev.selectedIndexes.filter(function (i) { return i !== chip.value; }) });
            });
            return;
        }
        setSidebarFilters(function (prev) {
            if (!prev)
                return prev;
            var f = __assign({}, prev);
            if (chip.group === 'brand')
                f.selectedBrands = removeFrom(f.selectedBrands, chip.value);
            if (chip.group === 'condition')
                f.selectedConditions = removeFrom(f.selectedConditions, chip.value);
            if (chip.group === 'mechanism')
                f.selectedMechanisms = removeFrom(f.selectedMechanisms, chip.value);
            if (chip.group === 'material')
                f.selectedMaterials = removeFrom(f.selectedMaterials, chip.value);
            if (chip.group === 'document')
                f.selectedDocuments = removeFrom(f.selectedDocuments, chip.value);
            if (chip.group === 'location')
                f.selectedLocations = removeFrom(f.selectedLocations, chip.value);
            if (chip.group === 'price') {
                f.priceFrom = '0';
                f.priceTo = '50000';
            }
            if (chip.group === 'year') {
                f.yearFrom = '2000';
                f.yearTo = '2005';
            }
            return f;
        });
    }, []);
    var clearAllFilters = react_1.useCallback(function () {
        setSelectedIndexes([]);
        setSidebarFilters(null);
        setSearchTerm('');
    }, []);
    var toggleIndex = react_1.useCallback(function (index) {
        setSelectedIndexes(function (prev) {
            return prev.includes(index) ? prev.filter(function (i) { return i !== index; }) : __spreadArrays(prev, [index]);
        });
    }, []);
    var applySidebarFilters = react_1.useCallback(function (filters) {
        setSidebarFilters(filters);
    }, []);
    var clearSidebarFilters = react_1.useCallback(function () {
        setSidebarFilters(null);
    }, []);
    var filteredItems = react_1.useMemo(function () {
        var items = watches;
        if (selectedIndexes.length > 0) {
            items = items.filter(function (w) { return selectedIndexes.includes(w.index); });
        }
        return sortingUtils_1.applySorting(items, sortOption);
    }, [watches, selectedIndexes, sortOption]);
    react_1.useLayoutEffect(function () {
        if (!chipsRef.current) {
            setChipsHeight(0);
            return;
        }
        var measure = function () { var _a, _b; return setChipsHeight((_b = (_a = chipsRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) !== null && _b !== void 0 ? _b : 0); };
        measure();
        var ro = new ResizeObserver(measure);
        ro.observe(chipsRef.current);
        var id = requestAnimationFrame(measure);
        return function () {
            ro.disconnect();
            cancelAnimationFrame(id);
        };
    }, [activeFilters]);
    react_1.useEffect(function () {
        var getCurrencyFromStorage = function () {
            if (typeof window === 'undefined')
                return 'EUR';
            var savedCurrency = localStorage.getItem('selectedCurrency');
            var validCurrencies = ['EUR', 'USD', 'PLN', 'UAH'];
            return savedCurrency && validCurrencies.includes(savedCurrency)
                ? savedCurrency
                : 'EUR';
        };
        var loadWatches = function () {
            var currency = getCurrencyFromStorage();
            var apiParams = !searchTerm.trim() && !sidebarFilters
                ? { pageSize: 12, currency: currency }
                : __assign(__assign(__assign({}, (searchTerm.trim() && { search: searchTerm.trim() })), (sidebarFilters ? api_1.convertFiltersToApiParams(sidebarFilters) : {})), { currency: currency });
            reloadWithFilters(apiParams);
        };
        loadWatches();
        var handleCurrencyChange = function () {
            loadWatches();
        };
        window.addEventListener('currencyChanged', handleCurrencyChange);
        window.addEventListener('storage', handleCurrencyChange);
        return function () {
            window.removeEventListener('currencyChanged', handleCurrencyChange);
            window.removeEventListener('storage', handleCurrencyChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, sidebarFilters]);
    return {
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm,
        selectedIndexes: selectedIndexes,
        setSelectedIndexes: setSelectedIndexes,
        toggleIndex: toggleIndex,
        filteredItems: filteredItems,
        applySidebarFilters: applySidebarFilters,
        clearSidebarFilters: clearSidebarFilters,
        sortOption: sortOption,
        setSortOption: setSortOption,
        activeFilters: activeFilters,
        removeFilter: removeFilter,
        clearAllFilters: clearAllFilters,
        chipsRef: chipsRef,
        chipsHeight: chipsHeight,
        loadMore: loadMore,
        hasMore: hasMore,
        loading: loading
    };
};

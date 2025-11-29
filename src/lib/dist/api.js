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
exports.trackDealerVisit = exports.getLiquidWatch = exports.getStableWatch = exports.getTrendingWatch90d = exports.getTrendingWatch30d = exports.getPopularWatchesByBrand = exports.getPopularWatches = exports.trackWatchView = exports.getSearchSuggestions = exports.getWatchBySlug = exports.getSimilarWatches = exports.getWatchById = exports.getWatchesByIds = exports.convertFiltersToApiParams = exports.searchDealers = exports.getDealerById = exports.getDealers = exports.getFilters = exports.getWatches = void 0;
var transformers_1 = require("@/lib/transformers");
function handleResponse(response) {
    return __awaiter(this, void 0, Promise, function () {
        var errorMessage, error, _a, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!response.ok) return [3 /*break*/, 5];
                    errorMessage = "HTTP " + response.status + ": " + response.statusText;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _b.sent();
                    errorMessage = error.message || errorMessage;
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    errorMessage = response.status + ": " + response.statusText;
                    return [3 /*break*/, 4];
                case 4:
                    console.error('❌ [API] API Error:', errorMessage);
                    throw new Error(errorMessage);
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    data = _b.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function getWatches(params) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (params.page)
                        searchParams.set('page', params.page.toString());
                    if (params.pageSize)
                        searchParams.set('pageSize', params.pageSize.toString());
                    if (params.search)
                        searchParams.set('search', params.search);
                    if (params.brands)
                        searchParams.set('brands', params.brands);
                    if (params.conditions)
                        searchParams.set('conditions', params.conditions);
                    if (params.mechanisms)
                        searchParams.set('mechanisms', params.mechanisms);
                    if (params.materials)
                        searchParams.set('materials', params.materials);
                    if (params.locations)
                        searchParams.set('locations', params.locations);
                    if (params.hasDocumentsOptions)
                        searchParams.set('hasDocumentsOptions', params.hasDocumentsOptions);
                    if (params.priceRange)
                        searchParams.set('priceRange', params.priceRange);
                    if (params.years)
                        searchParams.set('years', params.years);
                    if (params.currency)
                        searchParams.set('currency', params.currency);
                    if (params.segment)
                        searchParams.set('segment', params.segment);
                    url = "/api/watches?" + searchParams.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Fetch error:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getWatches = getWatches;
function getFilters() {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/watches/filters";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_2 = _a.sent();
                    console.error('Fetch error:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getFilters = getFilters;
function getDealers() {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/dealers";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_3 = _a.sent();
                    console.error('Fetch error:', error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDealers = getDealers;
function getDealerById(id) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/dealers/" + id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_4 = _a.sent();
                    console.error('Fetch error:', error_4);
                    throw error_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDealerById = getDealerById;
function searchDealers(query) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    searchParams.set('query', query);
                    url = "/api/dealers/search?" + searchParams.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_5 = _a.sent();
                    console.error('Fetch error:', error_5);
                    throw error_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.searchDealers = searchDealers;
var MECHANISM_MAP = {
    automatic: 'Automatic',
    mechanical: 'Manual winding',
    manual: 'Manual winding',
    'manual winding': 'Manual winding'
};
var MATERIAL_MAP = {
    gold: 'Gold',
    ceramic: 'Ceramic',
    silver: 'Steel',
    steel: 'Steel',
    platinum: 'Platinum',
    rose: 'Rose',
    white: 'White',
    yellow: 'Yellow',
    titanium: 'Steel'
};
var LOCATION_MAP = {
    america: 'United States of America',
    'united states of america': 'United States of America',
    usa: 'United States of America',
    us: 'United States of America'
};
var DOCUMENT_MAP = {
    fullset: 'Original box, original papers',
    'full set': 'Original box, original papers',
    'original box, original papers': 'Original box, original papers',
    'original box, no original papers': 'Original box, no original papers',
    'no original box, no original papers': 'No original box, no original papers'
};
function normalizeValue(value, map) {
    var normalized = value.toLowerCase().trim();
    return map[normalized] || null;
}
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function convertFiltersToApiParams(filters) {
    var _a, _b, _c, _d, _e, _f, _g;
    var params = {};
    var defaultYearFrom = '2000';
    var defaultYearTo = '2005';
    var defaultPriceFrom = '0';
    var defaultPriceTo = '150000';
    var priceFrom = filters.priceFrom || defaultPriceFrom;
    var priceTo = filters.priceTo || defaultPriceTo;
    var yearFrom = filters.yearFrom || defaultYearFrom;
    var yearTo = filters.yearTo || defaultYearTo;
    if ((_a = filters.selectedBrands) === null || _a === void 0 ? void 0 : _a.length) {
        params.brands = filters.selectedBrands.join('/');
    }
    if ((_b = filters.selectedConditions) === null || _b === void 0 ? void 0 : _b.length) {
        var validConditions = filters.selectedConditions
            .map(function (c) { return c.toUpperCase(); })
            .filter(function (c) { return c === 'NEW' || c === 'USED'; });
        if (validConditions.length > 0) {
            params.conditions = validConditions.join('/');
        }
    }
    if ((_c = filters.selectedMechanisms) === null || _c === void 0 ? void 0 : _c.length) {
        var validMechanisms = filters.selectedMechanisms
            .map(function (m) {
            var mapped = normalizeValue(m, MECHANISM_MAP);
            return mapped || capitalizeFirst(m);
        })
            .filter(Boolean);
        if (validMechanisms.length > 0) {
            params.mechanisms = validMechanisms.join('/');
        }
    }
    if ((_d = filters.selectedMaterials) === null || _d === void 0 ? void 0 : _d.length) {
        var validMaterials = filters.selectedMaterials
            .map(function (m) {
            var mapped = normalizeValue(m, MATERIAL_MAP);
            return mapped || capitalizeFirst(m);
        })
            .filter(Boolean);
        if (validMaterials.length > 0) {
            params.materials = validMaterials.join('/');
        }
    }
    if ((_e = filters.selectedLocations) === null || _e === void 0 ? void 0 : _e.length) {
        var validLocations = filters.selectedLocations
            .map(function (l) {
            var mapped = normalizeValue(l, LOCATION_MAP);
            return mapped || capitalizeFirst(l);
        })
            .filter(Boolean);
        if (validLocations.length > 0) {
            params.locations = validLocations.join('/');
        }
    }
    if (yearFrom !== defaultYearFrom || yearTo !== defaultYearTo) {
        params.years = yearFrom + "-" + yearTo;
    }
    var priceFromNum = Number(priceFrom);
    var priceToNum = Number(priceTo);
    var defaultPriceFromNum = Number(defaultPriceFrom);
    var defaultPriceToNum = Number(defaultPriceTo);
    if (priceFromNum !== defaultPriceFromNum || priceToNum !== defaultPriceToNum) {
        params.priceRange = priceFrom + "-" + priceTo;
    }
    if ((_f = filters.selectedDocuments) === null || _f === void 0 ? void 0 : _f.length) {
        var validDocuments = filters.selectedDocuments
            .map(function (d) {
            var mapped = normalizeValue(d, DOCUMENT_MAP);
            return mapped || d;
        })
            .filter(Boolean);
        if (validDocuments.length > 0) {
            params.hasDocumentsOptions = validDocuments.join('/');
        }
    }
    if ((_g = filters.selectedIndexes) === null || _g === void 0 ? void 0 : _g.length) {
        var validSegments = filters.selectedIndexes
            .filter(function (index) {
            return index === 'A' || index === 'B' || index === 'C';
        });
        if (validSegments.length > 0) {
            params.segment = validSegments.join('/');
        }
    }
    return params;
}
exports.convertFiltersToApiParams = convertFiltersToApiParams;
function getWatchesByIds(ids, currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (ids.length === 0) {
                        return [2 /*return*/, []];
                    }
                    searchParams = new URLSearchParams();
                    searchParams.set('ids', ids.join(','));
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/by-ids?" + searchParams.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_6 = _a.sent();
                    console.error('❌ [API] Failed to fetch watches by IDs:', error_6);
                    throw error_6;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getWatchesByIds = getWatchesByIds;
function getWatchById(id, currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) {
                        throw new Error('Watch ID is required');
                    }
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/" + id + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_7 = _a.sent();
                    console.error('❌ [API] Failed to fetch watch by ID:', error_7);
                    throw error_7;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getWatchById = getWatchById;
function getSimilarWatches(id, currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) {
                        throw new Error('Watch ID is required');
                    }
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/" + id + "/similar" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_8 = _a.sent();
                    console.error('❌ [API] Failed to fetch similar watches:', error_8);
                    throw error_8;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getSimilarWatches = getSimilarWatches;
function getWatchBySlug(slug, currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchStrategies, matchedWatch, searchResponse, _i, searchStrategies_1, searchQuery, _a, _b, watch, generatedSlug, slugWords, _loop_1, _c, _d, watch, state_1, searchError_1, fullWatch, error_9;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!slug || slug.trim().length === 0) {
                        return [2 /*return*/, null];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 9, , 10]);
                    searchStrategies = [
                        slug,
                        slug.split('-').slice(0, 3).join('-'),
                        slug.split('-').slice(0, 2).join('-'),
                        slug.split('-')[0],
                    ];
                    matchedWatch = null;
                    searchResponse = null;
                    _i = 0, searchStrategies_1 = searchStrategies;
                    _e.label = 2;
                case 2:
                    if (!(_i < searchStrategies_1.length)) return [3 /*break*/, 7];
                    searchQuery = searchStrategies_1[_i];
                    if (!searchQuery || searchQuery.trim().length === 0)
                        return [3 /*break*/, 6];
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getWatches({
                            search: searchQuery,
                            pageSize: 100,
                            currency: currency
                        })];
                case 4:
                    searchResponse = _e.sent();
                    if (!(searchResponse === null || searchResponse === void 0 ? void 0 : searchResponse.data) || searchResponse.data.length === 0) {
                        return [3 /*break*/, 6];
                    }
                    for (_a = 0, _b = searchResponse.data; _a < _b.length; _a++) {
                        watch = _b[_a];
                        generatedSlug = transformers_1.generateSlug(watch.name);
                        if (generatedSlug === slug) {
                            matchedWatch = watch;
                            break;
                        }
                    }
                    if (matchedWatch)
                        return [3 /*break*/, 7];
                    slugWords = slug.split('-').filter(function (word) { return word.length > 0; });
                    _loop_1 = function (watch) {
                        var watchSlug = transformers_1.generateSlug(watch.name);
                        var watchSlugWords = watchSlug
                            .split('-')
                            .filter(function (word) { return word.length > 0; });
                        var allWordsMatch = slugWords.every(function (word) {
                            return watchSlugWords.some(function (watchWord) {
                                return watchWord.includes(word) || word.includes(watchWord);
                            });
                        });
                        if (allWordsMatch && slugWords.length > 0) {
                            matchedWatch = watch;
                            return "break";
                        }
                    };
                    for (_c = 0, _d = searchResponse.data; _c < _d.length; _c++) {
                        watch = _d[_c];
                        state_1 = _loop_1(watch);
                        if (state_1 === "break")
                            break;
                    }
                    if (matchedWatch)
                        return [3 /*break*/, 7];
                    return [3 /*break*/, 6];
                case 5:
                    searchError_1 = _e.sent();
                    console.error('❌ [API] getWatchBySlug - Search error:', searchError_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    if (!matchedWatch) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, getWatchById(matchedWatch.id, currency)];
                case 8:
                    fullWatch = _e.sent();
                    if (fullWatch && matchedWatch.price) {
                        fullWatch.price = matchedWatch.price;
                        fullWatch.defaultPrice = matchedWatch.defaultPrice;
                        fullWatch.currency = matchedWatch.currency;
                    }
                    return [2 /*return*/, fullWatch];
                case 9:
                    error_9 = _e.sent();
                    console.error('❌ [API] getWatchBySlug - Error:', error_9);
                    return [2 /*return*/, null];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getWatchBySlug = getWatchBySlug;
function getSearchSuggestions(query) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!query || query.trim().length === 0) {
                        return [2 /*return*/, []];
                    }
                    searchParams = new URLSearchParams();
                    searchParams.set('q', query.trim());
                    url = "/api/search/suggestions?" + searchParams.toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_10 = _a.sent();
                    console.error('Fetch error:', error_10);
                    throw error_10;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getSearchSuggestions = getSearchSuggestions;
function trackWatchView(id) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, data, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) {
                        throw new Error('Watch ID is required');
                    }
                    url = "/api/watches/" + id + "/view";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_11 = _a.sent();
                    console.error('❌ [API] Failed to track watch view:', error_11);
                    throw error_11;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.trackWatchView = trackWatchView;
function getPopularWatches(type, currency) {
    if (type === void 0) { type = 'popular'; }
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    searchParams.set('type', type);
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/popular" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_12 = _a.sent();
                    console.error('❌ [API] Failed to fetch popular watches:', error_12);
                    throw error_12;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPopularWatches = getPopularWatches;
function getPopularWatchesByBrand(currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/popular-by-brand" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_13 = _a.sent();
                    console.error('❌ [API] Failed to fetch popular watches by brand:', error_13);
                    throw error_13;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPopularWatchesByBrand = getPopularWatchesByBrand;
function getTrendingWatch30d(currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/trending/30d" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (response.status === 404) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_14 = _a.sent();
                    console.error('❌ [API] Failed to fetch trending watch (30d):', error_14);
                    throw error_14;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTrendingWatch30d = getTrendingWatch30d;
function getTrendingWatch90d(currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/trending/90d" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (response.status === 404) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_15 = _a.sent();
                    console.error('❌ [API] Failed to fetch trending watch (90d):', error_15);
                    throw error_15;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTrendingWatch90d = getTrendingWatch90d;
function getStableWatch(currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/stable" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (response.status === 404) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_16 = _a.sent();
                    console.error('❌ [API] Failed to fetch stable watch:', error_16);
                    throw error_16;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getStableWatch = getStableWatch;
function getLiquidWatch(currency) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams, url, response, data, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams();
                    if (currency) {
                        searchParams.set('currency', currency);
                    }
                    url = "/api/watches/liquid" + (searchParams.toString() ? "?" + searchParams.toString() : '');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (response.status === 404) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, handleResponse(response)];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_17 = _a.sent();
                    console.error('❌ [API] Failed to fetch liquid watch:', error_17);
                    throw error_17;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getLiquidWatch = getLiquidWatch;
function trackDealerVisit(dealerId) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dealerId) {
                        throw new Error('Dealer ID is required');
                    }
                    url = "/api/dealers/" + dealerId + "/visit";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, handleResponse(response)];
                case 3:
                    error_18 = _a.sent();
                    console.error('❌ [API] Failed to track dealer visit:', error_18);
                    throw error_18;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.trackDealerVisit = trackDealerVisit;

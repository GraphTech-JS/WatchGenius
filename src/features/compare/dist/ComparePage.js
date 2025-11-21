'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProductHero_1 = require("../product/components/ProductHero/ProductHero");
var ProductAnalytics_1 = require("../product/components/ProductAnalytics/ProductAnalytics");
var Breadcrumbs_1 = require("@/components/Breadcrumbs/Breadcrumbs");
var ComparePage_module_css_1 = require("./ComparePage.module.css");
var i18n_1 = require("@/i18n");
var compare_1 = require("@/i18n/keys/compare");
var WishlistContext_1 = require("@/context/WishlistContext");
var Toast_1 = require("@/components/Toast/Toast");
var ComparePage = function (_a) {
    var products = _a.products, onBackToCatalog = _a.onBackToCatalog;
    var _b = react_1.useState('price'), activeTab1 = _b[0], setActiveTab1 = _b[1];
    var _c = react_1.useState('price'), activeTab2 = _c[0], setActiveTab2 = _c[1];
    var _d = WishlistContext_1.useWishlistContext(), addToWishlist = _d.addToWishlist, removeFromWishlist = _d.removeFromWishlist, isInWishlist = _d.isInWishlist, showToast = _d.showToast, toastMessage = _d.toastMessage, setShowToast = _d.setShowToast;
    var breadcrumbItems = products.length > 0
        ? [
            { label: i18n_1.t(compare_1.compareKeys.breadcrumbs.catalog), href: '/catalog' },
            {
                label: products[0].brand,
                href: "/catalog?brand=" + products[0].brand
            },
            {
                label: products[0].model.split(' ')[0],
                href: "/catalog?model=" + products[0].model.split(' ')[0]
            },
            {
                label: i18n_1.t(compare_1.compareKeys.breadcrumbs.model),
                href: "/product/" + products[0].slug
            },
            { label: i18n_1.t(compare_1.compareKeys.breadcrumbs.compare) },
        ]
        : [
            { label: i18n_1.t(compare_1.compareKeys.breadcrumbs.catalog), href: '/catalog' },
            { label: i18n_1.t(compare_1.compareKeys.breadcrumbs.compare) },
        ];
    var handleSave = function (productId) {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        }
        else {
            addToWishlist(productId);
        }
    };
    var handlePriceNotification = function (productId) {
        console.log('Сповіщення про ціну:', productId);
    };
    var handleBuy = function (product) {
        if (product.chronoUrl) {
            window.open(product.chronoUrl, '_blank');
        }
    };
    if (products.length === 0) {
        return (react_1["default"].createElement("main", { className: ComparePage_module_css_1["default"].container + " bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" },
            react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].content },
                react_1["default"].createElement(Breadcrumbs_1["default"], { items: breadcrumbItems }),
                react_1["default"].createElement("div", { className: 'flex flex-col items-center justify-center min-h-[400px] text-center' },
                    react_1["default"].createElement("div", { className: 'mb-6' },
                        react_1["default"].createElement("h2", { className: 'mb-2 text-2xl font-semibold text-gray-900' }, i18n_1.t(compare_1.compareKeys.empty.title)),
                        react_1["default"].createElement("p", { className: 'mb-8 text-gray-600' }, i18n_1.t(compare_1.compareKeys.empty.subtitle))),
                    react_1["default"].createElement("button", { onClick: onBackToCatalog, className: 'bg-[#04694f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#035a3f] transition-colors', "aria-label": '\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u0434\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443 \u0433\u043E\u0434\u0438\u043D\u043D\u0438\u043A\u0456\u0432' }, i18n_1.t(compare_1.compareKeys.empty.button))))));
    }
    return (react_1["default"].createElement("main", { className: ComparePage_module_css_1["default"].container + " bg-white pt-[27px] pb-[90px] min-h-screen mx-auto mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" },
        react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].content },
            react_1["default"].createElement(Toast_1.Toast, { isVisible: showToast, message: toastMessage, onClose: function () { return setShowToast(false); }, duration: 3000 }),
            react_1["default"].createElement(Breadcrumbs_1["default"], { items: breadcrumbItems }),
            react_1["default"].createElement("h1", { className: 'sr-only' }, "\u041F\u043E\u0440\u0456\u0432\u043D\u044F\u043D\u043D\u044F \u0433\u043E\u0434\u0438\u043D\u043D\u0438\u043A\u0456\u0432"),
            react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].productsGrid + " flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row md:gap-[60px]", role: 'region', "aria-label": '\u041F\u043E\u0440\u0456\u0432\u043D\u044F\u043D\u043D\u044F \u0434\u0432\u043E\u0445 \u0433\u043E\u0434\u0438\u043D\u043D\u0438\u043A\u0456\u0432' },
                products[0] && (react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].productColumn + " w-full md:w-[calc(50%-30px)]" },
                    react_1["default"].createElement(ProductHero_1["default"], { product: products[0], layout: 'vertical', onSave: function () { return handleSave(products[0].id); }, onCompare: function () { }, onPriceNotification: function () {
                            return handlePriceNotification(products[0].id);
                        }, onShare: function () { }, onBuy: function () { return handleBuy(products[0]); }, onGetQuote: function () { return handleBuy(products[0]); }, isSaved: isInWishlist(products[0].id) }),
                    react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].analyticsWrapper },
                        react_1["default"].createElement(ProductAnalytics_1["default"], { analytics: products[0].analytics, activeTab: activeTab1, onTabChange: setActiveTab1, details: products[0].details, brand: products[0].brand, isCompare: true })))),
                products[1] && (react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].productColumn + " w-full md:w-[calc(50%-30px)]" },
                    react_1["default"].createElement(ProductHero_1["default"], { product: products[1], layout: 'vertical', onSave: function () { return handleSave(products[1].id); }, onCompare: function () { }, onPriceNotification: function () {
                            return handlePriceNotification(products[1].id);
                        }, onShare: function () { }, onBuy: function () { return handleBuy(products[1]); }, onGetQuote: function () { return handleBuy(products[1]); }, isSaved: isInWishlist(products[1].id) }),
                    react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].analyticsWrapper },
                        react_1["default"].createElement(ProductAnalytics_1["default"], { analytics: products[1].analytics, activeTab: activeTab2, onTabChange: setActiveTab2, details: products[1].details, brand: products[1].brand, isCompare: true }))))),
            react_1["default"].createElement("div", { className: ComparePage_module_css_1["default"].backButtonContainer },
                react_1["default"].createElement("button", { onClick: onBackToCatalog, className: ComparePage_module_css_1["default"].backButton, "aria-label": '\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u0434\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443 \u0433\u043E\u0434\u0438\u043D\u043D\u0438\u043A\u0456\u0432' }, i18n_1.t(compare_1.compareKeys.backButton))))));
};
exports["default"] = ComparePage;

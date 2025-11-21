'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var index_1 = require("./index");
var Breadcrumbs_1 = require("@/components/Breadcrumbs/Breadcrumbs");
var page_module_css_1 = require("@/app/[locale]/product/[slug]/page.module.css");
var i18n_1 = require("@/i18n");
var product_1 = require("@/i18n/keys/product");
var WishlistContext_1 = require("@/context/WishlistContext");
var CompareContext_1 = require("@/context/CompareContext");
var Toast_1 = require("@/components/Toast/Toast");
var ProductPage = function (_a) {
    var product = _a.product;
    var _b = react_1.useState('trend'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = WishlistContext_1.useWishlistContext(), addToWishlist = _c.addToWishlist, removeFromWishlist = _c.removeFromWishlist, isInWishlist = _c.isInWishlist, showToast = _c.showToast, toastMessage = _c.toastMessage, setShowToast = _c.setShowToast;
    var _d = CompareContext_1.useCompareContext(), addToCompare = _d.addToCompare, removeFromCompare = _d.removeFromCompare, isInCompare = _d.isInCompare;
    var breadcrumbItems = [
        { label: i18n_1.t(product_1.productKeys.breadcrumbs.catalog), href: '/catalog' },
        { label: product.brand, href: "/catalog?brand=" + product.brand },
        { label: 'Submariner', href: "/catalog?model=Submariner" },
        { label: i18n_1.t(product_1.productKeys.breadcrumbs.model) },
    ];
    var handleSave = function () {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        }
        else {
            addToWishlist(product.id);
        }
    };
    var handleCompare = function () {
        if (isInCompare(product.id)) {
            removeFromCompare(product.id);
        }
        else {
            addToCompare(product.id);
        }
    };
    var handlePriceNotification = function () {
        console.log('Сповіщення про ціну');
    };
    var handleShare = function () {
        console.log('Поділитися продуктом');
    };
    var handleBuy = function () {
        if (product.chronoUrl) {
            window.open(product.chronoUrl, '_blank');
        }
    };
    var handleGetQuote = function () {
        console.log('Отримати пропозицію');
    };
    var handleTabChange = function (tab) {
        setActiveTab(tab);
    };
    var handleSortChange = function (sort) {
        console.log('Зміна сортування:', sort);
    };
    var handleRegionChange = function (region) {
        console.log('Зміна регіону:', region);
    };
    var handleConditionChange = function (condition) {
        console.log('Зміна стану:', condition);
    };
    var handlePurchase = function (offerId) {
        console.log('Покупка пропозиції:', offerId);
    };
    return (react_1["default"].createElement("main", { className: 'bg-white pt-[27px] pb-[60px] xl:pb-[90px] min-h-screen mx-auto mt-[80px]' },
        react_1["default"].createElement("div", { className: page_module_css_1["default"].productPage },
            react_1["default"].createElement(Toast_1.Toast, { isVisible: showToast, message: toastMessage, onClose: function () { return setShowToast(false); }, duration: 3000 }),
            react_1["default"].createElement("div", { className: 'hidden sm:block' },
                react_1["default"].createElement(Breadcrumbs_1["default"], { items: breadcrumbItems })),
            react_1["default"].createElement("h1", { className: 'sr-only' },
                product.title,
                " - \u0414\u0435\u0442\u0430\u043B\u0456 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0443"),
            react_1["default"].createElement(index_1.ProductHero, { product: product, onSave: handleSave, onCompare: handleCompare, onPriceNotification: handlePriceNotification, onShare: handleShare, onBuy: handleBuy, onGetQuote: handleGetQuote, isSaved: isInWishlist(product.id) }),
            react_1["default"].createElement("div", { className: 'flex flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row gap-[20px] sm:gap-[25px] md:gap-[60px] lg:gap-[60px] xl:gap-[60px] mb-8' },
                react_1["default"].createElement("div", { className: 'w-full sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-auto' },
                    react_1["default"].createElement(index_1.SimilarModels, { models: product.similarModels, onCompare: handleCompare })),
                react_1["default"].createElement("div", { className: 'h-[750px] sm:h-auto  md:h-[640px] lg:h-auto w-full sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[603px]' },
                    react_1["default"].createElement(index_1.ProductAnalytics, { analytics: product.analytics, activeTab: activeTab, onTabChange: handleTabChange, details: product.details, brand: product.brand }))),
            react_1["default"].createElement(index_1.SellerOffers, { offers: product.sellerOffers, onSortChange: handleSortChange, onRegionChange: handleRegionChange, onConditionChange: handleConditionChange, onPurchase: handlePurchase }))));
};
exports["default"] = ProductPage;

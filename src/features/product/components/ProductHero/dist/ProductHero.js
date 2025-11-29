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
var react_1 = require("react");
var image_1 = require("next/image");
var CompareContext_1 = require("@/context/CompareContext");
var i18n_1 = require("@/i18n");
var accessibility_1 = require("@/i18n/keys/accessibility");
var product_icons_1 = require("@/product-icons");
var Heart_svg_1 = require("/public/icons/Heart.svg");
var ProductHero_module_css_1 = require("./ProductHero.module.css");
var index_1 = require("../../index");
var ProductModals_1 = require("../ProductModals");
var FeedbackModal_1 = require("@/components/FeedbackModal/FeedbackModal");
var useScreenWidth_1 = require("@/hooks/useScreenWidth");
var useLocale_1 = require("@/hooks/useLocale");
var product_1 = require("@/i18n/keys/product");
var mainButtonTextStyle = {
    background: 'linear-gradient(180deg, #f9f7f3 0%, #edfdf4 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};
var ProductHero = function (_a) {
    var _b;
    var product = _a.product, onSave = _a.onSave, onPriceNotification = _a.onPriceNotification, onBuy = _a.onBuy, onGetQuote = _a.onGetQuote, _c = _a.layout, layout = _c === void 0 ? 'horizontal' : _c, _d = _a.isSaved, isSaved = _d === void 0 ? false : _d;
    var locale = useLocale_1.useLocale();
    var _e = react_1.useState(0), selectedImage = _e[0], setSelectedImage = _e[1];
    var _f = react_1.useState(false), showComparisonModal = _f[0], setShowComparisonModal = _f[1];
    var _g = react_1.useState(false), showShareModal = _g[0], setShowShareModal = _g[1];
    var _h = react_1.useState(false), showPriceAlertModal = _h[0], setShowPriceAlertModal = _h[1];
    var _j = react_1.useState(false), showGetQuoteModal = _j[0], setShowGetQuoteModal = _j[1];
    var _k = react_1.useState(false), showBuyModal = _k[0], setShowBuyModal = _k[1];
    var screenWidth = useScreenWidth_1.useScreenWidth();
    var _l = CompareContext_1.useCompareContext(), addToCompare = _l.addToCompare, removeFromCompare = _l.removeFromCompare, isInCompare = _l.isInCompare;
    var isInComparison = isInCompare(product.id);
    react_1.useEffect(function () {
        setShowComparisonModal(false);
        setShowShareModal(false);
        setShowPriceAlertModal(false);
        setShowGetQuoteModal(false);
        setShowBuyModal(false);
        setSelectedImage(0);
    }, [product.id]);
    var getIndexBadgeClasses = function (index) {
        switch (index) {
            case 'A':
                return { box: ProductHero_module_css_1["default"].indexBadgeBoxA, text: ProductHero_module_css_1["default"].indexBadgeTextA };
            case 'B':
                return { box: ProductHero_module_css_1["default"].indexBadgeBoxB, text: ProductHero_module_css_1["default"].indexBadgeTextB };
            case 'C':
                return { box: ProductHero_module_css_1["default"].indexBadgeBoxC, text: ProductHero_module_css_1["default"].indexBadgeTextC };
            default:
                return { box: ProductHero_module_css_1["default"].indexBadgeBoxA, text: ProductHero_module_css_1["default"].indexBadgeTextA };
        }
    };
    var thumbnailsToRender = screenWidth && screenWidth < 1150
        ? product.thumbnails.slice(0, 3)
        : product.thumbnails.slice(0, 4);
    var handleShare = function () { return setShowShareModal(true); };
    var handleSave = function () {
        onSave();
    };
    var handlePriceNotification = function () {
        setShowPriceAlertModal(true);
        onPriceNotification();
    };
    var handleGetQuote = function () {
        setShowGetQuoteModal(true);
        onGetQuote();
    };
    var hasValidImage = function () {
        if (!product.image)
            return false;
        var imageStr = typeof product.image === 'string'
            ? product.image
            : product.image.src || '';
        return (imageStr.trim() !== '' &&
            imageStr !== 'null' &&
            imageStr !== 'undefined' &&
            !imageStr.includes('/watch-random/'));
    };
    var handleBuy = function () {
        var hasChronoUrl = product.chronoUrl &&
            typeof product.chronoUrl === 'string' &&
            product.chronoUrl.trim() !== '';
        var hasImage = hasValidImage();
        if (hasChronoUrl && hasImage) {
            window.open(product.chronoUrl, '_blank');
            onBuy();
            return;
        }
        setShowGetQuoteModal(true);
        onGetQuote();
    };
    var handleCopy = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(window.location.origin + "/" + locale + "/product/" + product.slug)];
                case 1:
                    _a.sent();
                    setShowShareModal(false);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy: ', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleShareAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = window.location.origin + "/" + locale + "/product/" + product.slug;
                    if (!navigator.share) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.share({
                            title: 'WatchGenius - Product',
                            text: 'Check out this watch!',
                            url: url
                        })];
                case 2:
                    _a.sent();
                    setShowShareModal(false);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error sharing: ', err_2);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    handleCopy();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var formatPrice = function () {
        var _a = product.price, min = _a.min, max = _a.max, currency = _a.currency;
        if (min === max) {
            return currency + " " + min.toLocaleString();
        }
        return currency + " " + min.toLocaleString() + "-" + max.toLocaleString();
    };
    var productIndex = (_b = product.index) !== null && _b !== void 0 ? _b : 'A';
    return (react_1["default"].createElement("div", { className: "flex " + (layout === 'vertical'
            ? 'flex-col'
            : 'flex-col md:flex-row lg:flex-row xl:flex-row') + " gap-[20px] md:gap-[60px] lg:gap-[60px] xl:gap-[60px] mb-[20px]" },
        react_1["default"].createElement("div", { className: "flex flex-col gap-4 w-full " + (layout === 'vertical'
                ? 'sm:w-full lg:w-full xl:w-full'
                : 'sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[577px]') },
            react_1["default"].createElement("div", { className: 'relative bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] w-[350px] max-[479px]:w-full min-[480px]:w-full md:w-full lg:w-full xl:w-[577px] h-[250px] max-[479px]:h-[250px] min-[480px]:h-[300px] md:h-[345px] overflow-hidden flex items-center justify-center' },
                react_1["default"].createElement(image_1["default"], { src: product.image, alt: product.title, fill: true, sizes: '(max-width: 768px) 100vw, 577px', className: 'object-contain p-4', priority: true, fetchPriority: 'high' }),
                react_1["default"].createElement("div", { className: 'absolute top-4 right-4 z-10' },
                    react_1["default"].createElement("div", { className: 'relative group' },
                        react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].indexBadgeContainer },
                            react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].indexBadgeWrap },
                                react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].indexBadgeBox + " " + getIndexBadgeClasses(productIndex).box },
                                    react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].indexBadgeText + " " + getIndexBadgeClasses(productIndex).text }, productIndex)),
                                react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].indexTooltip },
                                    productIndex === 'A' && i18n_1.t(product_1.productKeys.index.A),
                                    productIndex === 'B' && i18n_1.t(product_1.productKeys.index.B),
                                    productIndex === 'C' && i18n_1.t(product_1.productKeys.index.C))))))),
            react_1["default"].createElement("div", { className: 'flex gap-[21px] max-[479px]:gap-[21px] min-[480px]:justify-center min-[480px]:gap-[24px] md:gap-[21px] lg:gap-[36px] xl:gap-[36px] overflow-hidden relative cursor-grab active:cursor-grabbing', onTouchStart: function (e) {
                    var startX = e.touches[0].clientX;
                    var container = e.currentTarget;
                    var startScrollLeft = container.scrollLeft;
                    var handleTouchMove = function (moveEvent) {
                        var currentX = moveEvent.touches[0].clientX;
                        var diffX = startX - currentX;
                        container.scrollLeft = startScrollLeft + diffX;
                    };
                    var handleTouchEnd = function () {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                    };
                    document.addEventListener('touchmove', handleTouchMove);
                    document.addEventListener('touchend', handleTouchEnd);
                }, onMouseDown: function (e) {
                    var startX = e.clientX;
                    var container = e.currentTarget;
                    var startScrollLeft = container.scrollLeft;
                    var isDragging = true;
                    var handleMouseMove = function (moveEvent) {
                        if (!isDragging)
                            return;
                        var currentX = moveEvent.clientX;
                        var diffX = startX - currentX;
                        container.scrollLeft = startScrollLeft + diffX;
                    };
                    var handleMouseUp = function () {
                        isDragging = false;
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                } }, thumbnailsToRender.map(function (thumbnail, index) { return (react_1["default"].createElement("button", { key: index, onClick: function () { return setSelectedImage(index); }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.selectImage, {
                    number: index + 1
                }), className: "relative w-[102px] h-[88px] max-[479px]:w-[102px] max-[479px]:h-[88px] min-[480px]:w-[188px] min-[480px]:h-[104px] md:w-[123px] md:h-[88px] lg:w-[122px] lg:h-[102px] xl:w-[117px] xl:h-[102px] bg-[#f7f7f7] rounded-[5px] overflow-hidden border-2 transition-all duration-200 flex-shrink-0 " + (selectedImage === index
                    ? 'border-blue-500 shadow-md'
                    : 'border-transparent hover:border-gray-300 hover:border-sm') },
                react_1["default"].createElement(image_1["default"], { src: thumbnail, alt: product.title + " " + (index + 1), fill: true, className: 'object-contain p-2' }))); }))),
        react_1["default"].createElement("div", { className: "flex flex-col gap-[20px] w-full " + (layout === 'vertical'
                ? 'md:w-full lg:w-full xl:w-full'
                : 'md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[605px]') },
            react_1["default"].createElement("div", { className: 'flex flex-col border-b border-[rgba(0,0,0,0.3)] pb-4' },
                react_1["default"].createElement("div", { className: 'font-roboto text-[20px] md:text-[24px] lg:text-[24px] xl:text-[24px] font-extrabold uppercase text-[#04694f]' }, product.brand),
                react_1["default"].createElement("div", { className: 'font-inter text-[32px] md:text-[36px] lg:text-[36px] xl:text-[36px] font-semibold text-[#171414]' }, product.model),
                react_1["default"].createElement("div", { className: 'font-inter text-[14px] md:text-[15px] lg:text-[16px]    xl:text-[16px] font-medium text-[rgba(23,20,20,0.5)]' },
                    "(Ref. ",
                    product.reference,
                    ")")),
            react_1["default"].createElement("div", { className: 'flex flex-col gap-2 justify-center items-center text-center sm:flex-row sm:justify-between sm:items-center sm:text-left' },
                react_1["default"].createElement("div", { className: 'font-inter text-[24px]  lg:text-[24px] xl:text-[40px] font-medium text-black' }, formatPrice()),
                react_1["default"].createElement("div", { className: 'flex items-center space-x-1' },
                    react_1["default"].createElement("span", { className: 'font-inter text-[20px] font-semibold text-center text-[#05873b]', style: {
                            fontWeight: 600,
                            fontSize: '20px',
                            textAlign: 'center',
                            color: '#05873b'
                        } },
                        "\u2191 ",
                        Math.abs(Math.round(product.priceTrend.value * 10) / 10),
                        "%"),
                    react_1["default"].createElement("span", { className: 'font-inter text-[15px] font-normal text-[#05873b]', style: { fontWeight: 400, fontSize: '15px', color: '#05873b' } }, i18n_1.t(product_1.productKeys.hero.trendDays)))),
            react_1["default"].createElement("div", { className: 'flex flex-col md:grid md:grid-cols-2 xl:grid-cols-2 gap-[17px]' },
                react_1["default"].createElement("div", { className: 'md:col-span-2 md:order-1 xl:col-span-1 xl:order-1' },
                    react_1["default"].createElement("button", { onClick: handleSave, className: ProductHero_module_css_1["default"].actionButton + " " + (isSaved ? ProductHero_module_css_1["default"].saved : '') + " group", "aria-label": isSaved ? i18n_1.t(accessibility_1.a11yKeys.product.saved) : i18n_1.t(accessibility_1.a11yKeys.product.save), "aria-pressed": isSaved },
                        react_1["default"].createElement(image_1["default"], { src: Heart_svg_1["default"], alt: i18n_1.t(product_1.productKeys.hero.save), width: 24, height: 24, className: ProductHero_module_css_1["default"].actionButtonIcon + " " + (isSaved ? ProductHero_module_css_1["default"].savedIcon : ''), "aria-hidden": 'true' }),
                        react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].actionButtonText + " " + (isSaved ? ProductHero_module_css_1["default"].savedText : '') }, isSaved ? i18n_1.t(product_1.productKeys.hero.saved) : i18n_1.t(product_1.productKeys.hero.save)))),
                react_1["default"].createElement("div", { className: 'md:col-span-2 md:order-2 xl:col-span-1 xl:order-3' },
                    react_1["default"].createElement("button", { onClick: handlePriceNotification, className: ProductHero_module_css_1["default"].actionButton + " group", "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.priceAlert) },
                        react_1["default"].createElement(image_1["default"], { src: product_icons_1.BellIcon, alt: i18n_1.t(product_1.productKeys.hero.priceAlert), width: 24, height: 24, className: ProductHero_module_css_1["default"].actionButtonIcon, "aria-hidden": 'true' }),
                        react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].actionButtonText }, i18n_1.t(product_1.productKeys.hero.priceAlert)))),
                showShareModal ? (react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].shareInputContainer + " md:col-span-2 md:order-3 xl:col-span-2 xl:order-4" },
                    react_1["default"].createElement("input", { type: 'text', value: typeof window !== 'undefined'
                            ? window.location.origin + "/" + locale + "/product/" + product.slug
                            : '', readOnly: true, className: ProductHero_module_css_1["default"].shareInput, placeholder: 'Link' }),
                    react_1["default"].createElement("div", { className: ProductHero_module_css_1["default"].shareIconsContainer },
                        react_1["default"].createElement("button", { onClick: handleCopy, className: ProductHero_module_css_1["default"].shareIconButton, "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.copy) },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.CopyIcon, alt: '', width: 20, height: 20, className: ProductHero_module_css_1["default"].shareIcon, "aria-hidden": 'true' })),
                        react_1["default"].createElement("button", { onClick: handleShareAction, className: ProductHero_module_css_1["default"].shareIconButton, "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.shareExternal) },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.ShareIcon, alt: '', width: 20, height: 20, className: ProductHero_module_css_1["default"].shareIcon, "aria-hidden": 'true' }))))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: 'md:col-span-1 md:order-3 xl:col-span-1 xl:order-2' },
                        react_1["default"].createElement("button", { onClick: function () {
                                if (isInComparison) {
                                    removeFromCompare(product.id);
                                }
                                else {
                                    addToCompare(product.id);
                                    setShowComparisonModal(true);
                                }
                            }, className: ProductHero_module_css_1["default"].actionButtonNarrow + " " + (isInComparison ? ProductHero_module_css_1["default"].addedToCompare : '') + " group", "aria-label": isInComparison
                                ? i18n_1.t(accessibility_1.a11yKeys.product.removeCompare)
                                : i18n_1.t(accessibility_1.a11yKeys.product.compare), "aria-pressed": isInComparison },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.ScalesIcon, alt: i18n_1.t(product_1.productKeys.hero.compare), width: 24, height: 24, className: ProductHero_module_css_1["default"].actionButtonIcon + " " + (isInComparison ? ProductHero_module_css_1["default"].addedToCompareIcon : ''), "aria-hidden": 'true' }),
                            react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].actionButtonText + " " + (isInComparison ? ProductHero_module_css_1["default"].addedToCompareText : '') }, isInComparison
                                ? i18n_1.t(product_1.productKeys.hero.removeCompare)
                                : i18n_1.t(product_1.productKeys.hero.compare)))),
                    react_1["default"].createElement("div", { className: 'md:col-span-1 md:order-4 xl:col-span-1 xl:order-4' },
                        react_1["default"].createElement("button", { onClick: handleShare, className: ProductHero_module_css_1["default"].actionButtonNarrow + " group", "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.share) },
                            react_1["default"].createElement(image_1["default"], { src: product_icons_1.LinkIcon, alt: i18n_1.t(product_1.productKeys.hero.share), width: 24, height: 24, className: ProductHero_module_css_1["default"].actionButtonIcon, "aria-hidden": 'true' }),
                            react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].actionButtonText }, i18n_1.t(product_1.productKeys.hero.share))))))),
            react_1["default"].createElement("div", { className: 'flex flex-col gap-[17px] xl:gap-[13px]' },
                react_1["default"].createElement("button", { onClick: handleBuy, className: ProductHero_module_css_1["default"].mainButton, "aria-label": product.chronoUrl &&
                        typeof product.chronoUrl === 'string' &&
                        product.chronoUrl.trim() !== '' &&
                        hasValidImage()
                        ? i18n_1.t(accessibility_1.a11yKeys.product.buy)
                        : i18n_1.t(accessibility_1.a11yKeys.product.getQuote) },
                    react_1["default"].createElement("span", { className: 'font-inter text-[16px] font-bold', style: mainButtonTextStyle }, product.chronoUrl &&
                        typeof product.chronoUrl === 'string' &&
                        product.chronoUrl.trim() !== '' &&
                        hasValidImage()
                        ? i18n_1.t(product_1.productKeys.hero.buy)
                        : i18n_1.t(product_1.productKeys.hero.getQuote))),
                product.chronoUrl &&
                    typeof product.chronoUrl === 'string' &&
                    product.chronoUrl.trim() !== '' &&
                    hasValidImage() && (react_1["default"].createElement("button", { onClick: handleGetQuote, className: ProductHero_module_css_1["default"].secondaryButton, "aria-label": i18n_1.t(accessibility_1.a11yKeys.product.getQuote) },
                    react_1["default"].createElement("span", { className: ProductHero_module_css_1["default"].secondaryButtonText }, i18n_1.t(product_1.productKeys.hero.getQuote)))))),
        react_1["default"].createElement(index_1.ComparisonModal, { isVisible: showComparisonModal, onClose: function () { return setShowComparisonModal(false); }, isAdded: isInComparison }),
        react_1["default"].createElement(ProductModals_1.PriceAlertModal, { isOpen: showPriceAlertModal, onClose: function () { return setShowPriceAlertModal(false); }, productTitle: product.brand + " " + product.model }),
        react_1["default"].createElement(ProductModals_1.GetQuoteModal, { isOpen: showGetQuoteModal, onClose: function () { return setShowGetQuoteModal(false); }, productTitle: product.brand + " " + product.model }),
        react_1["default"].createElement(FeedbackModal_1.FeedbackModal, { isOpen: showBuyModal, onClose: function () { return setShowBuyModal(false); }, watchTitle: product.brand + " " + product.model })));
};
exports["default"] = ProductHero;

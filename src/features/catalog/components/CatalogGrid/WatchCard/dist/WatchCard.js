'use client';
"use strict";
exports.__esModule = true;
exports.WatchCard = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useLocale_1 = require("@/hooks/useLocale");
var lucide_react_1 = require("lucide-react");
var WatchCard_module_css_1 = require("./WatchCard.module.css");
var i18n_1 = require("@/i18n");
var accessibility_1 = require("@/i18n/keys/accessibility");
var indexBadgeClass = function (idx) {
    switch (idx) {
        case 'A':
            return 'bg-[#b4e1c7] text-[#067b06]';
        case 'B':
            return 'bg-[#fff3d5] text-[#e57300]';
        case 'C':
            return 'bg-[#fddcdc] text-[#b91b1b]';
    }
};
exports.WatchCard = function (_a) {
    var item = _a.item, liked = _a.liked, onToggleLike = _a.onToggleLike, onOpenFeedback = _a.onOpenFeedback, _b = _a.priority, priority = _b === void 0 ? false : _b;
    var router = navigation_1.useRouter();
    var locale = useLocale_1.useLocale();
    var trendValue = Number(item.trend.value);
    var isUp = trendValue > 0;
    var isFlat = trendValue === 0;
    var handleCardClick = function () {
        router.push("/" + locale + "/product/" + item.slug);
    };
    var hasValidImage = function () {
        if (!item.image)
            return false;
        var imageStr = typeof item.image === 'string' ? item.image : item.image.src || '';
        return (imageStr.trim() !== '' &&
            imageStr !== 'null' &&
            imageStr !== 'undefined' &&
            !imageStr.includes('/watch-random/'));
    };
    var handleBuyClick = function (e) {
        e.stopPropagation();
        if (item.chronoUrl && hasValidImage()) {
            window.open(item.chronoUrl, '_blank');
        }
        else {
            onOpenFeedback === null || onOpenFeedback === void 0 ? void 0 : onOpenFeedback(item.title);
        }
    };
    return (react_1["default"].createElement("div", { className: WatchCard_module_css_1["default"].watchCard + " border border-[rgba(23,20,20,0.15)] bg-white p-3", onClick: handleCardClick },
        react_1["default"].createElement("div", { className: 'flex justify-between items-center' },
            react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].badgeTooltipWrapper },
                react_1["default"].createElement("span", { className: "inline-flex items-center justify-center rounded-[5px] " + WatchCard_module_css_1["default"].badge + " " + indexBadgeClass(item.index) }, item.index),
                react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].badgeTooltip },
                    item.index === 'A' && 'Топ-сегмент',
                    item.index === 'B' && 'Середній сегмент',
                    item.index === 'C' && 'Базовий сегмент')),
            react_1["default"].createElement("button", { "aria-label": liked ? i18n_1.t(accessibility_1.a11yKeys.favorites.remove) : i18n_1.t(accessibility_1.a11yKeys.favorites.add), onClick: function (e) {
                    e.stopPropagation();
                    onToggleLike(item.id);
                }, className: 'text-[18px] cursor-pointer z-2' },
                react_1["default"].createElement(lucide_react_1.Heart, { size: 18, className: "text-[#04694f] " + (liked ? 'fill-[#04694f]' : '') }))),
        react_1["default"].createElement("div", { className: 'relative h-[111px] md:h-[124px] xl:h-[123px] w-full' },
            react_1["default"].createElement(image_1["default"], { src: item.image, alt: item.title, fill: true, sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw', className: WatchCard_module_css_1["default"].watchImage, style: {
                    padding: item.variant === 'brand' ? '0 20px 0 20px' : '0'
                }, priority: priority, fetchPriority: priority ? 'high' : undefined })),
        react_1["default"].createElement("h4", { className: WatchCard_module_css_1["default"].watchTitle + " mt-[8px] mb-[8px]" }, item.title),
        react_1["default"].createElement("div", { className: 'flex flex-col items-center gap-[9px] sm:flex-row sm:justify-between' },
            react_1["default"].createElement("div", { className: 'text-[16px] font-medium text-[var(--text-dark,#171414)] whitespace-nowrap' },
                Math.round(item.price).toLocaleString('uk-UA'),
                " ",
                item.currency),
            react_1["default"].createElement("div", { className: 'flex items-center gap-1 text-[14px] ' }, isFlat ? (react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].trendBadge + " " + WatchCard_module_css_1["default"].trendValue + " " + WatchCard_module_css_1["default"].trendValueZero },
                "0 %",
                ' ',
                react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].trendPeriod }, item.trend.period))) : (react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].trendBadge + " " + WatchCard_module_css_1["default"].trendValue + " " + (isUp ? WatchCard_module_css_1["default"].trendValuePositive : WatchCard_module_css_1["default"].trendValueNegative), title: (isUp ? 'Зростання' : 'Падіння') + " \u0437\u0430 " + item.trend.period },
                isUp ? react_1["default"].createElement(lucide_react_1.ArrowUp, { size: 12 }) : react_1["default"].createElement(lucide_react_1.ArrowDown, { size: 12 }),
                Math.abs(trendValue),
                " %",
                ' ',
                react_1["default"].createElement("span", { className: WatchCard_module_css_1["default"].trendPeriod }, item.trend.period))))),
        react_1["default"].createElement("button", { className: WatchCard_module_css_1["default"].buyButton + " mt-[27px]", onClick: handleBuyClick }, item.chronoUrl && hasValidImage()
            ? item.buttonLabel
            : 'Get Quote')));
};

'use client';
"use strict";
exports.__esModule = true;
exports.MarketCard = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var LineChart_1 = require("@/components/Main/Hero/Chart/LineChart");
var Market_module_css_1 = require("./Market.module.css");
var LocalizedLink_1 = require("@/components/LocalizedLink");
var ArrowUp = function () { return (react_1["default"].createElement("svg", { width: '12', height: '14', viewBox: '0 0 12 14', fill: 'none' },
    react_1["default"].createElement("path", { d: 'M6 15 V1 M6 1 L2 5 M6 1 L10 5', stroke: 'currentColor', strokeWidth: '1' }))); };
var ArrowDown = function () { return (react_1["default"].createElement("svg", { width: '12', height: '14', viewBox: '0 0 12 14', fill: 'none' },
    react_1["default"].createElement("path", { d: 'M6 1 V15 M6 15 L2 11 M6 15 L10 11', stroke: 'currentColor', strokeWidth: '1' }))); };
exports.MarketCard = function (_a) {
    var title = _a.title, image = _a.image, changePercent = _a.changePercent, brand = _a.brand, chartData = _a.chartData, chartId = _a.chartId, slug = _a.slug, _b = _a.priority, priority = _b === void 0 ? false : _b;
    var percentColor = '#BA790F';
    var variant = 'green';
    var ArrowIcon = null;
    if (changePercent > 0) {
        percentColor = '#05873B';
        variant = 'green';
        ArrowIcon = ArrowUp;
    }
    else if (changePercent === 0) {
        percentColor = '#BA790F';
        variant = 'orange';
    }
    else {
        percentColor = '#B91B1BF4';
        variant = 'red';
        ArrowIcon = ArrowDown;
    }
    var _c = react_1.useState(70), chartHeight = _c[0], setChartHeight = _c[1];
    react_1.useEffect(function () {
        var updateHeight = function () {
            var width = window.innerWidth;
            if (width >= 1024) {
                setChartHeight(90);
            }
            else if (width >= 834) {
                setChartHeight(70);
            }
            else if (width >= 768) {
                setChartHeight(70);
            }
            else {
                setChartHeight(79);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return function () { return window.removeEventListener('resize', updateHeight); };
    }, []);
    return (react_1["default"].createElement(LocalizedLink_1.LocalizedLink, { href: slug ? "/product/" + slug : '/catalog', prefetch: false },
        react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketCard + " flex flex-col gap-4 md:gap-2 rounded-2xl h-[12.5rem] md:h-[10rem] lg:h-[13.5rem] px-[1.25rem] md:px-[0.6rem] lg:px-[1.25rem] py-[1rem] md:py-[0.6rem] lg:py-[1rem] max-w-[30rem]" },
            react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketCardHead + " flex w-full justify-between items-start" },
                react_1["default"].createElement("div", { className: "" + Market_module_css_1["default"].marketCardHeadName }, title),
                react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketCardHeadPercent + " flex items-center gap-1 font-bold", style: { color: percentColor } },
                    ArrowIcon && react_1["default"].createElement(ArrowIcon, null),
                    Math.round(changePercent * 10) / 10,
                    "%")),
            react_1["default"].createElement("div", { className: Market_module_css_1["default"].marketCardBody + " flex gap-2 items-center" },
                react_1["default"].createElement(image_1["default"], { src: image || '/watch/watch-random/img_1.webp', alt: brand, width: 134, height: 142, className: "" + Market_module_css_1["default"].cardImage, priority: priority, unoptimized: typeof image === 'string' && image.startsWith('http') }),
                react_1["default"].createElement("div", { className: 'flex flex-col gap-2 justify-between items-center h-full md:gap-2 lg:gap-3' },
                    react_1["default"].createElement("div", { className: Market_module_css_1["default"].cardWatchName + " text-center max-h-[54px] md:max-h-[36px]  max-w-[164px] lg:max-w-[212px] overflow-hidden" }, brand),
                    react_1["default"].createElement(LineChart_1.LineChart, { data: chartData || [], variant: variant, id: chartId, height: chartHeight }))))));
};

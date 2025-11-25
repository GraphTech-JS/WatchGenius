'use client';
"use strict";
exports.__esModule = true;
exports.WatchCardSkeleton = void 0;
var react_1 = require("react");
var react_loading_skeleton_1 = require("react-loading-skeleton");
require("react-loading-skeleton/dist/skeleton.css");
var WatchCard_module_css_1 = require("./WatchCard.module.css");
exports.WatchCardSkeleton = function () {
    return (react_1["default"].createElement("div", { className: WatchCard_module_css_1["default"].watchCard + " border border-[rgba(23,20,20,0.15)] bg-white" },
        react_1["default"].createElement("div", { className: 'flex justify-between items-center' },
            react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 27, width: 34, borderRadius: 5 }),
            react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 18, width: 18, circle: true })),
        react_1["default"].createElement("div", { className: 'relative h-[111px] md:h-[124px] xl:h-[123px] w-[150px]' },
            react_1["default"].createElement(react_loading_skeleton_1["default"], { style: {
                    position: 'absolute',
                    top: 0,
                    left: '15%',
                    right: 0,
                    bottom: 0
                } })),
        react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 20, width: '100%', className: 'mt-[8px] mb-[8px]' }),
        react_1["default"].createElement("div", { className: 'flex flex-col items-center gap-[9px] sm:flex-row sm:justify-between' },
            react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 20, width: 80 }),
            react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 20, width: 64 })),
        react_1["default"].createElement(react_loading_skeleton_1["default"], { className: WatchCard_module_css_1["default"].buyButton + " mt-[27px]", height: 31, borderRadius: 10 })));
};

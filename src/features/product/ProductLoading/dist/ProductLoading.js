'use client';
"use strict";
exports.__esModule = true;
exports.ProductLoading = void 0;
var react_1 = require("react");
var react_spinners_1 = require("react-spinners");
exports.ProductLoading = function () {
    return (react_1["default"].createElement("div", { className: 'flex flex-col items-center justify-center min-h-screen gap-6' },
        react_1["default"].createElement(react_spinners_1.ClockLoader, { size: 60, color: '#04694f', speedMultiplier: 0.9 }),
        react_1["default"].createElement("p", { className: 'text-[#8b8b8b] text-[20px] font-[var(--font-inter)]' }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...")));
};

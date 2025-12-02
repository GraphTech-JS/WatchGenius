'use client';
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
exports.__esModule = true;
var react_1 = require("react");
function clamp(n, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.max(min, Math.min(max, n));
}
function getHref(src) {
    return typeof src === 'string' ? src : src.src;
}
var defaultConfig = {
    pivotYR: 0.69,
    labelsYR: 0.825,
    valueYR: 0.8,
    lastUpdatedYR: 0.94,
    labelsLeftXR: 0.14,
    labelsRightXR: 0.86,
    pointerWidthR: 58 / 338,
    pointerHeightR: 111 / 338,
    pointerAnchorX: 0.468,
    pointerAnchorY: 0.915,
    pointerOffsetX: 1,
    pointerOffsetY: -1,
    centerSizeR: 29 / 338,
    centerOffsetYR: 0,
    fontFamily: "'Inter', sans-serif",
    labelFontSizePx: undefined,
    labelFontWeight: 600,
    labelColor: '#000',
    valueFontSizePx: undefined,
    valueColor: '#04694f',
    lastUpdatedFontSizePx: undefined,
    lastUpdatedColor: 'rgba(0,0,0,0.6)'
};
var TrendGauge = function (_a) {
    var _b, _c, _d;
    var value = _a.value, arcSrc = _a.arcSrc, pointerSrc = _a.pointerSrc, centerSrc = _a.centerSrc, lastUpdated = _a.lastUpdated, className = _a.className, width = _a.width, height = _a.height, config = _a.config;
    var v = Math.round(clamp(Number(value) || 0) * 10) / 10;
    var angle = -120 + (v / 100) * 180;
    var vbW = width;
    var vbH = height;
    var cx = vbW / 2;
    var cfg = __assign(__assign({}, defaultConfig), (config || {}));
    var pivotY = vbH * cfg.pivotYR;
    var pointerW = vbH * cfg.pointerWidthR;
    var pointerH = vbH * cfg.pointerHeightR;
    var axPx = pointerW * cfg.pointerAnchorX;
    var ayPx = pointerH * cfg.pointerAnchorY;
    var pointerX = cx - axPx + cfg.pointerOffsetX;
    var pointerY = pivotY - ayPx + cfg.pointerOffsetY;
    var centerSize = vbH * cfg.centerSizeR;
    var centerX = cx - centerSize / 2;
    var centerY = pivotY - centerSize / 2 + cfg.centerOffsetYR * vbH;
    var labelsY = vbH * cfg.labelsYR;
    var valueY = vbH * cfg.valueYR;
    var lastUpdatedY = vbH * cfg.lastUpdatedYR;
    var labelFontSize = (_b = cfg.labelFontSizePx) !== null && _b !== void 0 ? _b : Math.round(vbH * 0.059);
    var valueFontSize = (_c = cfg.valueFontSizePx) !== null && _c !== void 0 ? _c : Math.round(vbH * 0.071);
    var lastUpdatedFontSize = (_d = cfg.lastUpdatedFontSizePx) !== null && _d !== void 0 ? _d : Math.round(vbH * 0.035);
    var leftLabelX = vbW * cfg.labelsLeftXR;
    var rightLabelX = vbW * cfg.labelsRightXR;
    return (react_1["default"].createElement("div", { className: className, style: { width: '100%', height: '100%' } },
        react_1["default"].createElement("svg", { viewBox: "0 0 " + vbW + " " + vbH, width: '100%', height: '100%', role: 'img', "aria-label": "\u041F\u043E\u043F\u0438\u0442 " + v + "%" },
            react_1["default"].createElement("image", { href: getHref(arcSrc), x: 0, y: 0, width: vbW, height: vbH, preserveAspectRatio: 'xMidYMid meet' }),
            react_1["default"].createElement("g", { transform: "rotate(" + angle + " " + cx + " " + pivotY + ")", style: { transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' } },
                react_1["default"].createElement("image", { href: getHref(pointerSrc), x: pointerX, y: pointerY, width: pointerW, height: pointerH, preserveAspectRatio: 'xMidYMid meet' })),
            react_1["default"].createElement("image", { href: getHref(centerSrc), x: centerX, y: centerY, width: centerSize, height: centerSize, preserveAspectRatio: 'xMidYMid meet' }),
            react_1["default"].createElement("text", { x: leftLabelX, y: labelsY, fontSize: labelFontSize, fontWeight: cfg.labelFontWeight, fill: cfg.labelColor, fontFamily: cfg.fontFamily, textAnchor: 'start' }, "Low"),
            react_1["default"].createElement("text", { x: rightLabelX, y: labelsY, fontSize: labelFontSize, fontWeight: cfg.labelFontWeight, fill: cfg.labelColor, fontFamily: cfg.fontFamily, textAnchor: 'end' }, "Hight"),
            react_1["default"].createElement("text", { x: cx, y: valueY, fontSize: valueFontSize, fontWeight: 700, fill: cfg.valueColor, fontFamily: cfg.fontFamily, textAnchor: 'middle' },
                v,
                "%"),
            lastUpdated && (react_1["default"].createElement("text", { x: cx, y: lastUpdatedY, fontSize: lastUpdatedFontSize, fill: cfg.lastUpdatedColor, fontFamily: cfg.fontFamily, textAnchor: 'middle' },
                "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E \u043D\u0430 ",
                lastUpdated)))));
};
exports["default"] = TrendGauge;

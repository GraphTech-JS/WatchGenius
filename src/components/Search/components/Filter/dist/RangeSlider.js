"use strict";
exports.__esModule = true;
// src/components/RangeSliderRange.tsx
var react_1 = require("react");
function RangeSliderRange(_a) {
    var min = _a.min, max = _a.max, minValue = _a.minValue, maxValue = _a.maxValue, onChange = _a.onChange, _b = _a.step, step = _b === void 0 ? 1000 : _b, _c = _a.unit, unit = _c === void 0 ? 'грн' : _c;
    var sliderRef = react_1.useRef(null);
    var _d = react_1.useState(null), dragging = _d[0], setDragging = _d[1];
    var formatPrice = function (val) { return val.toLocaleString('uk-UA') + (" " + unit); };
    var getPercent = react_1.useCallback(function (val) { return ((val - min) / (max - min)) * 100; }, [min, max]);
    var calculateValueFromPos = react_1.useCallback(function (clientX) {
        if (!sliderRef.current)
            return minValue;
        var _a = sliderRef.current.getBoundingClientRect(), left = _a.left, width = _a.width;
        var pct = Math.max(0, Math.min(1, (clientX - left) / width));
        var raw = min + pct * (max - min);
        var stepped = Math.round(raw / step) * step;
        return Math.max(min, Math.min(max, stepped));
    }, [min, max, step, minValue]);
    var onMouseMove = react_1.useCallback(function (e) {
        if (!dragging)
            return;
        e.preventDefault();
        var newVal = calculateValueFromPos(e.clientX);
        if (dragging === 'min') {
            onChange(Math.min(newVal, maxValue), maxValue);
        }
        else {
            onChange(minValue, Math.max(newVal, minValue));
        }
    }, [dragging, calculateValueFromPos, minValue, maxValue, onChange]);
    var onMouseUp = react_1.useCallback(function () {
        setDragging(null);
    }, []);
    react_1.useEffect(function () {
        if (dragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.body.style.userSelect = 'none';
            return function () {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.body.style.userSelect = '';
            };
        }
    }, [dragging, onMouseMove, onMouseUp]);
    var handleDown = function (thumb) { return function (e) {
        e.preventDefault();
        setDragging(thumb);
    }; };
    var leftPct = getPercent(minValue);
    var rightPct = getPercent(maxValue);
    return (react_1["default"].createElement("div", { className: 'mt-4 w-full' },
        react_1["default"].createElement("div", { className: 'flex justify-between mb-2 text-sm text-gray-600' },
            react_1["default"].createElement("span", null, formatPrice(min)),
            react_1["default"].createElement("span", null, formatPrice(max))),
        react_1["default"].createElement("div", { className: 'relative h-2', ref: sliderRef },
            react_1["default"].createElement("div", { className: 'absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-full' }),
            react_1["default"].createElement("div", { className: 'absolute top-0 h-2 bg-green-500 rounded-full', style: {
                    left: leftPct + "%",
                    width: rightPct - leftPct + "%"
                } }),
            react_1["default"].createElement("div", { className: 'absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab', style: { left: leftPct + "%", zIndex: dragging === 'min' ? 20 : 10 }, onMouseDown: handleDown('min') },
                minValue > min && (react_1["default"].createElement("div", { className: 'absolute bottom-[30px] mb-2 w-max px-2 py-1 text-xs text-black ' }, formatPrice(minValue))),
                react_1["default"].createElement("div", { className: "w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow " + (dragging === 'min' ? 'scale-110' : 'hover:scale-105') + " transition-transform" })),
            react_1["default"].createElement("div", { className: 'absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab', style: { left: rightPct + "%", zIndex: dragging === 'max' ? 20 : 10 }, onMouseDown: handleDown('max') },
                maxValue < max && (react_1["default"].createElement("div", { className: 'absolute bottom-[30px] mb-2 w-max px-2 py-1 text-xs text-black ' }, formatPrice(maxValue))),
                react_1["default"].createElement("div", { className: "w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow " + (dragging === 'max' ? 'scale-110' : 'hover:scale-105') + " transition-transform" })))));
}
exports["default"] = RangeSliderRange;

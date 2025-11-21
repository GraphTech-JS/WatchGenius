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
exports.FloatingButton = void 0;
var react_1 = require("react");
function FloatingButton(_a) {
    var watchedIds = _a.watchedIds, _b = _a.safeOffset, safeOffset = _b === void 0 ? 20 : _b, _c = _a.initialOffsetPercent, initialOffsetPercent = _c === void 0 ? 0.4 : _c, _d = _a.extraOffset, extraOffset = _d === void 0 ? 50 : _d, className = _a.className, style = _a.style, children = _a.children;
    var _e = react_1.useState(initialOffsetPercent * 100 + "%"), bottom = _e[0], setBottom = _e[1];
    var _f = react_1.useState(false), isScrolling = _f[0], setIsScrolling = _f[1];
    react_1.useEffect(function () {
        var ticking = false;
        var scrollTimeout;
        var updatePosition = function () {
            var vh = window.innerHeight;
            var vw = window.innerWidth;
            if (vw < 768) {
                setBottom('80px');
                return;
            }
            var basePx = vh * initialOffsetPercent;
            var minTop = Infinity;
            watchedIds.forEach(function (id) {
                var el = document.getElementById(id);
                if (el) {
                    minTop = Math.min(minTop, el.getBoundingClientRect().top);
                }
            });
            if (minTop === Infinity || minTop > vh) {
                setBottom(initialOffsetPercent * 100 + "%");
            }
            else {
                var minBottom = vh - minTop + safeOffset;
                var finalPx = Math.round(Math.max(basePx, minBottom) + extraOffset);
                setBottom(finalPx + "px");
            }
        };
        var onScroll = function () {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () { return setIsScrolling(false); }, 100);
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(function () {
                    updatePosition();
                    ticking = false;
                });
            }
        };
        updatePosition();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updatePosition, { passive: true });
        return function () {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updatePosition);
            clearTimeout(scrollTimeout);
        };
    }, [watchedIds, safeOffset, initialOffsetPercent, extraOffset]);
    return (react_1["default"].createElement("div", { className: "fixed right-5 left-5 z-110 " + className, style: __assign({ bottom: bottom }, style) }, children({ bottom: bottom, isScrolling: isScrolling })));
}
exports.FloatingButton = FloatingButton;

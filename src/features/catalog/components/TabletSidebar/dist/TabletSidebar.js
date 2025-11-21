'use client';
"use strict";
exports.__esModule = true;
exports.TabletSidebar = void 0;
var react_1 = require("react");
var CatalogSidebar_1 = require("@/features/catalog/components/CatalogSidebar/CatalogSidebar");
var TabletSidebar_module_css_1 = require("./TabletSidebar.module.css");
var i18n_1 = require("@/i18n");
var catalog_1 = require("@/i18n/keys/catalog");
exports.TabletSidebar = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 321 : _b, _c = _a.zIndex, zIndex = _c === void 0 ? 5 : _c, className = _a.className, onReset = _a.onReset, _d = _a.topOffset, topOffset = _d === void 0 ? 280 : _d, containerRef = _a.containerRef;
    var panelRef = react_1.useRef(null);
    var handleRef = react_1.useRef(null);
    var wrapperRef = react_1.useRef(null);
    var CLOSED_X = -width;
    var OPEN_X = 0;
    var HANDLE_OVERLAP = 3;
    var _e = react_1.useState(CLOSED_X), x = _e[0], setX = _e[1];
    var _f = react_1.useState(false), dragging = _f[0], setDragging = _f[1];
    var _g = react_1.useState(0), startX = _g[0], setStartX = _g[1];
    var _h = react_1.useState(CLOSED_X), startOffset = _h[0], setStartOffset = _h[1];
    var _j = react_1.useState(null), handleTop = _j[0], setHandleTop = _j[1];
    var _k = react_1.useState(0), pointerDownTime = _k[0], setPointerDownTime = _k[1];
    var _l = react_1.useState(0), totalDragDistance = _l[0], setTotalDragDistance = _l[1];
    var _m = react_1.useState(0), staticTop = _m[0], setStaticTop = _m[1];
    var open = function () { return setX(OPEN_X); };
    var close = react_1.useCallback(function () { return setX(CLOSED_X); }, [CLOSED_X]);
    var isOpen = x > CLOSED_X + width / 2;
    var HEADER_SAFE_Z = 40;
    var BASE_Z = Math.min(zIndex !== null && zIndex !== void 0 ? zIndex : 0, HEADER_SAFE_Z - 2);
    var HANDLE_Z = BASE_Z + 1;
    var onPointerDown = function (e) {
        e.target.setPointerCapture(e.pointerId);
        setDragging(true);
        setStartX(e.clientX);
        setStartOffset(x);
        setPointerDownTime(Date.now());
        setTotalDragDistance(0);
    };
    var onPointerMove = function (e) {
        if (!dragging)
            return;
        var dx = e.clientX - startX;
        var next = Math.min(OPEN_X, Math.max(CLOSED_X, startOffset + dx));
        setX(next);
        setTotalDragDistance(function (prev) { return prev + Math.abs(e.movementX || 0); });
    };
    var onPointerUp = function () {
        var wasClick = totalDragDistance < 5 && Date.now() - pointerDownTime < 200;
        setDragging(false);
        if (wasClick) {
            if (isOpen)
                close();
            else
                open();
        }
        else {
            var threshold = CLOSED_X + width / 2;
            if (x > threshold)
                open();
            else
                close();
        }
    };
    react_1.useEffect(function () {
        var onDocClick = function (e) {
            if (!wrapperRef.current)
                return;
            if (wrapperRef.current.contains(e.target))
                return;
            close();
        };
        document.addEventListener('mousedown', onDocClick);
        return function () { return document.removeEventListener('mousedown', onDocClick); };
    }, [close]);
    react_1.useEffect(function () {
        var alignHandle = function () {
            var panel = panelRef.current;
            if (!panel)
                return;
            var input = panel.querySelector('input[data-sidebar-search="true"]');
            if (!input)
                return;
            var pr = panel.getBoundingClientRect();
            var ir = input.getBoundingClientRect();
            var center = ir.top - pr.top + ir.height / 2;
            setHandleTop(center - 22.5);
        };
        alignHandle();
        window.addEventListener('resize', alignHandle);
        return function () { return window.removeEventListener('resize', alignHandle); };
    }, []);
    react_1.useEffect(function () {
        var compute = function () {
            var container = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current;
            if (container) {
                var contRect = container.getBoundingClientRect();
                var contTopAbs = contRect.top + window.scrollY;
                setStaticTop(contTopAbs);
                return;
            }
            setStaticTop(topOffset !== null && topOffset !== void 0 ? topOffset : 280);
        };
        compute();
        window.addEventListener('resize', compute);
        var ro = new ResizeObserver(compute);
        if (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current)
            ro.observe(containerRef.current);
        return function () {
            window.removeEventListener('resize', compute);
            ro.disconnect();
        };
    }, [topOffset, containerRef]);
    return (react_1["default"].createElement("div", { ref: wrapperRef, className: TabletSidebar_module_css_1["default"].wrapper + " " + (className || '') },
        react_1["default"].createElement("div", { ref: panelRef, role: 'complementary', "aria-label": i18n_1.t(catalog_1.catalogKeys.sidebar.aria.filters), className: TabletSidebar_module_css_1["default"].panel + " " + (dragging ? TabletSidebar_module_css_1["default"].panelDragging : TabletSidebar_module_css_1["default"].panelNotDragging), style: {
                width: width,
                top: staticTop,
                position: 'absolute',
                zIndex: BASE_Z,
                transform: "translateX(" + x + "px)"
            } },
            react_1["default"].createElement(CatalogSidebar_1.CatalogSidebar, { onReset: onReset })),
        react_1["default"].createElement("button", { ref: handleRef, type: 'button', "aria-label": isOpen
                ? i18n_1.t(catalog_1.catalogKeys.sidebar.aria.close)
                : i18n_1.t(catalog_1.catalogKeys.sidebar.aria.open), onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, className: TabletSidebar_module_css_1["default"].handle + " " + (dragging ? TabletSidebar_module_css_1["default"].handleDragging : TabletSidebar_module_css_1["default"].handleNotDragging), style: {
                position: 'absolute',
                left: x + width - HANDLE_OVERLAP,
                top: handleTop ? staticTop + handleTop : staticTop + 150,
                transform: 'none',
                zIndex: HANDLE_Z
            } })));
};

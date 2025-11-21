'use client';
"use strict";
exports.__esModule = true;
exports.Header = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var navigation_2 = require("next/navigation");
var react_dom_1 = require("react-dom");
var link_1 = require("next/link");
var image_1 = require("next/image");
var useLocale_1 = require("@/hooks/useLocale");
var Header_module_css_1 = require("./Header.module.css");
var i18n_1 = require("@/i18n");
var accessibility_1 = require("@/i18n/keys/accessibility");
var WishlistContext_1 = require("@/context/WishlistContext");
var WishlistModal_1 = require("@/components/WishlistModal/WishlistModal");
var SuccessModal_1 = require("@/components/SuccessModal/SuccessModal");
var icons_1 = require("../../../../public/icons");
var Icon_1 = require("../../../../public/header/Icon");
var header_1 = require("@/i18n/keys/header");
exports.Header = function () {
    var locale = useLocale_1.useLocale();
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    var _b = react_1.useState(false), mounted = _b[0], setMounted = _b[1];
    var _c = react_1.useState(false), showCurrency = _c[0], setShowCurrency = _c[1];
    var _d = react_1.useState(false), showLang = _d[0], setShowLang = _d[1];
    var _e = react_1.useState(false), showSearch = _e[0], setShowSearch = _e[1];
    var _f = react_1.useState(false), menuClosing = _f[0], setMenuClosing = _f[1];
    var _g = react_1.useState(false), isWishlistModalOpen = _g[0], setIsWishlistModalOpen = _g[1];
    var _h = react_1.useState(false), showSuccessModal = _h[0], setShowSuccessModal = _h[1];
    var _j = react_1.useState(''), successMessage = _j[0], setSuccessMessage = _j[1];
    var prevWishlistCountRef = react_1.useRef(0);
    var wishlistIds = WishlistContext_1.useWishlistContext().wishlistIds;
    var wishlistCount = wishlistIds.length;
    var openMenu = function () {
        setMenuClosing(false);
        setOpen(true);
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                var el = document.getElementById('mobileMenu');
                if (el)
                    el.classList.add(Header_module_css_1["default"].menuOpen);
            });
        });
    };
    var startCloseMenu = function () {
        var el = document.getElementById('mobileMenu');
        if (el) {
            el.classList.remove(Header_module_css_1["default"].menuOpen);
            el.classList.add(Header_module_css_1["default"].menuClosing);
        }
        setMenuClosing(true);
        setTimeout(function () {
            setOpen(false);
            setMenuClosing(false);
        }, 400);
    };
    var _k = react_1.useState(function () {
        if (typeof window !== 'undefined') {
            var stored = localStorage.getItem('selectedCurrency');
            if (stored && ['EUR', 'USD', 'PLN', 'UAH'].includes(stored)) {
                return stored;
            }
        }
        return 'EUR';
    }), selectedCurrency = _k[0], setSelectedCurrency = _k[1];
    var _l = react_1.useState('УКР'), selectedLang = _l[0], setSelectedLang = _l[1];
    var currencyRef = react_1.useRef(null);
    var langRef = react_1.useRef(null);
    var searchRef = react_1.useRef(null);
    var pathname = navigation_1.usePathname();
    var _m = react_1.useState(null), activeSection = _m[0], setActiveSection = _m[1];
    var router = navigation_2.useRouter();
    var handleSectionClick = function (event, id) {
        event.preventDefault();
        if (pathname === "/" + locale) {
            var element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        else {
            router.push("/" + locale + "/#" + id);
        }
    };
    react_1.useEffect(function () {
        if (pathname !== "/" + locale)
            return;
        var sections = ['dealers', 'treands', 'contacts'];
        var handleScroll = function () {
            var currentSection = null;
            for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                var id = sections_1[_i];
                var section = document.getElementById(id);
                if (section) {
                    var rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = id;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, [pathname, locale]);
    react_1.useEffect(function () { return setMounted(true); }, []);
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            var target = event.target;
            if (currencyRef.current && !currencyRef.current.contains(target)) {
                setShowCurrency(false);
            }
            if (langRef.current && !langRef.current.contains(target)) {
                setShowLang(false);
            }
            if (searchRef.current && !searchRef.current.contains(target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    react_1.useEffect(function () {
        var timer;
        if (showSearch) {
            timer = setTimeout(function () { return setShowSearch(false); }, 4000);
        }
        return function () { return clearTimeout(timer); };
    }, [showSearch]);
    react_1.useEffect(function () {
        if (prevWishlistCountRef.current === 0) {
            prevWishlistCountRef.current = wishlistCount;
            return;
        }
        if (wishlistCount > prevWishlistCountRef.current) {
            setSuccessMessage('Годинник додано до списку бажань');
            setShowSuccessModal(true);
        }
        prevWishlistCountRef.current = wishlistCount;
    }, [wishlistCount]);
    var currencies = ['EUR', 'USD', 'UAH', 'PL', 'KZT'];
    var languages = ['УКР', 'АНГЛ', 'ПЛ'];
    return (react_1["default"].createElement("header", { className: Header_module_css_1["default"].header + " w-full" },
        react_1["default"].createElement("div", { className: Header_module_css_1["default"].headerContainer },
            react_1["default"].createElement(link_1["default"], { href: "/" + locale, className: "flex items-center gap-[4px]" },
                react_1["default"].createElement(image_1["default"], { src: icons_1.Logo.src, className: "" + Header_module_css_1["default"].headerLogoIcon, alt: 'logo', width: 40, height: 40 }),
                react_1["default"].createElement("div", { className: Header_module_css_1["default"].logoName }, "WATCHGENIUS")),
            react_1["default"].createElement("nav", { className: "hidden gap-11 lg:flex lg:pl-12" }, [
                {
                    href: "/" + locale + "/catalog",
                    label: i18n_1.t(header_1.headerKeys.nav.catalog),
                    type: 'page'
                },
                {
                    href: '#dealers',
                    label: i18n_1.t(header_1.headerKeys.nav.dealers),
                    type: 'section'
                },
                {
                    href: '#treands',
                    label: i18n_1.t(header_1.headerKeys.nav.trends),
                    type: 'section'
                },
                {
                    href: '#contacts',
                    label: i18n_1.t(header_1.headerKeys.nav.contacts),
                    type: 'section'
                },
            ].map(function (_a) {
                var href = _a.href, label = _a.label, type = _a.type;
                var isCatalog = pathname === "/" + locale + "/catalog";
                var isMain = pathname === "/" + locale;
                var sectionId = href.replace('#', '');
                var isActive = (isCatalog && href === "/" + locale + "/catalog") ||
                    (isMain && activeSection === sectionId);
                var isInactive = (isCatalog && href !== "/" + locale + "/catalog") ||
                    (isMain && activeSection && activeSection !== sectionId);
                var commonClass = Header_module_css_1["default"].headerLink + " " + (isActive ? Header_module_css_1["default"].headerLinkActive : '') + " " + (isInactive ? Header_module_css_1["default"].headerLinkInactive : '');
                return type === 'page' ? (react_1["default"].createElement(link_1["default"], { key: label, href: href, className: commonClass, prefetch: false }, label)) : (react_1["default"].createElement("a", { key: label, href: href, onClick: function (e) { return handleSectionClick(e, sectionId); }, className: commonClass }, label));
            })),
            react_1["default"].createElement("div", { className: 'flex relative gap-4 ml-4' },
                react_1["default"].createElement("div", { className: 'hidden gap-5 md:flex' },
                    react_1["default"].createElement("div", { className: "relative " + (showSearch ? 'lg:hidden' : 'lg:flex') + " flex items-center w-8 text-center", ref: currencyRef },
                        react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn, onClick: function () {
                                setShowCurrency(function (prev) { return !prev; });
                                setShowLang(false);
                            }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.currency.select), "aria-expanded": showCurrency, "aria-haspopup": 'true' },
                            react_1["default"].createElement("div", null, selectedCurrency)),
                        showCurrency && (react_1["default"].createElement("div", { className: 'absolute top-[-2px] lg:top-[-8px] left-[-14px] lg:left-[-14px] flex flex-col bg-white rounded-[10px] z-20' }, currencies.map(function (cur) { return (react_1["default"].createElement("button", { key: cur, onClick: function () {
                                setSelectedCurrency(cur);
                                setShowCurrency(false);
                                // Зберігаємо в localStorage
                                if (typeof window !== 'undefined') {
                                    localStorage.setItem('selectedCurrency', cur);
                                    // Відправляємо custom event для оновлення компонентів
                                    window.dispatchEvent(new Event('currencyChanged'));
                                }
                            }, className: Header_module_css_1["default"].headerLangSwitchBtn + " text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] " + (cur !== selectedCurrency ? Header_module_css_1["default"].inactiveOption : '') }, cur)); })))),
                    react_1["default"].createElement("div", { className: "relative " + (showSearch ? 'lg:hidden' : 'lg:flex') + " flex items-center w-10 text-center", ref: langRef },
                        react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn, onClick: function () {
                                setShowLang(function (prev) { return !prev; });
                                setShowCurrency(false);
                            }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.language.select), "aria-expanded": showLang, "aria-haspopup": 'true' },
                            react_1["default"].createElement("div", null, selectedLang)),
                        showLang && (react_1["default"].createElement("div", { className: 'absolute top-[-2px] lg:top-[-8px] left-[-17px] lg:left-[-17px] flex flex-col bg-white rounded-[10px] z-20' }, languages.map(function (lang) { return (react_1["default"].createElement("button", { key: lang, onClick: function () {
                                setSelectedLang(lang);
                                setShowLang(false);
                            }, className: Header_module_css_1["default"].headerLangSwitchBtn + " px-3 py-2 hover:bg-gray-100 rounded-[10px] text-center " + (lang !== selectedLang ? Header_module_css_1["default"].inactiveOption : '') }, lang)); })))),
                    react_1["default"].createElement("button", { className: "lg:" + (showSearch ? 'hidden' : 'flex') + " " + Header_module_css_1["default"].headerLangSwitchBtn + "  hidden shrink-0", onClick: function () {
                            setShowSearch(function (prev) { return !prev; });
                            setShowCurrency(false);
                            setShowLang(false);
                        }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.search.open), "aria-expanded": showSearch },
                        react_1["default"].createElement(image_1["default"], { src: icons_1.SearchNormal.src, alt: '', width: 18, height: 18, "aria-hidden": 'true' }))),
                react_1["default"].createElement("div", { ref: searchRef, className: "md:flex\n            " + (showSearch
                        ? 'lg:opacity-100 lg:translate-y-0 lg:relative lg:pointer-events-auto'
                        : 'lg:opacity-0 lg:translate-y-4 lg:absolute lg:pointer-events-none') + "\n            hidden rounded-xl border border-black pl-4 py-2 items-center gap-2\n            transition-all duration-300 ease-out" },
                    react_1["default"].createElement("label", { htmlFor: 'desktop-search', className: 'sr-only' }, i18n_1.t(accessibility_1.a11yKeys.search.catalog)),
                    react_1["default"].createElement("input", { id: 'desktop-search', type: 'search', className: Header_module_css_1["default"].headerMobileSearchInput + " w-full max-w-[150px] ", placeholder: i18n_1.t(header_1.headerKeys.search.placeholder) }),
                    react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn + " shrink-0 mr-3", "aria-label": i18n_1.t(accessibility_1.a11yKeys.search.submit) },
                        react_1["default"].createElement(image_1["default"], { src: icons_1.SearchNormal.src, alt: i18n_1.t(header_1.headerKeys.search.placeholder), width: 18, height: 18, "aria-hidden": 'true' }))),
                react_1["default"].createElement("div", { className: 'hidden gap-3 lg:flex' },
                    react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn + " shrink-0", onClick: function () {
                            return window.dispatchEvent(new CustomEvent('toggleChat', { detail: true }));
                        }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.ai.open) },
                        react_1["default"].createElement(image_1["default"], { src: icons_1.Robot.src, alt: i18n_1.t(header_1.headerKeys.aiAgent.tooltip), width: 22, height: 22, "aria-hidden": 'true' })),
                    react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn + " shrink-0 relative cursor-pointer", "aria-label": i18n_1.t(accessibility_1.a11yKeys.favorites.view), onClick: function () { return setIsWishlistModalOpen(true); } },
                        react_1["default"].createElement(Icon_1.HeartIcon, { className: "w-5 h-5 text-green-800", "aria-hidden": 'true' }),
                        wishlistCount > 0 && (react_1["default"].createElement("span", { className: 'flex absolute -top-2 -right-2 justify-center items-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full', "aria-label": wishlistCount + " \u0442\u043E\u0432\u0430\u0440\u0456\u0432 \u0443 \u0441\u043F\u0438\u0441\u043A\u0443 \u0431\u0430\u0436\u0430\u043D\u044C" }, wishlistCount > 9 ? '9+' : wishlistCount)))),
                react_1["default"].createElement("div", { className: 'flex ml-4 w-8 lg:hidden' },
                    react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerMobileMenuBtn, onClick: function () { return (open ? startCloseMenu() : openMenu()); }, "aria-expanded": open, "aria-controls": 'mobileMenu', "aria-label": open ? i18n_1.t(accessibility_1.a11yKeys.menu.close) : i18n_1.t(accessibility_1.a11yKeys.menu.open) },
                        react_1["default"].createElement(image_1["default"], { src: open ? icons_1.Close.src : icons_1.Menu.src, alt: '', className: open
                                ? Header_module_css_1["default"].headerMobileMenuIconClose
                                : Header_module_css_1["default"].headerMobileMenuIcon, width: 32, height: 14, "aria-hidden": 'true' })))),
            mounted &&
                (open || menuClosing) &&
                react_dom_1.createPortal(react_1["default"].createElement("div", { id: 'mobileMenu', className: Header_module_css_1["default"].headerMobileMenu + " fixed flex flex-col py-8 rounded-none md:rounded-b-xl" },
                    react_1["default"].createElement("div", { className: Header_module_css_1["default"].headerMobileMenuTop + " flex w-full justify-center " },
                        react_1["default"].createElement("div", { className: Header_module_css_1["default"].headerMobileMenuSearch + " flex " }),
                        react_1["default"].createElement("div", { className: 'flex gap-5 p-3 md:hidden' },
                            react_1["default"].createElement("div", { className: 'flex py-3 pl-4 rounded-xl border border-white' },
                                react_1["default"].createElement("label", { htmlFor: 'mobile-search', className: 'sr-only' }, i18n_1.t(accessibility_1.a11yKeys.search.catalog)),
                                react_1["default"].createElement("input", { id: 'mobile-search', type: 'search', className: Header_module_css_1["default"].headerMobileSearchInput + " max-w-[200px]", placeholder: i18n_1.t(header_1.headerKeys.search.placeholder) }),
                                react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerLangSwitchBtn + " shrink-0 mr-4", "aria-label": i18n_1.t(accessibility_1.a11yKeys.search.submit) },
                                    react_1["default"].createElement(image_1["default"], { src: icons_1.SearchWhite.src, alt: i18n_1.t(header_1.headerKeys.search.placeholder), width: 18, height: 18, "aria-hidden": 'true' }))),
                            react_1["default"].createElement("div", { className: 'flex relative items-center w-10 text-center', ref: currencyRef },
                                react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerMobileLangSwitchBtn, onClick: function () {
                                        setShowCurrency(function (prev) { return !prev; });
                                        setShowLang(false);
                                    }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.currency.select), "aria-expanded": showCurrency, "aria-haspopup": 'true' },
                                    react_1["default"].createElement("div", null, selectedCurrency)),
                                showCurrency && (react_1["default"].createElement("div", { className: 'absolute top-[5px] left-[-14px] flex flex-col bg-white rounded-[10px] z-20' }, currencies.map(function (cur) { return (react_1["default"].createElement("button", { key: cur, onClick: function () {
                                        setSelectedCurrency(cur);
                                        setShowCurrency(false);
                                        // Зберігаємо в localStorage
                                        if (typeof window !== 'undefined') {
                                            localStorage.setItem('selectedCurrency', cur);
                                            // Відправляємо custom event для оновлення компонентів
                                            window.dispatchEvent(new Event('currencyChanged'));
                                        }
                                    }, className: Header_module_css_1["default"].headerLangSwitchBtn + " text-center px-3 py-2 hover:bg-gray-100 rounded-[10px] " + (cur !== selectedCurrency
                                        ? Header_module_css_1["default"].inactiveOption
                                        : '') }, cur)); })))),
                            react_1["default"].createElement("div", { className: 'flex relative items-center w-10 text-center', ref: langRef },
                                react_1["default"].createElement("button", { className: Header_module_css_1["default"].headerMobileLangSwitchBtn, onClick: function () {
                                        setShowLang(function (prev) { return !prev; });
                                        setShowCurrency(false);
                                    }, "aria-label": i18n_1.t(accessibility_1.a11yKeys.language.select), "aria-expanded": showLang, "aria-haspopup": 'true' },
                                    react_1["default"].createElement("div", null, selectedLang)),
                                showLang && (react_1["default"].createElement("div", { className: 'absolute top-[5px] left-[-17px] flex flex-col bg-white rounded-[10px] z-20' }, languages.map(function (lang) { return (react_1["default"].createElement("button", { key: lang, onClick: function () {
                                        setSelectedLang(lang);
                                        setShowLang(false);
                                    }, className: Header_module_css_1["default"].headerLangSwitchBtn + " px-3 py-2 hover:bg-gray-100 rounded-[10px] text-center " + (lang !== selectedLang ? Header_module_css_1["default"].inactiveOption : '') }, lang)); })))))),
                    react_1["default"].createElement("div", { className: Header_module_css_1["default"].headerMobileMenuWrapper + " md:mt-12 flex h-full flex-col items-center justify-center" },
                        react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/catalog", onClick: startCloseMenu, className: Header_module_css_1["default"].headerMobileMenuLink }, i18n_1.t(header_1.headerKeys.mobileMenu.catalog)),
                        react_1["default"].createElement("a", { href: '#dealers', onClick: function (e) {
                                handleSectionClick(e, 'dealers');
                                startCloseMenu();
                            }, className: Header_module_css_1["default"].headerMobileMenuLink }, i18n_1.t(header_1.headerKeys.mobileMenu.dealers)),
                        react_1["default"].createElement("a", { href: '#treands', onClick: function (e) {
                                handleSectionClick(e, 'treands');
                                startCloseMenu();
                            }, className: Header_module_css_1["default"].headerMobileMenuLink }, i18n_1.t(header_1.headerKeys.mobileMenu.trends)),
                        react_1["default"].createElement("a", { href: '#contacts', onClick: function (e) {
                                handleSectionClick(e, 'contacts');
                                startCloseMenu();
                            }, className: Header_module_css_1["default"].headerMobileMenuLink }, i18n_1.t(header_1.headerKeys.mobileMenu.contacts)))), document.body)),
        react_1["default"].createElement(WishlistModal_1.WishlistModal, { isOpen: isWishlistModalOpen, onClose: function () { return setIsWishlistModalOpen(false); } }),
        react_1["default"].createElement(SuccessModal_1.SuccessModal, { isVisible: showSuccessModal, message: successMessage, onClose: function () { return setShowSuccessModal(false); } })));
};

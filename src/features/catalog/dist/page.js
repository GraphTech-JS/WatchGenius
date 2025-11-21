'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var context_1 = require("@/context");
var CatalogSidebar_1 = require("@/features/catalog/components/CatalogSidebar/CatalogSidebar");
var FixedSidebar_1 = require("@/features/catalog/components/FixedSidebar/FixedSidebar");
var CatalogGrid_1 = require("@/features/catalog/components/CatalogGrid/CatalogGrid");
var TabletSidebar_1 = require("@/features/catalog/components/TabletSidebar/TabletSidebar");
var CatalogControls_1 = require("@/features/catalog/components/CatalogControls/CatalogControls");
var ActiveFiltersBar_1 = require("@/features/catalog/components/ActiveFiltersBar/ActiveFiltersBar");
var FeedbackModal_1 = require("@/components/FeedbackModal/FeedbackModal");
var useFeedbackModal_1 = require("@/hooks/useFeedbackModal");
var useSaveSearchToChat_1 = require("@/hooks/useSaveSearchToChat");
var page_module_css_1 = require("./page.module.css");
var useCatalogSearch_1 = require("@/hooks/useCatalogSearch");
var useSidebarPosition_1 = require("@/hooks/useSidebarPosition");
var i18n_1 = require("@/i18n");
var catalog_1 = require("@/i18n/keys/catalog");
var CatalogPage = function () {
    var search = useCatalogSearch_1.useCatalogSearch();
    var sidebar = useSidebarPosition_1.useSidebarPosition();
    var feedbackModal = useFeedbackModal_1.useFeedbackModal();
    var _a = react_1.useContext(context_1.MainContext), savedCatalogFilters = _a.savedCatalogFilters, setSavedCatalogFilters = _a.setSavedCatalogFilters;
    var saveSearchToChat = useSaveSearchToChat_1.useSaveSearchToChat().saveSearchToChat;
    react_1.useEffect(function () {
        if (savedCatalogFilters) {
            if (savedCatalogFilters.searchTerm) {
                search.setSearchTerm(savedCatalogFilters.searchTerm);
            }
            var selectedBrands_1 = [];
            var selectedConditions_1 = [];
            var selectedMechanisms_1 = [];
            var selectedMaterials_1 = [];
            var selectedDocuments_1 = [];
            var selectedLocations_1 = [];
            var selectedIndexes_1 = [];
            savedCatalogFilters.filters.forEach(function (filter) {
                var _a = filter.split(':'), group = _a[0], value = _a[1];
                if (group === 'brand')
                    selectedBrands_1.push(value);
                else if (group === 'condition')
                    selectedConditions_1.push(value);
                else if (group === 'mechanism')
                    selectedMechanisms_1.push(value);
                else if (group === 'material')
                    selectedMaterials_1.push(value);
                else if (group === 'document')
                    selectedDocuments_1.push(value);
                else if (group === 'location')
                    selectedLocations_1.push(value);
                else if (group === 'index' &&
                    (value === 'A' || value === 'B' || value === 'C')) {
                    selectedIndexes_1.push(value);
                }
            });
            if (selectedBrands_1.length ||
                selectedConditions_1.length ||
                selectedMechanisms_1.length ||
                selectedMaterials_1.length) {
                search.applySidebarFilters({
                    selectedBrands: selectedBrands_1,
                    selectedConditions: selectedConditions_1,
                    selectedMechanisms: selectedMechanisms_1,
                    selectedMaterials: selectedMaterials_1,
                    selectedDocuments: selectedDocuments_1,
                    selectedLocations: selectedLocations_1,
                    priceFrom: '0',
                    priceTo: '150000',
                    yearFrom: '2000',
                    yearTo: '2005'
                });
            }
            if (selectedIndexes_1.length)
                search.setSelectedIndexes(selectedIndexes_1);
            setSavedCatalogFilters(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedCatalogFilters]);
    var handleSaveToChat = function () {
        saveSearchToChat({
            searchTerm: search.searchTerm,
            activeFilters: search.activeFilters
        });
    };
    var handleApplyFilters = function (filters) {
        search.applySidebarFilters(filters);
    };
    var handleResetFilters = function () {
        search.setSearchTerm('');
        search.setSelectedIndexes([]);
        search.clearSidebarFilters();
    };
    var handleAskGeni = function () { };
    return (react_1["default"].createElement("main", { className: 'bg-white py-[60px] min-h-screen mx-auto' },
        react_1["default"].createElement("div", { className: 'flex flex-col mb-[15px]' },
            react_1["default"].createElement("h1", { className: page_module_css_1["default"].catalogTitle }, i18n_1.t(catalog_1.catalogKeys.page.title)),
            react_1["default"].createElement("p", { className: page_module_css_1["default"].catalogSubtitle }, i18n_1.t(catalog_1.catalogKeys.page.subtitle, { count: search.filteredItems.length }))),
        react_1["default"].createElement(TabletSidebar_1.TabletSidebar, { className: 'block lg:hidden', width: 321, zIndex: 5, containerRef: sidebar.sectionRef, onReset: handleResetFilters, topOffset: sidebar.sidebarTopOffset }),
        react_1["default"].createElement(CatalogControls_1.CatalogControls, { searchTerm: search.searchTerm, onSearchChange: search.setSearchTerm, selectedIndexes: search.selectedIndexes, onToggleIndex: search.toggleIndex, sortValue: search.sortOption, onSortChange: search.setSortOption, onSaveToChat: handleSaveToChat }),
        react_1["default"].createElement(ActiveFiltersBar_1.ActiveFiltersBar, { ref: search.chipsRef, chips: search.activeFilters.map(function (c) { return ({
                id: c.id,
                label: c.label
            }); }), onRemove: function (id) {
                var chip = search.activeFilters.find(function (c) { return c.id === id; });
                if (chip)
                    search.removeFilter({ group: chip.group, value: chip.value });
            }, onClearAll: search.clearAllFilters }),
        react_1["default"].createElement("div", { ref: sidebar.sectionRef, className: 'flex relative gap-[20px] items-start' },
            react_1["default"].createElement(FixedSidebar_1.FixedSidebar, { containerRef: sidebar.sectionRef, width: 320, top: 96, className: 'hidden lg:block' },
                react_1["default"].createElement(CatalogSidebar_1.CatalogSidebar, { onApply: handleApplyFilters, onReset: handleResetFilters })),
            react_1["default"].createElement("div", { className: 'relative flex-1 min-w-0' },
                react_1["default"].createElement(CatalogGrid_1.CatalogGrid, { items: search.filteredItems, initialCount: 12, onResetFilters: handleResetFilters, onAskGeni: handleAskGeni, onOpenFeedback: feedbackModal.openModal, onLoadMore: search.loadMore, hasMore: search.hasMore, loading: search.loading }))),
        react_1["default"].createElement(FeedbackModal_1.FeedbackModal, { isOpen: feedbackModal.isOpen, onClose: feedbackModal.closeModal, watchTitle: feedbackModal.watchTitle })));
};
exports["default"] = CatalogPage;

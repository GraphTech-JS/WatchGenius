'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { filterData, type IndexButton } from '@/mock/filterData';
import { toggleInArray } from '@/utils/array';
import { getFilters } from '@/lib/api';
import type { ApiFiltersResponse } from '@/interfaces/api';

type Currency = '€' | '$' | '₴';

function normalizeForDisplay(value: string): string {
  if (value.toUpperCase() === 'NEW' || value.toUpperCase() === 'USED') {
    return value.toLowerCase();
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const useCatalogFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedMechanisms, setSelectedMechanisms] = useState<string[]>([]);
  const [mechanismShowAll, setMechanismShowAll] = useState(false);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [priceFrom, setPriceFrom] = useState<string>('0');
  const [priceTo, setPriceTo] = useState<string>('150000');
  const [currency] = useState<Currency>('€');

  const [yearFrom, setYearFrom] = useState<string>('2000');
  const [yearTo, setYearTo] = useState<string>('2005');

  const [selectedIndexes, setSelectedIndexes] = useState<IndexButton[]>([]);
  const toggleIndex = useCallback((index: IndexButton)=> setSelectedIndexes((prev) => toggleInArray(prev, index)), [])

  const [apiFilters, setApiFilters] = useState<ApiFiltersResponse | null>(null);
  const [filtersLoading, setFiltersLoading] = useState(false);

  useEffect(() => {
    async function loadFilters() {
      try {
        setFiltersLoading(true);
        const filters = await getFilters();
        setApiFilters(filters);
       
      } catch (error) {
        console.error('Failed to load filters:', error);
      } finally {
        setFiltersLoading(false);
      }
    }
    loadFilters();
  }, []);

  const brands = useMemo(() => apiFilters?.brands || filterData.brands, [apiFilters]);
  const conditions = useMemo(() => {
    if (!apiFilters?.conditions) return filterData.conditions;
    const normalized = apiFilters.conditions.map(normalizeForDisplay);
    return Array.from(new Set(normalized));
  }, [apiFilters]);
  const mechanisms = useMemo(() => 
    apiFilters?.mechanisms || filterData.mechanisms, 
    [apiFilters]
  );
  const materials = useMemo(() => {
    if (!apiFilters?.materials) return filterData.materials;
    const normalized = apiFilters.materials.map(normalizeForDisplay);
    return Array.from(new Set(normalized));
  }, [apiFilters]);
  const documents = useMemo(() => 
    apiFilters?.hasDocumentsOptions || filterData.documents, 
    [apiFilters]
  );
  const locations = useMemo(() => {
    if (!apiFilters?.locations) return filterData.locations;
    const normalized = apiFilters.locations.map(normalizeForDisplay);
    return Array.from(new Set(normalized));
  }, [apiFilters]);

  const filteredBrands = useMemo(
    () =>
      brands.filter((b) =>
        b.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [brands, searchTerm]
  );

  const visibleBrands = useMemo(
    () => (showAllBrands ? filteredBrands : filteredBrands.slice(0, 5)),
    [filteredBrands, showAllBrands]
  );

  const toggleBrand = useCallback(
    (brand: string) => setSelectedBrands((prev) => toggleInArray(prev, brand)),
    []
  );
  const toggleCondition = useCallback(
    (v: string) => setSelectedConditions((prev) => toggleInArray(prev, v)),
    []
  );
  const toggleMechanism = useCallback(
    (v: string) => setSelectedMechanisms((prev) => toggleInArray(prev, v)),
    []
  );
  const toggleMaterial = useCallback(
    (v: string) => setSelectedMaterials((prev) => toggleInArray(prev, v)),
    []
  );
  const toggleDocument = useCallback(
    (v: string) => setSelectedDocuments((prev) => toggleInArray(prev, v)),
    []
  );
  const toggleLocation = useCallback(
    (v: string) => setSelectedLocations((prev) => toggleInArray(prev, v)),
    []
  );

  useEffect(() => {
    const isOpenBrands = 
    searchTerm.trim().length > 0 &&
    filteredBrands.length > 0 &&
    filteredBrands.length < brands.length;

    if(isOpenBrands){
      setOpenKeys( prev => prev.includes('Бренд') ? prev : [...prev,'Бренд']);
    }else{
      setOpenKeys(prev => prev.filter(key => key !== 'Бренд'))
    }
  }, [searchTerm, filteredBrands, brands]);

  const reset = useCallback(() => {
    setSelectedBrands([]);
    setShowAllBrands(false);

    setSelectedConditions([]);
    setSelectedMechanisms([]);
    setOpenKeys([]);
    setMechanismShowAll(false);

    setSelectedMaterials([]);
    setSelectedDocuments([]);
    setSelectedLocations([]);

    setPriceFrom('0');
    setPriceTo('50000');
    setYearFrom('2000');
    setYearTo('2005');

    setSelectedIndexes([]);
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    selectedBrands,
    showAllBrands,
    openKeys,
    selectedIndexes,
    setSelectedIndexes,
    selectedConditions,
    selectedMechanisms,
    mechanismShowAll,
    selectedMaterials,
    selectedDocuments,
    selectedLocations,
    priceFrom,
    priceTo,
    currency,
    yearFrom,
    yearTo,

    filteredBrands,
    visibleBrands,

    brands,
    conditions,
    mechanisms,
    materials,
    documents,
    locations,
    filtersLoading,

    setSearchTerm,
    setShowAllBrands,
    setOpenKeys,
    toggleBrand,
    toggleIndex,
    toggleCondition,
    toggleMechanism,
    toggleMaterial,
    toggleDocument,
    toggleLocation,
    setPriceFrom,
    setPriceTo,
    setYearFrom,
    setYearTo,
    setMechanismShowAll,
    reset,
  };
};

export type UseCatalogFiltersReturn = ReturnType<typeof useCatalogFilters>;
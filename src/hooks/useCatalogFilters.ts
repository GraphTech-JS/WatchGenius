'use client';

import { useCallback, useMemo, useState } from 'react';
import { filterData, type IndexButton } from '../mock/filterData';
import { toggleInArray } from '../utils/array';

type Currency = '€' | '$' | '₴';

export const useCatalogFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedMechanisms, setSelectedMechanisms] = useState<string[]>([]);
  const [mechanismShowAll, setMechanismShowAll] = useState(false);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [priceFrom, setPriceFrom] = useState<string>('0');
  const [priceTo, setPriceTo] = useState<string>('50000');
  const [currency] = useState<Currency>('€');

  const [yearFrom, setYearFrom] = useState<string>('2000');
  const [yearTo, setYearTo] = useState<string>('2005');

  const [indexValue, setIndexValue] = useState<IndexButton | null>(null);

  const filteredBrands = useMemo(
    () =>
      filterData.brands.filter((b) =>
        b.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
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

  const reset = useCallback(() => {
    setSelectedBrands([]);
    setShowAllBrands(false);

    setSelectedConditions([]);
    setSelectedMechanisms([]);
    setMechanismShowAll(false);

    setSelectedMaterials([]);
    setSelectedDocuments([]);
    setSelectedLocations([]);

    setPriceFrom('0');
    setPriceTo('50000');
    setYearFrom('2000');
    setYearTo('2005');

    setIndexValue(null);
    setSearchTerm('');
  }, []);

  return {
    // state
    searchTerm,
    selectedBrands,
    showAllBrands,
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
    indexValue,

    filteredBrands,
    visibleBrands,

    setSearchTerm,
    setShowAllBrands,
    toggleBrand,
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
    setIndexValue,
    reset,
  };
};

export type UseCatalogFiltersReturn = ReturnType<typeof useCatalogFilters>;
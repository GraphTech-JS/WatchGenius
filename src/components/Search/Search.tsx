import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";

import { Filter } from "./components/Filter/Filter";
import { SearchResults } from "./components/SearchResults/SearchResults";
import SearchIcon from "../../../public/icons/search.svg";
import Navigation from "./components/Navigation/Navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetWatchesPaginated } from "@/hooks/useGetWatchesPaginated";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  classNames?: string;
}

export const Search: React.FC<SearchProps> = ({
  type,
  classNames,
  ...props
}) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchVal = useDebounce(searchVal, 2000);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1537) setItemsPerPage(9);
      else if (width <= 834) setItemsPerPage(4);
      else setItemsPerPage(8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Підтягуємо годинники з бекенду з урахуванням пагінації
  const [brandFilter, setBrandFilter] = useState<string | undefined>(undefined);
  const [priceFilter, setPriceFilter] = useState<string | undefined>(undefined);

  // Фетч годинників з усіма параметрами
  const { data, isLoading, isError } = useGetWatchesPaginated(
    currentPage,
    itemsPerPage,
    brandFilter,
    debouncedSearchVal
  );

  const filteredResults = data?.watches || [];
  const totalPages = data?.pagination.totalPages || 1;

  // Скидаємо сторінку при зміні фільтрів або пошуку
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchVal, itemsPerPage, brandFilter, priceFilter]);

  // Колбек для зміни фільтрів
  const handleFilterChange = (filterName: string, selectedValue: string) => {
    if (filterName === "brand") {
      setBrandFilter(selectedValue);
    }
    if (filterName === "price") {
      setPriceFilter(selectedValue);
      // додати логіку для price range, якщо потрібна
    }
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження</div>;

  return (
    <div className={styles.search}>
      {type === "catalog" && (
        <div className={styles.catalogSearch}>
          <div className={styles.catalogSearchWrapper}>
            <input
              type="text"
              value={searchVal}
              className={`${styles.catalogSearchInput} ${classNames}`}
              placeholder="Пошук"
              onChange={(e) => setSearchVal(e.target.value)}
              {...props}
            />
            <button className={styles.catalogSearchBtn}>
              <img
                src={SearchIcon.src}
                alt="search"
                className={styles.catalogSearchIcon}
              />
            </button>
          </div>
          <Filter
            options={[
              {
                label: "Бренд",
                value: "brand",
                options: ["Rolex", "Patek Philippe", "Omega", "TAG Heuer"],
                id: 1,
              },
              {
                label: "Ціна",
                value: "price",
                options: ["до 100$", ">100$", ">500$", ">1000$"],
                id: 2,
              },
            ]}
            opened={opened}
            setOpened={setOpened}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {filteredResults.length > 0 && (
        <>
          <SearchResults items={filteredResults} />
          <Navigation
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

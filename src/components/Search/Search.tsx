/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";

import { SearchResults } from "./components/SearchResults/SearchResults";

import Navigation from "./components/Navigation/Navigation";
import { ISearchProps, IWatch } from "@/interfaces";
import { mockData } from "@/mock/watch";
import SearchIcon from "../../../public/icons/search.svg";
import {
  brandOptions,
  diameterOptions,
  FilterDefinition,
  indexOptions,
  noveltyOptions,
  priceOptions,
} from "@/mock/data";
import { Select } from "../Select";
import { Filter, FilterDefinitionProp } from "./components/Filter/Filter";

export const Search = ({
  type,
  classNames,
  searchList,
  ...props
}: ISearchProps) => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<IWatch[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [opened, setOpened] = useState(false);

  const [filters, setFilters] = useState<FilterDefinition[]>([
    {
      id: 1,
      label: "За ціною",
      value: "",
      options: priceOptions,
    },
    {
      id: 2,
      label: "За новизною",
      value: "",
      options: noveltyOptions,
    },
    {
      id: 3,
      label: "За індексом",
      value: "",
      options: indexOptions,
    },
  ]);
  const [flatFilters, setFlatFilters] = useState<FilterDefinitionProp[]>([
    { id: 4, label: "Бренд", value: "", options: brandOptions, type: "select" },
    {
      id: 6,
      label: "Ціна",
      type: "range",
      value: 15000,
      range: {
        min: 0,
        max: 50000,
        step: 1000,
        unit: "грн",
      },
    },
    {
      id: 5,
      label: "Діаметр",
      value: "",
      options: diameterOptions,
      type: "select",
    },
  ]);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newItemsPerPage;
      if (width >= 1537) {
        newItemsPerPage = 9;
      } else if (width <= 834) {
        newItemsPerPage = 4;
      } else {
        newItemsPerPage = 8;
      }
      setItemsPerPage(newItemsPerPage);
      setLimit({
        min: (currentPage - 1) * newItemsPerPage,
        max: currentPage * newItemsPerPage,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchVal(value);
    setTimeout(() => {
      const result = searchList.filter((item) => item.title.includes(value));
      if (value === "") {
        setSearchResults(mockData);
        return;
      }
      setSearchResults(result.length > 0 ? [...result] : []);
    }, 2000);
  };
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const handleFilterChange = (id: number, newValue: string | number) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newValue as any } : f))
    );
  };
  const handleFlatChange = (id: number, newValue: string | number) => {
    setFlatFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newValue } : f))
    );
  };

  return (
    <div className={styles.search}>
      {type === "catalog" && (
        <div className={styles.catalogSearch}>
          <div className="flex w-full items-center gap-[15px]">
            <div className={styles.catalogSearchWrapper}>
              <input
                type="text"
                value={searchVal}
                className={`${styles.catalogSearchInput} ${classNames}`}
                placeholder="Пошук"
                onChange={handleSearch}
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
              filters={flatFilters}
              opened={opened}
              setOpened={setOpened}
              onChange={handleFlatChange}
            />
          </div>
          <div className="flex flex-wrap w-full gap-[20px] ">
            {filters.map(({ id, label, value, options }) => (
              <div key={id}>
                <Select
                  placeholder={label}
                  options={options}
                  value={value}
                  onChange={(val) => handleFilterChange(id, val)}
                  className="w-full min-w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <SearchResults items={searchResults.slice(limit.min, limit.max)} />
      {searchResults.length > 0 && (
        <Navigation
          totalPages={totalPages}
          initialPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            setLimit({
              min: (page - 1) * itemsPerPage,
              max: page * itemsPerPage,
            });
          }}
        />
      )}
    </div>
  );
};

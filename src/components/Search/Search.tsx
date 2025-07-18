import React, { useState } from "react";
import styles from "./Search.module.css";

import { Filter } from "./components/Filter/Filter";
import { SearchResults } from "./components/SearchResults/SearchResults";

import Navigation from "./components/Navigation/Navigation";
import { ISearchProps, IWatch } from "@/interfaces";
import { mockData } from "@/mock/watch";
import SearchIcon from "../../../public/icons/search.svg";

export const Search = ({
  type,
  classNames,
  searchList,
  ...props
}: ISearchProps) => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<IWatch[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState({
    min: 0,
    max: 6,
  });
  const [opened, setOpened] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchVal(e.target.value);
    setTimeout(() => {
      const result = searchList.filter((item) =>
        item.title.includes(e.target.value)
      );
      if (result.length > 0) {
        setSearchResults([...result]);
        return;
      }
      if (searchVal === "") {
        setSearchResults(mockData);
        return;
      }
      if (result.length === 0) {
        setSearchResults([]);
        return;
      }
    }, 2000);
  };
  return (
    <div className={styles.search}>
      {type === "catalog" && (
        <div className={styles.catalogSearch}>
          <div className={styles.catalogSearchWrapper}>
            <input
              type="text"
              value={searchVal}
              className={styles.catalogSearchInput + " " + classNames}
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
              {
                label: "Матеріал",
                value: "material",
                options: ["золото", "серебро", "алюміній"],
                id: 3,
              },
              {
                label: "Колір",
                value: "сolor",
                options: ["золотий", "срібний", "чорний"],
                id: 4,
              },
            ]}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      )}
      <SearchResults items={searchResults.slice(limit.min, limit.max)} />
      {searchResults.length > 0 && (
        <Navigation
          totalPages={3}
          initialPage={currentPage}
          onPageChange={(page) => {
            setLimit((prev) => ({
              ...prev,
              min: (page - 1) * 6,
              max: page * 6,
            }));
            setCurrentPage(page);
          }}
        />
      )}
    </div>
  );
};

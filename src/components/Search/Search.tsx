import React, { useState, useEffect } from "react";
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
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [opened, setOpened] = useState(false);

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
                options: ["золото", "срібло", "алюміній"],
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

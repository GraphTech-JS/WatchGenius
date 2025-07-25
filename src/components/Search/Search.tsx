import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";

import { Filter } from "./components/Filter/Filter";
import { SearchResults } from "./components/SearchResults/SearchResults";
import SearchIcon from "../../../public/icons/search.svg";
import Navigation from "./components/Navigation/Navigation";

import { Watch } from "@/types";
import { useGetWatches } from "@/hooks/useGetWatches";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  classNames?: string;
}

export const Search: React.FC<SearchProps> = ({
  type,
  classNames,
  ...props
}) => {
  const { data: watches = [] } = useGetWatches();

  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<Watch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [opened, setOpened] = useState(false);

  // useEffect(() => {
  //   setSearchResults(watches);
  // }, [watches]);

  useEffect(() => {
    if (watches && searchResults.length === 0) {
      setSearchResults(watches);
    }
  }, [watches]);

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
    const value = e.target.value;
    setSearchVal(value);

    setTimeout(() => {
      if (value === "") {
        setSearchResults(watches);
        return;
      }

      const result = watches.filter(
        (item) =>
          item.model?.toLowerCase().includes(value.toLowerCase()) ||
          item.brand?.toLowerCase().includes(value.toLowerCase())
      );

      setSearchResults(result);
    }, 200);
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
              // {
              //   label: "Матеріал",
              //   value: "material",
              //   options: ["золото", "срібло", "алюміній"],
              //   id: 3,
              // },
              // {
              //   label: "Колір",
              //   value: "сolor",
              //   options: ["золотий", "срібний", "чорний"],
              //   id: 4,
              // },
            ]}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      )}
      {watches.length > 0 && (
        <SearchResults items={searchResults.slice(limit.min, limit.max)} />
      )}
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

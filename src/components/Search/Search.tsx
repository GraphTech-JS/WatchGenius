/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Search/Search.tsx
import React, { useState, useEffect, useMemo } from "react";
import styles from "./Search.module.css";

import { SearchResults } from "./components/SearchResults/SearchResults";
import { ISearchProps, IWatch } from "@/interfaces";
import { mockData } from "@/mock/watch";
import SearchNormal from "../../../public/icons/SearchNormal.svg";
import {
  brandOptions,
  complicationOptions,
  diameterOptions,
  FilterDefinition,
  indexOptions,
  movementOptions,
  noveltyOptions,
  priceOptions,
  trendOptions,
} from "@/mock/data";
import { Select } from "../Select";
import { Filter, FilterDefinitionProp } from "./components/Filter/Filter";
import { ThemedText } from "../ThemedText/ThemedText";

export const Search: React.FC<ISearchProps> = ({
  type,
  classNames,
  searchList = mockData,
  ...props
}) => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<IWatch[]>(searchList);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [columns, setColumns] = useState(4);
  const [opened, setOpened] = useState(false);
  const maxPrice = useMemo(
    () => Math.max(...searchList.map((w) => Number(w.price))),
    [searchList]
  );
  const minPrice = useMemo(
    () => Math.min(...searchList.map((w) => Number(w.price))),
    [searchList]
  );

  // простые сортировки / фильтры
  const [filters, setFilters] = useState<FilterDefinition[]>([
    { id: 1, label: "За ціною", value: "", options: priceOptions },
    { id: 5, label: "Діаметр", value: "", options: diameterOptions },
    { id: 4, label: "Бренд", value: "", options: brandOptions },
    { id: 3, label: "За індексом", value: "", options: indexOptions },
  ]);

  // диапазон + доп. фильтры
  const [flatFilters, setFlatFilters] = useState<FilterDefinitionProp[]>([
    {
      id: 6,
      label: "Ціна",
      type: "range",
      value: [minPrice, maxPrice],
      range: { min: minPrice, max: maxPrice, step: 1000, unit: "грн" },
    },
    {
      id: 2,
      label: "За новизною",
      type: "select",
      value: "",
      options: noveltyOptions,
    },
    {
      id: 8,
      label: "Movement",
      type: "select",
      value: "",
      options: movementOptions,
    },
    {
      id: 9,
      label: "Complications",
      type: "select",
      value: "",
      options: complicationOptions,
    },
    {
      id: 7,
      label: "Тренд (3м)",
      type: "select",
      value: "",
      options: trendOptions,
    },
  ]);
  useEffect(() => {
    setFlatFilters((prev) =>
      prev.map((f) =>
        f.id === 6 && f.type === "range"
          ? {
              ...f,
              value: [minPrice, maxPrice],
              range: { min: minPrice, max: maxPrice, step: 1000, unit: "грн" },
              options: undefined,
            }
          : f
      )
    );
  }, [minPrice, maxPrice]);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1537) {
        setItemsPerPage(9);
        setColumns(3);
      } else if (w <= 834) {
        setItemsPerPage(4);
        setColumns(2);
      } else {
        setItemsPerPage(8);
        setColumns(4);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pageRows = useMemo(
    () => Math.floor(itemsPerPage / columns),
    [itemsPerPage, columns]
  );
  const [visibleRows, setVisibleRows] = useState(pageRows);

  // если поменялся поиск или фильтры — возвращаем видимыеPages к 4
  useEffect(() => {
    setVisibleRows(pageRows);
  }, [searchVal, filters, flatFilters]);

  const visibleCount = visibleRows * columns;
  const visibleItems = searchResults.slice(0, visibleCount);
  const totalRows = Math.ceil(searchResults.length / columns);

  // основная фильтрация + сортировка
  useEffect(() => {
    let data = [...searchList];
    const year = new Date().getFullYear();

    // поиск
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      data = data.filter((i) => i.title.toLowerCase().includes(q));
    }

    // flatFilters
    flatFilters.forEach((f) => {
      if (f.type === "range") {
        const [low, high] = f.value as [number, number];
        data = data.filter((i) => i.price >= low && i.price <= high);
      } else if (f.value) {
        switch (f.id) {
          case 2:
            if (f.value === "new")
              data.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
            if (f.value === "old")
              data.sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              );
            break;
          case 8: {
            const mv = String(f.value).toLowerCase();
            data = data.filter((i) => i.movement.toLowerCase().includes(mv));
            break;
          }
          case 9: {
            const comp = String(f.value).toLowerCase();
            data = data.filter((i) =>
              i.features
                .map((feat) => feat.toLowerCase())
                .some((feat) => feat.includes(comp))
            );
            break;
          }
          case 7:
            if (f.value === "up")
              data = data.filter((i) => i.changePercent > 0);
            if (f.value === "down")
              data = data.filter((i) => i.changePercent < 0);
            if (f.value === "flat")
              data = data.filter((i) => i.changePercent === 0);
            break;
        }
      }
    });

    // filters
    filters.forEach((f) => {
      if (!f.value) return;
      switch (f.id) {
        case 1:
          if (f.value === "cheap_to_expensive")
            data.sort((a, b) => a.price - b.price);
          if (f.value === "expensive_to_cheap")
            data.sort((a, b) => b.price - a.price);
          if (f.value === "new")
            data = data.filter(
              (i) => new Date(i.createdAt).getFullYear() === year
            );
          if (f.value === "best") data = data.filter((i) => i.rating >= 90);
          break;
        case 5:
          data = data.filter((i) => String(i.diameter) === String(f.value));
          break;
        case 4:
          data = data.filter((i) => i.brand === f.value);
          break;
        case 3:
          if (f.value === "asc") data.sort((a, b) => a.rating - b.rating);
          if (f.value === "desc") data.sort((a, b) => b.rating - a.rating);
          break;
      }
    });

    setSearchResults(data);
  }, [searchVal, flatFilters, filters, searchList]);

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
                onChange={(e) => setSearchVal(e.target.value)}
                {...props}
              />
              <button className={styles.catalogSearchBtn}>
                <img src={SearchNormal.src} alt="search" />
              </button>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearchVal("");
                  setFilters((p) => p.map((f) => ({ ...f, value: "" })));
                  setFlatFilters((p) =>
                    p.map((f) =>
                      f.type === "range"
                        ? { ...f, value: [minPrice, maxPrice] }
                        : { ...f, value: "" }
                    )
                  );
                }}
              >
                Скинути
              </button>
            </div>

            <Filter
              filters={flatFilters}
              opened={opened}
              setOpened={setOpened}
              onChange={(id, val) =>
                setFlatFilters((p) =>
                  p.map((f) => (f.id === id ? { ...f, value: val as any } : f))
                )
              }
            />
          </div>

          <div className="grid w-full gap-[20px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {filters.map(({ id, label, value, options }) => (
              <Select
                key={id}
                placeholder={label}
                options={options}
                value={String(value)}
                onChange={(val) =>
                  setFilters((p) =>
                    p.map((f) =>
                      f.id === id ? { ...f, value: val as any } : f
                    )
                  )
                }
                className="w-full"
              />
            ))}
          </div>
        </div>
      )}

      <SearchResults items={visibleItems} />

      {visibleRows < totalRows && (
        <div className="text-center mt-6 mx-auto">
          <button
            onClick={() => setVisibleRows((r) => r + 2)}
            className="px-6 py-3  transition"
          >
            <ThemedText
              type="h3"
              className="text-center underline cursor-pointer"
            >
              {" "}
              Показати ще
            </ThemedText>
          </button>
        </div>
      )}
    </div>
  );
};

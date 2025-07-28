import React, { useState } from "react";
import styles from "./Filter.module.css";
import { Filter as FilterIcon } from "../../../../../public/icons";
import { Select } from "@/components/Select";

// Тип для одного фільтру
interface FilterOption {
  label: string; // Назва фільтра для placeholder (наприклад, "Бренд")
  value: string; // Унікальний ключ (наприклад, "brand" або "price")
  id: number; // Унікальний id фільтра
  options: string[]; // Значення, які можна вибрати
}

// Тип для пропсів компонента
interface IFilter {
  options: FilterOption[];
  opened: boolean;
  setOpened: (opened: boolean) => void;

  // Колбек, який викликається при виборі значення в будь-якому фільтрі
  onFilterChange?: (filterName: string, selectedValue: string) => void;
}

export const Filter = ({
  opened,
  setOpened,
  options,
  onFilterChange,
}: IFilter) => {
  // Локальний стан для збереження вибраних опцій по кожному фільтру
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  const handleChange = (filterName: string, selectedOption: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterName]: selectedOption,
    }));

    if (onFilterChange) {
      onFilterChange(filterName, selectedOption);
    }
  };

  // скинути вибір при закритті фільтрів
  // useEffect(() => {
  //   if (!opened) {
  //     setSelectedValues({});
  //   }
  // }, [opened]);

  return (
    <div className={styles.filter}>
      <button className={styles.filterBtn} onClick={() => setOpened(!opened)}>
        <img
          src={FilterIcon.src}
          alt="filter dropdown icon"
          className={styles.filterIcon}
        />
      </button>
      {opened && (
        <div className={styles.filterDropdown}>
          {options.map(({ options: filterOptions, label, value, id }) => (
            <Select
              key={id}
              options={filterOptions.map((option) => ({
                value: option,
                label: option,
              }))}
              value={selectedValues[value] || ""}
              placeholder={label}
              onChange={(selectedValue) => handleChange(value, selectedValue)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import styles from "./Filter.module.css";
import { Filter as FilterIcon } from "../../../../../public/icons";
import { Select } from "@/components/Select";

interface IFilter {
  options: {
    label: string;
    value: string;
    id: number;
    options: string[];
  }[];
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export const Filter = ({ opened, setOpened, options }: IFilter) => {
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
          {options.map(({ options, label, value, id }) => (
            <Select
              key={id}
              options={options.map((option) => ({
                value: option,
                label: option,
              }))}
              value={value}
              placeholder={label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

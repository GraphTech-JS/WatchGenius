import React, { useRef } from "react";
import styles from "./Filter.module.css";
import { Filter as FilterIcon } from "../../../../../public/icons";
import { Select, SelectOption } from "@/components/Select";
import { useClickOutside } from "@/utils/useClickOutside";
import RangeSlider from "./RangeSlider";

export type FilterDefinitionProp =
  | {
      id: number;
      label: string;
      type: "select";
      value: string | number;
      options: SelectOption[];
      range?: never;
    }
  | {
      id: number;
      label: string;
      type: "range";
      value: string | number;
      range: { min: number; max: number; step?: number; unit?: string };
      options?: never;
    };

interface FilterProps {
  filters: FilterDefinitionProp[];
  opened: boolean;
  setOpened: (open: boolean) => void;
  onChange: (id: number, newValue: string | number) => void;
}

export const Filter: React.FC<FilterProps> = ({
  filters,
  opened,
  setOpened,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref as React.RefObject<HTMLDivElement>, () => {
    if (opened) setOpened(false);
  });

  return (
    <div className={styles.filter} ref={ref}>
      {/* Кнопка-иконка для открытия/закрытия дропдауна */}
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => setOpened(!opened)}
      >
        <img
          src={FilterIcon.src}
          alt="filter dropdown icon"
          className={styles.filterIcon}
        />
      </button>

      {/* Собственно дропдаун со всеми фильтрами */}
      {opened && (
        <div className={styles.filterDropdown}>
          {filters.map((f) => (
            <div key={f.id} className={styles.filterItem}>
              {f.type === "select" ? (
                <Select
                  placeholder={f.label}
                  options={f.options!}
                  value={f.value as string}
                  onChange={(val) => onChange(f.id, val)}
                />
              ) : (
                <div className="border p-[12px] rounded-[5px]">
                  <label>{f.label}</label>
                  <RangeSlider
                    min={f.range!.min}
                    max={f.range!.max}
                    value={f.value as number}
                    onChange={(newValue) => onChange(f.id, newValue)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { Filter as FilterIcon } from "../../../../../public/icons";

interface FilterDropdownProps {
  /** Текст, который показывается по-умолчанию и в кнопке */
  label: string;
  /** Массив пунктов в списке */
  options: string[];
  /** Выбранное значение */
  value: string;
  /** Коллбэк при выборе */
  onChange: (value: string) => void;
  /** Доп. класс для контейнера */
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Закрываем при клике вне
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value || label}</span>
        <img src={FilterIcon.src} alt="filter dropdown icon" className="ml-2" />
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                opt === value ? "font-semibold" : ""
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

"use client";
import React from "react";
import styles from "./CatalogSearch.module.css";
import Image from "next/image";
import { CatalogSearchIcon } from "../../../../../public/catalogPage";
import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  value,
  onChange,
  placeholder = t(catalogKeys.controls.searchPlaceholder),
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.catalogSearch} w-full`}
      />
      <div className={styles.iconWrapper}>
        <Image
          src={CatalogSearchIcon}
          alt="CatalogSearchIcon"
          width={20}
          height={20}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

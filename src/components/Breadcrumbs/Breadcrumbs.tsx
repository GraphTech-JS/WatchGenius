"use client";

import React from "react";
import { LocalizedLink } from "@/components/LocalizedLink";
import styles from "./Breadcrumbs.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.separator}>{" > "}</span>}
          {item.href ? (
            <LocalizedLink href={item.href} className={styles.link}>
              {item.label}
            </LocalizedLink>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

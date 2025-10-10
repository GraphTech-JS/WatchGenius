'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ProductBreadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbsContainer}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className={styles.breadcrumbSeparator}>{' > '}</span>
          )}
          {item.href ? (
            <Link href={item.href} className={styles.breadcrumbItem}>
              {item.label}
            </Link>
          ) : (
            <span className={`${styles.breadcrumbItem} ${styles.active}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default ProductBreadcrumbs;

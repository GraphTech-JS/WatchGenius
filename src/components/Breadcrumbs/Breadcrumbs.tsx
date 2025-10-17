'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
  width?: number;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  width?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, width }) => {
  return (
    <nav className={styles.breadcrumbs} style={{ width: width }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className={styles.separator} style={{ width: width }}>
              {' > '}
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={styles.link}
              style={{ width: width }}
            >
              {item.label}
            </Link>
          ) : (
            <span className={styles.current} style={{ width: width }}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

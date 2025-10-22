'use client';
import React from 'react';
import styles from './page.module.css';
import CatalogPage from '@/features/catalog/page';


const Catalog = () => {
  return (
    <section className={styles.catalog}>
      <CatalogPage />
    </section>
  );
};

export default Catalog;

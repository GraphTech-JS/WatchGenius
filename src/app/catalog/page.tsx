'use client';
import React from 'react';
import styles from './page.module.css';
import CatalogPage from '@/features/catalog/page';
// import { Search } from '@/components/Search/Search';
// import { mockCards } from '@/mock/watch';

const Catalog = () => {
  return (
    <section className={styles.catalog}>
      <CatalogPage />
    </section>
  );
};

export default Catalog;

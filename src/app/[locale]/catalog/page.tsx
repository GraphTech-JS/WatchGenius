import React from 'react';
import type { Metadata } from 'next';
import styles from './page.module.css';
import CatalogPage from '@/features/catalog/page';

export const metadata: Metadata = {
  title: 'Каталог годинників - WatchGenius',
  description:
    'Повний каталог преміальних годинників: Rolex, Patek Philippe, Audemars Piguet. Порівняння цін, трендовий аналіз, історія котирувань. Понад 300 моделей з актуальними даними.',
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/catalog`,
    languages: {
      'uk-UA': '/ua/catalog',
      'en-US': '/en/catalog',
    },
  },
  openGraph: {
    title: 'Каталог годинників - WatchGenius',
    description:
      'Понад 300 моделей преміальних годинників з актуальними цінами та аналітикою.',
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/catalog`,
  },
};

const Catalog = () => {
  return (
    <section className={styles.catalog}>
      <CatalogPage />
    </section>
  );
};

export default Catalog;

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ClockLoader } from 'react-spinners';
import styles from './page.module.css';
import CatalogPage from '@/features/catalog/page';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';

export const metadata: Metadata = {
  title: 'Каталог годинників - WatchGenius',
  description:
    'Повний каталог преміальних годинників: Rolex, Patek Philippe, Audemars Piguet. Порівняння цін, трендовий аналіз, історія котирувань. Понад 300 моделей з актуальними даними.',
  alternates: {
    canonical: `${baseUrl}/ua/catalog`,
    languages: {
      'uk-UA': '/ua/catalog',
      'en-US': '/en/catalog',
    },
  },
  openGraph: {
    title: 'Каталог годинників - WatchGenius',
    description:
      'Понад 300 моделей преміальних годинників з актуальними цінами та аналітикою.',
    url: `${baseUrl}/ua/catalog`,
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'Каталог годинників - WatchGenius',
      },
    ],
  },
};

const Catalog = () => {
  return (
    <section className={styles.catalog}>
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[400px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <CatalogPage />
      </Suspense>
    </section>
  );
};

export default Catalog;

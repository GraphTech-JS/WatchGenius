'use client';
import React, { lazy, Suspense } from 'react';
import { Hero } from './Hero/Hero';
import { Market } from './Market/Market';

const Trending = lazy(() =>
  import('./Trending/Trending').then((m) => ({ default: m.Trending }))
);
const BestPrice = lazy(() =>
  import('./BestPrice/BestPrice').then((m) => ({ default: m.BestPrice }))
);
const BrandSpotlight = lazy(() =>
  import('./BrandSpotlight/BrandSpotlight').then((m) => ({
    default: m.BrandSpotlight,
  }))
);
const HowTo = lazy(() =>
  import('./HowTo/Howto').then((m) => ({ default: m.HowTo }))
);
const Dealers = lazy(() =>
  import('./Dealers/Dealers').then((m) => ({ default: m.Dealers }))
);

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Market />
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <Trending />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
        <BestPrice />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <BrandSpotlight />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
        <HowTo />
      </Suspense>
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Dealers />
      </Suspense>
    </main>
  );
};

export default HomePage;

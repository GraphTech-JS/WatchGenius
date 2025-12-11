'use client';
import React, { lazy, Suspense } from 'react';
import { ClockLoader } from 'react-spinners';
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
    <main suppressHydrationWarning>
      <Hero />
      <Market />
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[400px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <Trending />
      </Suspense>
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[500px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <BestPrice />
      </Suspense>
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[300px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <BrandSpotlight />
      </Suspense>
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[400px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <HowTo />
      </Suspense>
      <Suspense
        fallback={
          <div className='flex justify-center items-center py-12 min-h-[300px]'>
            <ClockLoader size={60} color={'#04694f'} speedMultiplier={0.9} />
          </div>
        }
      >
        <Dealers />
      </Suspense>
    </main>
  );
};

export default HomePage;

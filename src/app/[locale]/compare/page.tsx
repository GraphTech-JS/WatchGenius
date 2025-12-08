import type { Metadata } from 'next';
import CompareClient from './CompareClient';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';
export const metadata: Metadata = {
  title: 'Порівняння годинників - WatchGenius',
  description:
    'Порівняйте характеристики та ціни преміальних годинників. Детальний аналіз параметрів, історія цін, ринкові тренди. Обирайте найкращий варіант з AI-рекомендаціями.',
  alternates: {
    canonical: `${baseUrl}/ua/compare`,
    languages: {
      'uk-UA': '/ua/compare',
      'en-US': '/en/compare',
    },
  },
  openGraph: {
    title: 'Порівняння годинників - WatchGenius',
    description:
      'Порівнюйте характеристики та ціни преміальних годинників. AI-рекомендації та детальний аналіз.',
    url: `${baseUrl}/ua/compare`,
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'Порівняння годинників - WatchGenius',
      },
    ],
  },
};

export default function ComparePageWrapper() {
  return <CompareClient />;
}

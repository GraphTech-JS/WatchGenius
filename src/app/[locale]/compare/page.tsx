import type { Metadata } from 'next';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Порівняння годинників - WatchGenius',
  description:
    'Порівняйте характеристики та ціни преміальних годинників. Детальний аналіз параметрів, історія цін, ринкові тренди. Обирайте найкращий варіант з AI-рекомендаціями.',
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/compare`,
    languages: {
      'uk-UA': '/ua/compare',
      'en-US': '/en/compare',
    },
  },
  openGraph: {
    title: 'Порівняння годинників - WatchGenius',
    description:
      'Порівнюйте характеристики та ціни преміальних годинників. AI-рекомендації та детальний аналіз.',
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app'
    }/ua/compare`,
  },
};

export default function ComparePageWrapper() {
  return <CompareClient />;
}

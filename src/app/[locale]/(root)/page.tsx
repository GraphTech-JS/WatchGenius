import HomePage from '@/features/home/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WatchGenius - Аналітика ринку годинників з Data+ AI',
  description:
    'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент допоможе обрати годинник та купити безпечно. Rolex, Patek Philippe, Audemars Piguet - відстежуйте ціни в реальному часі.',
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://watch-genius-olive.vercel.app/ua',
  },
  openGraph: {
    title: 'WatchGenius - Аналітика ринку годинників',
    description:
      'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент.',
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'WatchGenius - Платформа аналітики годинників',
      },
    ],
  },
};

export default function Home() {
  return <HomePage />;
}

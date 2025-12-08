import type { Metadata } from 'next';
import ChatClient from './ChatClient';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://watch-genius-olive.vercel.app';
export const metadata: Metadata = {
  title: 'AI-Асистент - WatchGenius',
  description:
    'Персональний AI-консультант з годинників. Отримайте професійні рекомендації щодо вибору, купівлі та інвестицій у преміальні годинники. Цілодобова підтримка та експертні поради.',
  alternates: {
    canonical: `${baseUrl}/ua/chat`,
    languages: {
      'uk-UA': '/ua/chat',
      'en-US': '/en/chat',
    },
  },
  openGraph: {
    title: 'AI-Асистент - WatchGenius',
    description:
      'Персональний AI-консультант з годинників. Професійні рекомендації 24/7.',
    url: `${baseUrl}/ua/chat`,
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'AI-Асистент - WatchGenius',
      },
    ],
  },
};

export default function Chat() {
  return <ChatClient />;
}

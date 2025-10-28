import type { Metadata } from 'next';
import ChatClient from './ChatClient';

export const metadata: Metadata = {
  title: 'AI-Асистент - WatchGenius',
  description:
    'Персональний AI-консультант з годинників. Отримайте професійні рекомендації щодо вибору, купівлі та інвестицій у преміальні годинники. Цілодобова підтримка та експертні поради.',
  openGraph: {
    title: 'AI-Асистент - WatchGenius',
    description:
      'Персональний AI-консультант з годинників. Професійні рекомендації 24/7.',
  },
};

export default function Chat() {
  return <ChatClient />;
}

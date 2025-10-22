import { Header } from '@/components/Main/Header/Header';
import ChatClient from '@/features/Chat/ChatClient';
import { Footer } from '@/components/Main/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Порівняння товарів — WatchGenius',
  description: 'Порівняйте годинники за різними параметрами',
  alternates: {
    canonical: '/compare',
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <ChatClient>{children}</ChatClient>
      <Footer />
    </div>
  );
}

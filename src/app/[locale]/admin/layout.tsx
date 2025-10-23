'use client';

import { Header } from '@/components/Main/Header/Header';
import { Footer } from '@/components/Main/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

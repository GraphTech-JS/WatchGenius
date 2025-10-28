import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WatchGenius',
  description: 'Аналітика та порівняння годинників',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang='ua'>{children}</html>;
}

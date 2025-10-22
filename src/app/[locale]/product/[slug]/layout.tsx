import { Header } from '@/components/Main/Header/Header';
import ChatClient from '@/features/Chat/ChatClient';
import { Footer } from '@/components/Main/Footer/Footer';
import { Metadata } from 'next';

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Продукт ${resolvedParams.slug} — WatchGenius`,
    description: `Детальна інформація про продукт ${resolvedParams.slug}`,
    alternates: {
      canonical: `/product/${resolvedParams.slug}`,
    },
  };
}

export default function ProductLayout({
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

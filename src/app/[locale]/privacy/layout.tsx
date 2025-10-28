import { Header } from '@/components/Main/Header/Header';
import { Footer } from '@/components/Main/Footer/Footer';

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

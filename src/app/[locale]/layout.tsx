import type { Metadata } from 'next';
import '../globals.css';
import { MainContextProvider } from '@/context';
import { Akatab, Inter, Roboto_Flex } from 'next/font/google';
import { CompareProvider } from '@/context/CompareContext';
import { notFound } from 'next/navigation';
// import { NextIntlClientProvider } from "next-intl";
import { languages, type Locale } from '@/i18n/settings';
import { BackdropDistortionDefs } from '@/components/Chat/components/BackdropDistortionDefs';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const roboto = Roboto_Flex({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const akatab = Akatab({
  weight: '700',
  variable: '--font-akatab',
  subsets: ['latin'],
  display: 'optional',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'WatchGenius - Аналітика ринку годинників з Data+ AI',
  description:
    'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент допоможе обрати годинник та купити безпечно. Rolex, Patek Philippe, Audemars Piguet - відстежуйте ціни в реальному часі.',
  keywords:
    'watches, годинники, luxury watches, watch tracker, аналітика цін, rolex, patek philippe, audemars piguet',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://watchgenius.com'
  ),
  other: {
    'dns-prefetch': 'https://fonts.gstatic.com',
    preconnect: 'https://fonts.gstatic.com',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://watchgenius.com',
    siteName: 'WatchGenius',
    title: 'WatchGenius - Аналітика ринку годинників з Data+ AI',
    description:
      'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент допоможе обрати годинник та купити безпечно.',
    images: [
      {
        url: '/hero-section/HeroBgBig.webp',
        width: 1200,
        height: 630,
        alt: 'WatchGenius - Платформа аналітики годинників',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WatchGenius - Аналітика ринку годинників з Data+ AI',
    description:
      'Аналітика цін та трендів для 300+ моделей годинників. Персональний чат-асистент.',
    images: ['/hero-section/HeroBgBig.webp'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://watchgenius.com',
    languages: {
      'uk-UA': '/ua',
      'en-US': '/en',
    },
  },
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }> | { locale: Locale };
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  if (!languages.includes(locale)) notFound();

  // const messages = (await import(`@/i18n/locales/${locale}/translation.json`))
  //   .default;

  return (
    <body className={`${roboto.variable} ${inter.variable} ${akatab.variable}`}>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <BackdropDistortionDefs />
      <MainContextProvider>
        <CompareProvider>
          {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
          <main>{children}</main>
          {/* </NextIntlClientProvider> */}
        </CompareProvider>
      </MainContextProvider>
    </body>
  );
}

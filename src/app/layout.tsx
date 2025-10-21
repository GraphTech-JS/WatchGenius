import type { Metadata } from 'next';
// import localFont from "next/font/local";
import './globals.css';
import { MainContextProvider } from '@/context';
import { Akatab, Inter, Roboto_Flex } from 'next/font/google';
import { CompareProvider } from '@/context/CompareContext';

// CLEAN UP

// const sfmono = localFont({
//   src: [
//     {
//       path: "fonts/SFMono-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
//   variable: "--font-sfmono",
// });

// const angelica = localFont({
//   src: "fonts/AngleciaProDisplay-Regular.otf",
//   display: "block",
//   weight: "400",
//   style: "normal",
//   variable: "--font-angelica",
// });

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const roboto = Roboto_Flex({
  variable: '--font-roboto',
  subsets: ['latin'],
});
const akatab = Akatab({
  weight: '700',
  variable: '--font-akatab',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WatchGenius',
  description:
    'Keep track of your favorite watches, discover new ones, and stay updated with the latest trends in the world of horology.',
  keywords:
    'watches, watch tracker, luxury watches, watch collection, horology, watch enthusiasts',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`${roboto.variable} ${inter.variable} ${akatab.variable}`}
    >
      <body>
        <main>
          <MainContextProvider>
            <CompareProvider>{children}</CompareProvider>
          </MainContextProvider>
        </main>
      </body>
    </html>
  );
}

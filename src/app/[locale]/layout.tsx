import type { Metadata } from "next";
import "../globals.css";
import { MainContextProvider } from "@/context";
import { Akatab, Inter, Roboto_Flex } from "next/font/google";
import { CompareProvider } from "@/context/CompareContext";
import { notFound } from "next/navigation";
// import { NextIntlClientProvider } from "next-intl";
import { languages, type Locale } from "@/i18n/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto_Flex({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const akatab = Akatab({
  weight: "700",
  variable: "--font-akatab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WatchGenius",
  description:
    "Keep track of your favorite watches, discover new ones, and stay updated with the latest trends in the world of horology.",
  keywords:
    "watches, watch tracker, luxury watches, watch collection, horology, watch enthusiasts",
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

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MainContextProvider } from "@/context";
import { Inter } from "next/font/google";

const sfmono = localFont({
  src: [
    {
      path: "fonts/SFMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sfmono",
});

const angelica = localFont({
  src: "fonts/AngleciaProDisplay-Regular.otf",
  display: "block",
  weight: "400",
  style: "normal",
  variable: "--font-angelica",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WatchGenius",
  description:
    "Keep track of your favorite watches, discover new ones, and stay updated with the latest trends in the world of horology.",
  keywords:
    "watches, watch tracker, luxury watches, watch collection, horology, watch enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sfmono.variable} ${inter.variable} ${angelica.variable}`}
    >
      <body>
        <main>
          <MainContextProvider>{children}</MainContextProvider>
        </main>
      </body>
    </html>
  );
}

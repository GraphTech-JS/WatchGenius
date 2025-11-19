import { Header } from "@/components/Main/Header/Header";
import ChatClient from "@/features/Chat/ChatClient";
import { Footer } from "@/components/Main/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог годинників — WatchGenius",
  description:
    "Повний каталог годинників: сортування за ціною, брендом, діаметром та новизною. Знайдіть свій ідеальний годинник у нашому каталозі.",
  alternates: {
    canonical: "/catalog",
  },
};

export default function RootLayout({
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

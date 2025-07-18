import { Header } from "@/components/Main/Header/Header";
import { Footer } from "@/components/Main/Footer/Footer";
import { MainContextProvider } from "@/context";
import ChatClient from "@/features/Chat/ChatClient";
import Contacts from "./contacts/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainContextProvider>
        <ChatClient>{children}</ChatClient>
      </MainContextProvider>
      <Contacts />
      <Footer />
    </>
  );
}

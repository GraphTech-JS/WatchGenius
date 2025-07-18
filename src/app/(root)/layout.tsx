import { Header } from "@/components/Main/Header/Header";
import { Footer } from "@/components/Main/Footer/Footer";
import ChatClient from "@/features/Chat/ChatClient";
import { Contacts } from "@/features/home/Contacts/Contacts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ChatClient>{children}</ChatClient>
      <Contacts />
      <Footer />
    </>
  );
}

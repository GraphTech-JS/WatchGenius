import { Header } from "@/components/Main/Header/Header";
import ChatClient from "@/features/Chat/ChatClient";
import { Contacts } from "@/features/home/Contacts/Contacts";
import { Footer } from "@/components/Main/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Header />

      <ChatClient>{children}</ChatClient>

      <section id="contacts">
        <Contacts />
      </section>

      <Footer />
    </div>
  );
}

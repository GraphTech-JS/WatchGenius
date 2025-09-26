// app/layout.tsx (или RootLayout.tsx)
import { Header } from "@/components/Main/Header/Header";
import ChatClient from "@/features/Chat/ChatClient";
import { Footer } from "@/components/Main/Footer/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
// import { getWatchBySlug } from "@/lib/api";
import { Metadata } from "next";

interface Params {
  slug: string;
}

export async function generateMetadata({}: // params,
{
  params: Promise<Params>; // Changed: params is now Promise<Params>
}): Promise<Metadata> {
  // const resolvedParams = await params;
  // const watch = await getWatchBySlug(resolvedParams.slug);
  return {
    // title: `${watch.title} — WatchGenius`,
    // description: watch.description,
    // alternates: {
    //   canonical: `/watch/${resolvedParams.slug}`,
    // },
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <ChatClient>{children}</ChatClient>
      <section className={styles.aiAgent} id="ai-agent">
        <div className={styles.aiAgentContainer}>
          <h3 className={styles.aiAgentTitle}>АІ агент</h3>
          <p className={styles.aiAgentDesc}>
            Швидко, точно та без нав’язливих порад. Просто запитайте.
          </p>
          <Link href="/chat" prefetch={false} className={styles.aiAgentLink}>
            <Button
              variant="solid"
              color="#000"
              bgColor="#fff"
              classNames={styles.aiAgentBtn}
            >
              Перейти в чат
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

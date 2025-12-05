"use client";

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import { FloatingButton } from "@/components/FloatingButton";
import { MainContext } from "@/context";
import React, { useContext, useEffect } from "react";
import { trackEvent } from '@/lib/analytics';

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sideChatOpened, setSideChatOpened } = useContext(MainContext);

  useEffect(() => {
    const handleToggleChat = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      const isOpening = !!custom.detail;

      if (isOpening) {
        trackEvent('chat_open', {
          source: 'floating_button', 
        });
      }

      setSideChatOpened(isOpening);
    };

    window.addEventListener("toggleChat", handleToggleChat as EventListener);
    return () => {
      window.removeEventListener(
        "toggleChat",
        handleToggleChat as EventListener
      );
    };
  }, [setSideChatOpened]);

  return (
    <div className="flex relative w-full h-full">
      {!sideChatOpened && (
        <div className="fixed right-4 z-[200] ">
          <FloatingButton
            watchedIds={["footer"]}
            safeOffset={16}
            initialOffsetPercent={0.4}
            extraOffset={0}
          >
            {({ bottom, isScrolling }) => (
              <ChatButton
                onClick={() => setSideChatOpened(true)}
                dynamicPosition={{ bottom }}
                isScrolling={isScrolling}
              />
            )}
          </FloatingButton>
        </div>
      )}
      <main
        id="main-content"
        className="w-full min-h-screen transition-all duration-300 ease-in-out"
      >
        {children}
      </main>

      {sideChatOpened && (
        <aside
          className="fixed inset-0 z-[150] pointer-events-none"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="h-full pointer-events-none">
            <ChatMenu isOpen={true} onClose={() => setSideChatOpened(false)} />
          </div>
        </aside>
      )}
    </div>
  );
}

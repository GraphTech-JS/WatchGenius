"use client";

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import { FloatingButton } from "@/components/FloatingButton";
import React, { useState, useEffect } from "react";

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openChat = () => setOpen(true);
    const closeChat = () => setOpen(false);

    window.addEventListener("openChat", openChat);
    window.addEventListener("closeChat", closeChat);

    return () => {
      window.removeEventListener("openChat", openChat);
      window.removeEventListener("closeChat", closeChat);
    };
  }, []);

  return (
    <div className="relative flex h-full w-full">
      {!open && (
        <div className="fixed right-4 z-[200] ">
          <FloatingButton
            watchedIds={["footer"]}
            safeOffset={16}
            initialOffsetPercent={0.4}
            extraOffset={0}
          >
            {({ bottom, isScrolling }) => (
              <ChatButton
                onClick={() => setOpen(true)}
                dynamicPosition={{ bottom }}
                isScrolling={isScrolling}
              />
            )}
          </FloatingButton>
        </div>
      )}
      <main
        id="main-content"
        className="transition-all duration-300 ease-in-out w-full min-h-screen"
      >
        {children}
      </main>

      {open && (
        <aside
          className="fixed inset-0 z-[150]"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="h-full">
            <ChatMenu isOpen={true} onClose={() => setOpen(false)} />
          </div>
        </aside>
      )}
    </div>
  );
}

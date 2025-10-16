"use client";

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import { FloatingButton } from "@/components/FloatingButton";
import React, { useState } from "react";

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full">
      <div className="fixed right-4 z-[60] ">
        <FloatingButton
          watchedIds={[
            // "trending",
            // "bestPrice",
            // "brand",
            // "howTo",
            // "dealers",
            "ai-agent",
            "footer",
          ]}
          safeOffset={20}
          initialOffsetPercent={0.4}
          extraOffset={100}
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
      <main
        id="main-content"
        className="transition-all duration-300 ease-in-out w-full min-h-screen"
      >
        {children}
      </main>

      {open && (
        <aside
          className="fixed w-100 z-[100] bg-white transform transition-transform duration-300 ease-in-out translate-x-full"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="h-full overflow-y-auto">
            <ChatMenu isOpen={true} onClose={() => setOpen(false)} />
          </div>
        </aside>
      )}
    </div>
  );
}

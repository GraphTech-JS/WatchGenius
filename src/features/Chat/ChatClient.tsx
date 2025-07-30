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
      <div className="fixed right-4 z-[60] lg:hidden">
        <FloatingButton
          watchedIds={["contacts", "ai-agent", "footer"]}
          safeOffset={20}
          initialOffsetPercent={0.2}
          extraOffset={150}
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
        className="transition-all duration-300 ease-in-out w-full sm:w-[calc(100%-42px)] lg:w-[calc(100%-483px)] min-h-screen"
      >
        {children}
      </main>

      <aside
        className="hidden lg:block absolute top-0 right-0 bottom-0 w-[483px] bg-white z-40"
        style={{ boxShadow: "0 4px 20px 2px rgba(0, 0, 0, 0.25)" }}
      >
        <ChatMenu isOpen onClose={() => {}} />
      </aside>
      {open && (
        <aside
          className="fixed inset-0 z-[100] bg-white lg:hidden transform transition-transform duration-300 ease-in-out translate-x-0"
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

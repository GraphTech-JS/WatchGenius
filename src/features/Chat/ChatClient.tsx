// components/Chat/ChatClient.tsx
"use client";

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import React, { useState } from "react";

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full">
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <ChatButton onClick={() => setOpen(true)} />
      </div>
      <main
        className="transition-all duration-300 ease-in-out
                       w-full
                       md:w-[calc(100%-42px)
                       lg:w-[calc(100%-483px)]"
      >
        {children}
      </main>

      <aside
        className="hidden lg:block absolute  top-0 right-0 bottom-0 w-[483px] bg-white"
        style={{ boxShadow: "0 4px 20px 2px rgba(0, 0, 0, 0.25)" }}
      >
        <ChatMenu isOpen onClose={() => {}} />
      </aside>

      <aside
        className={`
          fixed inset-y-0 right-0 z-50
          bg-white
          overflow-y-auto 
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          w-full
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <ChatMenu isOpen={true} onClose={() => setOpen(false)} />
      </aside>
    </div>
  );
}

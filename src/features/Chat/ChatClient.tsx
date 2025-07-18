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
  const toggleMenu = () => setOpen((o) => !o);

  return (
    <div className="relative flex min-h-screen">
      <main
        className={`transition-all duration-300 ease-in-out
                    ${open ? "w-[70%]" : "w-full"}`}
      >
        {children}
      </main>

      <ChatButton onClick={toggleMenu} />

      <aside
        className={`
          fixed top-0 right-0 bottom-0 z-50
          bg-white shadow-lg
          w-[30%]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <ChatMenu isOpen={open} onClose={() => setOpen(false)} />
      </aside>
    </div>
  );
}

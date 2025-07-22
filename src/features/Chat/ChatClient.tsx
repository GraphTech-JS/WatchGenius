"use client";

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import React, { useState, useEffect } from "react";

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ bottom: "20%" });
  const updateButtonPosition = () => {
    const contacts = document.getElementById("contacts");
    if (!contacts) return;

    const rect = contacts.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const buttonHeight = 98;
    if (rect.top < viewHeight) {
      const offset = Math.max(0, viewHeight - rect.top);
      const bottom = offset + buttonHeight;
      setButtonPosition({ bottom: `${bottom}px` });
    } else {
      setButtonPosition({ bottom: "20%" });
    }
  };
  const lockScroll = () => {
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      width: 100%;
    `;
  };
  const unlockScroll = () => {
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.style.cssText = "";
    if (scrollY) window.scrollTo(0, scrollY);
  };
  useEffect(() => {
    updateButtonPosition();
    window.addEventListener("scroll", updateButtonPosition);
    window.addEventListener("resize", updateButtonPosition);
    return () => {
      window.removeEventListener("scroll", updateButtonPosition);
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, []);

  useEffect(() => {
    if (open) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [open]);

  return (
    <div className="relative flex h-full w-full">
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <ChatButton
          onClick={() => setOpen(true)}
          dynamicPosition={buttonPosition}
        />
      </div>

      {/* Main Content */}
      <main className="transition-all duration-300 ease-in-out w-full md:w-[calc(100%-42px)] lg:w-[calc(100%-483px)]">
        {children}
      </main>

      {/* Sidebar on large screens */}
      <aside
        className="hidden lg:block absolute top-0 right-0 bottom-0 w-[483px] bg-white"
        style={{ boxShadow: "0 4px 20px 2px rgba(0, 0, 0, 0.25)" }}
      >
        <ChatMenu isOpen onClose={() => {}} />
      </aside>

      {/* Fullscreen overlay chat menu for mobile */}
      {open && (
        <aside
          className="fixed inset-0 z-50 bg-white lg:hidden transform transition-transform duration-300 ease-in-out translate-x-0"
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

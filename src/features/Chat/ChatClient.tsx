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
  const [buttonPosition, setButtonPosition] = useState({
    bottom: "20%",
  });
  const [isScrolling, setIsScrolling] = useState(false);

  const updateButtonPosition = () => {
    const contacts = document.getElementById("contacts");
    if (!contacts) return;

    const contactsRect = contacts.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const safeOffset = 20;
    const initialBottomPercent = 0.2;
    const initialBottomPx = viewHeight * initialBottomPercent;
    if (contactsRect.top > viewHeight) {
      setButtonPosition({
        bottom: "20%",
      });
      return;
    }
    const minBottomPosition = viewHeight - contactsRect.top + safeOffset;
    const finalBottomPosition = Math.max(initialBottomPx, minBottomPosition);
    setButtonPosition({
      bottom: `${finalBottomPosition + 50}px`,
    });
  };

  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollY}px;
      width: 100%;
    `;
  };

  const unlockScroll = () => {
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.style.cssText = "";
    if (scrollY) window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout | undefined;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      if (!ticking) {
        requestAnimationFrame(() => {
          updateButtonPosition();
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleResize = () => {
      requestAnimationFrame(updateButtonPosition);
    };
    updateButtonPosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
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
      <div className="fixed right-4 z-[60] lg:hidden">
        <ChatButton
          onClick={() => setOpen(true)}
          dynamicPosition={{ bottom: buttonPosition.bottom }}
          isScrolling={isScrolling}
        />
      </div>
      <main
        id="main-content"
        className="transition-all duration-300 ease-in-out w-full md:w-[calc(100%-42px)] lg:w-[calc(100%-483px)] min-h-screen"
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

'use client';

import { ChatMenu } from "@/components/Chat/ChatMenu";
import { ChatButton } from "@/components/Chat/components/ChatButton/ChatButton";
import { FloatingButton } from "@/components/FloatingButton";
import React, { useState } from "react";

export default function ChatClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className='flex relative w-full h-full'>
      {!menuOpened && (
        <div className='fixed right-4 z-[200] '>
          <FloatingButton
            watchedIds={['footer']}
            safeOffset={16}
            initialOffsetPercent={0.4}
            extraOffset={0}
          >
            {({ bottom, isScrolling }) => (
              <ChatButton
                onClick={() => setMenuOpened(true)}
                dynamicPosition={{ bottom }}
                isScrolling={isScrolling}
              />
            )}
          </FloatingButton>
        </div>
      )}
      <main
        id='main-content'
        className='w-full min-h-screen transition-all duration-300 ease-in-out'
      >
        {children}
      </main>

      {menuOpened && (
        <aside
          className='fixed inset-0 z-[150]'
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <div className='h-full'>
            <ChatMenu isOpen={true} onClose={() => setMenuOpened(false)} />
          </div>
        </aside>
      )}
    </div>
  );
}

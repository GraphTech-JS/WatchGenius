'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { IMainContext, Message } from '../interfaces';

const DEFAULT_MESSAGES: Message[] = [
  {
    content:
      'Вітаю! 👋 Я допоможу вам обрати ідеальний годинник.Скажіть, будь ласка, для кого ви шукаєте годинник — для себе чи на подарунок?',
    by: 'ai',
    id: 1,
  },
];

export const MainContext = createContext<IMainContext>({
  menuOpened: false,
  setMenuOpened: () => {},
  sideChatOpened: false,
  setSideChatOpened: () => {},
  setMessages: () => {},
  setMessage: () => {},
  message: {
    content: '',
    by: 'me',
    id: 1,
  },
  savedCatalogFilters: null,
  setSavedCatalogFilters: () => {},
  isApplyingSavedFilters: false,
  setIsApplyingSavedFilters: () => {},
  messages: DEFAULT_MESSAGES,
});

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [sideChatOpened, setSideChatOpened] = useState(false);

  const [messages, setMessagesState] = useState<Message[]>(DEFAULT_MESSAGES);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setMessagesState(parsed);
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const setMessages: React.Dispatch<React.SetStateAction<Message[]>> = (
    newMessages
  ) => {
    setMessagesState(newMessages);
  };
  const [message, setMessage] = useState<Message>({
    content: '',
    by: 'me',
    id: 1,
  });
  const [savedCatalogFilters, setSavedCatalogFilters] = useState<{
    searchTerm: string;
    filters: string[];
  } | null>(null);
  const [isApplyingSavedFilters, setIsApplyingSavedFilters] = useState(false);

  const values = {
    menuOpened,
    setMenuOpened,
    sideChatOpened,
    setSideChatOpened,
    messages,
    setMessages,
    message,
    setMessage,
    savedCatalogFilters,
    setSavedCatalogFilters,
    isApplyingSavedFilters,
    setIsApplyingSavedFilters,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

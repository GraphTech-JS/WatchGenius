'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { IMainContext, Message } from '../interfaces';

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
  messages: [
    {
      content:
        'Вітаю! 👋 Я допоможу вам обрати ідеальний годинник.Скажіть, будь ласка, для кого ви шукаєте годинник — для себе чи на подарунок?',
      by: 'ai',
      id: 1,
    },
    {
      content: 'Для себе.',
      by: 'me',
      id: 2,
    },
    {
      content:
        'Чудово! 😊А ви шукаєте годинник більше для повсякденного носіння, офіційних подій чи спорту?',
      by: 'ai',
      id: 3,
    },
    {
      content: 'Для повсякденного, але щоб виглядав стильно.',
      by: 'me',
      id: 4,
    },
    {
      content:
        'Розумію вас. Тоді рекомендую звернути увагу на класичні або мінімалістичні моделі.Підкажіть ще, вам важливо, щоб годинник був механічний чи на батарейці (кварцовий)?',
      by: 'ai',
      id: 5,
    },
    {
      content: 'Напевно, на батарейці, щоб не заводити.',
      by: 'me',
      id: 6,
    },
    {
      content:
        'Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?',
      by: 'ai',
      id: 7,
    },
  ],
});

const DEFAULT_MESSAGES: Message[] = [
  {
    content:
      'Вітаю! 👋 Я допоможу вам обрати ідеальний годинник.Скажіть, будь ласка, для кого ви шукаєте годинник — для себе чи на подарунок?',
    by: 'ai',
    id: 1,
  },
  {
    content: 'Для себе.',
    by: 'me',
    id: 2,
  },
  {
    content:
      'Чудово! 😊А ви шукаєте годинник більше для повсякденного носіння, офіційних подій чи спорту?',
    by: 'ai',
    id: 3,
  },
  {
    content: 'Для повсякденного, але щоб виглядав стильно.',
    by: 'me',
    id: 4,
  },
  {
    content:
      'Розумію вас. Тоді рекомендую звернути увагу на класичні або мінімалістичні моделі.Підкажіть ще, вам важливо, щоб годинник був механічний чи на батарейці (кварцовий)?',
    by: 'ai',
    id: 5,
  },
  {
    content: 'Напевно, на батарейці, щоб не заводити.',
    by: 'me',
    id: 6,
  },
  {
    content:
      'Тоді кварцовий — чудовий вибір: точний, не потребує щоденного обслуговування. Ще питання: ви надаєте перевагу шкіряним ремінцям, металевим браслетам чи можливо щось нестандартне?',
    by: 'ai',
    id: 7,
  },
];

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [sideChatOpened, setSideChatOpened] = useState(false);

  const [messages, setMessagesState] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_MESSAGES;
        }
      }
    }
    return DEFAULT_MESSAGES;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const setMessages = (
    newMessages: Message[] | ((prev: Message[]) => Message[])
  ) => {
    setMessagesState(newMessages);
  };
  const [message, setMessage] = useState<Message>({
    content: '',
    by: 'me',
    id: messages.length + 1,
  });
  const [savedCatalogFilters, setSavedCatalogFilters] = useState<{
    searchTerm: string;
    filters: string[];
  } | null>(null);

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
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

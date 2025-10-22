import { useContext, useCallback } from 'react';
import { MainContext } from '@/context';

type ActiveFilter = {
  id: string;
  group:
    | 'index'
    | 'brand'
    | 'condition'
    | 'mechanism'
    | 'material'
    | 'document'
    | 'location'
    | 'price'
    | 'year';
  value: string;
  label: string;
};

type SearchData = {
  searchTerm: string;
  activeFilters: ActiveFilter[];
};

export const useSaveSearchToChat = () => {
  const { setMessages, messages, setMenuOpened } = useContext(MainContext);

  const saveSearchToChat = useCallback((searchData: SearchData) => {
    const filterParts: string[] = [];

    if (searchData.searchTerm) {
      filterParts.push(`"${searchData.searchTerm}"`);
    }

    if (searchData.activeFilters.length > 0) {
      const brands = searchData.activeFilters.filter(
        (f) => f.group === 'brand'
      );
      const conditions = searchData.activeFilters.filter(
        (f) => f.group === 'condition'
      );
      const mechanisms = searchData.activeFilters.filter(
        (f) => f.group === 'mechanism'
      );
      const materials = searchData.activeFilters.filter(
        (f) => f.group === 'material'
      );

      if (brands.length) {
        filterParts.push(`Бренд: ${brands.map((b) => b.label).join(', ')}`);
      }
      if (conditions.length) {
        filterParts.push(`Стан: ${conditions.map((c) => c.label).join(', ')}`);
      }
      if (mechanisms.length) {
        filterParts.push(
          `Механізм: ${mechanisms.map((m) => m.label).join(', ')}`
        );
      }
      if (materials.length) {
        filterParts.push(
          `Матеріал: ${materials.map((m) => m.label).join(', ')}`
        );
      }
    }

    const messageText =
      filterParts.length > 0
        ? `Знайти годинники: ${filterParts.join(', ')}`
        : 'Знайти годинники по бюджету';


    const newMessage = {
      content: messageText,
      by: 'me' as const,
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      time: new Date().toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSaved: true,
      savedSearch: {
        searchTerm: searchData.searchTerm,
        filters: searchData.activeFilters.map(f => `${f.group}:${f.value}`),
      },
    };

    setMessages([...messages, newMessage]);
    setMenuOpened(true);
  }, [messages, setMessages, setMenuOpened]);

  return { saveSearchToChat };
};

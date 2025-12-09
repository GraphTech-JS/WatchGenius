'use client';

import React, { useRef, useState, useEffect, useContext } from 'react';
import styles from './ChatMenu.module.css';
import { CloseIcon } from '../../../public/chat/Icon';
import { ChatAttachIcon } from '../../../public/chat';
import { MainContext } from '@/context';
import Image from 'next/image';
import { SendBtn } from '../../../public/icons';
import RobotChatMenuIcon from '../../../public/icons/robot_chat_menu.svg';
import { ChatList } from './components/ChatList/ChatList';
import { t } from '@/i18n';
import { chatKeys } from '@/i18n/keys/chat';
import { a11yKeys } from '@/i18n/keys/accessibility';

import { sendChatMessage, getChatHistory } from '@/lib/api';
import {
  getOrCreateGuestId,
  chatHistoryItemToMessage,
  getChatContext,
} from '@/utils/chatUtils';
import { usePathname } from 'next/navigation';
import type { Message } from '@/interfaces';

import { getSavedSearches } from '@/utils/chatUtils';

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { message, messages, setMessage, setMessages } =
    useContext(MainContext);
  const { savedCatalogFilters } = useContext(MainContext);
  const [guestId, setGuestId] = useState<string>('');
  const pathname = usePathname();
  const [isTyping, setIsTyping] = useState(false);

  const getWatchIdFromPath = (): string | undefined => {
    if (!pathname.includes('/product/')) {
      return undefined;
    }

    const slugMatch = pathname.match(/\/product\/([^\/]+)/);
    if (!slugMatch) {
      return undefined;
    }

    const slug = slugMatch[1];

    if (typeof window === 'undefined') return undefined;

    try {
      const SLUG_TO_ID_CACHE_PREFIX = 'slug-to-id-cache-';
      const CACHE_TTL = 24 * 60 * 60 * 1000;
      const cacheKey = `${SLUG_TO_ID_CACHE_PREFIX}${slug}`;
      const cached = localStorage.getItem(cacheKey);

      if (!cached) {
        return undefined;
      }

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > CACHE_TTL) {
        localStorage.removeItem(cacheKey);
        return undefined;
      }

      return data;
    } catch {
      return undefined;
    }
  };
  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  useEffect(() => {
    const initChat = async () => {
      const id = getOrCreateGuestId();
      setGuestId(id);

      try {
        const history = await getChatHistory(id);

        if (history.success && history.history.length > 0) {
          const convertedMessages = history.history.map((item, index) =>
            chatHistoryItemToMessage(item, index + 1)
          );

          const savedSearches = getSavedSearches();
          const maxHistoryId =
            convertedMessages.length > 0
              ? Math.max(...convertedMessages.map((m) => m.id))
              : 0;

          const savedSearchesWithUniqueIds = savedSearches.map(
            (msg, index) => ({
              ...msg,
              id: maxHistoryId + index + 1,
            })
          );

          setMessages([...convertedMessages, ...savedSearchesWithUniqueIds]);
        } else {
          const savedSearches = getSavedSearches();
          if (savedSearches.length > 0) {
            setMessages(savedSearches);
          }
        }
      } catch (error) {
        console.error('❌ [ChatMenu] Failed to load history:', error);

        const savedSearches = getSavedSearches();
        if (savedSearches.length > 0) {
          setMessages(savedSearches);
        }
      }
    };

    initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (guestId) {
        fetch(`/api/chat/history/${guestId}`, {
          method: 'DELETE',
          keepalive: true,
        }).catch(() => {
          // Ignore errors on unload
        });

        localStorage.removeItem('chatMessages');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [guestId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      content: e.target.value,
      by: 'me',
      id: messages.length + 1 + Math.random() * 1000,
    });
  };

  const handleSend = async () => {
    if (!message.content.trim()) return;

    const userMessageContent = message.content.trim();
    setIsTyping(true);

    const userMessageId =
      messages.length + 1 + Math.floor(Math.random() * 1000);
    const userMessage: Message = {
      content: userMessageContent,
      by: 'me',
      id: userMessageId,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage({ content: '', by: 'me', id: userMessageId + 1 });

    try {
      const watchId = getWatchIdFromPath();
      const chatContext = getChatContext(
        pathname,
        watchId,
        savedCatalogFilters
      );

      const response = await sendChatMessage({
        message: userMessageContent,
        guestId: guestId || null,
        context: chatContext,
      });

      if (response.success) {
        const aiMessageId = userMessageId + 1;
        const aiMessage: Message = {
          content: response.answer,
          by: 'ai',
          id: aiMessageId,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('❌ [ChatMenu] Failed to send message:', error);

      const errorMessage: Message = {
        content: 'Вибачте, сталася помилка. Спробуйте ще раз.',
        by: 'ai',
        id: userMessageId + 1,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInlineButtonClick = async (buttonText: string) => {
    setIsTyping(true);

    const baseId = messages.length + 1 + Math.floor(Math.random() * 1000);
    const userMessage: Message = {
      content: buttonText,
      by: 'me',
      id: baseId,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const watchId = getWatchIdFromPath();
      const chatContext = getChatContext(
        pathname,
        watchId,
        savedCatalogFilters
      );

      const response = await sendChatMessage({
        message: buttonText,
        guestId: guestId || null,
        context: chatContext,
      });

      if (response.success) {
        const aiMessage: Message = {
          content: response.answer,
          by: 'ai',
          id: baseId + 1,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('❌ [ChatMenu] Failed to send inline message:', error);
      const errorMessage: Message = {
        content: 'Вибачте, сталася помилка. Спробуйте ще раз.',
        by: 'ai',
        id: baseId + 1,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.chatMenu} ${
        isAnimating ? styles.open : ''
      } pointer-events-auto`}
      role='dialog'
      aria-label={t(chatKeys.header.title)}
    >
      <div
        className={`${styles.chatMenuHeader} w-full flex justify-between px-4.5 pt-2 pb-3`}
      >
        <div
          className={`${styles.chatMenuHeaderName} flex w-full items-center gap-5`}
        >
          <div
            className={`${styles.chatMenuHeaderRobotIcon} flex items-center justify-center w-11.5 h-11.5 rounded-full`}
          >
            <Image
              src={RobotChatMenuIcon}
              alt=''
              width={28}
              height={28}
              className={styles.RobotIcon}
              aria-hidden='true'
            />
          </div>
          <div className={`${styles.chatMenuHeaderNameTitle}`}>
            {t(chatKeys.header.title)}
          </div>
        </div>
        <button
          className={`${styles.chatMenuClose} flex items-center justify-center cursor-pointer`}
          onClick={handleClose}
          aria-label={t(a11yKeys.chat.close)}
        >
          <CloseIcon
            className={`${styles.CloseIcon} w-4 h-4 `}
            aria-hidden='true'
          />
        </button>
      </div>

      <div
        ref={chatBodyRef}
        className={styles.chatBody}
        role='log'
        aria-label={t(a11yKeys.chat.messages)}
        aria-live='polite'
      >
        <ChatList isTyping={isTyping} />
      </div>

      <div className={styles.chatMenuButtons}>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.compare))
          }
          aria-label={t(a11yKeys.chat.compareWatches)}
        >
          <span className={styles.chatMenuBtnIcon} aria-hidden='true'>
            🔍
          </span>
          {t(chatKeys.inlineButtons.compare)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.trends))
          }
          aria-label={t(a11yKeys.chat.viewTrends)}
        >
          <span className={styles.chatMenuBtnIcon} aria-hidden='true'>
            📈
          </span>
          {t(chatKeys.inlineButtons.trends)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.budget))
          }
          aria-label={t(a11yKeys.chat.getBudgetTips)}
        >
          <span className={styles.chatMenuBtnIcon} aria-hidden='true'>
            💡
          </span>
          {t(chatKeys.inlineButtons.budget)}
        </button>
        <button
          className={styles.chatMenuActionBtn}
          onClick={() =>
            handleInlineButtonClick(t(chatKeys.inlineButtons.authenticity))
          }
          aria-label={t(a11yKeys.chat.checkAuthenticity)}
        >
          <span className={styles.chatMenuBtnIcon} aria-hidden='true'>
            ✅
          </span>
          {t(chatKeys.inlineButtons.authenticity)}
        </button>
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <label htmlFor='chat-input' className='sr-only'>
            {t(a11yKeys.chat.input)}
          </label>
          <input
            id='chat-input'
            placeholder={t(chatKeys.input.placeholder)}
            value={message.content}
            onChange={handleChange}
            className={styles.chatInput}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            aria-label={t(a11yKeys.chat.input)}
          />
          <button
            className={styles.attachIconWrapper}
            aria-label={t(a11yKeys.chat.attach)}
          >
            <Image
              src={ChatAttachIcon.src}
              alt=''
              width={27}
              height={14}
              className={styles.attachIcon}
              aria-hidden='true'
            />
          </button>
        </div>
        <button
          className={styles.sendButton}
          onClick={handleSend}
          aria-label={t(a11yKeys.chat.send)}
        >
          <Image
            src={SendBtn.src}
            alt=''
            width={29}
            height={30}
            className='brightness-0 invert'
            style={{ filter: 'brightness(0) invert(1)' }}
            aria-hidden='true'
          />
        </button>
      </div>
    </div>
  );
};

import { Message } from '@/interfaces';
import styles from './ChatMessage.module.css';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { MainContext } from '@/context';
import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const ChatMessage = ({ message }: { message: Message }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const isAi = message.by === 'ai';
  const isSaved = message.isSaved;
  const router = useRouter();
  const locale = useLocale();
  const { setSavedCatalogFilters, setMenuOpened } = useContext(MainContext);

  const handleSavedClick = () => {
    if (isSaved && message.savedSearch) {
      setSavedCatalogFilters(message.savedSearch);

      setMenuOpened(false);

      router.push(`/${locale}/catalog`);
    }
  };

  const fixProductUrl = (url: string): string => {
    if (typeof url !== 'string') return url;

    let fixedUrl = url;

    const idMatch = fixedUrl.match(/\/product\/id=([a-f0-9-]+)/i);
    if (idMatch) {
      const id = idMatch[1];
      fixedUrl = fixedUrl.replace(
        /\/product\/id=[^\/\s"']+/i,
        `/product/${id}`
      );
    }

    const isAbsolute =
      fixedUrl.startsWith('http://') || fixedUrl.startsWith('https://');
    if (
      !isAbsolute &&
      fixedUrl.startsWith('/product/') &&
      !fixedUrl.startsWith(`/${locale}/product/`)
    ) {
      fixedUrl = `/${locale}${fixedUrl}`;
    }

    return fixedUrl;
  };

  return (
    <div
      className={`${styles.message} ${
        message.by === 'me' ? styles.messageMe : styles.messageAi
      } ${isSaved ? styles.messageSaved : ''}`}
      onClick={handleSavedClick}
    >
      <div className={styles.messageContainer}>
        {isSaved && <span className={styles.savedIcon}>⭐</span>}
        {isAi ? (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children, ...props }) => {
                const fixedHref = fixProductUrl(href || '');
                const isExternal =
                  fixedHref.startsWith('http://') ||
                  fixedHref.startsWith('https://');

                if (isExternal) {
                  return (
                    <a
                      href={fixedHref}
                      target='_blank'
                      rel='noopener noreferrer'
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }

                return (
                  <Link href={fixedHref} {...props}>
                    {children}
                  </Link>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <span>{message.content}</span>
        )}
        {!isSaved && message.time && (
          <span className={styles.time}>{message.time}</span>
        )}
      </div>
      {isAi && (
        <div className={styles.feedbackRow}>
          <button
            type='button'
            aria-label='Вподобати відповідь'
            className={`${styles.feedbackBtn} ${
              feedback === 'up' ? styles.feedbackUpActive : ''
            }`}
            onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
          >
            <span aria-hidden>👍</span>
          </button>
          <button
            type='button'
            aria-label='Не подобається відповідь'
            className={`${styles.feedbackBtn} ${
              feedback === 'down' ? styles.feedbackDownActive : ''
            }`}
            onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
          >
            <span aria-hidden>👎</span>
          </button>
        </div>
      )}
    </div>
  );
};

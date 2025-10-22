import { Message } from '@/interfaces';
import styles from './ChatMessage.module.css';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { MainContext } from '@/context';
import { useLocale } from '@/hooks/useLocale';

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

  return (
    <div
      className={`${styles.message} ${
        message.by === 'me' ? styles.messageMe : styles.messageAi
      } ${isSaved ? styles.messageSaved : ''}`}
      onClick={handleSavedClick}
    >
      <div className={styles.messageContainer}>
        {isSaved && <span className={styles.savedIcon}>⭐</span>}
        <span>{message.content}</span>
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

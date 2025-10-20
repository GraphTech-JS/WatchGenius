import { Message } from '@/interfaces';
import styles from './ChatMessage.module.css';
import React, { useState } from 'react';

export const ChatMessage = ({ message }: { message: Message }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const isAi = message.by === 'ai';

  return (
    <div
      className={`${styles.message} ${
        message.by === 'me' ? styles.messageMe : styles.messageAi
      }`}
    >
      <div className={styles.messageContainer}>
        <span>{message.content}</span>
        {message.time && <span className={styles.time}>{message.time}</span>}
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

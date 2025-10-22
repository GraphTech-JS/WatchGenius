/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useContext } from 'react';
import styles from './AiChat.module.css';
import { RobotWhiteIcon } from '../../../../../public/chat/Icon';
import { ChatAttachIcon } from '../../../../../public/chat';
import { MainContext } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, SendBtn } from '../../../../../public/icons';
import { ChatList } from '../ChatList/ChatList';
import { ThemedText } from '@/components/ThemedText/ThemedText';

export const AiChat = () => {
  const { message, messages, setMessage, setMessages } =
    useContext(MainContext);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      content: e.target.value,
      by: 'me',
      id: messages.length + 1 + Math.random() * 1000,
    });
  };

  const handleSend = () => {
    if (!message.content.trim()) return;
    setIsTyping(true);
    const baseId = messages.length + 1 + Math.floor(Math.random() * 1000);
    const aiResponse =
      'Готовий допомогти! Оберіть опцію нижче або напишіть питання — підкажу моделі, тренди, бюджет і перевірку справжності.';
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          content: message.content,
          by: 'me',
          id: baseId,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        {
          content: aiResponse,
          by: 'ai',
          id: baseId + 1,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setMessage({ content: '', by: 'me', id: baseId + 2 });
      setIsTyping(false);
    }, 800);
  };

  const handleInlineButtonClick = (buttonText: string) => {
    setIsTyping(true);
    const baseId = messages.length + 1 + Math.floor(Math.random() * 1000);
    const aiResponse = 'Ось що можу запропонувати далі. Продовжимо?';
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          content: buttonText,
          by: 'me',
          id: baseId,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        {
          content: aiResponse,
          by: 'ai',
          id: baseId + 1,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatContainer}>
        <div className='flex justify-between items-center px-4 py-2 bg-[rgba(251,250,249,1)] border-b border-black/10 flex-shrink-0'>
          <div className='flex gap-5 items-center'>
            <div className='flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[var(--green)]'>
              <RobotWhiteIcon className='w-7 h-7 text-white' />
            </div>
            <ThemedText
              type='h2'
              className='text-xl font-medium text-[#171414]'
            >
              Geni - ваш AI-асистент
            </ThemedText>
          </div>
          <Link
            href='/'
            className='flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[var(--green)] transition-opacity duration-200 hover:opacity-90'
          >
            <Image
              src={ArrowRight}
              alt='back navigation'
              width={15}
              height={15}
              className='brightness-0 invert rotate-180'
            />
          </Link>
        </div>

        <div className='flex overflow-y-auto flex-col flex-1 px-3 pt-3 min-h-0'>
          <ChatList isTyping={isTyping} showSavedMessages={false} />

          <div className='flex flex-col gap-2.5 py-3.5 mt-auto bg-[rgba(251,250,249,1)] border-t border-black/10 -mx-3 px-6.5'>
            <button
              className='border border-black/20 rounded-[10px] py-[15px] px-[30px] w-full shadow-[0_4px_13px_2px_rgba(0,0,0,0.05)] bg-white font-normal text-base text-[#171414] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_3px_rgba(0,0,0,0.1)]'
              onClick={() => handleInlineButtonClick('Порівняти моделі')}
            >
              <span className='text-base'>🔍</span>
              Порівняти моделі
            </button>
            <button
              className='border border-black/20 rounded-[10px] py-[15px] px-[30px] w-full shadow-[0_4px_13px_2px_rgba(0,0,0,0.05)] bg-white font-normal text-base text-[#171414] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_3px_rgba(0,0,0,0.1)]'
              onClick={() => handleInlineButtonClick('Показати тренди ринку')}
            >
              <span className='text-base'>📈</span>
              Показати тренди ринку
            </button>
            <button
              className='border border-black/20 rounded-[10px] py-[15px] px-[30px] w-full shadow-[0_4px_13px_2px_rgba(0,0,0,0.05)] bg-white font-normal text-base text-[#171414] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_3px_rgba(0,0,0,0.1)]'
              onClick={() =>
                handleInlineButtonClick('Знайти годинник по бюджету')
              }
            >
              <span className='text-base'>💡</span>
              Знайти годинник по бюджету
            </button>
            <button
              className='border border-black/20 rounded-[10px] py-[15px] px-[30px] w-full shadow-[0_4px_13px_2px_rgba(0,0,0,0.05)] bg-white font-normal text-base text-[#171414] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_3px_rgba(0,0,0,0.1)]'
              onClick={() =>
                handleInlineButtonClick('Як перевірити справжність?')
              }
            >
              <span className='text-base'>✅</span>
              Як перевірити справжність?
            </button>
          </div>
        </div>

        <div className='flex flex-shrink-0 gap-3 items-center px-4 py-4 bg-white border-t border-black/10'>
          <div className='relative w-full'>
            <input
              placeholder='Напишіть питання про годинники…'
              value={message.content}
              onChange={handleChange}
              className='border border-black/10 bg-[#fafafa] rounded-[10px] px-[23px] w-full h-[58px] text-base placeholder:text-[rgba(23,20,20,0.5)] placeholder:font-normal sm:placeholder:text-sm xs:placeholder:text-xs'
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className='absolute right-[17px] top-1/2 transform -translate-y-1/2 cursor-pointer'>
              <Image
                src={ChatAttachIcon.src}
                alt='attach'
                width={27}
                height={14}
              />
            </div>
          </div>
          <button
            className='flex items-center justify-center border-none rounded-[10px] w-[61px] h-[58px] bg-[#2f855a] cursor-pointer transition-colors duration-200 hover:bg-[#276749]'
            onClick={handleSend}
            aria-label='Надіслати'
          >
            <Image
              src={SendBtn.src}
              alt='send'
              width={29}
              height={30}
              className='brightness-0 invert'
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

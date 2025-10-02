'use client';
import React, { useState } from 'react';
import styles from './SaveToChatButton.module.css';
import { StarIcon, StarIconHover } from '../../../../../public/catalogPage';
import Image from 'next/image';

interface SaveToChatButtonProps {
  onClick: () => void;
}

export const SaveToChatButton: React.FC<SaveToChatButtonProps> = ({
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`${styles.saveToChatButton} w-full md:w-[194px] lg:w-[252px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={isHovered ? StarIconHover : StarIcon}
        alt='StarIcon'
        width={18}
        height={18}
        className='w-[18px] h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] flex-shrink-0'
      />
      <span className='text-[16px] md:text-[13px] lg:text-[16px] leading-tight'>
        Зберегти пошук в чат
      </span>
    </button>
  );
};
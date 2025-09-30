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
      className={`${styles.saveToChatButton} flex items-center gap-2 cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={isHovered ? StarIconHover : StarIcon}
        alt='StarIcon'
        className={styles.starIcon}
      />
      Зберегти пошук в чат
    </button>
  );
};

import React from "react";
import { RobotWhiteIcon } from "../../../../../public/chat/Icon";
import styles from "./ChatButton.module.css";

interface IChatButton {
  onClick: () => void;
  dynamicPosition?: { bottom: string };
  isScrolling?: boolean;
}

export const ChatButton: React.FC<IChatButton> = ({
  onClick,
  dynamicPosition,
  isScrolling = false,
}) => (
  <>
    <button
      onClick={onClick}
      style={{
        bottom: dynamicPosition?.bottom || "20%",
        transform: "translateY(50%)",
      }}
      className={`
        fixed
        right-[15px] lg:right-[30px] 
        w-[63px] md:w-[81px]
        h-[63px] md:h-[81px]
        rounded-full
        cursor-pointer
        z-40
        ${
          isScrolling
            ? "transition-none"
            : "transition-all duration-500 ease-out"
        }
        ${styles.chatButton}
        hover:scale-105 active:scale-95
        flex items-center justify-center
        select-none
        touch-manipulation
      `}
    >
      <RobotWhiteIcon
        className={`${styles.chatButtonIcon} w-9 h-9 md:w-10 md:h-10 md:text-white `}
      />
    </button>
  </>
);

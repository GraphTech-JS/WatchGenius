import React from "react";

interface IChatButton {
  onClick: () => void;
  dynamicPosition?: { bottom: string };
}

export const ChatButton: React.FC<IChatButton> = ({
  onClick,
  dynamicPosition,
}) => (
  <>
    <div
      style={{ boxShadow: "0 4px 20px 2px rgba(0, 0, 0, 0.25)" }}
      className="
        fixed right-0 bottom-0
        h-screen w-0 sm:w-[42px] bg-white flex justify-center items-start
      "
    />
    <button
      onClick={onClick}
      style={{
        boxShadow: "-1px 4px 14px 1px rgba(255, 230, 230, 0.7)",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        bottom: dynamicPosition?.bottom || "50%",
      }}
      className="
        fixed
        right-[-10px] md:right-0
        w-[94px] md:w-[105px]
        h-[98px]
        rounded-l-[50%]
        bg-white shadow-md
        cursor-pointer
        z-50
        transition-[bottom] duration-500 ease-in-out
        hover:scale-105
        font-sfmono text-[20px]
      "
    >
      АІ <br /> чат
    </button>
  </>
);

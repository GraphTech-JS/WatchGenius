import React from "react";

interface IChatButton {
  onClick: () => void;
}

export const ChatButton: React.FC<IChatButton> = ({ onClick }) => (
  <div
    className="
      fixed right-0 bottom-0
      h-screen w-[42px] bg-white shadow-md
      z-50 flex justify-center items-start
    "
  >
    <button
      onClick={onClick}
      className="
        absolute
        right-[-10px]
        top-[75%] md:top-[32%]
        w-[100px] md:w-[120px]
        h-[98px]
        rounded-l-[43%]
        bg-white shadow-md
        text-black text-lg
        font-inherit
        cursor-pointer
      "
    >
      АІ чат
    </button>
  </div>
);

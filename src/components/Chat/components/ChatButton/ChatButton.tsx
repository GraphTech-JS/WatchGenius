import React from "react";

interface IChatButton {
  onClick: () => void;
}

export const ChatButton: React.FC<IChatButton> = ({ onClick }) => (
  <div
    style={{ boxShadow: "0 4px 20px 2px rgba(0, 0, 0, 0.25)" }}
    className="
      fixed right-0 bottom-0
      h-screen w-0 sm:w-[42px] bg-white
      z-50 flex justify-center items-start
    "
  >
    <button
      onClick={onClick}
      style={{
        boxShadow: "-1px 4px 14px 1px rgba(255, 230, 230, 0.7)",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
      }}
      className="
        absolute
        right-[-10px]
        top-[50%] md:top-[32%]
        w-[94px] md:w-[105px]
        h-[98px]
        rounded-l-[50%]
        bg-white shadow-md
        text-black text-[20px]
        font-inherit
        cursor-pointer
      "
    >
      АІ <br /> чат
    </button>
  </div>
);

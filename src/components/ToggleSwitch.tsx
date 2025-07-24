"use client";
import React, { useState } from "react";

interface ToggleSwitchProps {
  onChange: (value: "year" | "month") => void;
}

export const ToggleSwitch = ({ onChange }: ToggleSwitchProps) => {
  const [active, setActive] = useState<"year" | "month">("year");

  const handleChange = (val: "year" | "month") => {
    setActive(val);
    onChange(val); // передаем наружу
  };

  return (
    <div className="relative flex w-full sm:w-[178px] sm:h-[36px] h-[52px] rounded-[5px] border border-black bg-white overflow-hidden">
      <div
        className={`absolute top-0 h-full bg-black rounded-[5px] transition-all duration-300`}
        style={{
          width: active === "year" ? "55%" : "55%",
          left: active === "year" ? "0%" : "45%",
        }}
      ></div>

      <button
        onClick={() => handleChange("year")}
        className={`flex-1 z-10 flex items-center justify-center font-medium transition-all duration-300 ${
          active === "year" ? "text-white scale-105" : "text-black scale-95"
        }`}
      >
        1 рік
      </button>

      <button
        onClick={() => handleChange("month")}
        className={`flex-1 z-10 flex items-center justify-center font-medium transition-all duration-300 ${
          active === "month" ? "text-white scale-105" : "text-black scale-95"
        }`}
      >
        3 м
      </button>
    </div>
  );
};

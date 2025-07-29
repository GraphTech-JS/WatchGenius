import React, { useState } from "react";

interface ToggleSwitchProps<T> {
  options: T[];
  onChange: (value: T) => void;
  displayValues: string[];
}

export const ToggleSwitch = <T extends string | number>({
  options,
  onChange,
  displayValues,
}: ToggleSwitchProps<T>) => {
  const [active, setActive] = useState<T>(options[0]);

  const handleChange = (val: T) => {
    setActive(val);
    onChange(val);
  };

  return (
    <div className="relative flex w-full sm:w-[178px] sm:h-[36px] h-[52px] rounded-[5px] border border-black bg-white overflow-hidden">
      <div
        className={`absolute top-0 h-full bg-black rounded-[5px] transition-all duration-300`}
        style={{
          width: `${100 / options.length}%`,
          left: `${(options.indexOf(active) / options.length) * 100}%`,
        }}
      ></div>

      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleChange(option)}
          className={`flex-1 z-10 flex items-center justify-center font-medium transition-all duration-300 ${
            active === option ? "text-white scale-105" : "text-black scale-95"
          }`}
        >
          {displayValues[index]}
        </button>
      ))}
    </div>
  );
};

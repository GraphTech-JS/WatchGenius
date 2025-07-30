import React, { useState, useRef, useCallback } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  unit?: string;
}

export default function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1000,
  unit = "грн",
}: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const formatPrice = (val: number) => {
    return val.toLocaleString("uk-UA") + ` ${unit}`;
  };

  const getSliderPosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const calculateValueFromPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return value;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);

      // Округляем до ближайшего step
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    },
    [min, max, step, value]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const newValue = calculateValueFromPosition(e.clientX);
    onChange(newValue);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const newValue = calculateValueFromPosition(e.clientX);
      onChange(newValue);
    },
    [isDragging, calculateValueFromPosition, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Добавляем глобальные обработчики событий при перетаскивании
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Отключаем выделение текста

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="w-full mt-[15px]">
      <div className="relative">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatPrice(min)}</span>
          <span>{formatPrice(max)}</span>
        </div>

        <div className="relative" ref={sliderRef}>
          {/* Трек слайдера */}
          <div
            className="w-full h-2 bg-gray-300 rounded-full relative cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            <div
              className="h-2 bg-green-500 rounded-full absolute left-0 top-0 pointer-events-none"
              style={{ width: `${getSliderPosition()}%` }}
            ></div>
          </div>

          {/* Скрытый input для поддержки клавиатуры */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
          />

          {/* Ползунок */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
            style={{ left: `${getSliderPosition()}%` }}
            onMouseDown={handleMouseDown}
          >
            {/* Всплывающая подсказка с ценой */}
            <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 text-black text-xs px-2 py-1 rounded whitespace-nowrap">
              {formatPrice(value)}
            </div>
            {/* Сам ползунок */}
            <div
              className={`w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg transition-transform ${
                isDragging ? "scale-110" : "hover:scale-105"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

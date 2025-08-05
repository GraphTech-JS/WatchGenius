// src/components/RangeSliderRange.tsx
import React, { useState, useRef, useCallback, useEffect } from "react";

interface RangeSliderRangeProps {
  min: number;
  max: number;
  /** Текущее минимальное значение */
  minValue: number;
  /** Текущее максимальное значение */
  maxValue: number;
  /** Вызывается при изменении диапазона */
  onChange: (minValue: number, maxValue: number) => void;
  step?: number;
  unit?: string;
}

export default function RangeSliderRange({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  step = 1000,
  unit = "грн",
}: RangeSliderRangeProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const formatPrice = (val: number) => val.toLocaleString("uk-UA") + ` ${unit}`;

  const getPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const calculateValueFromPos = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return minValue;
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - left) / width));
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const newVal = calculateValueFromPos(e.clientX);
      if (dragging === "min") {
        onChange(Math.min(newVal, maxValue), maxValue);
      } else {
        onChange(minValue, Math.max(newVal, minValue));
      }
    },
    [dragging, calculateValueFromPos, minValue, maxValue, onChange]
  );

  const onMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [dragging, onMouseMove, onMouseUp]);

  const handleDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(thumb);
  };

  const leftPct = getPercent(minValue);
  const rightPct = getPercent(maxValue);

  return (
    <div className="w-full mt-4">
      {/* шкала: min и max */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>

      {/* трек + активная часть */}
      <div className="relative h-2" ref={sliderRef}>
        <div className="absolute w-full h-2 bg-gray-300 rounded-full top-0 left-0" />
        <div
          className="absolute h-2 bg-green-500 rounded-full top-0"
          style={{
            left: `${leftPct}%`,
            width: `${rightPct - leftPct}%`,
          }}
        />

        {/* левая ручка */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-grab"
          style={{ left: `${leftPct}%`, zIndex: dragging === "min" ? 20 : 10 }}
          onMouseDown={handleDown("min")}
        >
          {minValue > min && (
            <div className="absolute bottom-[30px] mb-2 w-max px-2 py-1 text-xs text-black ">
              {formatPrice(minValue)}
            </div>
          )}
          <div
            className={`w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow ${
              dragging === "min" ? "scale-110" : "hover:scale-105"
            } transition-transform`}
          />
        </div>

        {/* правая ручка */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-grab"
          style={{ left: `${rightPct}%`, zIndex: dragging === "max" ? 20 : 10 }}
          onMouseDown={handleDown("max")}
        >
          {/* тултип только если макси-значение < max */}
          {maxValue < max && (
            <div className="absolute bottom-[30px] mb-2 w-max px-2 py-1 text-xs text-black ">
              {formatPrice(maxValue)}
            </div>
          )}
          <div
            className={`w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow ${
              dragging === "max" ? "scale-110" : "hover:scale-105"
            } transition-transform`}
          />
        </div>
      </div>
    </div>
  );
}

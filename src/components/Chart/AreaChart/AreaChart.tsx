"use client";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import styles from "./AreaChart.module.css";

export type DataPoint = {
  date: string;
  price: number;
  price_usd: number;
};

interface CustomChartProps {
  yearData: DataPoint[];
  threeMonthData: DataPoint[];
  controls?: boolean;
  card?: boolean;
  variant?: "area" | "bar" | "auto";
  containerClassName?: string;
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    [key: string]: unknown;
  }>;
  label?: string;
};

export const CustomAreaChart: React.FC<CustomChartProps> = ({
  yearData,
  threeMonthData,
  controls = false,
  card = false,
  variant = "auto",
  containerClassName = "",
}) => {
  const [view, setView] = useState<"year" | "month">("year");
  const [currency, setCurrency] = useState<"USD" | "UAH">("UAH");
  const raw = view === "year" ? yearData : threeMonthData;
  const data = raw.map((d) => ({
    date: d.date,
    value: currency === "USD" ? d.price_usd : d.price,
  }));
  const displayed = data.slice(0, 5);
  const minIndex = displayed.reduce(
    (bestIdx, item, idx, arr) =>
      item.value < arr[bestIdx].value ? idx : bestIdx,
    0
  );

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isWide = width >= 1024;

  // --- CHART TYPE ---
  const isMobile = width < 768;
  const useBar = variant === "bar" || (variant === "auto" && isMobile);

  const controlsClass = card
    ? "flex flex-col space-y-[15px]"
    : "flex flex-col space-y-[15px] sm:flex-row sm:space-x-2 sm:space-y-0";

  const Controls = (
    <div className={controlsClass}>
      <ToggleSwitch
        options={["year", "month"]}
        displayValues={["1 рік", "3 м"]}
        onChange={setView}
        size={card ? "compact" : "default"}
        className={card ? "w-full" : ""}
      />
      <ToggleSwitch
        options={["USD", "UAH"]}
        displayValues={["USD", "UAH"]}
        onChange={setCurrency}
        size={card ? "compact" : "default"}
        className={card ? "w-full" : ""}
      />
    </div>
  );

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{`${payload[0].value.toLocaleString()} грн ${label}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {controls && (card || !isWide) && <div className="mb-5">{Controls}</div>}
      <div
        className={` flex flex-col  
    bg-white rounded-[5px]  overflow-hidden
    ${
      card
        ? "border h-[90px] md:h-[115px]"
        : "border-2  p-4 h-[370px] lg:h-[400px]"
    }
    ${containerClassName}
  `}
      >
        {controls && !card && isWide && <div className="mb-4">{Controls}</div>}
        <div className="flex-1  min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            {useBar ? (
              <BarChart
                data={displayed}
                margin={{ top: 10, right: 0, left: -50, bottom: 0 }}
                barCategoryGap="0%"
                barSize={36}
                barGap={0}
                className="w-full h-full"
              >
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                  height={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                  domain={[0, "dataMax"]}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={false}
                  offset={0}
                />
                <Bar dataKey="value">
                  {displayed.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={idx === minIndex ? "#9E9E9E" : "#BEE6CF"}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart
                data={data}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeLinecap="butt"
                  stroke="#e0e0e0"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                  height={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={10}
                  tickCount={4}
                  domain={["dataMin", "dataMax"]}
                  tick={({ x, y, payload }) => {
                    return (
                      <text
                        x={x + 0}
                        y={y}
                        dy={-4}
                        textAnchor="start"
                        fontSize={16}
                        fill="#000"
                      >
                        {payload.value.toLocaleString()}
                      </text>
                    );
                  }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#333",
                    strokeWidth: 1,
                    strokeDasharray: "5,5",
                  }}
                  isAnimationActive={false}
                  offset={-60}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00C853"
                  strokeWidth={2}
                  fill="#00C85333"
                  fillOpacity={0.8}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

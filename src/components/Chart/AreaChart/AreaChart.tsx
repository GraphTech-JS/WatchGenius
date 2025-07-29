"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styles from "./AreaChart.module.css";
import { useState } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { DataPoint } from "@/mock/data";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    [key: string]: unknown;
  }>;
  label?: string;
  currency?: "USD" | "UAH";
};

const CustomTooltip = ({
  active,
  payload,
  label,
  currency,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p>{`${payload[0].value.toLocaleString()} ${
          currency === "UAH" ? "грн" : "USD"
        } ${label}`}</p>
      </div>
    );
  }
  return null;
};

export const CustomAreaChart = ({
  controls,
  yearData,
  threeMonthData,
}: {
  controls?: boolean;
  yearData: DataPoint[];
  threeMonthData: DataPoint[];
}) => {
  const [activeView, setActiveView] = useState<"year" | "month">("year");
  const [currency, setCurrency] = useState<"USD" | "UAH">("UAH");

  const data = activeView === "year" ? yearData : threeMonthData;

  const formattedData = data.map((item) => ({
    ...item,
    value: currency === "USD" ? item.price_usd : item.price,
  }));
  return (
    <>
      {controls && (
        <div className={styles.controlButtonsMob}>
          <ToggleSwitch
            options={["year", "month"]}
            onChange={setActiveView}
            displayValues={["1 рік", "3 м"]}
          />
          <ToggleSwitch
            options={["USD", "UAH"]}
            onChange={setCurrency}
            displayValues={["USD", "UAH"]}
          />
        </div>
      )}
      <div className={controls ? styles.containerControls : styles.container}>
        {controls && (
          <div className={styles.controlButtons}>
            <ToggleSwitch
              options={["year", "month"]}
              onChange={setActiveView}
              displayValues={["1 рік", "3 м"]}
            />
            <ToggleSwitch
              options={["USD", "UAH"]}
              onChange={setCurrency}
              displayValues={["USD", "UAH"]}
            />
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            className={styles.chart}
            margin={{
              top: 30,
              right: 0,
              left: 0,
              bottom: 0,
            }}
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
            />
            <YAxis
              domain={[1000, 4000]}
              ticks={[1000, 2000, 3000, 4000]}
              axisLine={false}
              tickLine={false}
              width={10}
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
              content={<CustomTooltip currency={currency} />}
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
        </ResponsiveContainer>
      </div>
    </>
  );
};

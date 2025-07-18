"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./PieChart.module.css";

const data = [
  { name: "Segment1", value: 80 },
  { name: "Segment2", value: 20 },
];

const COLORS = ["#ffffff", "#000000"];

type PieLabelProps = {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
};

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle! * RADIAN);
  const y = cy + radius * Math.sin(-midAngle! * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={percent === 0.8 ? "#000000" : "#ffffff"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="16"
      fontWeight="500"
    >
      {`${(percent! * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Component() {
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width={307} height={307}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              stroke="#000000"
              strokeWidth={1}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

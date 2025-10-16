"use client";
import React from "react";

export interface LineChartProps {
  data: number[];
  variant?: "green" | "orange" | "red" | "overall";
  id?: string;
  height?: number;
  width?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  variant = "green",
  id = "chartGradient",
  height = 80,
  width = 300,
}) => {
  if (data.length === 0) return null;
  const padding = 0;

  const colorSchemes = {
    green: { fill: "#D2F7D0", line: "#B4E1C7" },
    orange: { fill: "#EED09D", line: "#E3C980" },
    red: { fill: "#F4CBC7", line: "#FFD0D0" },
    overall: { fill: "#D2F7D0", line: "#B4E1C7" },
  };

  const { fill: fillColor, line: lineColor } = colorSchemes[variant];

  // const base = data[0];
  // const normalized = data.map((d) => d - base);

  const min = Math.min(...data);
  const max = Math.max(...data);

  const topPadding = 0.05;
  const bottomPadding = 0.6;

  const range = max - min || 1;
  const top = max + range * topPadding;
  const bottom = min - range * bottomPadding;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d - bottom) / (top - bottom)) * (height - padding * 2);
    return [x, y];
  });

  const generateSmoothPath = (pts: number[][]) => {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
    }
    return d;
  };

  const path = generateSmoothPath(points);

  const fillPath =
    path +
    ` L${points[points.length - 1][0]},${height}` +
    ` L${points[0][0]},${height} Z`;

  const gradientId = `${id}-${variant}`;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="1" />
          <stop offset="50%" stopColor={fillColor} stopOpacity="0.8" />
          <stop offset="80%" stopColor={fillColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={fillPath} fill={`url(#${gradientId})`} />

      <path
        d={path}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

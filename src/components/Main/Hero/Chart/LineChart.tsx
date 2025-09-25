"use client";
import React from "react";

interface LineChartProps {
  data: number[];
  color?: string;
  id?: string;
  height?: number;
  width?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  color = "#D2F7D0",
  id = "chartGradient",
  height = 80,
  width = 300,
}) => {
  if (data.length === 0) return null;
  const padding = 0;

  const base = data[0];
  const normalized = data.map((d) => d - base);

  const max = Math.max(...normalized);
  const min = Math.min(...normalized);

  const range = max - min || 1;
  const top = max + range * 0.3;
  const bottom = min - range * 0.3;

  const points = normalized.map((d, i) => {
    const x = (i / (normalized.length - 1)) * (width - padding * 2) + padding;
    const y =
      height -
      padding -
      ((d - bottom) / (top - bottom)) * (height - padding * 2);
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
    ` L${points[points.length - 1][0]},${height - padding}` +
    ` L${points[0][0]},${height - padding} Z`;

  const gradientId = `${id}-${color.replace("#", "")}`;
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="60%" stopColor={color} stopOpacity="0.3" />
          <stop offset="90%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={fillPath} fill={`url(#${gradientId})`} />
    </svg>
  );
};

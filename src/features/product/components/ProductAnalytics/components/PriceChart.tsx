'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartArea,
} from 'chart.js';
import type { Chart, ChartOptions, TooltipItem, TooltipModel } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './PriceChart.module.css';
import { ApiPriceHistory } from '@/interfaces/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  period: '3M' | '1P';
  onPeriodChange: (period: '3M' | '1P') => void;
  priceHistory?: ApiPriceHistory[];
  currency?: string;
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
  gradient.addColorStop(0, '#AB0000');
  gradient.addColorStop(0.35, '#D97706');
  gradient.addColorStop(0.5, '#38D95B');
  gradient.addColorStop(1, '#04694F');
  return gradient;
}

function processPriceHistory(
  priceHistory: ApiPriceHistory[] | undefined,
  period: '3M' | '1P'
): { labels: string[]; prices: number[] } {
  if (!priceHistory || priceHistory.length === 0) {
    return {
      labels: [],
      prices: [],
    };
  }

  const sorted = [...priceHistory].sort(
    (a, b) =>
      new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  );

  const now = new Date();
  let startDate: Date;

  if (period === '3M') {
    startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() - 3);
  } else {
    startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() - 1);
  }

  const filtered = sorted.filter((item) => {
    const itemDate = new Date(item.recordedAt);
    return itemDate >= startDate && itemDate <= now;
  });

  const dataToUse = filtered.length > 0 ? filtered : sorted;

  const labels: string[] = [];
  const prices: number[] = [];

  dataToUse.forEach((item) => {
    const date = new Date(item.recordedAt);
    const day = date.getDate();
    const month = date.getMonth() + 1; // 1-12

    // Для 3M показуємо місяць і день, для 1P - тільки день
    if (period === '3M') {
      // Формат: "1.09сер." (день.місяцьсер.)
      labels.push(`${day}.${month}сер.`);
    } else {
      // Формат: "1сер." (деньсер.)
      labels.push(`${day}сер.`);
    }
    prices.push(item.price);
  });

  return { labels, prices };
}

const PriceChart: React.FC<PriceChartProps> = ({
  period,
  onPeriodChange,
  priceHistory,
  currency,
}) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const chartData = useMemo(() => {
    const processed = processPriceHistory(priceHistory, period);

    if (processed.labels.length === 0 || processed.prices.length === 0) {
      return {
        labels: Array.from({ length: 27 }, (_, i) => `${i + 1}сер.`),
        datasets: [
          {
            data: [
              3000, 5500, 8000, 7500, 10000, 9500, 11000, 13000, 15500, 18000,
              20000, 21000, 21500, 21000, 18500, 19500, 20000, 21000, 21500,
              19000, 20500, 21800, 22000, 22500, 23000, 23200, 24000,
            ],
            borderWidth: 3,
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointBackgroundColor: '#38D95B',
            pointHoverRadius: 8,
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: 2,
          },
        ],
      };
    }

    return {
      labels: processed.labels,
      datasets: [
        {
          data: processed.prices,
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointBackgroundColor: '#38D95B',
          pointHoverRadius: 8,
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
        },
      ],
    };
  }, [priceHistory, period]);

  const hoverLinePlugin = {
    id: 'hoverLine',
    afterDraw: (chart: Chart) => {
      if (chart.tooltip?.getActiveElements()?.length) {
        const activeElement = chart.tooltip.getActiveElements()[0];
        const { ctx } = chart;
        const x = activeElement.element.x;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, bottomY);
        ctx.lineTo(x, activeElement.element.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const externalTooltipHandler = (context: {
    chart: Chart;
    tooltip: TooltipModel<'line'>;
  }) => {
    const { chart, tooltip } = context;

    const containerElement = chart.canvas.parentNode as HTMLElement;
    if (!containerElement) return;

    let tooltipEl = containerElement.querySelector(
      'div[data-tooltip-id]'
    ) as HTMLElement;

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.setAttribute('data-tooltip-id', 'chartjs-tooltip');
      tooltipEl.className = styles.tooltip;
      containerElement.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      tooltipEl.style.visibility = 'hidden';
      return;
    }

    const title = tooltip.title || [];
    const body = tooltip.body.map((b: { lines: string[] }) => b.lines);
    tooltipEl.innerHTML = `
      <div class="${styles.tooltipDate}">${title[0]}</div>
      <div class="${styles.tooltipPrice}">${body[0][0]}</div>
    `;

    const activeElement = tooltip.dataPoints?.[0];
    if (!activeElement) {
      tooltipEl.style.opacity = '0';
      tooltipEl.style.visibility = 'hidden';
      return;
    }

    const pointX = activeElement.element.x;

    const chartArea = chart.chartArea;
    const chartWidth = chartArea.right - chartArea.left;
    const pointXInChartArea = pointX - chartArea.left;
    const isRightEdge = pointXInChartArea > chartWidth * 0.7;

    const tooltipWidth = 122;
    const margin = 15;
    const containerWidth = containerElement.offsetWidth;

    const tooltipRightEdge = pointX + tooltipWidth + margin;
    const wouldOverflowRight = tooltipRightEdge > containerWidth - 20;
    const tooltipLeftEdge = pointX - tooltipWidth - margin;
    const wouldOverflowLeft = tooltipLeftEdge < 10;

    tooltipEl.style.position = 'absolute';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.zIndex = '9999';
    tooltipEl.style.margin = '0';
    tooltipEl.style.padding = '0';
    tooltipEl.style.opacity = '1';
    tooltipEl.style.visibility = 'visible';

    if (isRightEdge || wouldOverflowRight) {
      tooltipEl.style.left = wouldOverflowLeft
        ? '10px'
        : tooltipLeftEdge + 'px';
    } else {
      tooltipEl.style.left = pointX + margin + 'px';
    }

    tooltipEl.style.top = '171px';
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
        position: 'nearest',
        intersect: false,
        mode: 'index',
        callbacks: {
          title: (context: TooltipItem<'line'>[]) => {
            const label = context[0].label;

            if (priceHistory && priceHistory.length > 0) {
              const sorted = [...priceHistory].sort(
                (a, b) =>
                  new Date(a.recordedAt).getTime() -
                  new Date(b.recordedAt).getTime()
              );

              let foundItem: ApiPriceHistory | undefined;

              if (period === '3M') {
                const parts = label.replace('сер.', '').split('.');
                if (parts.length === 2) {
                  const day = parseInt(parts[0]);
                  const month = parseInt(parts[1]);
                  foundItem = sorted.find((item) => {
                    const date = new Date(item.recordedAt);
                    return (
                      date.getDate() === day && date.getMonth() + 1 === month
                    );
                  });
                }
              } else {
                const day = parseInt(label.replace('сер.', '').trim());
                foundItem = sorted.find((item) => {
                  const date = new Date(item.recordedAt);
                  return date.getDate() === day;
                });
              }

              if (foundItem) {
                const date = new Date(foundItem.recordedAt);
                return `${date.getFullYear()}-${String(
                  date.getMonth() + 1
                ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              }
            }

            return label.replace('сер.', '').trim();
          },
          label: (context: TooltipItem<'line'>) => {
            const currencySymbol =
              currency === 'USD' ? '$' : currency === 'UAH' ? '₴' : '€';
            return `${currencySymbol} ${
              context.parsed.y?.toLocaleString('de-DE') ?? 0
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: true,
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0.08)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.5)',
          font: { size: 12, family: 'Inter' },
          padding: 10,
          maxTicksLimit: 7,
        },
        border: {
          dash: [5, 5],
          width: 1,
          color: 'rgba(77, 77, 77, 0.2)',
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0.08)',
        },
        ticks: {
          callback: (value) => {
            const currencySymbol =
              currency === 'USD' ? '$' : currency === 'UAH' ? '₴' : '€';
            return `${currencySymbol}${Number(value) / 1000}k`;
          },
          color: 'rgba(0, 0, 0, 0.5)',
          font: { size: 12, family: 'Inter' },
          padding: 10,
          maxTicksLimit: 5,
        },
        border: {
          dash: [5, 5],
          width: 1,
          color: 'rgba(77, 77, 77, 0.2)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !chart.chartArea) return;

    const chartDataWithGradient = {
      ...chartData,
      datasets: chartData.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    chart.data = chartDataWithGradient;
    chart.update();
  }, [period, chartData]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartControls}>
        <button
          className={`${styles.chartButton} ${
            period === '3M' ? styles.active : ''
          }`}
          onClick={() => onPeriodChange('3M')}
        >
          3M
        </button>
        <button
          className={`${styles.chartButton} ${
            period === '1P' ? styles.active : ''
          }`}
          onClick={() => onPeriodChange('1P')}
        >
          1P
        </button>
      </div>
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        plugins={[hoverLinePlugin]}
      />
    </div>
  );
};

export default PriceChart;

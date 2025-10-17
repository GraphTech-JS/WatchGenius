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
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
  gradient.addColorStop(0, '#AB0000');
  gradient.addColorStop(0.35, '#D97706');
  gradient.addColorStop(0.5, '#38D95B');
  gradient.addColorStop(1, '#04694F');
  return gradient;
}

const PriceChart: React.FC<PriceChartProps> = ({ period, onPeriodChange }) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const data = useMemo(
    () => ({
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
          tension: 0.4,
          pointRadius: 0,
          pointBackgroundColor: '#38D95B',
          pointHoverRadius: 8,
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
        },
      ],
    }),
    []
  );

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
    let tooltipEl = chart.canvas.parentNode?.querySelector(
      'div[data-tooltip-id]'
    ) as HTMLElement;

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.setAttribute('data-tooltip-id', 'chartjs-tooltip');
      tooltipEl.className = styles.tooltip;
      chart.canvas.parentNode?.appendChild(tooltipEl);
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }
    const title = tooltip.title || [];
    const body = tooltip.body.map((b: { lines: string[] }) => b.lines);

    tooltipEl.innerHTML = `
      <div class="${styles.tooltipDate}">${title[0]}</div>
      <div class="${styles.tooltipPrice}">${body[0][0]}</div>
    `;

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 15 + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 20 + 'px';
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
          title: (context: TooltipItem<'line'>[]) =>
            `2025-09-${context[0].label.replace('сер.', '').padStart(2, '0')}`,
          label: (context: TooltipItem<'line'>) =>
            `€ ${context.parsed.y?.toLocaleString('de-DE') ?? 0}`,
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
        beginAtZero: true,
        grid: {
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0.08)',
        },
        ticks: {
          callback: (value) => `€${Number(value) / 1000}k`,
          stepSize: 7000,
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
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    chart.data = chartDataWithGradient;
    chart.update();
  }, [period, data]);

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
        data={data}
        options={options}
        plugins={[hoverLinePlugin]}
      />
    </div>
  );
};

export default PriceChart;

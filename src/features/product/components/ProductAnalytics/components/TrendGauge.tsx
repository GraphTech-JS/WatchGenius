'use client';

import React from 'react';
import type { StaticImageData } from 'next/image';

type ImgSrc = string | StaticImageData;

type GaugeConfig = {
  // Геометрія
  pivotYR: number; // де знаходиться вісь обертання по висоті
  labelsYR: number; // Y для Low/High
  valueYR: number; // Y для % значення
  lastUpdatedYR: number; // Y для "Актуально на ..."

  // Позиції по X для Low/Hight (як частка ширини)
  labelsLeftXR: number; // 0..1, де малюємо "Low"
  labelsRightXR: number; // 0..1, де малюємо "Hight"

  // Стрілка
  pointerWidthR: number; // ширина стрілки відносно висоти контейнера
  pointerHeightR: number; // висота стрілки відносно висоти контейнера
  pointerAnchorX: number; // якір PNG (0..1) по X
  pointerAnchorY: number; // якір PNG (0..1) по Y
  pointerOffsetX: number; // дрібна підгонка (px)
  pointerOffsetY: number;

  // Центр (кнопка)
  centerSizeR: number;
  centerOffsetYR: number;

  // Стилі
  fontFamily: string;
  labelFontSizePx?: number; // якщо не вказано — рахуємо від висоти
  labelFontWeight: number;
  labelColor: string;

  valueFontSizePx?: number;
  valueColor: string;

  lastUpdatedFontSizePx?: number;
  lastUpdatedColor: string;
};

type TrendGaugeProps = {
  value: number; // 0–100
  arcSrc: ImgSrc;
  pointerSrc: ImgSrc;
  centerSrc: ImgSrc;
  lastUpdated?: string;
  className?: string;

  // Розміри контейнера — повинні відповідати твоєму CSS
  width: number; // 372 або 310
  height: number; // 338 або 281

  config?: Partial<GaugeConfig>;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}
function getHref(src: ImgSrc) {
  return typeof src === 'string' ? src : src.src;
}

// Базовий конфіг під твій макет (підігнано під другий скрін)
const defaultConfig: GaugeConfig = {
  // Геометрія
  pivotYR: 0.69, // вісь обертання
  labelsYR: 0.825, // Low/Hight трохи нижче дуги
  valueYR: 0.8, // % посередині, нижче центру
  lastUpdatedYR: 0.94,

  // По X — ближче до країв дуги, не притискаючи до самого краю
  labelsLeftXR: 0.14, // 14% ширини
  labelsRightXR: 0.86, // 86% ширини

  // Стрілка (значення під твою PNG)
  pointerWidthR: 58 / 338,
  pointerHeightR: 111 / 338,
  // Якщо твій ручний тюн працює — можна передати через props і переважити:
  pointerAnchorX: 0.468, // базовий якір; твій кастом нижче в ProductAnalytics
  pointerAnchorY: 0.915,
  pointerOffsetX: 1,
  pointerOffsetY: -1,

  // Кнопка-еліпс
  centerSizeR: 29 / 338,
  centerOffsetYR: 0,

  // Стилі (за замовчуванням як у вимозі)
  fontFamily: "'Inter', sans-serif",
  labelFontSizePx: undefined, // по замовчуванню вирахуємо від висоти
  labelFontWeight: 600,
  labelColor: '#000',

  valueFontSizePx: undefined,
  valueColor: '#04694f',

  lastUpdatedFontSizePx: undefined,
  lastUpdatedColor: 'rgba(0,0,0,0.6)',
};

const TrendGauge: React.FC<TrendGaugeProps> = ({
  value,
  arcSrc,
  pointerSrc,
  centerSrc,
  lastUpdated,
  className,
  width,
  height,
  config,
}) => {
  const v = clamp(Number(value) || 0);
  const angle = -90 + (v / 100) * 180;

  const vbW = width;
  const vbH = height;
  const cx = vbW / 2;

  const cfg = { ...defaultConfig, ...(config || {}) };

  // Геометрія
  const pivotY = vbH * cfg.pivotYR;

  // Стрілка
  const pointerW = vbH * cfg.pointerWidthR;
  const pointerH = vbH * cfg.pointerHeightR;
  const axPx = pointerW * cfg.pointerAnchorX;
  const ayPx = pointerH * cfg.pointerAnchorY;
  const pointerX = cx - axPx + cfg.pointerOffsetX;
  const pointerY = pivotY - ayPx + cfg.pointerOffsetY;

  // Центр
  const centerSize = vbH * cfg.centerSizeR;
  const centerX = cx - centerSize / 2;
  const centerY = pivotY - centerSize / 2 + cfg.centerOffsetYR * vbH;

  // Тексти
  const labelsY = vbH * cfg.labelsYR;
  const valueY = vbH * cfg.valueYR;
  const lastUpdatedY = vbH * cfg.lastUpdatedYR;

  // Розміри шрифтів (за замовчуванням від висоти контейнера)
  const labelFontSize = cfg.labelFontSizePx ?? Math.round(vbH * 0.059); // ~20px при 338
  const valueFontSize = cfg.valueFontSizePx ?? Math.round(vbH * 0.071); // ~24px при 338
  const lastUpdatedFontSize =
    cfg.lastUpdatedFontSizePx ?? Math.round(vbH * 0.035); // ~12px

  const leftLabelX = vbW * cfg.labelsLeftXR;
  const rightLabelX = vbW * cfg.labelsRightXR;

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        width='100%'
        height='100%'
        role='img'
        aria-label={`Попит ${v}%`}
      >
        {/* Дуга */}
        <image
          href={getHref(arcSrc)}
          x={0}
          y={0}
          width={vbW}
          height={vbH}
          preserveAspectRatio='xMidYMid meet'
        />

        {/* Стрілка */}
        <g
          transform={`rotate(${angle} ${cx} ${pivotY})`}
          style={{ transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
        >
          <image
            href={getHref(pointerSrc)}
            x={pointerX}
            y={pointerY}
            width={pointerW}
            height={pointerH}
            preserveAspectRatio='xMidYMid meet'
          />
        </g>

        {/* Центр поверх стрілки */}
        <image
          href={getHref(centerSrc)}
          x={centerX}
          y={centerY}
          width={centerSize}
          height={centerSize}
          preserveAspectRatio='xMidYMid meet'
        />

        {/* Low / Hight */}
        <text
          x={leftLabelX}
          y={labelsY}
          fontSize={labelFontSize}
          fontWeight={cfg.labelFontWeight}
          fill={cfg.labelColor}
          fontFamily={cfg.fontFamily}
          textAnchor='start'
        >
          Low
        </text>
        <text
          x={rightLabelX}
          y={labelsY}
          fontSize={labelFontSize}
          fontWeight={cfg.labelFontWeight}
          fill={cfg.labelColor}
          fontFamily={cfg.fontFamily}
          textAnchor='end'
        >
          Hight
        </text>

        {/* Відсоток */}
        <text
          x={cx}
          y={valueY}
          fontSize={valueFontSize}
          fontWeight={700}
          fill={cfg.valueColor}
          fontFamily={cfg.fontFamily}
          textAnchor='middle'
        >
          {v}%
        </text>

        {/* Актуальність */}
        {lastUpdated && (
          <text
            x={cx}
            y={lastUpdatedY}
            fontSize={lastUpdatedFontSize}
            fill={cfg.lastUpdatedColor}
            fontFamily={cfg.fontFamily}
            textAnchor='middle'
          >
            Актуально на {lastUpdated}
          </text>
        )}
      </svg>
    </div>
  );
};

export default TrendGauge;

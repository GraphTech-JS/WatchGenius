'use client';

import React from 'react';
import type { StaticImageData } from 'next/image';

type ImgSrc = string | StaticImageData;

type GaugeConfig = {
  pivotYR: number;
  labelsYR: number;
  valueYR: number;
  lastUpdatedYR: number;

  labelsLeftXR: number;
  labelsRightXR: number;

  pointerWidthR: number;
  pointerHeightR: number;
  pointerAnchorX: number;
  pointerAnchorY: number;
  pointerOffsetX: number;
  pointerOffsetY: number;

  centerSizeR: number;
  centerOffsetYR: number;

  fontFamily: string;
  labelFontSizePx?: number;
  labelFontWeight: number;
  labelColor: string;

  valueFontSizePx?: number;
  valueColor: string;

  lastUpdatedFontSizePx?: number;
  lastUpdatedColor: string;
};

type TrendGaugeProps = {
  value: number;
  arcSrc: ImgSrc;
  pointerSrc: ImgSrc;
  centerSrc: ImgSrc;
  lastUpdated?: string;
  className?: string;

  width: number;
  height: number;

  config?: Partial<GaugeConfig>;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}
function getHref(src: ImgSrc) {
  return typeof src === 'string' ? src : src.src;
}

const defaultConfig: GaugeConfig = {
  pivotYR: 0.69,
  labelsYR: 0.825,
  valueYR: 0.8,
  lastUpdatedYR: 0.94,

  labelsLeftXR: 0.14,
  labelsRightXR: 0.86,

  pointerWidthR: 58 / 338,
  pointerHeightR: 111 / 338,
  pointerAnchorX: 0.468,
  pointerAnchorY: 0.915,
  pointerOffsetX: 1,
  pointerOffsetY: -1,

  centerSizeR: 29 / 338,
  centerOffsetYR: 0,

  fontFamily: "'Inter', sans-serif",
  labelFontSizePx: undefined,
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
  const v = Math.round(clamp(Number(value) || 0) * 10) / 10;
  const angle = -120 + (v / 100) * 180;
  const vbW = width;
  const vbH = height;
  const cx = vbW / 2;
  const cfg = { ...defaultConfig, ...(config || {}) };

  const pivotY = vbH * cfg.pivotYR;

  const pointerW = vbH * cfg.pointerWidthR;
  const pointerH = vbH * cfg.pointerHeightR;
  const axPx = pointerW * cfg.pointerAnchorX;
  const ayPx = pointerH * cfg.pointerAnchorY;
  const pointerX = cx - axPx + cfg.pointerOffsetX;
  const pointerY = pivotY - ayPx + cfg.pointerOffsetY;

  const centerSize = vbH * cfg.centerSizeR;
  const centerX = cx - centerSize / 2;
  const centerY = pivotY - centerSize / 2 + cfg.centerOffsetYR * vbH;

  const labelsY = vbH * cfg.labelsYR;
  const valueY = vbH * cfg.valueYR;
  const lastUpdatedY = vbH * cfg.lastUpdatedYR;

  const labelFontSize = cfg.labelFontSizePx ?? Math.round(vbH * 0.059);
  const valueFontSize = cfg.valueFontSizePx ?? Math.round(vbH * 0.071);
  const lastUpdatedFontSize =
    cfg.lastUpdatedFontSizePx ?? Math.round(vbH * 0.035);

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
        <image
          href={getHref(arcSrc)}
          x={0}
          y={0}
          width={vbW}
          height={vbH}
          preserveAspectRatio='xMidYMid meet'
        />

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

        <image
          href={getHref(centerSrc)}
          x={centerX}
          y={centerY}
          width={centerSize}
          height={centerSize}
          preserveAspectRatio='xMidYMid meet'
        />

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

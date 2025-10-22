'use client';
export function BackdropDistortionDefs() {
  return (
    <svg
      aria-hidden='true'
      focusable='false'
      width='0'
      height='0'
      style={{ position: 'fixed', width: 0, height: 0 }}
    >
      <filter
        id='headerDistortion'
        x='-20%'
        y='-50%'
        width='140%'
        height='200%'
      >
        <feTurbulence
          type='turbulence'
          baseFrequency='0.008 0.12'
          numOctaves='1'
          seed='7'
          result='noise'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='noise'
          scale='10'
          xChannelSelector='R'
          yChannelSelector='G'
        />
      </filter>
    </svg>
  );
}

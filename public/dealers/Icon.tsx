import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export const DetailsIcon = (props: Props) => (
  <svg
    viewBox="0 0 38 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26.5632 1H36.7715V12.0833M34.584 3.375L23.6465 15.25M19.2715 4.16667H6.14648C4.98616 4.16667 3.87336 4.66711 3.05289 5.55791C2.23242 6.44871 1.77148 7.65689 1.77148 8.91667V34.25C1.77148 35.5098 2.23242 36.718 3.05289 37.6088C3.87336 38.4996 4.98616 39 6.14648 39H29.4798C30.6401 39 31.7529 38.4996 32.5734 37.6088C33.3939 36.718 33.8548 35.5098 33.8548 34.25V20"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LetterIcon = (props: Props) => (
  <svg
    viewBox="0 0 35 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31.3715 0H4.17148C2.30148 0 0.788484 1.575 0.788484 3.5L0.771484 24.5C0.771484 26.425 2.30148 28 4.17148 28H31.3715C33.2415 28 34.7715 26.425 34.7715 24.5V3.5C34.7715 1.575 33.2415 0 31.3715 0ZM31.3715 7L17.7715 15.75L4.17148 7V3.5L17.7715 12.25L31.3715 3.5V7Z"
      fill="#currentColor"
    />
  </svg>
);

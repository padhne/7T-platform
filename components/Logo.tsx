import React from 'react';

type LogoProps = {
  className?: string;
  /** Color of the back "T" — defaults to brand charcoal; use white on dark backgrounds. */
  tColor?: string;
};

// Vector trace of the 7T brand mark (orange "7" overlapping a charcoal "T").
export default function Logo({ className = 'h-10 w-auto', tColor = '#232323' }: LogoProps) {
  return (
    <svg viewBox="0 70 1350 1022" className={className} role="img" aria-label="7T logo" xmlns="http://www.w3.org/2000/svg">
      <polygon fill={tColor} points="708,74 1345,74 1219,333 880,333 543,1087 338,1088 775,180 652,180" />
      <polygon fill="#FF6200" points="122,180 775,180 338,1088 66,1088 377,427 5,427" />
    </svg>
  );
}

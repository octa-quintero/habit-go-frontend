import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const FireIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <path
        d="M13 1h-2v2H9v2H7v2H5v2H3v2H1v2h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h-2V9h-2V7h-2V5h-2V3h-2V1zm0 2v2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3v-2h2V9h2V7h2V5h2V3h2zm0 4h-2v6h2V7zm0 8h-2v2h2v-2z"
        fill={color}
      />
    </svg>
  );
};

export const PlantIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <path
        d="M10 2h4v2h-4V2zm2 4V4h2v2h-2zm0 2h2v2h-2V8zm2 0h2V6h-2v2zm2 0v2h2V8h-2zm-4 2v2h2v-2h-2zm-2 0h2v2h-2v-2zm0 0V8H8v2h2zm-2 2v2h2v-2H8zm-2 0H4v2h2v-2zm10 0v2h2v-2h-2zm-4 2v2h2v-2h-2zm0 0h-2v-2h2v2zm2 4h-4v2H8v2h8v-2h-2v-2z"
        fill={color}
      />
    </svg>
  );
};

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill={color}
      />
    </svg>
  );
};

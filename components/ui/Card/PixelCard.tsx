import React from 'react';

export interface PixelCardProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
}

const BASE_WIDTH = 900;
const BASE_HEIGHT = 700;

const PixelCard: React.FC<PixelCardProps> = ({
  children,
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-[900px] h-auto min-h-[400px] sm:min-h-[700px] ${className}`}
      style={{
        background: `url('/card/card.png') no-repeat center/contain`,
        imageRendering: 'pixelated',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};

export default PixelCard;

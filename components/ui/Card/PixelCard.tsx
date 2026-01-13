/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  /** Gap entre elementos hijos (clase Tailwind) */
  gap?: string;
}

const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className = '',
  gap = 'gap-6',
}) => {
  return (
    <div 
      className={`relative mx-auto ${className}`}
      style={{
        width: '900px',
        maxWidth: '90vw',
        aspectRatio: '900 / 700',
      }}
    >
      {/* Imagen de fondo que llena el card */}
      <img
        src="/card/card.png"
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        draggable={false}
      />
      
      {/* Contenido con scroll si excede el tamaño */}
      <div 
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden mb-6 ${gap}`}
        style={{
          padding: '10% 10% 14% 10%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PixelCard;

/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface PixelCardMobileProps {
  children: React.ReactNode;
  className?: string;
  /** Gap entre elementos hijos (clase Tailwind) */
  gap?: string;
}

const PixelCardMobile: React.FC<PixelCardMobileProps> = ({
  children,
  className = '',
  gap = 'gap-4',
}) => {
  return (
    <div 
      className={`relative mx-auto ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: '100%',
      }}
    >
      {/* Imagen de fondo mobile que llena el card */}
      <img
        src="/card/card-mobile.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        draggable={false}
      />
      
      {/* Contenido con scroll si excede el tamaño */}
      <div 
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden ${gap}`}
        style={{
          padding: '8% 15% 20% 15%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PixelCardMobile;

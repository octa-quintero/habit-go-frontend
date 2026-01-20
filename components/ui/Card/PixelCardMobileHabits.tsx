/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface PixelCardMobileHabitsProps {
  children: React.ReactNode;
  className?: string;
  /** Gap entre elementos hijos (clase Tailwind) */
  gap?: string;
}

const PixelCardMobileHabits: React.FC<PixelCardMobileHabitsProps> = ({
  children,
  className = '',
  gap = 'gap-2',
}) => {
  return (
    <div 
      className={`relative mx-auto sm:hidden w-full ${className}`}
      style={{
        width: '100%',
        height: 'auto',
        minHeight: 'auto',
        maxWidth: '100%',
        backgroundImage: 'url(/card/card-mobile.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    >
      {/* Contenido con scroll si excede el tamaño */}
      <div 
        className={`relative z-10 w-full flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden ${gap}`}
        style={{
          padding: '8% 5% 12% 5%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PixelCardMobileHabits;

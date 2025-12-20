
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';

export interface SpriteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

// Rutas de los sprites para los dos estados
const SPRITE_NORMAL = '/button/button 1.png';
const SPRITE_ACTIVE = '/button/button 2.png';

const SpriteButton: React.FC<SpriteButtonProps> = ({ label, icon, className = '', ...props }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      className={`group relative flex items-center justify-center w-full h-full select-none border-none outline-none bg-transparent overflow-hidden ${className}`}
      style={{ minWidth: 180, minHeight: 60, maxWidth: 400, maxHeight: 90 }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      {...props}
    >
      <img
        src={pressed ? SPRITE_ACTIVE : SPRITE_NORMAL}
        alt="Botón retro"
        className="absolute left-0 top-0 w-full h-full object-contain pointer-events-none"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        draggable={false}
      />
      <span className="relative z-10 flex flex-col sm:flex-row items-center gap-2 w-full h-full justify-center font-press-start text-[0.6rem] sm:text-xs text-black px-2 wrap-break-word text-center overflow-hidden max-w-full">
        <span className="relative z-10 flex flex-col sm:flex-row items-center gap-2 w-full h-full justify-center font-press-start text-[0.6rem] sm:text-xs text-black px-2 wrap-break-word text-center overflow-hidden max-w-full transition-opacity duration-100 group-active:opacity-60 group-active:translate-y-[7px]">
        {icon && <span className="flex items-center justify-center shrink-0 max-w-10 max-h-10">{icon}</span>}
        <span className="wrap-break-word text-center w-full overflow-hidden max-w-full leading-tight font-bold">
          {(() => {
            if (typeof label === 'string' && label.trim().toLowerCase() === 'iniciar sesión') {
              return (<>
                Iniciar<br />Sesión
              </>);
            }
            return label;
          })()}
        </span>
      </span>
      </span>
    </button>
  );
};

export default SpriteButton;

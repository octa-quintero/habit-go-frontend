/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';

export interface SpriteButtonBlackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const SPRITE_NORMAL = '/button/button black 1.png';
const SPRITE_ACTIVE = '/button/button black 2.png';


const SpriteButtonBlack: React.FC<SpriteButtonBlackProps> = ({ label, icon, className = '', ...props }) => {
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
        alt="Botón retro negro"
        className="absolute left-0 top-0 w-full h-full object-contain pointer-events-none"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        draggable={false}
      />
        <span className="relative z-10 flex flex-row items-center gap-0 w-full h-full justify-center font-press-start text-[0.55rem] sm:text-[0.6rem] text-white px-0 wrap-break-word text-center overflow-hidden max-w-full font-bold transition-opacity duration-100 group-active:opacity-60 group-active:translate-y-[9px]">
        <span className=" text-center overflow-hidden leading-tight font-bold">
          {label}
        </span>
        {icon && <span className="flex items-center justify-center shrink-0 max-w-7 max-h-7 ml-1">{icon}</span>}
      </span>
    </button>
  );
};

export default SpriteButtonBlack;

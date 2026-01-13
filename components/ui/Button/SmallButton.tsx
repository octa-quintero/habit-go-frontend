'use client';
import React, { useState } from 'react';

interface SmallButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({ 
  label,
  icon,
  onClick,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  // Elegir el sprite según el estado
  const buttonSprite = isPressed 
    ? '/button/small-button/white-button2.png' 
    : '/button/small-button/white-button1.png';

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img
        src={buttonSprite}
        alt="button"
        style={{
          display: 'block',
          imageRendering: 'pixelated',
          width: '100%',
          height: '100%',
        }}
      />
      {/* Contenido del botón */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon ? icon : label ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              imageRendering: 'pixelated',
            }}
          >
            <path
              d="M18 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2h2v-2h-2v2zm-2 2h2v-2h-2v2zm-2 0v2h2v-2H8zm-2-2h2v2H6v-2zm0 0H4v-2h2v2z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="0.5"
            />
          </svg>
        ) : null}
      </div>
    </button>
  );
};

export default SmallButton;

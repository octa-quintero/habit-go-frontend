'use client';
import React, { useState } from 'react';

interface DeleteButtonProps {
  onClick?: () => void;
  className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ 
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
    ? '/button/small-button/red-button2.png' 
    : '/button/small-button/red-button1.png';

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
        alt="delete button"
        style={{
          display: 'block',
          imageRendering: 'pixelated',
          width: '100%',
          height: '100%',
        }}
      />
      {/* Ícono de basura en pixel art */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          imageRendering: 'pixelated',
        }}
      >
        <path
          d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z"
          fill="#FFFFFF"
        />
      </svg>
    </button>
  );
};

export default DeleteButton;

import React from 'react';

export interface PixelGamingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

// Tamaño base de la imagen del botón (ajustar según el PNG real)
const BASE_WIDTH = 200;
const BASE_HEIGHT = 64;

const PixelGamingButton: React.FC<PixelGamingButtonProps> = ({
  children,
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`font-press-start ${props.className || ''}`}
      style={{
        width,
        height,
        background: `url('/button/Group 2.png') no-repeat center/contain`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        fontSize: '1.2rem',
        color: '#222',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        ...props.style,
      }}
    >
      {children}
    </button>
  );
};

export default PixelGamingButton;

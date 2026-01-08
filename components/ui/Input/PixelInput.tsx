import React, { useState } from 'react';

/**
 * Props del PixelInput
 */
export interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del input */
  label: string;
  /** ID del input */
  id: string;
  /** Nombre del input */
  name: string;
  /** Ancho del label (clase Tailwind o custom) */
  labelWidth?: string;
  /** Tamaño del texto del label */
  labelSize?: string;
  /** Clases adicionales para el contenedor */
  containerClassName?: string;
}

/**
 * PixelInput - Input reutilizable con estilo pixel-art
 * 
 * @example
 * <PixelInput
 *   label="Nombre"
 *   id="name"
 *   name="name"
 *   value={value}
 *   onChange={handleChange}
 * />
 */
const PixelInput: React.FC<PixelInputProps> = ({
  label,
  id,
  name,
  type,
  labelWidth = 'w-40',
  labelSize = 'text-[0.70rem]',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-row items-center gap-2 ${containerClassName}`}>
      <label 
        htmlFor={id} 
        className={`font-press-start ${labelSize} text-black ${labelWidth} shrink-0`}
      >
        {label}
      </label>
      <div className="relative flex-1">
        <input
          id={id}
          name={name}
          type={inputType}
          className={`w-full px-2 py-1 ${isPassword ? 'pr-8' : ''} font-press-start text-[0.6rem] text-black bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors duration-200 p-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixelated">
                <path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixelated">
                <path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PixelInput;

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
  /** Mostrar icono de edición al lado del label */
  showEditIcon?: boolean;
  /** Si el input está en modo editable */
  isEditable?: boolean;
  /** Callback cuando se hace click en el icono de edición */
  onEditClick?: () => void;
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
  showEditIcon = false,
  isEditable = true,
  onEditClick,
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const isDisabled = showEditIcon ? !isEditable : disabled;

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
          disabled={isDisabled}
          className={`w-full px-2 py-1 ${isPassword || showEditIcon ? 'pr-8' : ''} font-press-start text-[0.6rem] text-black bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {showEditIcon && !isPassword && (
          <button
            type="button"
            onClick={onEditClick}
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
              className="shrink-0"
              style={{ imageRendering: 'pixelated' }}
            >
              <path 
                d="M18 2h-2v2h2V2zM4 4h6v2H4v14h14v-6h2v8H2V4h2zm4 8H6v6h6v-2h2v-2h-2v2H8v-4zm4-2h-2v2H8v-2h2V8h2V6h2v2h-2v2zm2-6h2v2h-2V4zm4 0h2v2h2v2h-2v2h-2v2h-2v-2h2V8h2V6h-2V4zm-4 8h2v2h-2v-2z" 
                fill="#000000"
              />
            </svg>
          </button>
        )}
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

import React from 'react';

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
  labelWidth = 'w-40',
  labelSize = 'text-[0.70rem]',
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${containerClassName}`}>
      <label 
        htmlFor={id} 
        className={`font-press-start ${labelSize} text-black ${labelWidth} shrink-0`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`flex-1 px-2 py-1 font-press-start text-[0.6rem] text-black bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
    </div>
  );
};

export default PixelInput;

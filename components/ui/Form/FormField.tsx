import React from 'react';

/**
 * Props del FormField
 */
export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label del campo */
  label: string;
  /** Nombre del campo (usado como id y name) */
  name: string;
  /** Tipo de input */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  /** Valor del campo */
  value: string;
  /** Callback cuando cambia el valor */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Ancho del label (clase Tailwind) */
  labelWidth?: string;
}

/**
 * FormField - Campo de formulario reutilizable estilo pixel-art
 * 
 * @example
 * <FormField 
 *   label="Email"
 *   name="email"
 *   type="email"
 *   value={formData.email}
 *   onChange={handleChange}
 * />
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  className = '',
  labelWidth = 'w-16',
  disabled,
  ...props
}) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      <label 
        htmlFor={name} 
        className={`font-press-start text-[0.45rem] text-black ${labelWidth} shrink-0`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 px-2 py-1 border-4 border-white font-press-start text-[0.5rem] bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-20"
        {...props}
      />
    </div>
  );
};

export default FormField;

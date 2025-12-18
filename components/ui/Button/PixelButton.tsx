import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-green-400 hover:bg-green-500 text-gray-900 border-green-600',
  secondary: 'bg-blue-400 hover:bg-blue-500 text-white border-blue-600',
  accent: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-yellow-600',
  danger: 'bg-red-400 hover:bg-red-500 text-white border-red-600',
  outline: 'bg-transparent hover:bg-gray-100 text-gray-700 border-gray-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        relative font-press-start
        border-4 
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        transition-all duration-100
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        hover:shadow-[4px_4px_0_rgba(0,0,0,0.25)]
        active:translate-x-[2px] active:translate-y-[2px]
        active:shadow-[1px_1px_0_rgba(0,0,0,0.25)]
        flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default PixelButton;

import React from 'react';

/**
 * Props del PixelText
 */
export interface PixelTextProps {
  /** Texto a mostrar (también acepta children) */
  text?: string;
  /** Contenido como children */
  children?: React.ReactNode;
  /** Tamaño del texto: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  /** Color del texto (clase Tailwind) */
  color?: string;
  /** Opacidad del texto (0-1) */
  opacity?: number;
  /** Alineación del texto */
  align?: 'left' | 'center' | 'right';
  /** Ancho máximo (clase Tailwind o número en rem) */
  maxWidth?: string;
  /** Font weight personalizado */
  fontWeight?: number;
  /** Clases CSS adicionales */
  className?: string;
  /** Elemento HTML a renderizar */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * PixelText - Componente de texto reutilizable con fuente pixel-art
 * 
 * @example
 * // Uso básico
 * <PixelText>Texto simple</PixelText>
 * 
 * @example
 * // Con configuración
 * <PixelText 
 *   size="xl"
 *   color="text-primary"
 *   align="center"
 *   opacity={0.8}
 * >
 *   Texto configurado
 * </PixelText>
 * 
 * @example
 * // Como título
 * <PixelText as="h1" size="5xl" fontWeight={700}>
 *   Título Principal
 * </PixelText>
 */
const PixelText: React.FC<PixelTextProps> = ({
  text,
  children,
  size = 'base',
  color = 'text-black',
  opacity = 1,
  align = 'left',
  maxWidth,
  fontWeight,
  className = '',
  as: Component = 'p',
}) => {
  // Mapeo de tamaños a clases Tailwind con responsive
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base sm:text-xl',
    lg: 'text-lg sm:text-2xl',
    xl: 'text-xl sm:text-3xl',
    '2xl': 'text-2xl sm:text-4xl',
    '3xl': 'text-3xl sm:text-5xl',
    '4xl': 'text-4xl sm:text-6xl',
    '5xl': 'text-5xl sm:text-7xl',
  };

  // Mapeo de alineación
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Construir clases dinámicas
  const classes = [
    'font-press-start',
    sizeClasses[size],
    color,
    alignClasses[align],
    maxWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Estilos inline
  const styles: React.CSSProperties = {
    opacity,
    ...(fontWeight && { fontWeight }),
  };

  return (
    <Component className={classes} style={styles}>
      {children || text}
    </Component>
  );
};

export default PixelText;

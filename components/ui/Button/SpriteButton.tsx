
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useMemo, useCallback } from 'react';

/**
 * Props del SpriteButton
 */
export interface SpriteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Texto del botón */
  label: string;
  /** Icono opcional (ReactNode) */
  icon?: React.ReactNode;
  /** Posición del icono: 'left' | 'right' */
  iconPosition?: 'left' | 'right';
  /** Variante del sprite: 'white' | 'black' | 'custom' */
  variant?: 'white' | 'black' | 'custom';
  /** Ruta del sprite normal (estado no presionado) - solo para variant='custom' */
  spriteNormal?: string;
  /** Ruta del sprite activo (estado presionado) - solo para variant='custom' */
  spriteActive?: string;
  /** Color del texto personalizado (sobrescribe el de la variante) */
  textColor?: string;
  /** Tamaño de texto personalizado (sobrescribe el de la variante) */
  textSize?: string;
  /** Ancho mínimo del botón en píxeles */
  minWidth?: number;
  /** Alto mínimo del botón en píxeles */
  minHeight?: number;
  /** Ancho máximo del botón en píxeles */
  maxWidth?: number;
  /** Alto máximo del botón en píxeles */
  maxHeight?: number;
  /** Habilitar wrap automático de texto (saltos de línea inteligentes) */
  autoWrap?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

// Configuración de variantes predefinidas (fuera del componente para evitar recreación)
const VARIANT_CONFIGS = {
  white: {
    spriteNormal: '/button/button 1.png',
    spriteActive: '/button/button 2.png',
    textColor: 'text-black',
    textSize: 'text-[0.6rem] sm:text-xs',
  },
  black: {
    spriteNormal: '/button/button black 1.png',
    spriteActive: '/button/button black 2.png',
    textColor: 'text-white',
    textSize: 'text-[0.55rem] sm:text-[0.6rem]',
  },
} as const;

// Patrones de texto para auto-wrap (fuera del componente)
const AUTO_WRAP_PATTERNS = [
  { regex: /^iniciar\s+sesi[oó]n$/i, lines: ['Iniciar', 'Sesión'] },
  { regex: /^continuar\s+con\s+(.+)$/i, transform: (match: string[]) => ['Continuar con', match[1]] },
] as const;

/**
 * SpriteButton - Botón reutilizable con sprites retro
 * 
 * Componente optimizado con memorización y callbacks para mejor performance.
 * 
 * @example
 * // Variante blanca (por defecto)
 * <SpriteButton label="Iniciar Sesión" />
 * 
 * @example
 * // Variante negra con icono
 * <SpriteButton 
 *   label="Continuar con Gmail" 
 *   variant="black"
 *   icon={<img src="/icons/google.png" />}
 *   iconPosition="right"
 * />
 * 
 * @example
 * // Sprites personalizados
 * <SpriteButton 
 *   variant="custom"
 *   spriteNormal="/my-sprite-normal.png"
 *   spriteActive="/my-sprite-active.png"
 *   label="Custom Button"
 *   textColor="text-blue-600"
 * />
 */
const SpriteButton: React.FC<SpriteButtonProps> = ({ 
  label, 
  icon,
  iconPosition = 'left',
  variant = 'white',
  spriteNormal,
  spriteActive,
  textColor,
  textSize,
  minWidth = 180,
  minHeight = 60,
  maxWidth = 400,
  maxHeight = 90,
  autoWrap = true,
  className = '',
  ...props 
}) => {
  const [pressed, setPressed] = useState(false);

  // Memoizar configuración del botón para evitar recalcular en cada render
  const config = useMemo(() => {
    if (variant === 'custom') {
      return {
        spriteNormal: spriteNormal || VARIANT_CONFIGS.white.spriteNormal,
        spriteActive: spriteActive || VARIANT_CONFIGS.white.spriteActive,
        textColor: textColor || 'text-black',
        textSize: textSize || 'text-[0.6rem] sm:text-xs',
      };
    }

    const baseConfig = VARIANT_CONFIGS[variant];
    return {
      spriteNormal: baseConfig.spriteNormal,
      spriteActive: baseConfig.spriteActive,
      textColor: textColor || baseConfig.textColor,
      textSize: textSize || baseConfig.textSize,
    };
  }, [variant, spriteNormal, spriteActive, textColor, textSize]);

  // Memoizar el texto formateado
  const formattedLabel = useMemo(() => {
    if (!autoWrap) return label;

    const normalized = label.trim();
    
    // Buscar patrón que coincida
    for (const pattern of AUTO_WRAP_PATTERNS) {
      const match = normalized.match(pattern.regex);
      if (match) {
        const lines = 'transform' in pattern ? pattern.transform(match) : pattern.lines;
        return lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
          </React.Fragment>
        ));
      }
    }

    return label;
  }, [label, autoWrap]);

  // Callbacks optimizados para eventos
  const handlePressStart = useCallback(() => setPressed(true), []);
  const handlePressEnd = useCallback(() => setPressed(false), []);

  // Clases CSS memoizadas
  const contentClasses = useMemo(() => 
    `relative z-10 flex ${iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'} items-center gap-2 w-full h-full justify-center font-press-start ${config.textSize} ${config.textColor} text-center overflow-hidden max-w-full transition-all duration-100 group-active:opacity-60 group-active:translate-y-0.5 pointer-events-none`,
    [iconPosition, config.textSize, config.textColor]
  );

  return (
    <button
      type="button"
      className={`group relative flex items-center justify-center w-full h-full select-none border-none outline-none bg-transparent overflow-hidden ${className}`}
      style={{ minWidth, minHeight, maxWidth, maxHeight }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      {...props}
    >
      {/* Sprite de fondo */}
      <img
        src={pressed ? config.spriteActive : config.spriteNormal}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{ imageRendering: 'pixelated', zIndex: 0 }}
        draggable={false}
        loading="eager"
      />

      {/* Contenedor del contenido */}
      <span className={contentClasses}>
        {/* Icono */}
        {icon && (
          <span className="flex items-center justify-center shrink-0 max-w-10 max-h-10">
            {icon}
          </span>
        )}

        {/* Texto */}
        <span className="text-center overflow-hidden max-w-full leading-tight font-bold">
          {formattedLabel}
        </span>
      </span>
    </button>
  );
};

export default SpriteButton;

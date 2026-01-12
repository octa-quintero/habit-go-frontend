import React from 'react';

// Configuración de gemas con GIFs
// Carpeta 1 = mayor valor (ULTIMATE)
// Carpeta 10 = menor valor (STARTER)
// Dentro de cada carpeta: 1.gif (mejor), 2.gif, 3.gif
const GEM_CONFIG = {
  ULTIMATE: { folder: 1, size: { width: 44, height: 44 }, name: 'Ultimate' },
  MYTHIC: { folder: 2, size: { width: 27, height: 26 }, name: 'Mítico' },
  LEGENDARY: { folder: 3, size: { width: 26, height: 23 }, name: 'Legendario' },
  EPIC_PLUS: { folder: 4, size: { width: 21, height: 25 }, name: 'Épico+' },
  EPIC: { folder: 5, size: { width: 24, height: 26 }, name: 'Épico' },
  RARE_PLUS: { folder: 6, size: { width: 19, height: 22 }, name: 'Raro+' },
  RARE: { folder: 7, size: { width: 20, height: 30 }, name: 'Raro' },
  UNCOMMON: { folder: 8, size: { width: 28, height: 28 }, name: 'Poco Común' },
  COMMON: { folder: 9, size: { width: 23, height: 27 }, name: 'Común' },
  STARTER: { folder: 10, size: { width: 18, height: 30 }, name: 'Inicial' },
} as const;

export type GemTier = keyof typeof GEM_CONFIG;

interface GemSpriteProps {
  tier: GemTier;
  size?: number; // Tamaño en píxeles (ancho, altura se escala proporcionalmente)
  variant?: 1 | 2 | 3; // Qué GIF usar (1 = mejor calidad)
  className?: string;
}

export const GemSprite: React.FC<GemSpriteProps> = ({ 
  tier,
  size,
  variant = 1,
  className = ''
}) => {
  const config = GEM_CONFIG[tier];
  const imagePath = `/rewards/GEM ${config.folder}/${variant}.gif`;
  
  // Calcular dimensiones
  const displayWidth = size || config.size.width;
  const displayHeight = size 
    ? (size * config.size.height) / config.size.width 
    : config.size.height;
  
  return (
    <img
      src={imagePath}
      alt={`Gema ${config.name}`}
      className={`inline-block ${className}`}
      style={{ 
        width: `${displayWidth}px`, 
        height: `${displayHeight}px`,
        imageRendering: 'pixelated',
      }}
    />
  );
};

// Helper para obtener el tier según requisitos
export const getTierByRequirement = (requirement: number, type: 'streak' | 'habits' | 'completions'): GemTier => {
  if (type === 'streak') {
    if (requirement >= 365) return 'ULTIMATE';
    if (requirement >= 200) return 'MYTHIC';
    if (requirement >= 100) return 'LEGENDARY';
    if (requirement >= 60) return 'EPIC_PLUS';
    if (requirement >= 30) return 'EPIC';
    if (requirement >= 21) return 'RARE_PLUS';
    if (requirement >= 14) return 'RARE';
    if (requirement >= 7) return 'UNCOMMON';
    if (requirement >= 3) return 'COMMON';
    return 'STARTER';
  }
  
  if (type === 'habits') {
    if (requirement >= 15) return 'ULTIMATE';
    if (requirement >= 12) return 'MYTHIC';
    if (requirement >= 10) return 'LEGENDARY';
    if (requirement >= 8) return 'EPIC_PLUS';
    if (requirement >= 7) return 'EPIC';
    if (requirement >= 5) return 'RARE_PLUS';
    if (requirement >= 4) return 'RARE';
    if (requirement >= 3) return 'UNCOMMON';
    if (requirement >= 2) return 'COMMON';
    return 'STARTER';
  }
  
  if (type === 'completions') {
    if (requirement >= 1000) return 'ULTIMATE';
    if (requirement >= 500) return 'MYTHIC';
    if (requirement >= 365) return 'LEGENDARY';
    if (requirement >= 200) return 'EPIC_PLUS';
    if (requirement >= 100) return 'EPIC';
    if (requirement >= 50) return 'RARE_PLUS';
    if (requirement >= 25) return 'RARE';
    if (requirement >= 10) return 'UNCOMMON';
    if (requirement >= 5) return 'COMMON';
    return 'STARTER';
  }
  
  return 'STARTER';
};

// Helper para obtener información de la gema
export const getGemInfo = (tier: GemTier) => {
  return GEM_CONFIG[tier];
};

// Exportar configuración para uso externo
export { GEM_CONFIG };

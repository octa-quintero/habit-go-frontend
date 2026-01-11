import React, { useState, useEffect } from 'react';

// Configuración de gemas según el pack del creador
// GEM 1 (18x30) es el más pequeño → STARTER
// GEM CLUSTER 10 (44x44) es el más grande → ULTIMATE
const GEM_CONFIG = {
  ULTIMATE: { gemNumber: 10, size: { width: 44, height: 44 }, name: 'Ultimate', frames: 10, color: 'BLUE', isCluster: true },
  MYTHIC: { gemNumber: 9, size: { width: 27, height: 26 }, name: 'Mítico', frames: 10, color: 'LILAC', isCluster: false },
  LEGENDARY: { gemNumber: 8, size: { width: 26, height: 23 }, name: 'Legendario', frames: 10, color: 'LILAC', isCluster: false },
  EPIC_PLUS: { gemNumber: 7, size: { width: 21, height: 25 }, name: 'Épico+', frames: 10, color: 'DARK BLUE', isCluster: false },
  EPIC: { gemNumber: 6, size: { width: 24, height: 26 }, name: 'Épico', frames: 10, color: 'DARK BLUE', isCluster: false },
  RARE_PLUS: { gemNumber: 5, size: { width: 19, height: 22 }, name: 'Raro+', frames: 10, color: 'BLUE', isCluster: false },
  RARE: { gemNumber: 4, size: { width: 20, height: 30 }, name: 'Raro', frames: 10, color: 'BLUE', isCluster: false },
  UNCOMMON: { gemNumber: 3, size: { width: 28, height: 28 }, name: 'Poco Común', frames: 10, color: 'BLUE', isCluster: false },
  COMMON: { gemNumber: 2, size: { width: 23, height: 27 }, name: 'Común', frames: 10, color: 'BLUE', isCluster: false },
  STARTER: { gemNumber: 1, size: { width: 18, height: 30 }, name: 'Inicial', frames: 10, color: 'BLUE', isCluster: false },
} as const;

export type GemTier = keyof typeof GEM_CONFIG;

interface GemSpriteProps {
  tier: GemTier;
  size?: number; // Tamaño en píxeles (escala proporcional)
  animated?: boolean; // Si debe animar
  animationSpeed?: number; // Velocidad de animación en ms
  className?: string;
}

export const GemSprite: React.FC<GemSpriteProps> = ({ 
  tier,
  size,
  animated = true,
  animationSpeed = 100,
  className = ''
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const config = GEM_CONFIG[tier];
  
  // Animación DESACTIVADA temporalmente - esperando GIFs
  /*
  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % config.frames);
    }, animationSpeed);
    
    return () => clearInterval(interval);
  }, [animated, animationSpeed, config.frames]);
  */
  
  // Construir la ruta según la estructura del creador
  const folderName = config.gemNumber === 10 ? 'GEM 10' : `GEM ${config.gemNumber}`;
  const fileName = config.isCluster
    ? `GEM CLUSTER 10 - ${config.color} - Spritesheet.png`
    : `GEM ${config.gemNumber} - ${config.color} - Spritesheet.png`;
  // Codificar espacios para URL
  const imagePath = `/rewards/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
  
  // Calcular el factor de escala
  const scaleFactor = size ? size / config.size.width : 1;
  
  // Dimensiones del contenedor (display)
  const displayWidth = config.size.width * scaleFactor;
  const displayHeight = config.size.height * scaleFactor;
  
  // Dimensiones del sprite sheet completo (10 frames horizontales)
  const totalSpriteWidth = config.size.width * config.frames;
  const scaledSpriteWidth = totalSpriteWidth * scaleFactor;
  const scaledSpriteHeight = config.size.height * scaleFactor;
  
  // Posición X del frame actual (negativa porque movemos el fondo a la izquierda)
  const frameWidth = config.size.width * scaleFactor;
  const backgroundPositionX = -(currentFrame * frameWidth);
  
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ 
        width: `${displayWidth}px`, 
        height: `${displayHeight}px`,
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: `${backgroundPositionX}px 0px`,
        backgroundSize: `${scaledSpriteWidth}px ${scaledSpriteHeight}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
      title={`Gema ${config.name}`}
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

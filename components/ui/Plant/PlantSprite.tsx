/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface PlantSpriteProps {
  flowerNumber: number; // 1-15
  stage: number; // 1-7 (según crecimiento)
  size?: number;
}

export const PlantSprite: React.FC<PlantSpriteProps> = ({ 
  flowerNumber, 
  stage,
  size = 80 
}) => {
  // Asegurar que flowerNumber esté entre 1-15
  const flower = Math.max(1, Math.min(15, flowerNumber));
  const imagePath = `/flower/flower${flower}/${stage}.png`;
  const isMaxStage = stage >= 7;
  
  
  return (
    <div 
      className="flex items-center justify-center relative"
      style={{ width: size, height: size }}
    >
      {/* Efecto sparkling cuando llegue a etapa máxima */}
      {isMaxStage && (
        <img
          src="/sparkling/sparkling.gif"
          alt="Sparkling effect"
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ 
            imageRendering: 'pixelated',
            width: size * 1.2,
            height: size * 1.2,
          }}
        />
      )}
      
      <img
        src={imagePath}
        alt={`Planta etapa ${stage}`}
        className="relative z-0"
        style={{ 
          imageRendering: 'pixelated',
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        onError={(e) => {
          // Si no existe la imagen, intentar con la anterior
          if (stage > 1) {
            e.currentTarget.src = `/flower/flower${flower}/${stage - 1}.png`;
          }
        }}
      />
    </div>
  );
};

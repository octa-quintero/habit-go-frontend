import React from 'react';
import { GemSprite, type GemTier } from '@/components/ui/Gem';
import PixelText from '@/components/ui/Text/PixelText';

interface RewardCardProps {
  name: string;
  tier: GemTier;
  variant?: 1 | 2 | 3;
  unlocked: boolean;
  count?: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ 
  name,
  tier,
  variant = 1,
  unlocked,
  count = 0
}) => {
  return (
    <div className="relative">
      {/* Card con gema */}
      <div
        className={`relative transition-all ${
          unlocked ? 'hover:scale-105' : 'opacity-60'
        }`}
        style={{
          imageRendering: 'pixelated',
          height: '140px',
        }}
      >
        {/* Fondo estilo pixel card */}
        <div 
          className={`absolute inset-0 ${
            unlocked ? 'bg-amber-100' : 'bg-gray-300'
          }`}
          style={{
            boxShadow: unlocked 
              ? 'inset -4px -4px 0px rgba(0,0,0,0.2), inset 4px 4px 0px rgba(255,255,255,0.4)'
              : 'inset -3px -3px 0px rgba(0,0,0,0.15), inset 3px 3px 0px rgba(255,255,255,0.3)',
            border: unlocked ? '3px solid #1f2937' : '3px solid #6b7280',
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-between h-full py-2 px-2">
          {/* Gema - Elemento Principal */}
          <div className={`relative ${unlocked ? '' : 'grayscale'} flex-shrink-0`}>
            <GemSprite 
              tier={tier} 
              size={48}
              variant={variant}
            />
            {/* Badge contador x2, x3, etc. */}
            {unlocked && count > 1 && (
              <div 
                className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1"
                style={{
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  border: '2px solid #ffffff',
                }}
              >
                <PixelText size="xs" color="text-white" fontWeight={700}>
                  x{count}
                </PixelText>
              </div>
            )}
          </div>

          {/* Título dentro de la card - altura fija */}
          <div className="w-full flex-shrink-0" style={{ height: '32px' }}>
            <PixelText 
              size="xs" 
              color={unlocked ? 'text-gray-900' : 'text-gray-600'}
              fontWeight={700}
              className="text-center line-clamp-2"
              style={{ lineHeight: '1.2', fontSize: '9px' }}
            >
              {name}
            </PixelText>
          </div>

          {/* Badge de requisito estilo pixel */}
          <div 
            className={`px-1 py-1 text-center w-full flex-shrink-0 flex items-center justify-center ${
              unlocked ? 'bg-green-600' : 'bg-red-600'
            }`}
            style={{
              boxShadow: 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.3)',
              border: '2px solid rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ 
              fontSize: '9px', 
              lineHeight: '1', 
              color: 'white', 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '3px', 
              letterSpacing: '0.5px' 
            }}>
              {unlocked ? (
                <>
                  <span style={{ fontSize: '12px' }}>✓</span>
                  <span style={{ fontWeight: '900' }}>COMPLETADO</span>
                </>
              ) : (
                <span style={{ fontWeight: '900' }}>INCOMPLETO</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;

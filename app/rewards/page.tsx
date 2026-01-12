/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelText from '../../components/ui/Text/PixelText';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import { GemSprite, GEM_CONFIG, type GemTier } from '@/components/ui/Gem';
import { rewardsService } from '@/lib/api/rewardsService';
import { getUser } from '@/lib/auth';
import type { Reward, UserReward } from '@/types/api';

export default function RewardsPage() {
  const router = useRouter();
  const [allRewards, setAllRewards] = useState<Reward[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);

  useEffect(() => {
    const userData = getUser();
    
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(userData);
    loadRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRewards = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [rewards, unlocked] = await Promise.all([
        rewardsService.getAll().catch(err => {
          console.warn('No se pudieron cargar las recompensas del servidor:', err);
          return [] as Reward[];
        }),
        rewardsService.getUserRewards().catch(err => {
          console.warn('No se pudieron cargar las recompensas del usuario:', err);
          return [] as UserReward[];
        })
      ]);
      
      console.log('📊 Recompensas cargadas:', { 
        totalRewards: rewards.length, 
        unlockedRewards: unlocked.length,
        rewards,
        unlocked
      });
      
      setAllRewards(rewards);
      setUserRewards(unlocked);
      
      if (rewards.length === 0) {
        setError('No hay recompensas disponibles. El sistema de recompensas aún no está configurado en el backend.');
      }
    } catch (err: any) {
      console.error('Error al cargar recompensas:', err);
      setError('Error al cargar las recompensas. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Mapear tier del backend a GemTier del frontend
  const getTierFromReward = (reward: Reward): GemTier => {
    const tierMap: Record<string, GemTier> = {
      'starter': 'STARTER',
      'common': 'COMMON',
      'uncommon': 'UNCOMMON',
      'rare': 'RARE',
      'rare_plus': 'RARE_PLUS',
      'epic': 'EPIC',
      'epic_plus': 'EPIC_PLUS',
      'legendary': 'LEGENDARY',
      'mythic': 'MYTHIC',
      'ultimate': 'ULTIMATE',
    };
    
    return tierMap[reward.tier.toLowerCase()] || 'COMMON';
  };

  // Verificar si una recompensa está desbloqueada
  const isUnlocked = (rewardId: string): boolean => {
    return userRewards.some(ur => ur.id === rewardId);
  };

  // Obtener el contador de veces que se obtuvo una gema
  const getRewardCount = (rewardId: string): number => {
    const reward = userRewards.find(ur => ur.id === rewardId);
    return reward?.count || 0;
  };

  // Contar cuántas gemas desbloqueadas hay por tier
  const getUnlockedCountByTier = (tier: GemTier): number => {
    return allRewards.filter(r => {
      const rewardTier = getTierFromReward(r);
      return rewardTier === tier && isUnlocked(r.id);
    }).length;
  };

  // Agrupar recompensas por tier
  const rewardsByTier = allRewards.reduce((acc, reward) => {
    const tierKey = reward.tier.toUpperCase().replace('_', '_');
    if (!acc[tierKey]) {
      acc[tierKey] = [];
    }
    acc[tierKey].push(reward);
    return acc;
  }, {} as Record<string, Reward[]>);

  // Orden de tiers de mayor a menor valor
  const tierOrder: Array<keyof typeof GEM_CONFIG> = [
    'ULTIMATE', 'MYTHIC', 'LEGENDARY', 'EPIC_PLUS', 'EPIC',
    'RARE_PLUS', 'RARE', 'UNCOMMON', 'COMMON', 'STARTER'
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/background/grass-floor.png")',
        backgroundSize: '64px 64px',
        backgroundRepeat: 'repeat',
        imageRendering: 'pixelated',
      }}
    >
      <div className="w-full max-w-6xl">
        <PixelCard gap="gap-0">
          <div className="w-full h-full flex flex-col py-6 px-4 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <PixelText size="lg" color="text-gray-900" fontWeight={700}>
                  🏆 Recompensas
                </PixelText>
              </div>
              <SpriteButton
                label="Volver"
                variant="black"
                onClick={() => router.push('/dashboard')}
                className="px-0"
                minWidth={120}
                maxWidth={120}
              />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-6 pb-4 border-b-2 border-gray-300">
              <div className="flex flex-col items-center">
                <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                  {userRewards.length}
                </PixelText>
                <PixelText size="xs" color="text-gray-600">
                  Desbloqueadas
                </PixelText>
              </div>
              <div className="flex flex-col items-center">
                <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                  {allRewards.length}
                </PixelText>
                <PixelText size="xs" color="text-gray-600">
                  Total
                </PixelText>
              </div>
              <div className="flex flex-col items-center">
                <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                  {allRewards.length > 0 ? Math.round((userRewards.length / allRewards.length) * 100) : 0}%
                </PixelText>
                <PixelText size="xs" color="text-gray-600">
                  Progreso
                </PixelText>
              </div>
            </div>

            {/* Loading/Error States */}
            {loading && (
              <div className="flex justify-center py-8">
                <PixelText size="sm" color="text-gray-600">
                  Cargando recompensas...
                </PixelText>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-8 gap-4">
                <PixelText size="sm" color="text-gray-600" className="text-center max-w-md">
                  {error}
                </PixelText>
                <PixelText size="xs" color="text-gray-500" className="text-center max-w-md">
                  Tip: El sistema de recompensas se activará cuando el backend esté configurado con seeds de recompensas.
                </PixelText>
              </div>
            )}

            {/* Rewards Grid por Tier */}
            {!loading && !error && (
              <div className="space-y-8">
                {tierOrder.map(tier => {
                  const tierKey = tier.toUpperCase().replace('_', '_');
                  const rewards = rewardsByTier[tierKey] || [];
                  
                  if (rewards.length === 0) return null;

                  const config = GEM_CONFIG[tier];
                  
                  return (
                    <div key={tier} className="space-y-3">
                      {/* Tier Header con contador de gemas */}
                      <div className="flex items-center gap-3 px-2">
                        <div className="relative">
                          <GemSprite tier={tier} size={28} />
                          {/* Contador de gemas acumuladas */}
                          {getUnlockedCountByTier(tier) > 0 && (
                            <div className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                              <PixelText size="xs" color="text-white" fontWeight={700}>
                                {getUnlockedCountByTier(tier)}
                              </PixelText>
                            </div>
                          )}
                        </div>
                        <PixelText size="sm" color="text-gray-900" fontWeight={700}>
                          {config.name}
                        </PixelText>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        <PixelText size="xs" color="text-gray-500">
                          {rewards.filter(r => isUnlocked(r.id)).length}/{rewards.length}
                        </PixelText>
                      </div>

                      {/* Rewards Grid - Cards estilo pixel art */}
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {rewards.map(reward => {
                          const unlocked = isUnlocked(reward.id);
                          const count = getRewardCount(reward.id);
                          
                          return (
                            <div
                              key={reward.id}
                              className="relative"
                            >
                              {/* Card con gema */}
                              <div
                                className={`relative transition-all ${
                                  unlocked
                                    ? 'hover:scale-105'
                                    : 'opacity-60'
                                }`}
                                style={{
                                  imageRendering: 'pixelated',
                                  height: '140px', // Altura fija
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
                                      tier={getTierFromReward(reward)} 
                                      size={48}
                                      variant={(reward.variant || 1) as 1 | 2 | 3}
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
                                      {reward.name}
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
                                    <div style={{ fontSize: '9px', lineHeight: '1', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px', letterSpacing: '0.5px' }}>
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
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Mensaje si no hay recompensas */}
                {allRewards.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <PixelText size="base" color="text-gray-600" className="text-center">
                      No hay recompensas disponibles aún.
                    </PixelText>
                  </div>
                )}
              </div>
            )}
          </div>
        </PixelCard>
      </div>
    </div>
  );
}

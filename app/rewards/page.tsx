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
    return userRewards.some(ur => ur.rewardId === rewardId);
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
                      {/* Tier Header */}
                      <div className="flex items-center gap-3">
                        <GemSprite tier={tier} size={32} />
                        <PixelText size="base" color="text-gray-900" fontWeight={700}>
                          {config.name}
                        </PixelText>
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                      </div>

                      {/* Rewards Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {rewards.map(reward => {
                          const unlocked = isUnlocked(reward.id);
                          
                          return (
                            <div
                              key={reward.id}
                              className={`p-4 border-2 rounded-lg transition-all ${
                                unlocked
                                  ? 'border-gray-900 bg-white'
                                  : 'border-gray-400 bg-gray-100 opacity-60'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                {/* Gema */}
                                <div className={unlocked ? '' : 'grayscale'}>
                                  <GemSprite 
                                    tier={getTierFromReward(reward)} 
                                    size={48}
                                    animated={unlocked}
                                  />
                                </div>

                                {/* Nombre */}
                                <PixelText 
                                  size="xs" 
                                  color={unlocked ? 'text-gray-900' : 'text-gray-500'}
                                  fontWeight={700}
                                  className="text-center"
                                >
                                  {reward.name}
                                </PixelText>

                                {/* Descripción */}
                                <PixelText 
                                  size="xs" 
                                  color="text-gray-600"
                                  className="text-center"
                                >
                                  {reward.description}
                                </PixelText>

                                {/* Requisito */}
                                <div className={`px-2 py-1 rounded ${
                                  unlocked ? 'bg-green-100' : 'bg-gray-200'
                                }`}>
                                  <PixelText 
                                    size="xs" 
                                    color={unlocked ? 'text-green-900' : 'text-gray-600'}
                                    fontWeight={700}
                                  >
                                    {unlocked ? '✓ Desbloqueado' : `${reward.requirement} ${
                                      reward.type === 'STREAK' ? 'días' :
                                      reward.type === 'HABIT_COUNT' ? 'hábitos' :
                                      'completaciones'
                                    }`}
                                  </PixelText>
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

/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelCardMobile from '../../components/ui/Card/PixelCardMobile';
import HeaderCard from '../../components/ui/Card/HeaderCard';
import HeaderCardMobile from '../../components/ui/Card/HeaderCardMobile';
import PixelText from '../../components/ui/Text/PixelText';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import StatsBox from '../../components/ui/Card/StatsBox';
import RewardCard from '../../components/ui/Reward/RewardCard';
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
  const [, setUser] = useState<ReturnType<typeof getUser>>(null);

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
    } catch (err: unknown) {
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

  const headerContent = (
    <>
      {/* Header Title and Button */}
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <img 
            src="/trophy/trophy.gif" 
            alt="Trophy" 
            className="w-6 h-6 sm:w-8 sm:h-8" 
            style={{ imageRendering: 'pixelated' }}
          />
          <PixelText size="lg" color="text-gray-900" fontWeight={700} className="text-sm sm:text-lg">
            Recompensas
          </PixelText>
        </div>
        <SpriteButton
          label="Volver"
          variant="black"
          onClick={() => router.push('/dashboard')}
          minWidth={100}
          minHeight={33}
          maxWidth={130}
          maxHeight={38}
        />
      </div>

      {/* Stats: Desbloqueadas, Total, Progreso */}
      <div className="flex justify-center w-full">
        <div className="flex gap-5 sm:gap-10 flex-nowrap justify-center">
          <StatsBox label="Desbloqueadas" value={userRewards.length} />
          <StatsBox label="Total" value={allRewards.length} />
          <StatsBox 
            label="Progreso" 
            value={`${allRewards.length > 0 ? Math.round((userRewards.length / allRewards.length) * 100) : 0}%`}
          />
        </div>
      </div>
    </>
  );

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start p-4 gap-4"
      style={{
        backgroundImage: 'url("/background/grass-floor.png")',
        backgroundSize: 'clamp(32px, 10vw, 64px)',
        backgroundRepeat: 'repeat',
        imageRendering: 'pixelated',
      }}
    >
      {/* Desktop Header */}
      <div className="hidden sm:block w-full">
        <HeaderCard>
          {headerContent}
        </HeaderCard>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden w-full">
        <HeaderCardMobile>
          {headerContent}
        </HeaderCardMobile>
      </div>

      <div className="w-full max-w-6xl space-y-4">

        {/* Desktop Card de Recompensas */}
        <div className="hidden sm:block">
          <PixelCard gap="gap-0">
            <div 
              className="w-full h-full flex flex-col py-2 px-0 overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d97706 #e5e7eb',
              }}
            >
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
              <div className="space-y-8 mb-12">
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
                          <GemSprite tier={tier} size={48} />
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
                            <RewardCard
                              key={reward.id}
                              name={reward.name}
                              tier={getTierFromReward(reward)}
                              variant={(reward.variant || 1) as 1 | 2 | 3}
                              unlocked={unlocked}
                              count={count}
                            />
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

        {/* Mobile Card de Recompensas */}
        <div className="sm:hidden">
          <PixelCardMobile gap="gap-0">
            <div 
              className="w-full h-full flex flex-col py-2 px-0 overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d97706 #e5e7eb',
              }}
            >
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
              <div className="space-y-8 mb-12">
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
                          <GemSprite tier={tier} size={48} />
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
                            <RewardCard
                              key={reward.id}
                              name={reward.name}
                              tier={getTierFromReward(reward)}
                              variant={(reward.variant || 1) as 1 | 2 | 3}
                              unlocked={unlocked}
                              count={count}
                            />
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
          </PixelCardMobile>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelText from '../../components/ui/Text/PixelText';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import SmallButton from '../../components/ui/Button/SmallButton';
import DeleteButton from '../../components/ui/Button/DeleteButton';
import { PlantSprite } from '@/components/ui/Plant';
import { FireIcon, PlantIcon } from '@/components/ui/Icons/PixelIcons';
import { habitsService } from '@/lib/api/habitsService';
import { getUser, clearAuth } from '@/lib/auth';
import type { Habit } from '@/types/api';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
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
    loadHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(''); // Limpiar errores anteriores
      const data = await habitsService.getAll();
      console.log('[Dashboard] Habits loaded:', data.map(h => ({ id: h.id, title: h.title, streak: h.streak })));
      setHabits(data);
    } catch (err: any) {
      console.error('Error completo al cargar hábitos:', err);
      console.error('Response:', err.response);
      console.error('Message:', err.message);
      
      // Si el error es de autenticación, redirigir a login
      if (err.response?.status === 401) {
        clearAuth();
        router.push('/login');
        return;
      }
      
      setError('Error al cargar tus hábitos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  const handleMarkComplete = async (habitId: string) => {
    try {
      const result = await habitsService.markAsCompleted(habitId);
      
      // Verificar si ya estaba completado
      if (result.alreadyCompleted) {
        setError('Ya completaste el hábito hoy ✓');
        setTimeout(() => setError(''), 2000);
        return;
      }
      
      // Recargar hábitos inmediatamente para actualizar streaks y plantas
      // Forzar recarga completa sin caché
      setTimeout(async () => {
        await loadHabits();
      }, 100);
    } catch (err: any) {
      console.error('Error al marcar hábito:', err);
      const errorMessage = err.response?.data?.message || 'Error al marcar como completado';
      setError(errorMessage);
      
      // Limpiar el error después de 3 segundos
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
      return;
    }
    
    try {
      await habitsService.delete(habitId);
      // Recargar hábitos después de eliminar
      await loadHabits();
    } catch (err: any) {
      console.error('Error al eliminar hábito:', err);
      const errorMessage = err.response?.data?.message || 'Error al eliminar el hábito';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    }
  };

  const activeHabits = habits.filter(h => h.isActive);
  const totalStreak = activeHabits.reduce((sum, h) => sum + (h.streak || 0), 0);
  const longestStreak = Math.max(...activeHabits.map(h => h.longestStreak || 0), 0);

  // Dividir hábitos: primeros 3 en la card principal, resto en grupos de 3
  const firstThreeHabits = activeHabits.slice(0, 3);
  const remainingHabits = activeHabits.slice(3);
  
  const habitsPerCard = 3;
  const remainingHabitGroups: Habit[][] = [];
  for (let i = 0; i < remainingHabits.length; i += habitsPerCard) {
    remainingHabitGroups.push(remainingHabits.slice(i, i + habitsPerCard));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      {/* Header Card con background card 1 */}
      <div 
        className="relative mx-auto"
        style={{
          width: '900px',
          maxWidth: '90vw',
          aspectRatio: '900 / 350',
          backgroundImage: 'url(/card/card%201.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }}
      >
        <div className="flex flex-col gap-6 h-full justify-center" style={{ padding: '8% 10%', width: '100%' }}>
          {/* Fila superior: Logo + Nombre + Botón Salir */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="relative flex items-center justify-center" style={{ minWidth: '3rem', minHeight: '3rem' }}>
                <img 
                  src="/logo/Marco.png" 
                  alt="Marco" 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-0" 
                  style={{ imageRendering: 'pixelated' }} 
                />
                <img 
                  src="/logo/TitoElGatito.gif" 
                  alt="Tito" 
                  className="relative z-10 w-7 h-7" 
                  style={{ imageRendering: 'pixelated' }} 
                />
              </span>
              <div>
                <PixelText size="lg" color="text-gray-900" fontWeight={700}>
                  {user?.name || 'Usuario'}
                </PixelText>
                <PixelText size="xs" color="text-gray-900">
                  @{user?.username}
                </PixelText>
              </div>
            </div>
            
            <div className="flex gap-2">
              <SpriteButton
                label="Recompensas"
                variant="white"
                onClick={() => router.push('/rewards')}
                className="px-0"
                minWidth={140}
                maxWidth={140}
              />
              <SpriteButton
                label="Salir"
                variant="black"
                onClick={handleLogout}
                className="px-0"
                minWidth={120}
                maxWidth={120}
              />
            </div>
          </div>

          {/* Stats: Hábitos, Racha Total, Mejor Racha */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <PixelText size="xs" color="text-gray-900">Hábitos</PixelText>
              <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                {activeHabits.length}
              </PixelText>
            </div>
            <div className="flex flex-col items-center">
              <PixelText size="xs" color="text-gray-900">Racha Total</PixelText>
              <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                {totalStreak}
              </PixelText>
            </div>
            <div className="flex flex-col items-center">
              <PixelText size="xs" color="text-gray-900">Mejor Racha</PixelText>
              <PixelText size="2xl" color="text-gray-900" fontWeight={700}>
                {longestStreak}
              </PixelText>
            </div>
          </div>
        </div>
      </div>

      {/* Habits Cards */}
      {loading ? (
        <PixelCard>
          <div className="py-6 px-4">
            <PixelText size="sm" color="text-gray-900" align="center">
              Cargando...
            </PixelText>
          </div>
        </PixelCard>
      ) : error ? (
        <PixelCard>
          <div className="py-6 px-4">
            <div className={`px-2 py-1 border-2 ${
              error.includes('Ya completaste') 
                ? 'bg-green-100 border-green-500' 
                : 'bg-red-100 border-red-500'
            }`}>
              <PixelText 
                size="xs" 
                color={error.includes('Ya completaste') ? 'text-green-700' : 'text-red-700'} 
                align="center"
              >
                {error}
              </PixelText>
            </div>
          </div>
        </PixelCard>
      ) : null}

      {/* Primera Card con Header y primeros 2 hábitos */}
      {!loading && (
        <PixelCard gap="gap-0">
          <div className="w-full h-full flex flex-col justify-start pt-6 pb-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PixelText size="base" color="text-gray-900" fontWeight={700}>
                  Mis Hábitos
                </PixelText>
                <img 
                  src="/chicken/chicken.gif" 
                  alt="chicken" 
                  style={{ width: '56px', height: '56px', imageRendering: 'pixelated' }}
                />
              </div>
              <SpriteButton
                label="+ Nuevo"
                onClick={() => router.push('/habits/create')}
                className="px-0"
                minWidth={120}
                maxWidth={120}
              />
            </div>

            {activeHabits.length === 0 ? (
              <div className="text-center py-8">
                <PixelText size="sm" color="text-gray-900">
                  No tienes hábitos aún
                </PixelText>
                <PixelText size="xs" color="text-gray-900" className="mt-2">
                  ¡Crea tu primer hábito para comenzar!
                </PixelText>
              </div>
            ) : (
              <div className="space-y-2">
                {firstThreeHabits.map((habit) => {
                  const maxStage = 7;
                  const currentStage = Math.min(habit.streak + 1, maxStage);
                  
                  console.log('[Dashboard] Habit:', { 
                    id: habit.id, 
                    title: habit.title, 
                    streak: habit.streak, 
                    currentStage 
                  });
                  
                  return (
                    <div
                      key={`${habit.id}-${habit.streak}`}
                      className="p-3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-shrink-0">
                          <PlantSprite 
                            flowerNumber={habit.plantNumber}
                            stage={currentStage}
                            size={64}
                            key={`plant-${habit.id}-${currentStage}`}
                          />
                        </div>
                        
                        <div className="flex-1 flex gap-3 items-start">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                              <PixelText size="xs" color="text-gray-900" fontWeight={700}>
                                {habit.streak || 0} días
                              </PixelText>
                              <img 
                                src="/fire/Fire gif.gif" 
                                alt="fire" 
                                style={{ width: '24px', height: '24px', imageRendering: 'pixelated' }}
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <PlantIcon size={12} color="#000000" />
                              <PixelText size="xs" color="text-gray-900" fontWeight={700}>
                                Etapa {currentStage}/{maxStage}
                              </PixelText>
                            </div>
                            <div className="flex items-center gap-1">
                              <div style={{
                                backgroundColor: habit.frequency === 'daily' ? '#FEF3C7' : '#DBEAFE',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                border: `1px solid ${habit.frequency === 'daily' ? '#FCD34D' : '#93C5FD'}`
                              }}>
                                <PixelText size="xs" color={habit.frequency === 'daily' ? 'text-yellow-900' : 'text-blue-900'} fontWeight={700}>
                                  {habit.frequency === 'daily' ? '⏰ Diario' : '📅 Semanal'}
                                </PixelText>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <PixelText size="sm" color="text-gray-900" fontWeight={700}>
                              {habit.title}
                            </PixelText>
                            {habit.description && (
                              <PixelText size="xs" color="text-gray-900" className="mt-1">
                                {habit.description}
                              </PixelText>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <SmallButton
                            label="✓"
                            onClick={() => handleMarkComplete(habit.id)}
                            className="w-[60px] h-[60px]"
                          />
                          <DeleteButton
                            onClick={() => handleDeleteHabit(habit.id)}
                            className="w-[60px] h-[60px]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </PixelCard>
      )}

      {/* Cards adicionales para hábitos restantes (grupos de 2) */}
      {!loading && remainingHabitGroups.map((group, groupIndex) => (
        <PixelCard key={`habit-group-${groupIndex}`} gap="gap-0">
          <div className="w-full h-full flex flex-col justify-start py-6 px-4">
            <div className="space-y-2">
              {group.map((habit) => {
                const maxStage = 7;
                const currentStage = Math.min(habit.streak + 1, maxStage);
                
                return (
                  <div
                    key={`${habit.id}-${habit.streak}`}
                    className="p-3 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-shrink-0">
                        <PlantSprite 
                          flowerNumber={habit.plantNumber}
                          stage={currentStage}
                          size={64}
                          key={`plant-${habit.id}-${currentStage}`}
                        />
                      </div>
                      
                      <div className="flex-1 flex gap-3 items-start">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <PixelText size="xs" color="text-gray-900" fontWeight={700}>
                              {habit.streak || 0} días
                            </PixelText>
                            <img 
                              src="/fire/Fire gif.gif" 
                              alt="fire" 
                              style={{ width: '24px', height: '24px', imageRendering: 'pixelated' }}
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <PlantIcon size={12} color="#000000" />
                            <PixelText size="xs" color="text-gray-900" fontWeight={700}>
                              Etapa {currentStage}/{maxStage}
                            </PixelText>
                          </div>
                          <div className="flex items-center gap-1">
                            <div style={{
                              backgroundColor: habit.frequency === 'daily' ? '#FEF3C7' : '#DBEAFE',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              border: `1px solid ${habit.frequency === 'daily' ? '#FCD34D' : '#93C5FD'}`
                            }}>
                              <PixelText size="xs" color={habit.frequency === 'daily' ? 'text-yellow-900' : 'text-blue-900'} fontWeight={700}>
                                {habit.frequency === 'daily' ? '⏰ Diario' : '📅 Semanal'}
                              </PixelText>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <PixelText size="sm" color="text-gray-900" fontWeight={700}>
                            {habit.title}
                          </PixelText>
                          {habit.description && (
                            <PixelText size="xs" color="text-gray-900" className="mt-1">
                              {habit.description}
                            </PixelText>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <SmallButton
                          label="✓"
                          onClick={() => handleMarkComplete(habit.id)}
                          className="w-[60px] h-[60px]"
                        />
                        <DeleteButton
                          onClick={() => handleDeleteHabit(habit.id)}
                          className="w-[60px] h-[60px]"
                        />
                      </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    );
  }

/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../components/ui/Card/PixelCard';
import HeaderCard from '../../components/ui/Card/HeaderCard';
import HeaderCardMobile from '../../components/ui/Card/HeaderCardMobile';
import PixelCardMobileHabits from '../../components/ui/Card/PixelCardMobileHabits';
import PixelText from '../../components/ui/Text/PixelText';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import StatsBox from '../../components/ui/Card/StatsBox';
import SmallButton from '../../components/ui/Button/SmallButton';
import DeleteButton from '../../components/ui/Button/DeleteButton';
import { PlantSprite } from '@/components/ui/Plant';
import { PlantIcon } from '@/components/ui/Icons/PixelIcons';
import InfoModal from '@/components/ui/Modal/InfoModal';
import { habitsService } from '@/lib/api/habitsService';
import { getUser, clearAuth } from '@/lib/auth';
import type { Habit } from '@/types/api';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
        setModalMessage('Ya completaste este hábito hoy. ¡Sigue así!');
        setShowModal(true);
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
  const firstThreeHabits = activeHabits.slice(0, 4);
  const remainingHabits = activeHabits.slice(4);
  
  const habitsPerCard = 3;
  const remainingHabitGroups: Habit[][] = [];
  for (let i = 0; i < remainingHabits.length; i += habitsPerCard) {
    remainingHabitGroups.push(remainingHabits.slice(i, i + habitsPerCard));
  }

  const headerContent = (
    <>
      {/* Fila superior: Logo + Nombre + Botones (todos a la misma altura) */}
      <div className="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="relative flex items-center justify-center" style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}>
            <img 
              src="/logo/Marco.png" 
              alt="Marco" 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 z-0" 
              style={{ imageRendering: 'pixelated' }} 
            />
            <img 
              src="/logo/TitoElGatito.gif" 
              alt="Tito" 
              className="relative z-10 w-5 h-5 sm:w-7 sm:h-7" 
              style={{ imageRendering: 'pixelated' }} 
            />
          </span>
          <div className="min-w-0">
            <PixelText size="lg" color="text-gray-900" fontWeight={700} className="text-sm sm:text-lg truncate">
              {user?.name || 'Usuario'}
            </PixelText>
            <PixelText size="xs" color="text-gray-900" className="text-[0.4rem] sm:text-xs truncate">
              @{user?.username}
            </PixelText>
          </div>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-2 items-center justify-end">
          <SmallButton
            icon={
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ imageRendering: 'pixelated' }}
              >
                <path 
                  d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z" 
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="1"
                />
              </svg>
            }
            onClick={() => router.push('/profile')}
            className="w-[50px] h-[50px]"
          />
          <SpriteButton
            label="Recompensas"
            variant="white"
            onClick={() => router.push('/rewards')}
            minWidth={130}
            minHeight={40}
            maxWidth={155}
            maxHeight={50}
          />
          <SpriteButton
            label="Salir"
            variant="black"
            onClick={handleLogout}
            minWidth={120}
            minHeight={50}
            maxWidth={120}
            maxHeight={50}
          />
        </div>

        {/* Mobile Buttons - Info & Rewards horizontal, Logout below */}
        <div className="flex sm:hidden gap-1 items-start justify-end">
          {/* Información Usuario */}
          <SmallButton
            icon={
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ imageRendering: 'pixelated' }}
              >
                <path 
                  d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z" 
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="1"
                />
              </svg>
            }
            onClick={() => router.push('/profile')}
            className="w-10 h-10 flex-shrink-0"
          />
          
          {/* Recompensas & Salir - Column */}
          <div className="flex flex-col gap-0.5 items-end flex-nowrap">
            <SpriteButton
              label="Recompensas"
              variant="white"
              onClick={() => router.push('/rewards')}
              minWidth={85}
              minHeight={40}
              maxWidth={110}
              maxHeight={40}
            />
            <SpriteButton
              label="Salir"
              variant="black"
              onClick={handleLogout}
              minWidth={85}
              minHeight={33}
              maxWidth={110}
              maxHeight={38}
            />
          </div>
        </div>
      </div>

      {/* Stats: Hábitos, Racha Total, Mejor Racha */}
      <div className="flex justify-center w-full">
        <div className="flex gap-5 sm:gap-10 flex-nowrap justify-center">
          <StatsBox label="Hábitos" value={activeHabits.length} />
          <StatsBox label="Racha Total" value={totalStreak} />
          <StatsBox label="Mejor Racha" value={longestStreak} />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 gap-4">
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

      {/* Modal informativo */}
      <InfoModal
        isOpen={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
        variant="success"
      />

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
            <div className="px-2 py-1 border-2 bg-red-100 border-red-500">
              <PixelText 
                size="xs" 
                color="text-red-700" 
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
        <>
          {/* Desktop Version */}
          <div className="hidden sm:block w-full">
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
          </div>

          {/* Mobile Version */}
          <div className="sm:hidden w-full">
            <PixelCardMobileHabits gap="gap-0">
              <div className="w-full h-full flex flex-col justify-start pt-6 pb-6 px-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <PixelText size="base" color="text-gray-900" fontWeight={700} className="text-xs">
                      Mis Hábitos
                    </PixelText>
                    <img 
                      src="/chicken/chicken.gif" 
                      alt="chicken" 
                      style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }}
                    />
                  </div>
                  <SpriteButton
                    label="+ Nuevo"
                    onClick={() => router.push('/habits/create')}
                    className="px-0"
                    minWidth={100}
                    maxWidth={100}
                    minHeight={32}
                    maxHeight={36}
                  />
                </div>

                {activeHabits.length === 0 ? (
                  <div className="text-center py-4">
                    <PixelText size="sm" color="text-gray-900" className="text-xs">
                      No tienes hábitos aún
                    </PixelText>
                    <PixelText size="xs" color="text-gray-900" className="mt-1 text-[0.5rem]">
                      ¡Crea tu primer hábito!
                    </PixelText>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {firstThreeHabits.map((habit) => {
                      const maxStage = 7;
                      const currentStage = Math.min(habit.streak + 1, maxStage);
                      
                      return (
                        <div
                          key={`${habit.id}-${habit.streak}`}
                          className="p-2 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-shrink-0">
                              <PlantSprite 
                                flowerNumber={habit.plantNumber}
                                stage={currentStage}
                                size={48}
                                key={`plant-${habit.id}-${currentStage}`}
                              />
                            </div>
                            
                            <div className="flex-1 flex gap-2 items-start">
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-0.5">
                                  <PixelText size="xs" color="text-gray-900" fontWeight={700} className="text-[0.4rem]">
                                    {habit.streak || 0} días
                                  </PixelText>
                                  <img 
                                    src="/fire/Fire gif.gif" 
                                    alt="fire" 
                                    style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                                  />
                                </div>
                                <div className="flex items-center gap-0.5">
                                  <PlantIcon size={8} color="#000000" />
                                  <PixelText size="xs" color="text-gray-900" fontWeight={700} className="text-[0.4rem]">
                                    Etapa {currentStage}/{maxStage}
                                  </PixelText>
                                </div>
                                <div className="flex items-center gap-0.5 min-w-0 flex-shrink-0">
                                  <div style={{
                                    backgroundColor: habit.frequency === 'daily' ? '#FEF3C7' : '#DBEAFE',
                                    padding: '3px 6px',
                                    borderRadius: '3px',
                                    border: `1px solid ${habit.frequency === 'daily' ? '#FCD34D' : '#93C5FD'}`,
                                    whiteSpace: 'nowrap',
                                    overflow: 'visible'
                                  }}>
                                    <PixelText size="xs" color={habit.frequency === 'daily' ? 'text-yellow-900' : 'text-blue-900'} fontWeight={700} className="text-[0.55rem]">
                                      {habit.frequency === 'daily' ? '⏰ Diario' : '📅 Semanal'}
                                    </PixelText>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <PixelText size="sm" color="text-gray-900" fontWeight={700} className="text-[0.45rem] break-words">
                                  {habit.title}
                                </PixelText>
                                {habit.description && (
                                  <PixelText size="xs" color="text-gray-900" className="mt-0.5 text-[0.35rem] break-words">
                                    {habit.description}
                                  </PixelText>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-1 flex-shrink-0">
                              <SmallButton
                                label="✓"
                                onClick={() => handleMarkComplete(habit.id)}
                                className="w-[40px] h-[40px]"
                              />
                              <DeleteButton
                                onClick={() => handleDeleteHabit(habit.id)}
                                className="w-[40px] h-[40px]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </PixelCardMobileHabits>
          </div>
        </>
      )}

      {/* Cards adicionales para hábitos restantes (grupos de 2) */}
      {!loading && remainingHabitGroups.map((group, groupIndex) => (
        <div key={`habit-group-${groupIndex}`} className="w-full">
          {/* Desktop Version */}
          <div className="hidden sm:block">
            <PixelCard gap="gap-0">
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
                          <div className="shrink-0">
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
          </div>

          {/* Mobile Version */}
          <div className="sm:hidden">
            <PixelCardMobileHabits gap="gap-0">
              <div className="w-full h-full flex flex-col justify-start pt-6 pb-6 px-4">
                <div className="space-y-1">
                  {group.map((habit) => {
                    const maxStage = 7;
                    const currentStage = Math.min(habit.streak + 1, maxStage);
                    
                    return (
                      <div
                        key={`${habit.id}-${habit.streak}`}
                        className="p-2 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-shrink-0">
                            <PlantSprite 
                              flowerNumber={habit.plantNumber}
                              stage={currentStage}
                              size={48}
                              key={`plant-${habit.id}-${currentStage}`}
                            />
                          </div>
                          
                          <div className="flex-1 flex gap-2 items-start">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-0.5">
                                <PixelText size="xs" color="text-gray-900" fontWeight={700} className="text-[0.4rem]">
                                  {habit.streak || 0} días
                                </PixelText>
                                <img 
                                  src="/fire/Fire gif.gif" 
                                  alt="fire" 
                                  style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                                />
                              </div>
                              <div className="flex items-center gap-0.5">
                                <PlantIcon size={8} color="#000000" />
                                <PixelText size="xs" color="text-gray-900" fontWeight={700} className="text-[0.4rem]">
                                  Etapa {currentStage}/{maxStage}
                                </PixelText>
                              </div>
                              <div className="flex items-center gap-0.5 min-w-0 flex-shrink-0">
                                <div style={{
                                  backgroundColor: habit.frequency === 'daily' ? '#FEF3C7' : '#DBEAFE',
                                  padding: '3px 6px',
                                  borderRadius: '3px',
                                  border: `1px solid ${habit.frequency === 'daily' ? '#FCD34D' : '#93C5FD'}`,
                                  whiteSpace: 'nowrap',
                                  overflow: 'visible'
                                }}>
                                  <PixelText size="xs" color={habit.frequency === 'daily' ? 'text-yellow-900' : 'text-blue-900'} fontWeight={700} className="text-[0.55rem]">
                                    {habit.frequency === 'daily' ? '⏰ Diario' : '📅 Semanal'}
                                  </PixelText>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <PixelText size="sm" color="text-gray-900" fontWeight={700} className="text-[0.45rem] break-words">
                                {habit.title}
                              </PixelText>
                              {habit.description && (
                                <PixelText size="xs" color="text-gray-900" className="mt-0.5 text-[0.35rem] break-words">
                                  {habit.description}
                                </PixelText>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-1 flex-shrink-0">
                            <SmallButton
                              label="✓"
                              onClick={() => handleMarkComplete(habit.id)}
                              className="w-[40px] h-[40px]"
                            />
                            <DeleteButton
                              onClick={() => handleDeleteHabit(habit.id)}
                              className="w-[40px] h-[40px]"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PixelCardMobileHabits>
          </div>
        </div>
      ))}
      </div>
    );
  }

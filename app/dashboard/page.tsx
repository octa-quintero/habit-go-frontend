/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelText from '../../components/ui/Text/PixelText';
import SpriteButton from '../../components/ui/Button/SpriteButton';
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
      const data = await habitsService.getAll();
      setHabits(data);
    } catch (err: any) {
      console.error('Error al cargar hábitos:', err);
      
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
      await habitsService.markAsCompleted(habitId);
      // Recargar hábitos para actualizar streaks
      await loadHabits();
    } catch (err) {
      console.error('Error al marcar hábito:', err);
      setError('Error al marcar como completado');
    }
  };

  const activeHabits = habits.filter(h => h.isActive);
  const totalStreak = activeHabits.reduce((sum, h) => sum + (h.streak || 0), 0);
  const longestStreak = Math.max(...activeHabits.map(h => h.longestStreak || 0), 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelCard gap="gap-0">
        <div className="flex flex-col h-full py-6 px-4 gap-6">
          {/* Header */}
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
                <PixelText size="xs" color="text-gray-600">
                  @{user?.username}
                </PixelText>
              </div>
            </div>
            
            <SpriteButton
              label="Salir"
              variant="black"
              onClick={handleLogout}
              className="px-4"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border-2 border-black p-3 flex flex-col items-center">
              <PixelText size="xs" color="text-gray-600">Hábitos</PixelText>
              <PixelText size="2xl" color="text-primary" fontWeight={700}>
                {activeHabits.length}
              </PixelText>
            </div>
            <div className="bg-white border-2 border-black p-3 flex flex-col items-center">
              <PixelText size="xs" color="text-gray-600">Racha Total</PixelText>
              <PixelText size="2xl" color="text-primary" fontWeight={700}>
                {totalStreak}
              </PixelText>
            </div>
            <div className="bg-white border-2 border-black p-3 flex flex-col items-center">
              <PixelText size="xs" color="text-gray-600">Mejor Racha</PixelText>
              <PixelText size="2xl" color="text-primary" fontWeight={700}>
                {longestStreak}
              </PixelText>
            </div>
          </div>

          {/* Habits List */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <PixelText size="base" color="text-gray-900" fontWeight={700}>
                Mis Hábitos
              </PixelText>
              <SpriteButton
                label="+ Nuevo"
                onClick={() => router.push('/habits/create')}
                className="px-3"
              />
            </div>

            {loading ? (
              <PixelText size="sm" color="text-gray-600" align="center">
                Cargando...
              </PixelText>
            ) : error ? (
              <div className="px-2 py-1 bg-red-100 border-2 border-red-500">
                <PixelText size="xs" color="text-red-700" align="center">
                  {error}
                </PixelText>
              </div>
            ) : activeHabits.length === 0 ? (
              <div className="text-center py-8">
                <PixelText size="sm" color="text-gray-600">
                  No tienes hábitos aún
                </PixelText>
                <PixelText size="xs" color="text-gray-500" className="mt-2">
                  ¡Crea tu primer hábito para comenzar!
                </PixelText>
              </div>
            ) : (
              <div className="space-y-2">
                {activeHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="bg-white border-2 border-black p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <PixelText size="sm" color="text-gray-900" fontWeight={700}>
                          {habit.title}
                        </PixelText>
                        {habit.description && (
                          <PixelText size="xs" color="text-gray-600" className="mt-1">
                            {habit.description}
                          </PixelText>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs">🔥</span>
                            <PixelText size="xs" color="text-primary" fontWeight={700}>
                              {habit.streak || 0} días
                            </PixelText>
                          </div>
                          <PixelText size="xs" color="text-gray-500">
                            {habit.frequency === 'daily' ? 'Diario' : 'Semanal'}
                          </PixelText>
                        </div>
                      </div>
                      
                      <SpriteButton
                        label="✓"
                        onClick={() => handleMarkComplete(habit.id)}
                        className="px-3 min-w-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PixelCard>
    </div>
  );
}

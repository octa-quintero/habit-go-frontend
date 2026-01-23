/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '../../../components/ui/Card/PixelCard';
import PixelText from '../../../components/ui/Text/PixelText';
import PixelInput from '../../../components/ui/Input/PixelInput';
import SpriteButton from '../../../components/ui/Button/SpriteButton';
import { habitsService } from '@/lib/api/habitsService';
import type { CreateHabitDto } from '@/types/api';

export default function CreateHabitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateHabitDto>({
    title: '',
    description: '',
    frequency: 'daily',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await habitsService.create(formData);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear el hábito';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelCard gap="gap-0">
        <div className="flex flex-col h-full py-8 px-4">
          {/* Header */}
          <div className="flex flex-row items-center justify-between w-full gap-4 mb-6">
            <PixelText 
              as="h1"
              size="xl"
              color="text-gray-900"
              fontWeight={700}
            >
              Nuevo Hábito
            </PixelText>
            <span className="relative flex items-center justify-center" style={{ minWidth: '5rem', minHeight: '4rem' }}>
              <img 
                src="/logo/Marco.png" 
                alt="Marco de Tito" 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-0" 
                style={{ imageRendering: 'pixelated' }} 
              />
              <img 
                src="/logo/TitoElGatito.gif" 
                alt="Tito el Gatito" 
                className="relative z-10 w-10 h-10" 
                style={{ imageRendering: 'pixelated' }} 
              />
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <PixelInput
              label="Título"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="Ej: Hacer ejercicio"
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-[0.70rem] font-press-start text-black">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                placeholder="Opcional..."
                className="w-full px-2 py-1.5 text-[0.6rem] font-press-start text-black border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                rows={3}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="frequency" className="text-[0.70rem] font-press-start text-black">
                Frecuencia
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-2 py-1.5 text-[0.6rem] font-press-start text-black border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ imageRendering: 'pixelated' }}
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
              </select>
            </div>

            {error && (
              <div className="px-2 py-1 bg-red-100 border-2 border-red-500">
                <PixelText size="xs" color="text-red-700" align="center">
                  {error}
                </PixelText>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <SpriteButton
                type="submit"
                label={loading ? 'Creando...' : 'Crear Hábito'}
                disabled={loading}
                className="w-full sm:flex-1"
              />
              <SpriteButton
                type="button"
                variant="black"
                label="Cancelar"
                onClick={() => router.push('/dashboard')}
                disabled={loading}
                className="w-full sm:flex-1"
              />
            </div>
          </form>
        </div>
      </PixelCard>
    </div>
  );
}

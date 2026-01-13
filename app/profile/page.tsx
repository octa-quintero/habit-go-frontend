/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelText from '../../components/ui/Text/PixelText';
import AuthLayout from '../../components/layouts/AuthLayout';
import { usersService } from '@/lib/api/usersService';
import { getUser, clearAuth } from '@/lib/auth';
import type { User } from '@/types/api';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profile = await usersService.getProfile();
      setUser(profile);
      setFormData({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        password: '',
      });
    } catch (err: any) {
      console.error('Error al cargar perfil:', err);
      setError('No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Solo enviar campos que cambiaron
      const updates: any = {};
      if (formData.name !== user?.name) updates.name = formData.name;
      if (formData.username !== user?.username) updates.username = formData.username;
      if (formData.email !== user?.email) updates.email = formData.email;
      if (formData.password) updates.password = formData.password;

      if (Object.keys(updates).length === 0) {
        setError('No hay cambios para guardar');
        return;
      }

      await usersService.updateProfile(updates);
      setSuccess('Perfil actualizado correctamente');
      setFormData(prev => ({ ...prev, password: '' }));
      await loadProfile();
    } catch (err: any) {
      console.error('Error al actualizar perfil:', err);
      setError(err.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setSaving(true);
      await usersService.deleteAccount();
      clearAuth();
      router.push('/');
    } catch (err: any) {
      console.error('Error al eliminar cuenta:', err);
      setError(err.response?.data?.message || 'Error al eliminar la cuenta');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AuthLayout
        title="Mi Perfil"
        bottomContent={
          <div className="flex justify-center py-4">
            <PixelText size="sm" color="text-gray-600">
              Cargando...
            </PixelText>
          </div>
        }
      >
        <div className="h-48" />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Mi Perfil"
      bottomContent={
        <div className="space-y-4">
          {error && (
            <div className="px-3 py-2 bg-red-100 border-2 border-red-500">
              <PixelText size="xs" color="text-red-700" align="center">
                {error}
              </PixelText>
            </div>
          )}
          
          {success && (
            <div className="px-3 py-2 bg-green-100 border-2 border-green-500">
              <PixelText size="xs" color="text-green-700" align="center">
                {success}
              </PixelText>
            </div>
          )}

          <div className="w-full flex flex-col gap-2">
            <SpriteButton
              label={saving ? 'Guardando...' : 'Guardar Cambios'}
              disabled={saving}
              onClick={handleSave}
              className="w-full"
            />
            <SpriteButton
              variant="white"
              label="Volver al Dashboard"
              disabled={saving}
              onClick={() => router.push('/dashboard')}
              className="w-full"
            />
            <SpriteButton
              variant="black"
              label="Eliminar Cuenta"
              disabled={saving}
              onClick={handleDeleteAccount}
              className="w-full"
            />
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Nombre */}
        <div className="space-y-1">
          <PixelText size="xs" color="text-gray-700" fontWeight={700}>
            Nombre
          </PixelText>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-900 focus:outline-none focus:border-gray-600"
            style={{ 
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              imageRendering: 'pixelated',
            }}
            disabled={saving}
          />
        </div>

        {/* Username */}
        <div className="space-y-1">
          <PixelText size="xs" color="text-gray-700" fontWeight={700}>
            Usuario
          </PixelText>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-900 focus:outline-none focus:border-gray-600"
            style={{ 
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              imageRendering: 'pixelated',
            }}
            disabled={saving}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <PixelText size="xs" color="text-gray-700" fontWeight={700}>
            Email
          </PixelText>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-900 focus:outline-none focus:border-gray-600"
            style={{ 
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              imageRendering: 'pixelated',
            }}
            disabled={saving}
          />
        </div>

        {/* Contraseña */}
        <div className="space-y-1">
          <PixelText size="xs" color="text-gray-700" fontWeight={700}>
            Nueva Contraseña (opcional)
          </PixelText>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Dejar en blanco para mantener"
            className="w-full px-3 py-2 border-2 border-gray-900 focus:outline-none focus:border-gray-600"
            style={{ 
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              imageRendering: 'pixelated',
            }}
            disabled={saving}
          />
        </div>

        {/* Información adicional */}
        {user && (
          <div className="pt-2 border-t-2 border-gray-300 space-y-1">
            <PixelText size="xs" color="text-gray-500">
              Cuenta creada: {new Date(user.createdAt).toLocaleDateString()}
            </PixelText>
            <PixelText size="xs" color="text-gray-500">
              Rol: {user.role}
            </PixelText>
            {user.emailVerified && (
              <PixelText size="xs" color="text-green-600">
                ✓ Email verificado
              </PixelText>
            )}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

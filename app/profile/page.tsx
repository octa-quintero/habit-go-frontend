/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelText from '../../components/ui/Text/PixelText';
import PixelInput from '../../components/ui/Input/PixelInput';
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
  });

  // Estado para controlar qué campos son editables
  const [editableFields, setEditableFields] = useState({
    name: false,
    username: false,
    email: false,
  });

  // Estado para cambio de contraseña
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const toggleEdit = (field: keyof typeof editableFields) => {
    setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

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
      });
    } catch (err: any) {
      console.error('Error al cargar perfil:', err);
      setError('No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      await loadProfile();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Validaciones
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setError('Todos los campos de contraseña son requeridos');
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('Las contraseñas nuevas no coinciden');
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      // Actualizar contraseña
      await usersService.updateProfile({
        password: passwordData.newPassword,
      });

      setSuccess('Contraseña actualizada correctamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordSection(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cambiar la contraseña');
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

          <div className="w-full flex flex-row gap-2">
            <SpriteButton
              label={saving ? 'Guardando...' : 'Guardar Cambios'}
              disabled={saving}
              onClick={handleSave}
              className="flex-1"
            />
            <SpriteButton
              variant="white"
              label="Volver al Dashboard"
              disabled={saving}
              onClick={() => router.push('/dashboard')}
              className="flex-1"
            />
            <SpriteButton
              variant="black"
              label="Eliminar Cuenta"
              disabled={saving}
              onClick={handleDeleteAccount}
              className="flex-1"
            />
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Nombre */}
        <PixelInput
          label="Nombre"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          disabled={saving}
          showEditIcon
          isEditable={editableFields.name}
          onEditClick={() => toggleEdit('name')}
        />

        {/* Username */}
        <PixelInput
          label="Usuario"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          disabled={saving}
          showEditIcon
          isEditable={editableFields.username}
          onEditClick={() => toggleEdit('username')}
        />

        {/* Email */}
        <PixelInput
          label="Email"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          disabled={saving}
          showEditIcon
          isEditable={editableFields.email}
          onEditClick={() => toggleEdit('email')}
        />

        {/* Cambiar Contraseña */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => router.push('/auth/forgot-password')}
            className="text-left w-full"
            disabled={saving}
          >
            <PixelText 
              size="sm" 
              color="text-blue-600 hover:text-blue-700"
              className="cursor-pointer underline"
            >
              Cambiar contraseña
            </PixelText>
          </button>
        </div>

        {/* Sección de cambio de contraseña anterior (comentada por si acaso)
        <div className="pt-2 border-t-2 border-gray-300">
          <button
            type="button"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
            className="text-left w-full"
            disabled={saving}
          >
            <PixelText 
              size="sm" 
              color="text-blue-600 hover:text-blue-700"
              className="cursor-pointer underline"
            >
              {showPasswordSection ? '▼ Ocultar cambio de contraseña' : '▶ Cambiar contraseña'}
            </PixelText>
          </button>

          {showPasswordSection && (
            <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-300">
              <PixelInput
                label="Contraseña Actual"
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                disabled={saving}
                placeholder="Ingresa tu contraseña actual"
              />

              <PixelInput
                label="Nueva Contraseña"
                type="password"
                name="newPassword"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                disabled={saving}
                placeholder="Mínimo 6 caracteres"
              />

              <PixelInput
                label="Confirmar Nueva Contraseña"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                disabled={saving}
                placeholder="Repite la nueva contraseña"
              />

              <SpriteButton
                label={saving ? 'Cambiando...' : 'Cambiar Contraseña'}
                disabled={saving}
                onClick={handleChangePassword}
                className="w-full"
              />
            </div>
          )}
        </div>
        */}

        {/* Información adicional */}
        {user && (
          <div className="pt-2 border-t-2 border-gray-300 space-y-1">
            <PixelText size="xs" color="text-gray-500">
              Cuenta creada: <span className="font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
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
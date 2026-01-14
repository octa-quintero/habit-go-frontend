"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';
import PixelText from '@/components/ui/Text/PixelText';
import PixelInput from '@/components/ui/Input/PixelInput';
import SpriteButton from '@/components/ui/Button/SpriteButton';
import { authService } from '@/lib/api/authService';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (tokenParam) setToken(tokenParam);
    if (emailParam) setEmail(emailParam);
    
    if (!tokenParam) {
      setError('Token de restablecimiento no válido');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Token no válido');
      return;
    }

    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.resetPassword(email, token, newPassword);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Contraseña Restablecida"
        bottomContent={
          <div className="space-y-4">
            <div className="px-3 py-2 bg-green-100 border-2 border-green-500">
              <PixelText size="xs" color="text-green-700" align="center">
                Tu contraseña ha sido restablecida exitosamente
              </PixelText>
            </div>
            <SpriteButton
              label="Ir al Login"
              onClick={() => router.push('/login')}
              className="w-full"
            />
          </div>
        }
      >
        <div className="text-center">
          <PixelText size="sm" color="text-gray-600">
            Ya puedes iniciar sesión con tu nueva contraseña.
          </PixelText>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Restablecer Contraseña"
      bottomContent={
        <div className="space-y-4">
          {error && (
            <div className="px-3 py-2 bg-red-100 border-2 border-red-500">
              <PixelText size="xs" color="text-red-700" align="center">
                {error}
              </PixelText>
            </div>
          )}
          
          <SpriteButton
            label={loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            disabled={loading || !token}
            onClick={handleSubmit}
            className="w-full"
          />
          
          <SpriteButton
            variant="white"
            label="Volver al Login"
            disabled={loading}
            onClick={() => router.push('/login')}
            className="w-full"
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <PixelText size="sm" color="text-gray-600" align="center">
          Ingresa tu nueva contraseña.
        </PixelText>

        <PixelInput
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="tu@email.com"
          required
        />

        <PixelInput
          label="Nueva Contraseña"
          type="password"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
          placeholder="Mínimo 6 caracteres"
          required
        />

        <PixelInput
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          placeholder="Repite la contraseña"
          required
        />
      </form>
    </AuthLayout>
  );
}

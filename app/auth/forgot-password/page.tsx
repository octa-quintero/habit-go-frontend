"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';
import PixelText from '@/components/ui/Text/PixelText';
import PixelInput from '@/components/ui/Input/PixelInput';
import SpriteButton from '@/components/ui/Button/SpriteButton';
import { authService } from '@/lib/api/authService';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al enviar el email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Email Enviado"
        bottomContent={
          <div className="space-y-4">
            <div className="px-3 py-2 bg-green-100 border-2 border-green-500">
              <PixelText size="xs" color="text-green-700" align="center">
                Hemos enviado un email con instrucciones para restablecer tu contraseña
              </PixelText>
            </div>
            <SpriteButton
              label="Volver al Login"
              onClick={() => router.push('/login')}
              className="w-full"
            />
          </div>
        }
      >
        <div className="space-y-4 text-center">
          <PixelText size="sm" color="text-gray-600">
            Revisa tu bandeja de entrada y sigue las instrucciones del email.
          </PixelText>
          <PixelText size="xs" color="text-gray-500">
            Si no recibes el email en unos minutos, revisa tu carpeta de spam.
          </PixelText>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Recuperar Contraseña"
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
            label={loading ? 'Enviando...' : 'Enviar Email'}
            disabled={loading}
            onClick={handleSubmit}
            className="w-full"
          />
          
          <SpriteButton
            variant="white"
            label="Volver"
            disabled={loading}
            onClick={() => router.back()}
            className="w-full"
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <PixelText size="sm" color="text-gray-600" align="center">
          Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
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
      </form>
    </AuthLayout>
  );
}

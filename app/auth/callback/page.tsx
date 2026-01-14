"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';
import PixelText from '@/components/ui/Text/PixelText';
import { saveTokens, saveUser } from '@/lib/auth';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userDataParam = searchParams.get('userData');

    if (!token && !accessToken) {
      setError('No se recibió token de autenticación');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      return;
    }

    try {
      // Si recibimos token único, usarlo para ambos
      if (token) {
        saveTokens(token, token);
      } else if (accessToken && refreshToken) {
        saveTokens(accessToken, refreshToken);
      }

      // Si viene userData en la URL, guardarlo
      if (userDataParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userDataParam));
          saveUser(userData);
        } catch (err) {
          console.error('Error al parsear userData:', err);
        }
      }

      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error en callback:', err);
      setError('Error al procesar la autenticación');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <AuthLayout title="Error de Autenticación" bottomContent={null}>
        <div className="text-center space-y-4">
          <PixelText size="sm" color="text-red-600">
            {error}
          </PixelText>
          <PixelText size="xs" color="text-gray-500">
            Redirigiendo al login...
          </PixelText>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Autenticando..." bottomContent={null}>
      <div className="text-center space-y-4">
        <PixelText size="sm" color="text-gray-600">
          Procesando autenticación con Google...
        </PixelText>
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full"></div>
        </div>
      </div>
    </AuthLayout>
  );
}

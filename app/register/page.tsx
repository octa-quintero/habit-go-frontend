/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelText from '../../components/ui/Text/PixelText';
import RegisterForm from '../../components/features/Auth/RegisterForm';
import AuthLayout from '../../components/layouts/AuthLayout';
import { API_BASE_URL } from '@/lib/constants';
import { getUser } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<{ submit: () => void } | null>(null);

  useEffect(() => {
    // Si ya está logueado, redirigir al dashboard
    const user = getUser();
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleCreateAccount = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleGoogleLogin = () => {
    // Redirigir al endpoint de Google OAuth del backend
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <AuthLayout
      title="Registrarse"
      bottomContent={
        <div className="space-y-6">
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <SpriteButton
              label={loading ? 'Creando...' : 'Crear Cuenta'}
              disabled={loading}
              onClick={handleCreateAccount}
              className="w-full sm:flex-1"
            />
            <SpriteButton
              variant="black"
              label="Continuar con Gmail"
              icon={
                <img 
                  src="/social/gmail.png" 
                  alt="Gmail" 
                  className="w-5 h-5" 
                  style={{ imageRendering: 'pixelated' }} 
                />
              }
              iconPosition="right"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full sm:flex-1"
            />
          </div>

          <PixelText size="xs" color="text-gray-600" align="center">
            ¿Ya tienes cuenta?{' '}
            <Link 
              href="/login" 
              className="text-black font-bold hover:text-primary hover:underline transition-all duration-200 hover:scale-105 inline-block"
            >
              Inicia Sesión
            </Link>
          </PixelText>
        </div>
      }
    >
      <RegisterForm 
        formRef={formRef}
        onLoadingChange={setLoading}
      />
    </AuthLayout>
  );
}

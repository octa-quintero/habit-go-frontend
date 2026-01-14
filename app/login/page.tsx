/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelText from '../../components/ui/Text/PixelText';
import LoginForm from '../../components/features/Auth/LoginForm';
import AuthLayout from '../../components/layouts/AuthLayout';
import { API_BASE_URL } from '@/lib/constants';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleLogin = () => {
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
      title="Iniciar Sesión"
      bottomContent={
        <div className="space-y-6">
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <SpriteButton
              label={loading ? 'Ingresando...' : 'Iniciar Sesión'}
              disabled={loading}
              onClick={handleLogin}
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
            ¿No tienes cuenta?{' '}
            <Link 
              href="/register" 
              className="text-black font-bold hover:text-primary hover:underline transition-all duration-200 hover:scale-105 inline-block"
            >
              Regístrate
            </Link>
          </PixelText>
        </div>
      }
    >
      <LoginForm 
        formRef={formRef}
        onLoadingChange={setLoading}
      />
    </AuthLayout>
  );
}

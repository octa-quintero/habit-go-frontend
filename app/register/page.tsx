/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelText from '../../components/ui/Text/PixelText';
import RegisterForm from '../../components/features/Auth/RegisterForm';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleCreateAccount = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelCard gap="gap-8">
          {/* Logo y Título */}
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <PixelText 
              as="h1"
              size="xl"
              color="text-gray-900"
              align="left"
              fontWeight={700}
            >
              Registrarse
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

          {/* Formulario de Registro */}
          <RegisterForm 
            formRef={formRef}
            onLoadingChange={setLoading}
          />

          {/* Botones de Acción */}
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
              className="w-full sm:flex-1"
            />
          </div>

          {/* Login Link */}
          <PixelText size="xs" color="text-gray-600" align="center">
            ¿Ya tienes cuenta?{' '}
            <Link 
              href="/login" 
              className="text-black font-bold hover:text-primary hover:underline transition-all duration-200 hover:scale-105 inline-block"
            >
              Inicia Sesión
            </Link>
          </PixelText>
      </PixelCard>
    </div>
  );
}

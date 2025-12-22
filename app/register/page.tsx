/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from 'react';
import Link from 'next/link';
import SpriteButton from '../../components/ui/Button/SpriteButton';
import PixelCard from '../../components/ui/Card/PixelCard';
import PixelText from '../../components/ui/Text/PixelText';
import RegisterForm from '../../components/features/Auth/RegisterForm';

export default function RegisterPage() {
  const [] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelCard gap="gap-2">
          {/* Logo */}
          <div className="flex flex-col items-center gap-1">
            <span className="relative flex items-center justify-center" style={{ minWidth: '3rem', minHeight: '2rem' }}>
              <img 
                src="/logo/Marco.png" 
                alt="Marco de Tito" 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-0" 
                style={{ imageRendering: 'pixelated' }} 
              />
              <img 
                src="/logo/TitoElGatito.gif" 
                alt="Tito el Gatito" 
                className="relative z-10 w-6 h-6" 
                style={{ imageRendering: 'pixelated' }} 
              />
            </span>
            <PixelText 
              as="h1"
              size="sm"
              color="text-gray-900"
              align="center"
              fontWeight={700}
            >
              Registrarse
            </PixelText>
          </div>

          {/* Formulario de Registro */}
          <RegisterForm />

          {/* Divider */}
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-0.5 bg-gray-400"></div>
            <PixelText size="xs" color="text-gray-500">o</PixelText>
            <div className="flex-1 h-0.5 bg-gray-400"></div>
          </div>

          {/* Google Button */}
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
            className="w-full"
          />

          {/* Login Link */}
          <PixelText size="xs" color="text-gray-600" align="center">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Inicia Sesión
            </Link>
          </PixelText>
      </PixelCard>
    </div>
  );
}

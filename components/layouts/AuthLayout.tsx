/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PixelCard from '../ui/Card/PixelCard';
import PixelText from '../ui/Text/PixelText';

export interface AuthLayoutProps {
  /** Título de la página (ej: "Registrarse", "Iniciar Sesión") */
  title: string;
  /** Contenido principal (formulario) */
  children: React.ReactNode;
  /** Contenido al final (botones y links) */
  bottomContent: React.ReactNode;
  /** Mostrar logo de Tito (default: true) */
  showLogo?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  bottomContent,
  showLogo = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PixelCard gap="gap-0">
        <div className="flex flex-col h-full py-8 px-4">
          {/* Logo y Título - Al principio */}
          <div className="flex flex-row items-center justify-between w-full gap-4 mb-6" style={{ height: '4rem' }}>
            <PixelText 
              as="h1"
              size="xl"
              color="text-gray-900"
              align="left"
              fontWeight={700}
            >
              {title}
            </PixelText>
            {showLogo && (
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
            )}
          </div>

          {/* Contenido Principal */}
          <div className="w-full mb-3" style={{ minHeight: '240px', maxHeight: '300px' }}>
            {children}
          </div>

          {/* Contenido Inferior */}
          <div className="w-full">
            {bottomContent}
          </div>
        </div>
      </PixelCard>
    </div>
  );
};

export default AuthLayout;

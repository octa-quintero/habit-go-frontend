/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PixelCard from '../ui/Card/PixelCard';
import PixelCardMobile from '../ui/Card/PixelCardMobile';
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
    <>
      {/* Desktop Version */}
      <div className="hidden sm:flex min-h-screen items-center justify-center p-4">
        <PixelCard gap="gap-0">
          <div className="flex flex-col h-full py-6 sm:py-8 px-3 sm:px-4">
            {/* Logo y Título - Al principio */}
            <div className="flex flex-row items-center justify-between w-full gap-2 sm:gap-4 mb-4 sm:mb-6" style={{ height: 'auto' }}>
              <PixelText 
                as="h1"
                size="lg sm:xl"
                color="text-gray-900"
                align="left"
                fontWeight={700}
                className="text-base sm:text-xl"
              >
                {title}
              </PixelText>
              {showLogo && (
                <span className="relative flex items-center justify-center flex-shrink-0" style={{ minWidth: '4rem', minHeight: '3rem' }}>
                  <img 
                    src="/logo/Marco.png" 
                    alt="Marco de Tito" 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 z-0" 
                    style={{ imageRendering: 'pixelated' }} 
                  />
                  <img 
                    src="/logo/TitoElGatito.gif" 
                    alt="Tito el Gatito" 
                    className="relative z-10 w-8 h-8 sm:w-10 sm:h-10" 
                    style={{ imageRendering: 'pixelated' }} 
                  />
                </span>
              )}
            </div>

            {/* Contenido Principal */}
            <div className="w-full mb-2 sm:mb-3 flex-grow">
              {children}
            </div>

            {/* Contenido Inferior */}
            <div className="w-full">
              {bottomContent}
            </div>
          </div>
        </PixelCard>
      </div>
      
      {/* Mobile Version */}
      <div className="sm:hidden">
        <PixelCardMobile gap="gap-0">
          <div className="flex flex-col w-full py-4 px-2">
            {/* Logo y Título - Al principio */}
            <div className="flex flex-row items-center justify-between w-full gap-1 mb-2" style={{ height: 'auto' }}>
              <PixelText 
                as="h1"
                size="lg"
                color="text-gray-900"
                align="left"
                fontWeight={700}
                className="text-sm"
              >
                {title}
              </PixelText>
              {showLogo && (
                <span className="relative flex items-center justify-center flex-shrink-0" style={{ minWidth: '3rem', minHeight: '2.5rem' }}>
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
              )}
            </div>

            {/* Contenido Principal */}
            <div className="w-full mb-1">
              {children}
            </div>

            {/* Contenido Inferior */}
            <div className="w-full">
              {bottomContent}
            </div>
          </div>
        </PixelCardMobile>
      </div>
    </>
  );
};

export default AuthLayout;

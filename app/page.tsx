/* eslint-disable @next/next/no-img-element */
"use client";
import SpriteButton from '../components/ui/Button/SpriteButton';
import PixelCard from '../components/ui/Card/PixelCard';
import PixelText from '../components/ui/Text/PixelText';
import Link from "next/link";
import { API_BASE_URL } from '@/lib/constants';

export default function Home() {
  const handleGoogleLogin = () => {
    // Redirigir al endpoint de Google OAuth del backend
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <PixelCard gap="gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 w-full">
                <img 
                  src="/habit-go/habit-go.png" 
                  alt="Habit-GO Logo" 
                  className="h-20 sm:h-20 w-auto" 
                  style={{ imageRendering: 'pixelated' }} 
                />
            <span className="relative flex items-center justify-center" style={{ minWidth: '8rem', minHeight: '4rem' }}>
              <img src="/logo/Marco.png" alt="Marco de Tito" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-26 h-26 sm:w-26 sm:h-26 z-0" style={{ imageRendering: 'pixelated' }} />
              <img src="/logo/TitoElGatito.gif" alt="Tito el Gatito" className="relative z-10 w-12 h-12 sm:w-15 sm:h-15" style={{ imageRendering: 'pixelated' }} />
            </span>
          </div>
          <PixelText 
            size="base"
            color="text-black"
            align="center"
            maxWidth="max-w-xs sm:max-w-xl"
            opacity={0.8}
            fontWeight={200}
            className="mx-auto"
          >
            Construye mejores hábitos, un día a la vez. Seguimiento, rachas y recompensas.
          </PixelText>
            <div className="flex flex-col items-center w-full gap-4">
              <div className="flex flex-col sm:flex-row gap-5 justify-center w-full mb-0">
                <Link href="/login" className="w-full sm:w-auto">
                  <SpriteButton label="Iniciar Sesión" className="w-full sm:w-auto" />
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <SpriteButton label="Registrarse" className="w-full sm:w-auto" />
                </Link>
              </div>
              <div className="flex justify-center w-full mt-0">
                <SpriteButton
                  label="Continuar con Gmail"
                  variant="black"
                  icon={<img src="/social/gmail.png" alt="Gmail" className="w-6 h-6 inline-block align-middle shrink-0 m-0" style={{ imageRendering: 'pixelated' }} />}
                  iconPosition="right"
                  onClick={handleGoogleLogin}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
      </PixelCard>
    </div>
  );
}
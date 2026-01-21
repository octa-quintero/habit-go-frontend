/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpriteButton from '../components/ui/Button/SpriteButton';
import PixelCard from '../components/ui/Card/PixelCard';
import PixelCardMobile from '../components/ui/Card/PixelCardMobile';
import PixelText from '../components/ui/Text/PixelText';
import Link from "next/link";
import { API_BASE_URL } from '@/lib/constants';
import { getUser } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Verificar si el usuario está logueado
    const user = getUser();
    if (user) {
      // Si está logueado, redirigir al dashboard
      router.push('/dashboard');
    }
  }, [router]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const cardContent = (
    <>
            <div className="flex flex-row items-center justify-center gap-0 w-full">
                <img 
                  src="/habit-go/habit-go.png" 
                  alt="Habit-GO Logo" 
                  className="h-12 sm:h-20 w-auto" 
                  style={{ imageRendering: 'pixelated' }} 
                />
            <span className="relative flex items-center justify-center" style={{ minWidth: '6rem', minHeight: '3rem' }}>
              <img src="/logo/Marco.png" alt="Marco de Tito" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-26 sm:h-26 z-0" style={{ imageRendering: 'pixelated' }} />
              <img src="/logo/TitoElGatito.gif" alt="Tito el Gatito" className="relative z-10 w-10 h-10 sm:w-15 sm:h-15" style={{ imageRendering: 'pixelated' }} />
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
              <div className="flex flex-row gap-1 sm:gap-5 justify-center w-full mb-0 flex-wrap">
                <Link href="/login" className="shrink min-w-0">
                  <SpriteButton label="Iniciar Sesión" minWidth={150} />
                </Link>
                <Link href="/register" className="shrink min-w-0">
                  <SpriteButton label="Registrarse" minWidth={150} />
                </Link>
              </div>
              <div className="flex justify-center w-full mt-0 px-2">
                <SpriteButton
                  label="Continuar con Gmail"
                  variant="black"
                  icon={<img src="/social/gmail.png" alt="Gmail" className="w-6 h-6 inline-block align-middle shrink-0 m-0" style={{ imageRendering: 'pixelated' }} />}
                  iconPosition="right"
                  onClick={handleGoogleLogin}
                  minWidth={180}
                />
              </div>
            </div>
    </>
  );

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden sm:flex min-h-screen items-center justify-center">
        <PixelCard gap="gap-8">
          {cardContent}
        </PixelCard>
      </div>
      
      {/* Mobile Version */}
      <div className="sm:hidden">
        <PixelCardMobile gap="gap-6">
          {cardContent}
        </PixelCardMobile>
      </div>
    </>
  );
}
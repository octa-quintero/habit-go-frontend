/* eslint-disable @next/next/no-img-element */
import SpriteButtonBlack from '../components/ui/Button/SpriteButtonBlack';
import SpriteButton from '../components/ui/Button/SpriteButton';
import PixelCard from '../components/ui/Card/PixelCard';
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PixelCard>
          <main className="text-center px-2 sm:px-8 w-full flex flex-col gap-8 items-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 w-full">
                <span
                  className="text-3xl sm:text-5xl font-press-start text-gray-900"
                  style={{
                    fontWeight: 400,
                    textDecoration: 'underline',
                    textDecorationColor: '#222',
                    textDecorationThickness: '4px',
                    textUnderlineOffset: '6px',
                  }}
                >
                  Habit-GO
                </span>
            <span className="relative flex items-center justify-center" style={{ minWidth: '8rem', minHeight: '4rem' }}>
              <img src="/logo/Marco.png" alt="Marco de Tito" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-26 h-26 sm:w-26 sm:h-26 z-0" style={{ imageRendering: 'pixelated' }} />
              <img src="/logo/TitoElGatito.gif" alt="Tito el Gatito" className="relative z-10 w-12 h-12 sm:w-15 sm:h-15" style={{ imageRendering: 'pixelated' }} />
            </span>
          </div>
          <p className="font-press-start text-base sm:text-xl text-black max-w-xs sm:max-w-xl mx-auto" style={{ opacity: 0.8, fontWeight: 200 }}>
            Construye mejores hábitos, un día a la vez. Seguimiento, rachas y recompensas.
          </p>
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
                <SpriteButtonBlack
                  label={<>Continuar<br />con Gmail</>}
                  icon={<img src="/social/gmail.png" alt="Gmail" className="w-6 h-6 inline-block align-middle shrink-0 m-0" style={{ imageRendering: 'pixelated' }} />}
                  className="w-full sm:w-auto max-w-[30px]"
                />
              </div>
            </div>
        </main>
      </PixelCard>
    </div>
  );
}
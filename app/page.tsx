import { PixelButton } from '../components/ui/Button';
import PixelGamingButton from '../components/ui/Button/PixelGamingButton';
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Habit Go 🌱
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Construye mejores hábitos, un día a la vez. Seguimiento, rachas y recompensas.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <PixelButton>
              Iniciar Sesión
            </PixelButton>
          </Link>
          <Link href="/register">
            <PixelGamingButton>
              Registrarse
            </PixelGamingButton>
          </Link>
        </div>
      </main>
    </div>
  );
}

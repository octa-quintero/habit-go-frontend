import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Habit Go 🌱
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Construye mejores hábitos, un día a la vez. Seguimiento, rachas y recompensas.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Registrarse
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

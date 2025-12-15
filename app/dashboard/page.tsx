'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Habit Go</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Hola, {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Bienvenido de vuelta, {user.name}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mis Hábitos
            </h3>
            <p className="text-gray-600 text-sm">
              Gestiona tus hábitos diarios y semanales
            </p>
            <div className="mt-4 text-3xl font-bold text-blue-600">0</div>
            <p className="text-sm text-gray-500">hábitos activos</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Racha Actual
            </h3>
            <p className="text-gray-600 text-sm">
              Tu mejor racha hasta ahora
            </p>
            <div className="mt-4 text-3xl font-bold text-orange-600">0</div>
            <p className="text-sm text-gray-500">días consecutivos</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Recompensas
            </h3>
            <p className="text-gray-600 text-sm">
              Insignias desbloqueadas
            </p>
            <div className="mt-4 text-3xl font-bold text-purple-600">0</div>
            <p className="text-sm text-gray-500">insignias obtenidas</p>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información del Usuario
            </h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.username}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono text-xs">
                  {user.id}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </main>
    </div>
  );
}

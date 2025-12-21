'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { LoginRequest, CreateUserDto, UserData } from '@/types/api';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(credentials);
      setUser(data.userData);
      router.push('/dashboard');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const register = async (userData: CreateUserDto) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.register(userData);
      // Después de registrar, hacer login automático
      await login({ email: userData.email, password: userData.password });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrarse';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}

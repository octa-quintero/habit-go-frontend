'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { saveTokens, saveUser, clearAuth, getUser } from '@/lib/auth';
import type { LoginRequest, LoginResponse, UserData } from '@/types/api';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      
      // Guardar tokens y usuario
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.userData);
      setUser(data.userData);
      
      // Redirigir al dashboard
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
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      clearAuth();
      setUser(null);
      router.push('/login');
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.post('/users/:create', userData);
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

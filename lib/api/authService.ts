import api from '../apiClient';
import type { LoginRequest, LoginResponse, CreateUserDto } from '@/types/api';
import { saveTokens, saveUser, clearAuth } from '@/lib/auth';

export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    
    // Guardar accessToken siempre que exista
    if (data.accessToken) {
      // Si hay refreshToken, guardarlo; sino usar el accessToken como fallback
      const refreshToken = data.refreshToken || data.accessToken;
      saveTokens(data.accessToken, refreshToken);
      saveUser(data.userData);
    }
    
    return data;
  },

  /**
   * Registrar nuevo usuario
   */
  async register(userData: CreateUserDto): Promise<void> {
    await api.post('/users/create', userData);
  },

  /**
   * Refrescar token de acceso
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/refresh', { refreshToken });
    
    if (data.accessToken && data.refreshToken) {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.userData);
    }
    
    return data;
  },

  /**
   * Cerrar sesión
   */
  async logout(refreshToken: string): Promise<void> {
    try {
      await api.post('/auth/logout', { refreshToken });
    } finally {
      clearAuth();
    }
  },

  /**
   * Solicitar restablecimiento de contraseña
   */
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * Restablecer contraseña
   */
  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { email, token, newPassword });
  },

  /**
   * Login con Google
   */
  async loginWithGoogle(credential: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/google/login', { credential });
    
    if (data.accessToken && data.refreshToken) {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.userData);
    }
    
    return data;
  },
};

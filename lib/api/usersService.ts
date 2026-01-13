import api from '../apiClient';
import { getUser } from '../auth';
import type { User } from '@/types/api';

export interface UpdateProfileDto {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export const usersService = {
  // Obtener perfil del usuario autenticado
  async getProfile(): Promise<User> {
    const userData = getUser();
    if (!userData) throw new Error('Usuario no autenticado');
    
    const response = await api.get(`/users/${userData.id}`);
    return response.data;
  },

  // Actualizar perfil del usuario autenticado
  async updateProfile(data: UpdateProfileDto): Promise<User> {
    const userData = getUser();
    if (!userData) throw new Error('Usuario no autenticado');
    
    const response = await api.patch(`/users/${userData.id}`, data);
    return response.data;
  },

  // Eliminar cuenta (soft delete)
  async deleteAccount(): Promise<{ message: string }> {
    const userData = getUser();
    if (!userData) throw new Error('Usuario no autenticado');
    
    const response = await api.delete(`/users/${userData.id}`);
    return response.data;
  },
};

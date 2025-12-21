import api from '../apiClient';
import type {
  Habit,
  CreateHabitDto,
  UpdateHabitDto,
  HabitStats,
  HabitRegister,
  CreateHabitRegisterDto,
  StreakData,
} from '@/types/api';

export const habitsService = {
  /**
   * Obtener todos los hábitos del usuario
   */
  async getAll(): Promise<Habit[]> {
    const { data } = await api.get<Habit[]>('/habits');
    return data;
  },

  /**
   * Obtener un hábito específico
   */
  async getById(id: string): Promise<Habit> {
    const { data } = await api.get<Habit>(`/habits/${id}`);
    return data;
  },

  /**
   * Crear un nuevo hábito
   */
  async create(habitData: CreateHabitDto): Promise<Habit> {
    const { data } = await api.post<Habit>('/habits', habitData);
    return data;
  },

  /**
   * Actualizar un hábito
   */
  async update(id: string, habitData: UpdateHabitDto): Promise<Habit> {
    const { data } = await api.patch<Habit>(`/habits/${id}`, habitData);
    return data;
  },

  /**
   * Eliminar un hábito
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/habits/${id}`);
  },

  /**
   * Obtener estadísticas de un hábito
   */
  async getStats(id: string): Promise<HabitStats> {
    const { data } = await api.get<HabitStats>(`/habits/${id}/stats`);
    return data;
  },

  /**
   * Marcar hábito como completado
   */
  async markAsCompleted(habitId: string, notes?: string): Promise<HabitRegister> {
    const { data } = await api.post<HabitRegister>('/habit-register', {
      habitId,
      notes,
    } as CreateHabitRegisterDto);
    return data;
  },

  /**
   * Obtener historial de completaciones
   */
  async getHistory(habitId: string): Promise<HabitRegister[]> {
    const { data } = await api.get<HabitRegister[]>(`/habit-register/history/${habitId}`);
    return data;
  },

  /**
   * Obtener datos de racha
   */
  async getStreakData(habitId: string): Promise<StreakData> {
    const { data } = await api.get<StreakData>(`/habits/${habitId}/streak`);
    return data;
  },
};

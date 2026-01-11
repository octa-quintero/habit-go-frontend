import api from '../apiClient';
import type { Reward, UserReward, MarkViewedDto } from '@/types/api';

export const rewardsService = {
  /**
   * Obtener todas las recompensas disponibles
   */
  async getAll(): Promise<Reward[]> {
    const { data } = await api.get<Reward[]>('/rewards');
    return data;
  },

  /**
   * Obtener recompensas del usuario
   */
  async getUserRewards(): Promise<UserReward[]> {
    const { data } = await api.get<UserReward[]>('/rewards/user');
    return data;
  },

  /**
   * Reclamar una recompensa
   */
  async claimReward(rewardId: string): Promise<UserReward> {
    const { data } = await api.post<UserReward>(`/rewards/${rewardId}/claim`, {});
    return data;
  },

  /**
   * Marcar recompensas como vistas
   */
  async markAsViewed(rewardIds: string[]): Promise<void> {
    const payload: MarkViewedDto = { rewardIds };
    await api.post('/rewards/mark-viewed', payload);
  },

  /**
   * Obtener una recompensa específica
   */
  async getById(rewardId: string): Promise<Reward> {
    const { data } = await api.get<Reward>(`/rewards/${rewardId}`);
    return data;
  },
};

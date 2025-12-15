// Tipos basados en el backend

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userData: UserData;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// User
export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Habit
export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  currentStreak?: number;
  totalCompletions?: number;
}

export interface CreateHabitDto {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
}

export interface UpdateHabitDto {
  title?: string;
  description?: string;
  frequency?: 'daily' | 'weekly';
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  lastCompletedDate?: string;
  completionRate: number;
}

// Habit Register
export interface HabitRegister {
  id: string;
  habitId: string;
  userId: string;
  completedDate: string;
  notes?: string;
  createdAt: string;
}

export interface CreateHabitRegisterDto {
  habitId: string;
  notes?: string;
}

export interface StreakData {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
}

// Reward
export interface Reward {
  id: string;
  code: string;
  name: string;
  description: string;
  type: RewardType;
  tier: RewardTier;
  icon: string;
  requirement: number;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserReward {
  id: string;
  userId: string;
  reward: Reward;
  unlockedAt: string;
  isViewed: boolean;
  progress: number;
}

export enum RewardType {
  STREAK = 'STREAK',
  HABIT_COUNT = 'HABIT_COUNT',
  TOTAL_COMPLETIONS = 'TOTAL_COMPLETIONS',
}

export enum RewardTier {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export interface MarkViewedDto {
  rewardIds: string[];
}

// API Response
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

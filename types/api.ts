/**
 * API Types & Interfaces for Habit-GO
 * 
 * This file contains all TypeScript interfaces and types for API communication
 * between the frontend and backend. Organized by domain (Auth, User, Habit, Reward).
 */

/* ========================================
   GENERIC API TYPES
   ======================================== */

/** Generic API Response wrapper */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  statusCode: number;
}

/** API Error Response */
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, any>;
}

/* ========================================
   AUTHENTICATION TYPES
   ======================================== */

/** Login Request Payload */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Login Response with tokens */
export interface LoginResponse {
  userData: UserData;
  accessToken: string;
  refreshToken: string;
}

/** Refresh Token Request */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Refresh Token Response */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/** Forgot Password Request */
export interface ForgotPasswordRequest {
  email: string;
}

/** Reset Password Request */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/* ========================================
   USER TYPES
   ======================================== */

/** User Data Entity */
export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Create User DTO */
export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

/** Update User DTO */
export interface UpdateUserDto {
  name?: string;
  username?: string;
  avatar?: string | null;
}

/* ========================================
   HABIT TYPES
   ======================================== */

/** Habit Frequency Type */
export type HabitFrequency = 'daily' | 'weekly';

/** Habit Entity */
export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  streak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  plantNumber: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  currentStreak?: number;
  totalCompletions?: number;
}

/** Create Habit DTO */
export interface CreateHabitDto {
  title: string;
  description?: string;
  frequency: HabitFrequency;
}

/** Update Habit DTO */
export interface UpdateHabitDto {
  title?: string;
  description?: string;
  frequency?: HabitFrequency;
  isActive?: boolean;
}

/** Habit Statistics */
export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  lastCompletedDate?: string;
  completionRate: number;
}

/* ========================================
   HABIT REGISTER TYPES (Completions)
   ======================================== */

/** Habit Completion Record */
export interface HabitRegister {
  id: string;
  habitId: string;
  userId: string;
  completedDate: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  alreadyCompleted?: boolean;
}

/** Create Habit Completion DTO */
export interface CreateHabitRegisterDto {
  habitId: string;
  notes?: string;
  completedDate?: string;
}

/** Streak Data */
export interface StreakData {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  completionRate?: number;
}

/* ========================================
   REWARD TYPES
   ======================================== */

/** Reward Type Enum */
export enum RewardType {
  STREAK = 'STREAK',
  HABIT_COUNT = 'HABIT_COUNT',
  TOTAL_COMPLETIONS = 'TOTAL_COMPLETIONS',
}

/** Reward Tier/Rarity Enum */
export enum RewardTier {
  STARTER = 'starter',
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  RARE_PLUS = 'rare_plus',
  EPIC = 'epic',
  EPIC_PLUS = 'epic_plus',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
  ULTIMATE = 'ultimate',
}

/** Reward Entity */
export interface Reward {
  id: string;
  code: string;
  name: string;
  description: string;
  type: RewardType;
  tier: RewardTier;
  icon: string;
  variant?: number; // 1, 2, 3 para diferentes versiones de gemas
  requirement: number;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  count?: number; // Contador de veces obtenida (desde getUserRewards)
  earnedAt?: string; // Fecha de obtención (desde getUserRewards)
}

/** User's Unlocked Reward */
export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  reward: Reward;
  unlockedAt: string;
  isViewed: boolean;
  progress: number;
}

/** Mark Rewards as Viewed DTO */
export interface MarkViewedDto {
  rewardIds: string[];
}

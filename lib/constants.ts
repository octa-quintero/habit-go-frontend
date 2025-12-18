// Constantes del sistema de diseño

export const COLORS = {
  primary: {
    base: '#4ade80',
    dark: '#22c55e',
    light: '#86efac',
  },
  secondary: {
    base: '#60a5fa',
    dark: '#3b82f6',
    light: '#93c5fd',
  },
  accent: {
    base: '#fbbf24',
    dark: '#f59e0b',
    light: '#fcd34d',
  },
  danger: {
    base: '#ef4444',
    dark: '#dc2626',
    light: '#f87171',
  },
} as const;

export const SIZES = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

// Configuraciones de sprites
export const SPRITE_CONFIGS = {
  character: {
    cols: 4,
    rows: 4,
    frameWidth: 48,
    frameHeight: 48,
    directions: ['down', 'up', 'left', 'right'] as const,
  },
  chest: {
    cols: 5,
    rows: 2,
    frameWidth: 32,
    frameHeight: 32,
    states: ['closed', 'opening', 'open'] as const,
  },
  chicken: {
    cols: 4,
    rows: 4,
    frameWidth: 48,
    frameHeight: 48,
  },
  cow: {
    cols: 4,
    rows: 4,
    frameWidth: 64,
    frameHeight: 64,
  },
  plant: {
    cols: 5,
    rows: 1,
    frameWidth: 32,
    frameHeight: 32,
  },
} as const;

// Rutas de sprites
export const SPRITE_PATHS = {
  characters: {
    basic: '/sprites/Characters/Basic Charakter Spritesheet.png',
    basicActions: '/sprites/Characters/Basic Charakter Actions.png',
    free: '/sprites/Characters/Free Charakter Spritesheet.png',
  },
  objects: {
    chest: '/sprites/Objects/Chest.png',
    plant: '/sprites/Objects/Basic Plants.png',
    grass: '/sprites/Objects/Basic Grass Biom things 1.png',
  },
} as const;

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    googleLogin: '/auth/google/login',
  },
  users: {
    me: '/users/me',
    updateProfile: '/users/profile',
    stats: '/users/stats',
  },
  habits: {
    list: '/habits',
    create: '/habits',
    update: (id: number) => `/habits/${id}`,
    delete: (id: number) => `/habits/${id}`,
  },
  habitRegister: {
    list: '/habit-register',
    create: '/habit-register',
    history: (habitId: number) => `/habit-register/history/${habitId}`,
  },
  rewards: {
    list: '/reward',
    userRewards: '/reward/user',
    claim: (id: number) => `/reward/${id}/claim`,
  },
} as const;

// Validaciones
export const VALIDATION = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
  },
  habit: {
    nameMaxLength: 100,
    descriptionMaxLength: 500,
  },
} as const;

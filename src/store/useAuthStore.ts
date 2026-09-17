import { create } from 'zustand';
import { UserProfile } from '../types';
import { MOCK_USER } from '../data/mockData';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loginAsGuest: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER,
  isAuthenticated: true,
  isGuest: false,

  loginAsGuest: () => {
    set({
      user: {
        id: 'guest_001',
        name: 'Guest Devotee',
        email: 'guest@iskcon.dev',
        phone: '',
        avatarUrl: MOCK_USER.avatarUrl,
        role: 'Guest',
        joinDate: 'Today',
        preferredLanguage: 'en',
      },
      isAuthenticated: true,
      isGuest: true,
    });
  },

  loginWithGoogle: async () => {
    // 🔌 In real app, integrate Google Sign-in / Expo AuthSession here
    set({
      user: MOCK_USER,
      isAuthenticated: true,
      isGuest: false,
    });
  },

  loginWithPhone: async (phoneNumber: string) => {
    // 🔌 In real app, send OTP via your SMS API here
    set({
      user: {
        ...MOCK_USER,
        phone: phoneNumber || MOCK_USER.phone,
      },
      isAuthenticated: true,
      isGuest: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isGuest: false,
    });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));

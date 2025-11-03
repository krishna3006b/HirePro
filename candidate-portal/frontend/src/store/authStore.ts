import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Candidate } from '@/types';

interface AuthState {
  candidate: Candidate | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (candidate: Candidate, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateCandidate: (candidate: Partial<Candidate>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      candidate: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      
      setAuth: (candidate, accessToken, refreshToken) =>
        set({
          candidate,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),
      
      clearAuth: () =>
        set({
          candidate: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
      
      updateCandidate: (updates) =>
        set((state) => ({
          candidate: state.candidate ? { ...state.candidate, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

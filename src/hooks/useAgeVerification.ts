'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AgeStore {
  verified: boolean;
  verify: () => void;
  deny: () => void;
}

export const useAgeVerification = create<AgeStore>()(
  persist(
    (set) => ({
      verified: false,
      verify: () => set({ verified: true }),
      deny: () => {
        if (typeof window !== 'undefined') window.location.href = 'https://www.google.com.br';
      },
    }),
    { name: 'vinheria-age', partialize: (s) => ({ verified: s.verified }) }
  )
);

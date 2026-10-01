import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Authentication store using Zustand with persistence.
 * This is a demo store – replace async calls with real API requests.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { name, email }
      status: 'idle', // 'idle' | 'loading' | 'error'
      error: null,

      // Simulated login – replace with real API call
      login: async (email, password) => {
        set({ status: 'loading', error: null });
        // Simulate network latency
        await new Promise(res => setTimeout(res, 1000));
        // Simple demo validation
        if (email === 'test@example.com' && password === 'password') {
          const user = { name: 'Test User', email };
          set({ user, status: 'idle' });
        } else {
          set({ status: 'error', error: 'Invalid email or password' });
        }
      },

      // Simulated registration – replace with real API call
      register: async (name, email, password) => {
        set({ status: 'loading', error: null });
        await new Promise(res => setTimeout(res, 1000));
        // For demo we accept any input other than the test user
        const user = { name, email };
        set({ user, status: 'idle' });
      },

      logout: () => {
        set({ user: null, status: 'idle', error: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      getStorage: () => localStorage,
      // Only persist the user object, not the status or error
      partialize: (state) => ({ user: state.user }),
    }
  )
);

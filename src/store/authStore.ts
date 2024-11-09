import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  isAdmin: boolean;
  setUser: (user: any) => void;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ 
    user, 
    isAdmin: user?.user_metadata?.role === 'admin' 
  }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
  },
  checkUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      set({ 
        user, 
        isAdmin: user.user_metadata?.role === 'admin' 
      });
    }
  },
}));
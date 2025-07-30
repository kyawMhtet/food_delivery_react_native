import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthStore = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;

    setIsAuthenticated: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    setUser: (user: User | null) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    isLoading: false,
    user:null,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setUser: (user) => set({ user }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true});

        try {
            const user = await getCurrentUser();

            if(user) set({ isAuthenticated: true, user: user as unknown as User });
            if(!user) set({ isAuthenticated: false, user: null});
        } catch (error) {
            console.error('Error fetching authenticated user:', error);
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    }

}))

export default useAuthStore;
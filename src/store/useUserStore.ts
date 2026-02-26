import { create } from 'zustand';
import { User, AuthStatus } from '../types';
import { MOCK_USERS } from '../data/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
    user: User | null;
    authStatus: AuthStatus;
    hasCompletedOnboarding: boolean;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    socialLogin: (provider: 'google' | 'apple') => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (updates: Partial<User>) => void;
    setSelectedCategories: (categories: string[]) => void;
    completeOnboarding: () => void;
    deleteAccount: () => Promise<void>;
    checkSession: () => Promise<void>;
    resendVerificationEmail: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    authStatus: 'idle',
    hasCompletedOnboarding: false,

    login: async (email: string, _password: string) => {
        set({ authStatus: 'loading' });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser = MOCK_USERS.find((u) => u.email === email) || MOCK_USERS[0];
        await AsyncStorage.setItem('session', JSON.stringify({ userId: mockUser.id }));
        const onboarded = await AsyncStorage.getItem('onboarding_complete');
        set({
            user: { ...mockUser, email },
            authStatus: 'authenticated',
            hasCompletedOnboarding: onboarded === 'true',
        });
    },

    signup: async (email: string, _password: string, displayName: string) => {
        set({ authStatus: 'loading' });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const newUser: User = {
            id: Date.now().toString(),
            email,
            displayName,
            avatarUrl: '',
            coverPhotoUrl: '',
            homeCity: '',
            bio: '',
            selectedCategories: [],
            followersCount: 0,
            followingCount: 0,
            createdAt: new Date().toISOString(),
            emailVerified: false,
            gdprConsent: true,
        };
        await AsyncStorage.setItem('session', JSON.stringify({ userId: newUser.id }));
        set({ user: newUser, authStatus: 'authenticated', hasCompletedOnboarding: false });
    },

    socialLogin: async (_provider: 'google' | 'apple') => {
        set({ authStatus: 'loading' });
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockUser = MOCK_USERS[0];
        await AsyncStorage.setItem('session', JSON.stringify({ userId: mockUser.id }));
        const onboarded = await AsyncStorage.getItem('onboarding_complete');
        set({
            user: mockUser,
            authStatus: 'authenticated',
            hasCompletedOnboarding: onboarded === 'true',
        });
    },

    logout: async () => {
        await AsyncStorage.removeItem('session');
        set({ user: null, authStatus: 'unauthenticated', hasCompletedOnboarding: false });
    },

    resetPassword: async (_email: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        // Mock: password reset email sent
    },

    updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
            set({ user: { ...user, ...updates } });
        }
    },

    setSelectedCategories: (categories: string[]) => {
        const { user } = get();
        if (user) {
            set({ user: { ...user, selectedCategories: categories } });
        }
    },

    completeOnboarding: () => {
        AsyncStorage.setItem('onboarding_complete', 'true');
        set({ hasCompletedOnboarding: true });
    },

    deleteAccount: async () => {
        await AsyncStorage.removeItem('session');
        await AsyncStorage.removeItem('onboarding_complete');
        set({ user: null, authStatus: 'unauthenticated', hasCompletedOnboarding: false });
    },

    checkSession: async () => {
        set({ authStatus: 'loading' });
        try {
            const session = await AsyncStorage.getItem('session');
            if (session) {
                const { userId } = JSON.parse(session);
                const mockUser = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[0];
                const onboarded = await AsyncStorage.getItem('onboarding_complete');
                set({
                    user: mockUser,
                    authStatus: 'authenticated',
                    hasCompletedOnboarding: onboarded === 'true',
                });
            } else {
                set({ authStatus: 'unauthenticated' });
            }
        } catch {
            set({ authStatus: 'unauthenticated' });
        }
    },

    resendVerificationEmail: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const { user } = get();
        if (user) {
            set({ user: { ...user, emailVerified: true } });
        }
    },
}));

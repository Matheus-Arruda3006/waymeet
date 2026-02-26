import { create } from 'zustand';
import { ChatMessage } from '../types';
import { MOCK_MESSAGES, MOCK_USERS } from '../data/mockData';
import { generateId } from '../utils/helpers';

interface ChatStore {
    messages: Record<string, ChatMessage[]>;
    isLoading: boolean;

    fetchMessages: (eventId: string) => Promise<void>;
    sendMessage: (eventId: string, userId: string, text: string) => void;
    addSystemMessage: (eventId: string, text: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: { '1': MOCK_MESSAGES },
    isLoading: false,

    fetchMessages: async (eventId: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 300));
        const { messages } = get();
        if (!messages[eventId]) {
            set((state) => ({
                messages: { ...state.messages, [eventId]: [] },
                isLoading: false,
            }));
        } else {
            set({ isLoading: false });
        }
    },

    sendMessage: (eventId: string, userId: string, text: string) => {
        const user = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[0];
        const newMessage: ChatMessage = {
            id: generateId(),
            eventId,
            userId,
            user,
            text,
            timestamp: new Date().toISOString(),
            isSystem: false,
        };
        set((state) => ({
            messages: {
                ...state.messages,
                [eventId]: [...(state.messages[eventId] || []), newMessage],
            },
        }));
    },

    addSystemMessage: (eventId: string, text: string) => {
        const systemMessage: ChatMessage = {
            id: generateId(),
            eventId,
            userId: 'system',
            user: MOCK_USERS[0],
            text,
            timestamp: new Date().toISOString(),
            isSystem: true,
        };
        set((state) => ({
            messages: {
                ...state.messages,
                [eventId]: [...(state.messages[eventId] || []), systemMessage],
            },
        }));
    },
}));

import { create } from 'zustand';
import { WayMeetEvent, FilterState } from '../types';
import { MOCK_EVENTS } from '../data/mockData';
import { generateId } from '../utils/helpers';
import { MOCK_USERS } from '../data/mockData';

interface EventsStore {
    events: WayMeetEvent[];
    filters: FilterState;
    isLoading: boolean;

    // Actions
    fetchEvents: () => Promise<void>;
    createEvent: (event: Omit<WayMeetEvent, 'id' | 'createdAt' | 'creator' | 'attendees'>) => void;
    joinEvent: (eventId: string, userId: string) => void;
    leaveEvent: (eventId: string, userId: string) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    resetFilters: () => void;
    getFilteredEvents: () => WayMeetEvent[];
}

const DEFAULT_FILTERS: FilterState = {
    categories: [],
    priceMin: 0,
    priceMax: 10000,
    distanceMax: 100,
};

export const useEventsStore = create<EventsStore>((set, get) => ({
    events: MOCK_EVENTS,
    filters: { ...DEFAULT_FILTERS },
    isLoading: false,

    fetchEvents: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ events: MOCK_EVENTS, isLoading: false });
    },

    createEvent: (eventData) => {
        const newEvent: WayMeetEvent = {
            ...eventData,
            id: generateId(),
            createdAt: new Date().toISOString(),
            creator: MOCK_USERS[0],
            attendees: [MOCK_USERS[0]],
        };
        set((state) => ({ events: [newEvent, ...state.events] }));
    },

    joinEvent: (eventId: string, _userId: string) => {
        set((state) => ({
            events: state.events.map((event) =>
                event.id === eventId
                    ? { ...event, attendees: [...event.attendees, MOCK_USERS[0]] }
                    : event
            ),
        }));
    },

    leaveEvent: (eventId: string, userId: string) => {
        set((state) => ({
            events: state.events.map((event) =>
                event.id === eventId
                    ? { ...event, attendees: event.attendees.filter((a) => a.id !== userId) }
                    : event
            ),
        }));
    },

    setFilters: (updates: Partial<FilterState>) => {
        set((state) => ({ filters: { ...state.filters, ...updates } }));
    },

    resetFilters: () => {
        set({ filters: { ...DEFAULT_FILTERS } });
    },

    getFilteredEvents: () => {
        const { events, filters } = get();
        return events.filter((event) => {
            if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
                return false;
            }
            if (event.price < filters.priceMin || event.price > filters.priceMax) {
                return false;
            }
            return true;
        });
    },
}));

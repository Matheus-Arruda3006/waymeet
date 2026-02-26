import { create } from 'zustand';
import { ExploreTab } from '../types';

interface UIStore {
    isFiltersModalVisible: boolean;
    isCreateEventModalVisible: boolean;
    activeExploreTab: ExploreTab;
    isLoading: boolean;
    searchQuery: string;

    setFiltersModalVisible: (visible: boolean) => void;
    setCreateEventModalVisible: (visible: boolean) => void;
    setActiveExploreTab: (tab: ExploreTab) => void;
    setLoading: (loading: boolean) => void;
    setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isFiltersModalVisible: false,
    isCreateEventModalVisible: false,
    activeExploreTab: 'Tudo',
    isLoading: false,
    searchQuery: '',

    setFiltersModalVisible: (visible) => set({ isFiltersModalVisible: visible }),
    setCreateEventModalVisible: (visible) => set({ isCreateEventModalVisible: visible }),
    setActiveExploreTab: (tab) => set({ activeExploreTab: tab }),
    setLoading: (loading) => set({ isLoading: loading }),
    setSearchQuery: (query) => set({ searchQuery: query }),
}));

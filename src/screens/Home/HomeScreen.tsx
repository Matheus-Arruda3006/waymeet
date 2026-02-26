import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Shadows, BorderRadius } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { SearchBar } from '../../components/SearchBar';
import { ItineraryCard } from '../../components/ItineraryCard';
import { PlaceCard } from '../../components/PlaceCard';
import { CategoryChip } from '../../components/CategoryChip';
import { MOCK_ITINERARIES, MOCK_PLACES, CATEGORIES } from '../../data/mockData';
import { useUIStore } from '../../store/useUIStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExploreTab } from '../../types';

const EXPLORE_TABS: ExploreTab[] = ['Tudo', 'Recomendados', 'Rotas de viagem', 'Internacional', 'Hoje'];

const QUICK_FILTERS = [
    { id: '1', name: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { id: '2', name: 'Romantico', icon: '💑' },
    { id: '3', name: 'Aventura', icon: '🏔️' },
    { id: '4', name: 'Cultural', icon: '🎭' },
];

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { searchQuery, setSearchQuery, activeExploreTab, setActiveExploreTab } = useUIStore();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
            >
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color={Colors.primary} />
                        <Text style={styles.locationText}>Londrina, Brasil</Text>
                    </View>
                    <View style={styles.topIcons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={22} color={Colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="chatbubble-ellipses-outline" size={22} color={Colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFilterPress={() => navigation.navigate('ExploreFilters')}
                    />
                </View>

                {/* Quick Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.quickFilters}
                >
                    {QUICK_FILTERS.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            style={[
                                styles.quickFilter,
                                activeFilter === filter.id && styles.quickFilterActive,
                            ]}
                            onPress={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.quickFilterIcon}>{filter.icon}</Text>
                            <Text
                                style={[
                                    styles.quickFilterText,
                                    activeFilter === filter.id && styles.quickFilterTextActive,
                                ]}
                            >
                                {filter.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Explorar Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Explorar</Text>

                    {/* Tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabsContainer}
                    >
                        {EXPLORE_TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveExploreTab(tab)}
                                style={styles.tabItem}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeExploreTab === tab && styles.tabTextActive,
                                    ]}
                                >
                                    {tab}
                                </Text>
                                {activeExploreTab === tab && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Itineraries */}
                    <View style={styles.seeMoreRow}>
                        <View />
                        <TouchableOpacity>
                            <Text style={styles.seeMoreText}>Ver mais...</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.cardsContainer}
                    >
                        {MOCK_ITINERARIES.map((item) => (
                            <ItineraryCard
                                key={item.id}
                                item={item}
                                onPress={() => { }}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Em Alta Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Em Alta</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeMoreText}>Ver mais...</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.cardsContainer}
                    >
                        {MOCK_PLACES.map((item) => (
                            <PlaceCard
                                key={item.id}
                                item={item}
                                onPress={() => { }}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    locationText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    topIcons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    quickFilters: {
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 20,
    },
    quickFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: Colors.background,
        borderWidth: 1.5,
        borderColor: Colors.border,
        gap: 6,
    },
    quickFilterActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    quickFilterIcon: {
        fontSize: 16,
    },
    quickFilterText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.text,
    },
    quickFilterTextActive: {
        color: Colors.textInverse,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.text,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    tabsContainer: {
        paddingHorizontal: 20,
        gap: 20,
        marginBottom: 12,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        color: Colors.textMuted,
        fontWeight: '500',
        paddingBottom: 6,
    },
    tabTextActive: {
        color: Colors.text,
        fontWeight: '700',
    },
    tabIndicator: {
        width: 24,
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 1.5,
    },
    seeMoreRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    seeMoreText: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: '500',
    },
    cardsContainer: {
        paddingHorizontal: 20,
    },
});

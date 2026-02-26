import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Shadows } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { CategoryChip } from '../../components/CategoryChip';
import { CATEGORIES } from '../../data/mockData';
import { useEventsStore } from '../../store/useEventsStore';
import Slider from '@react-native-community/slider';

export const ExploreFiltersModal: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { filters, setFilters, resetFilters, getFilteredEvents } = useEventsStore();

    const toggleCategory = (name: string) => {
        const cats = filters.categories.includes(name)
            ? filters.categories.filter((c) => c !== name)
            : [...filters.categories, name];
        setFilters({ categories: cats });
    };

    const filteredCount = getFilteredEvents().length;

    return (
        <View style={styles.container}>
            {/* Handle bar */}
            <View style={styles.handleBar} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Filtros</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categorias</Text>
                    <View style={styles.categoriesGrid}>
                        {CATEGORIES.map((cat) => (
                            <CategoryChip
                                key={cat.id}
                                label={cat.name}
                                icon={cat.icon}
                                selected={filters.categories.includes(cat.name)}
                                onPress={() => toggleCategory(cat.name)}
                                style={styles.chip}
                            />
                        ))}
                    </View>
                </View>

                {/* Price */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preço</Text>
                    <View style={styles.sliderRow}>
                        <Text style={styles.sliderLabel}>R$ 0</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                minimumValue={0}
                                maximumValue={10000}
                                step={50}
                                value={filters.priceMax}
                                onValueChange={(value) => setFilters({ priceMax: value })}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor={Colors.borderLight}
                                thumbTintColor={Colors.primary}
                            />
                        </View>
                        <Text style={styles.sliderLabel}>
                            {filters.priceMax >= 10000 ? '∞' : `R$ ${filters.priceMax}`}
                        </Text>
                    </View>
                    <View style={styles.priceValue}>
                        <Text style={styles.priceValueText}>
                            Até {filters.priceMax >= 10000 ? 'sem limite' : `R$ ${filters.priceMax}`}
                        </Text>
                    </View>
                </View>

                {/* Distance */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Distância</Text>
                    <View style={styles.sliderRow}>
                        <Text style={styles.sliderLabel}>0 km</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                minimumValue={0}
                                maximumValue={100}
                                step={5}
                                value={filters.distanceMax}
                                onValueChange={(value) => setFilters({ distanceMax: value })}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor={Colors.borderLight}
                                thumbTintColor={Colors.primary}
                            />
                        </View>
                        <Text style={styles.sliderLabel}>{filters.distanceMax}+ km</Text>
                    </View>
                    <View style={styles.distanceBadge}>
                        <Text style={styles.distanceBadgeText}>{filters.distanceMax} km</Text>
                    </View>
                </View>

                {/* Results count */}
                <View style={styles.resultCount}>
                    <Text style={styles.resultCountText}>{filteredCount} resultados encontrados</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetFilters}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.resetText}>Limpar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.applyText}>Aplicar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: FontSize['2xl'],
        fontWeight: '700',
        color: Colors.text,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 14,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: {
        minWidth: 0,
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sliderContainer: {
        flex: 1,
    },
    sliderLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '500',
        minWidth: 50,
        textAlign: 'center',
    },
    priceValue: {
        alignItems: 'center',
        marginTop: 4,
    },
    priceValueText: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: '600',
    },
    distanceBadge: {
        alignSelf: 'center',
        backgroundColor: Colors.chipBackground,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
        marginTop: 8,
    },
    distanceBadgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.primary,
    },
    resultCount: {
        alignItems: 'center',
        marginBottom: 20,
    },
    resultCountText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 40,
    },
    resetButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: BorderRadius.xl,
        borderWidth: 1.5,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    resetText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    applyButton: {
        flex: 2,
        paddingVertical: 16,
        borderRadius: BorderRadius.xl,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        ...Shadows.medium,
    },
    applyText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textInverse,
    },
});

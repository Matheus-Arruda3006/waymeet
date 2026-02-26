import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, BorderRadius } from '../config/theme';
import { Text } from '@/src/components/ui/text';
import { Itinerary } from '../types';

interface ItineraryCardProps {
    item: Itinerary;
    onPress: () => void;
    compact?: boolean;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ item, onPress, compact }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, compact && styles.cardCompact]}
            activeOpacity={0.85}
            accessibilityLabel={`${item.title}, rating ${item.rating}`}
        >
            <ImageBackground
                source={{ uri: item.imageUrl }}
                style={[styles.image, compact && styles.imageCompact]}
                imageStyle={{ borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl }}
            />
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Ionicons name="star" size={14} color="#FFB800" />
                    </View>
                </View>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color={Colors.textSecondary} />
                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.avatarContainer}>
                        {item.creator.avatarUrl && (
                            <ImageBackground
                                source={{ uri: item.creator.avatarUrl }}
                                style={styles.avatar}
                                imageStyle={{ borderRadius: 12 }}
                            />
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        backgroundColor: Colors.card,
        borderRadius: BorderRadius.xl,
        ...Shadows.card,
        marginRight: 14,
        overflow: 'hidden',
    },
    cardCompact: {
        width: 170,
    },
    image: {
        height: 130,
        width: '100%',
    },
    imageCompact: {
        height: 100,
    },
    content: {
        padding: 12,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        flex: 1,
        marginRight: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
        gap: 3,
    },
    description: {
        fontSize: 11,
        color: Colors.textSecondary,
        flex: 1,
        lineHeight: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    avatarContainer: {
        flexDirection: 'row',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.borderLight,
    },
});

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, BorderRadius } from '../config/theme';
import { Text } from '@/src/components/ui/text';
import { Place } from '../types';

interface PlaceCardProps {
    item: Place;
    onPress: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.card}
            activeOpacity={0.85}
            accessibilityLabel={`${item.name}, rating ${item.rating}`}
        >
            <ImageBackground
                source={{ uri: item.imageUrl }}
                style={styles.image}
                imageStyle={{ borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl }}
            />
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Ionicons name="star" size={14} color="#FFB800" />
                    </View>
                </View>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color={Colors.textSecondary} />
                    <Text style={styles.address} numberOfLines={2}>
                        {item.address}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.city}>{item.city}</Text>
                    <View style={styles.categoryRow}>
                        {item.categoryIcons.map((icon, i) => (
                            <Text key={i} style={styles.categoryIcon}>{icon}</Text>
                        ))}
                        <Text style={styles.categoryLabel}>{item.category}</Text>
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
    image: {
        height: 130,
        width: '100%',
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
    address: {
        fontSize: 11,
        color: Colors.textSecondary,
        flex: 1,
        lineHeight: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    city: {
        fontSize: 11,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    categoryIcon: {
        fontSize: 12,
    },
    categoryLabel: {
        fontSize: 10,
        color: Colors.textMuted,
    },
});

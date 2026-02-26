import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, BorderRadius } from '../config/theme';
import { Text } from '@/src/components/ui/text';
import { WayMeetEvent } from '../types';
import { formatEventDateTime, formatPrice } from '../utils/helpers';

interface EventCardProps {
    event: WayMeetEvent;
    onPress: () => void;
    onJoin?: () => void;
    compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress, onJoin, compact }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, compact && styles.cardCompact]}
            activeOpacity={0.85}
        >
            <ImageBackground
                source={{ uri: event.imageUrl }}
                style={[styles.image, compact && styles.imageCompact]}
                imageStyle={{ borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl }}
            >
                <View style={styles.imageBadge}>
                    <Text style={styles.badgeText}>{event.category}</Text>
                </View>
            </ImageBackground>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={13} color={Colors.primary} />
                    <Text style={styles.dateText}>{formatEventDateTime(event.date, event.time)}</Text>
                </View>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.locationText} numberOfLines={1}>{event.locationName}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>{formatPrice(event.price)}</Text>
                    <View style={styles.attendees}>
                        <Ionicons name="people-outline" size={14} color={Colors.textSecondary} />
                        <Text style={styles.attendeeCount}>
                            {event.attendees.length}/{event.maxParticipants}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: BorderRadius.xl,
        ...Shadows.card,
        overflow: 'hidden',
        marginBottom: 16,
    },
    cardCompact: {
        width: (Dimensions.get('window').width - 48) / 2,
    },
    image: {
        height: 160,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
    },
    imageCompact: {
        height: 120,
    },
    imageBadge: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: Colors.textInverse,
        fontSize: 11,
        fontWeight: '500',
    },
    content: {
        padding: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 6,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 3,
    },
    dateText: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '500',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 12,
        color: Colors.textSecondary,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primary,
    },
    attendees: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    attendeeCount: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});

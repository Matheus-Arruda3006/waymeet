import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Shadows, BorderRadius } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { EventCard } from '../../components/EventCard';
import { useEventsStore } from '../../store/useEventsStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommunityScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { events } = useEventsStore();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.title}>Comunidade</Text>
                <Text style={styles.subtitle}>Eventos perto de você</Text>
            </View>
            <FlatList
                data={events}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        onPress={() => navigation.navigate('EventDetail', { event: item })}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { paddingHorizontal: 20, paddingVertical: 16 },
    title: { fontSize: FontSize['3xl'], fontWeight: '700', color: Colors.text },
    subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
    list: { paddingHorizontal: 20, paddingBottom: 20 },
});

import React from 'react';
import { View, FlatList } from 'react-native';
import { Colors } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { EventCard } from '../../components/EventCard';
import { useEventsStore } from '../../store/useEventsStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommunityScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { events } = useEventsStore();

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <View className="px-5 py-4">
                <Text className="text-3xl font-bold text-text">Comunidade</Text>
                <Text className="text-sm text-textSecondary mt-1">Eventos perto de você</Text>
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
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
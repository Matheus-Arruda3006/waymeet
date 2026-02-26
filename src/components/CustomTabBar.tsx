import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../config/theme';
import { Text } from '@/src/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
    HomeTab: { active: 'home', inactive: 'home-outline' },
    ExploreTab: { active: 'compass', inactive: 'compass-outline' },
    MapTab: { active: 'map', inactive: 'map-outline' },
    CommunityTab: { active: 'people', inactive: 'people-outline' },
    ProfileTab: { active: 'person', inactive: 'person-outline' },
};

const TAB_LABELS: Record<string, string> = {
    HomeTab: 'Home',
    ExploreTab: 'Explorar',
    MapTab: 'Mapa',
    CommunityTab: 'Social',
    ProfileTab: 'Perfil',
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const iconConfig = TAB_ICONS[route.name];
                const label = TAB_LABELS[route.name];

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={label}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isFocused ? iconConfig.active : iconConfig.inactive}
                            size={24}
                            color={isFocused ? Colors.primary : Colors.tabBarInactive}
                        />
                        {isFocused && <View style={styles.activeDot} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.tabBarBackground,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: Colors.primary,
        marginTop: 4,
    },
});

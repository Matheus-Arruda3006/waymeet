import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../config/theme';

interface FloatingActionButtonProps {
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onPress,
    icon = 'add',
    style,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.fab, style]}
            activeOpacity={0.8}
            accessibilityLabel="Criar evento"
            accessibilityRole="button"
        >
            <Ionicons name={icon} size={28} color={Colors.textInverse} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.strong,
    },
});

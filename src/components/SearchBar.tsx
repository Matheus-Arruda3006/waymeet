import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, BorderRadius } from '../config/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress?: () => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    onFilterPress,
    placeholder = 'para onde vamos?',
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                />
            </View>
            {onFilterPress && (
                <TouchableOpacity
                    onPress={onFilterPress}
                    style={styles.filterButton}
                    accessibilityLabel="Filtros"
                >
                    <Ionicons name="options-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Colors.text,
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.chipBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.chipBorder,
    },
});

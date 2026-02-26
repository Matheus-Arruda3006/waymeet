import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Colors } from '../config/theme';

interface AvatarRowProps {
    avatars: string[];
    maxDisplay?: number;
    size?: number;
}

export const AvatarRow: React.FC<AvatarRowProps> = ({ avatars, maxDisplay = 4, size = 28 }) => {
    const displayed = avatars.slice(0, maxDisplay);
    const remaining = avatars.length - maxDisplay;

    return (
        <View style={styles.container}>
            {displayed.map((url, index) => (
                <View
                    key={index}
                    style={[
                        styles.avatarWrapper,
                        { width: size, height: size, borderRadius: size / 2, marginLeft: index > 0 ? -(size / 3) : 0 },
                    ]}
                >
                    <ImageBackground
                        source={{ uri: url }}
                        style={[styles.avatar, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }]}
                        imageStyle={{ borderRadius: (size - 4) / 2 }}
                    />
                </View>
            ))}
            {remaining > 0 && (
                <View
                    style={[
                        styles.avatarWrapper,
                        styles.remainingBadge,
                        { width: size, height: size, borderRadius: size / 2, marginLeft: -(size / 3) },
                    ]}
                >
                    <View style={[styles.remainingInner, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }]}>
                        <View style={styles.remainingTextContainer}>
                            <ImageBackground
                                source={{ uri: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }}
                                style={{ width: 0, height: 0 }}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        borderWidth: 2,
        borderColor: Colors.background,
        overflow: 'hidden',
        zIndex: 1,
    },
    avatar: {
        backgroundColor: Colors.borderLight,
    },
    remainingBadge: {
        zIndex: 0,
    },
    remainingInner: {
        backgroundColor: Colors.chipBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remainingTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

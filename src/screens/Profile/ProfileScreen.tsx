import React, { useState } from 'react';
import {
    View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Shadows, BorderRadius } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { EventCard } from '../../components/EventCard';
import { useUserStore } from '../../store/useUserStore';
import { useEventsStore } from '../../store/useEventsStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { user, logout } = useUserStore();
    const { events } = useEventsStore();
    const [activeTab, setActiveTab] = useState<'posts' | 'routes'>('posts');

    const userEvents = events.filter((e) => e.creatorId === user?.id || e.creatorId === '1');

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cover */}
                <ImageBackground
                    source={{ uri: user?.coverPhotoUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop' }}
                    style={styles.cover}
                    imageStyle={styles.coverImage}
                >
                    <View style={[styles.coverOverlay, { paddingTop: insets.top }]}>
                        <View style={styles.coverActions}>
                            <View />
                            <View style={styles.coverButtons}>
                                <TouchableOpacity
                                    style={styles.coverBtn}
                                    onPress={() => navigation.navigate('EditProfile')}
                                >
                                    <Ionicons name="create-outline" size={20} color={Colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.coverBtn} onPress={logout}>
                                    <Ionicons name="log-out-outline" size={20} color={Colors.error} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Avatar & Info */}
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <ImageBackground
                            source={{ uri: user?.avatarUrl || 'https://via.placeholder.com/100' }}
                            style={styles.avatar}
                            imageStyle={{ borderRadius: 45 }}
                        />
                    </View>
                    <Text style={styles.name}>{user?.displayName || 'Usuário'}</Text>
                    <View style={styles.cityRow}>
                        <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
                        <Text style={styles.city}>{user?.homeCity || 'Cidade não definida'}</Text>
                    </View>
                    {user?.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}

                    {/* Stats */}
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{user?.followersCount || 0}</Text>
                            <Text style={styles.statLabel}>Seguidores</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{user?.followingCount || 0}</Text>
                            <Text style={styles.statLabel}>Seguindo</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{userEvents.length}</Text>
                            <Text style={styles.statLabel}>Eventos</Text>
                        </View>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
                        onPress={() => setActiveTab('posts')}
                    >
                        <Text style={[styles.tabText, activeTab === 'posts' && styles.tabTextActive]}>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'routes' && styles.tabActive]}
                        onPress={() => setActiveTab('routes')}
                    >
                        <Text style={[styles.tabText, activeTab === 'routes' && styles.tabTextActive]}>Rotas</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.tabContent}>
                    {userEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onPress={() => navigation.navigate('EventDetail', { event })}
                        />
                    ))}
                    {userEvents.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="calendar-outline" size={48} color={Colors.textMuted} />
                            <Text style={styles.emptyText}>Nenhum evento ainda</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    cover: { height: 200, width: '100%' },
    coverImage: {},
    coverOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', padding: 16 },
    coverActions: { flexDirection: 'row', justifyContent: 'space-between' },
    coverButtons: { flexDirection: 'row', gap: 8 },
    coverBtn: {
        width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center', alignItems: 'center',
    },
    profileInfo: { alignItems: 'center', paddingHorizontal: 20, marginTop: -45 },
    avatarContainer: {
        width: 90, height: 90, borderRadius: 45, borderWidth: 4,
        borderColor: Colors.background, marginBottom: 12, overflow: 'hidden', ...Shadows.medium,
    },
    avatar: { width: '100%', height: '100%', borderRadius: 45, backgroundColor: Colors.borderLight },
    name: { fontSize: FontSize['2xl'], fontWeight: '700', color: Colors.text },
    cityRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    city: { fontSize: 13, color: Colors.textSecondary },
    bio: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', marginTop: 8, lineHeight: 20 },
    statsRow: {
        flexDirection: 'row', alignItems: 'center', marginTop: 20, gap: 24,
        backgroundColor: Colors.surface, paddingVertical: 16, paddingHorizontal: 32,
        borderRadius: 16,
    },
    stat: { alignItems: 'center' },
    statNumber: { fontSize: 18, fontWeight: '700', color: Colors.text },
    statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
    statDivider: { width: 1, height: 30, backgroundColor: Colors.border },
    tabs: {
        flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
        marginTop: 20, marginHorizontal: 20,
    },
    tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
    tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
    tabText: { fontSize: 14, fontWeight: '500', color: Colors.textMuted },
    tabTextActive: { color: Colors.primary, fontWeight: '700' },
    tabContent: { padding: 20 },
    emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
    emptyText: { fontSize: 14, color: Colors.textMuted },
});

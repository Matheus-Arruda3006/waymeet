import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, BorderRadius, Shadows } from '../../config/theme';
import { Text } from '@/src/components/ui/text';
import { useUserStore } from '../../store/useUserStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, InputField } from '@/src/components/ui/input';

export const EditProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { user, updateProfile, deleteAccount } = useUserStore();
    const [name, setName] = useState(user?.displayName || '');
    const [city, setCity] = useState(user?.homeCity || '');
    const [bio, setBio] = useState(user?.bio || '');

    const handleSave = () => {
        updateProfile({ displayName: name, homeCity: city, bio });
        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert('Excluir conta', 'Tem certeza? Esta ação não pode ser desfeita.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => deleteAccount() },
        ]);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Editar Perfil</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
                <View style={styles.field}>
                    <Text style={styles.label}>Nome</Text>
                    <Input variant="outline" size="xl" style={styles.inputStyle}>
                        <InputField placeholder="Seu nome" value={name} onChangeText={setName} style={styles.inputField} />
                    </Input>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Cidade</Text>
                    <Input variant="outline" size="xl" style={styles.inputStyle}>
                        <InputField placeholder="Sua cidade" value={city} onChangeText={setCity} style={styles.inputField} />
                    </Input>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Bio</Text>
                    <Input variant="outline" size="xl" style={[styles.inputStyle, { height: 100 }]}>
                        <InputField placeholder="Sobre você..." value={bio} onChangeText={setBio}
                            multiline style={[styles.inputField, { textAlignVertical: 'top', paddingTop: 12 }]} />
                    </Input>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={18} color={Colors.error} />
                    <Text style={styles.deleteText}>Excluir conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    title: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text },
    saveText: { fontSize: 16, fontWeight: '600', color: Colors.primary },
    field: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 8 },
    inputStyle: { borderRadius: BorderRadius.lg, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center' },
    inputField: { flex: 1, fontSize: 15, color: Colors.text, paddingHorizontal: 14, paddingVertical: 12 },
    deleteButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        paddingVertical: 16, borderRadius: BorderRadius.xl, borderWidth: 1.5,
        borderColor: Colors.error, marginTop: 30,
    },
    deleteText: { fontSize: 15, fontWeight: '600', color: Colors.error },
});

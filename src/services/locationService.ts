import * as Location from 'expo-location';

export interface UserLocation {
    latitude: number;
    longitude: number;
    city?: string;
}

const DEFAULT_LOCATION: UserLocation = {
    latitude: -23.3045,
    longitude: -51.1696,
    city: 'Londrina, Brasil',
};

export const locationService = {
    requestPermission: async (): Promise<boolean> => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            return status === 'granted';
        } catch {
            return false;
        }
    },

    getCurrentLocation: async (): Promise<UserLocation> => {
        try {
            const hasPermission = await locationService.requestPermission();
            if (!hasPermission) return DEFAULT_LOCATION;

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        } catch {
            return DEFAULT_LOCATION;
        }
    },

    getDefaultLocation: (): UserLocation => DEFAULT_LOCATION,
};

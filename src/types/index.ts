export interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    coverPhotoUrl: string;
    homeCity: string;
    bio: string;
    selectedCategories: string[];
    followersCount: number;
    followingCount: number;
    createdAt: string;
    emailVerified: boolean;
    gdprConsent: boolean;
}

export interface Category {
    id: string;
    name: string;
    icon: string; // emoji
    color: string;
}

export interface WayMeetEvent {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    date: string;
    time: string;
    latitude: number;
    longitude: number;
    locationName: string;
    creatorId: string;
    creator: User;
    attendees: User[];
    maxParticipants: number;
    price: number;
    isPublic: boolean;
    createdAt: string;
}

export interface Itinerary {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    rating: number;
    locations: string[];
    category: string;
    creator: User;
    createdAt: string;
    duration: string;
    price: number;
}

export interface Place {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    address: string;
    city: string;
    category: string;
    categoryIcons: string[];
    latitude: number;
    longitude: number;
}

export interface ChatMessage {
    id: string;
    eventId: string;
    userId: string;
    user: User;
    text: string;
    timestamp: string;
    isSystem: boolean;
}

export interface FilterState {
    categories: string[];
    priceMin: number;
    priceMax: number;
    distanceMax: number;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export type ExploreTab = 'Tudo' | 'Recomendados' | 'Rotas de viagem' | 'Internacional' | 'Hoje';

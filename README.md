# WayMeet 🌍

A social discovery app for immigrants, travelers, and digital nomads to find places, join or create mini-events, and share itineraries.

## Features
- 🔐 **Authentication** — Email/password + social login (Google, Apple) via Supabase
- 🏷️ **Onboarding** — Select interests from 14 categories
- 🗺️ **Explore Feed** — Curated itineraries, places, and category filters
- 📍 **Interactive Map** — Geolocated event markers with callout bubbles
- 📅 **Create Events** — Schedule mini-events pinned on the map
- 💬 **Event Chat** — Group chat per event with system messages
- 👤 **Profile** — Cover photo, avatar, stats, posts/routes tabs

## Tech Stack
| Layer | Tech |
|-------|------|
| Framework | React Native + Expo (TypeScript) |
| UI Components | gluestack-ui v3 + NativeWind |
| Navigation | @react-navigation/native (bottom tabs + nested stacks) |
| State | Zustand |
| Backend/Auth | Supabase |
| Maps | react-native-maps |
| Location | expo-location |
| Forms | react-hook-form |
| Styling | Tailwind CSS (via NativeWind) |

## Getting Started

### Prerequisites
- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (for simulator) or Expo Go
- Android: Android Studio or Expo Go

### Installation
```bash
cd WayMeet
npm install
```

### Configuration
1. Open `src/config/supabase.ts`
2. Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` with your project values

### Run
```bash
npx expo start
```
Then scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android.

## Project Structure
```
src/
├── components/      # Reusable UI (CategoryChip, EventCard, SearchBar, etc.)
│   └── ui/          # gluestack-ui components (button, input, text, etc.)
├── config/          # Theme tokens, Supabase client
├── data/            # Mock data (categories, events, places, users)
├── navigation/      # AppNavigator, stacks, custom tab bar
├── screens/         # Auth, Onboarding, Home, Map, Events, Chat, Profile
├── services/        # Location service
├── store/           # Zustand stores (user, events, chat, UI)
├── types/           # TypeScript interfaces
└── utils/           # Helper functions
```

## License
MIT
# waymeet

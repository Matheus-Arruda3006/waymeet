import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useUserStore } from './src/store/useUserStore';

export default function App() {
  const checkSession = useUserStore((s) => s.checkSession);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider mode="light">
          <StatusBar style="dark" />
          <AppNavigator />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

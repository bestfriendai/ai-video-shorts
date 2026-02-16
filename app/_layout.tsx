import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RevenueCatProvider } from '../src/services/purchases';
import OnboardingScreen from './onboarding';

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RevenueCatProvider>
          <StatusBar style="light" />
          {showOnboarding ? (
            <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
          ) : (
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#1a1a2e' },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
            </Stack>
          )}
        </RevenueCatProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

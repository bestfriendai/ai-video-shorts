import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RevenueCatProvider } from '../src/services/purchases';
import { ThemeProvider, useThemeColors } from '../src/contexts/ThemeContext';
import OnboardingScreen from './onboarding';

function RootLayoutInner() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const colors = useThemeColors();

  return (
    <>
      <StatusBar style={colors.isDark ? 'light' : 'dark'} />
      {showOnboarding ? (
        <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
        </Stack>
      )}
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RevenueCatProvider>
          <ThemeProvider>
            <RootLayoutInner />
          </ThemeProvider>
        </RevenueCatProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

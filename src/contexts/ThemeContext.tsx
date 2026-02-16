import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@reelmint_theme_mode';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  primary: string;
  isDark: boolean;
}

const lightColors: ThemeColors = {
  background: '#f5f5fa',
  surface: '#ffffff',
  card: '#eeeef4',
  text: '#1a1a2e',
  textSecondary: '#6b6b80',
  border: '#dddde5',
  accent: '#ff2d6a',
  primary: '#8b5cf6',
  isDark: false,
};

const darkColors: ThemeColors = {
  background: '#1a1a2e',
  surface: '#252542',
  card: '#252542',
  text: '#ffffff',
  textSecondary: '#8b8b9e',
  border: '#333355',
  accent: '#ff2d6a',
  primary: '#8b5cf6',
  isDark: true,
};

interface ThemeContextValue {
  colors: ThemeColors;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  themeMode: 'system',
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme: ColorSchemeName = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeModeState(stored);
      }
      setLoaded(true);
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const colors = useMemo(() => {
    const resolvedDark =
      themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';
    return resolvedDark ? darkColors : lightColors;
  }, [themeMode, systemScheme]);

  const value = useMemo(
    () => ({ colors, themeMode, setThemeMode }),
    [colors, themeMode, setThemeMode],
  );

  if (!loaded) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeColors(): ThemeColors {
  return useContext(ThemeContext).colors;
}

export function useThemeMode() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  return { themeMode, setThemeMode };
}

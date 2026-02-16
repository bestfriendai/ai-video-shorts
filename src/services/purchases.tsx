import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FREE_DAILY_VIDEO_LIMIT = 2;
const ONBOARDING_KEY = 'reelmint_has_seen_onboarding';

type Offering = {
  id: string;
  weeklyPrice: string;
  monthlyPrice: string;
  yearlyPrice: string;
};

type RevenueCatContextValue = {
  isProMember: boolean;
  currentOffering: Offering | null;
  upgradeToPro: () => void;
  restorePurchases: () => void;

  dailyVideosCreated: number;
  incrementVideoCreation: () => void;

  canCreateVideo: boolean;
  hasWatermark: boolean;
  canExportHD: boolean;
  canAccessPremiumTemplates: boolean;
  canAccessAllMusic: boolean;

  canExport: boolean;
  incrementExport: () => void;
  monthlyExportsUsed: number;

  hasSeenOnboarding: boolean;
  setOnboardingComplete: () => void;
  isReady: boolean;
};

const RevenueCatContext = createContext<RevenueCatContextValue | undefined>(undefined);

export function RevenueCatProvider({ children }: PropsWithChildren) {
  const [isProMember, setIsProMember] = useState(false);
  const [dailyVideosCreated, setDailyVideosCreated] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setHasSeenOnboarding(value === 'true');
      setIsReady(true);
    });
  }, []);

  const value = useMemo<RevenueCatContextValue>(
    () => ({
      isProMember,
      currentOffering: {
        id: 'pro',
        weeklyPrice: '$5.99/wk',
        monthlyPrice: '$11.99/mo',
        yearlyPrice: '$49.99/yr',
      },
      upgradeToPro: () => setIsProMember(true),
      restorePurchases: () => {
        setIsProMember(false);
      },

      dailyVideosCreated,
      incrementVideoCreation: () => setDailyVideosCreated((prev) => prev + 1),

      canCreateVideo: isProMember || dailyVideosCreated < FREE_DAILY_VIDEO_LIMIT,
      hasWatermark: !isProMember,
      canExportHD: isProMember,
      canAccessPremiumTemplates: isProMember,
      canAccessAllMusic: isProMember,

      canExport: isProMember || dailyVideosCreated < FREE_DAILY_VIDEO_LIMIT,
      incrementExport: () => setDailyVideosCreated((prev) => prev + 1),
      monthlyExportsUsed: dailyVideosCreated,

      hasSeenOnboarding,
      setOnboardingComplete: () => {
        setHasSeenOnboarding(true);
        AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      },
      isReady,
    }),
    [isProMember, dailyVideosCreated, hasSeenOnboarding, isReady]
  );

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
}

export function useRevenueCat() {
  const ctx = useContext(RevenueCatContext);
  if (!ctx) {
    throw new Error('useRevenueCat must be used inside RevenueCatProvider');
  }
  return ctx;
}

export { FREE_DAILY_VIDEO_LIMIT };

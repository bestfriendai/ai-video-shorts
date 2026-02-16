import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type Offering = {
  id: string;
  monthlyPrice: string;
  yearlyPrice: string;
};

type RevenueCatContextValue = {
  isProMember: boolean;
  currentOffering: Offering | null;
  upgradeToPro: () => void;
};

const RevenueCatContext = createContext<RevenueCatContextValue | undefined>(undefined);

export function RevenueCatProvider({ children }: PropsWithChildren) {
  const [isProMember, setIsProMember] = useState(false);

  const value = useMemo<RevenueCatContextValue>(
    () => ({
      isProMember,
      currentOffering: {
        id: 'pro',
        monthlyPrice: '$4.99/mo',
        yearlyPrice: '$29.99/yr',
      },
      upgradeToPro: () => setIsProMember(true),
    }),
    [isProMember]
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

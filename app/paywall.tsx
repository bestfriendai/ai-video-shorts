import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRevenueCat } from '../src/services/purchases';
import { useThemeColors } from '../src/contexts/ThemeContext';

const FEATURES = [
  { icon: '♾️', title: 'Unlimited Exports', desc: 'No monthly limits on video exports' },
  { icon: '✨', title: 'No Watermark', desc: 'Clean, professional videos' },
  { icon: '🎬', title: 'HD & 4K Quality', desc: 'Export in stunning high resolution' },
  { icon: '🎨', title: 'All Templates', desc: 'Access every premium template' },
  { icon: '⚡', title: 'Priority Rendering', desc: 'Faster video generation queue' },
];

export default function PaywallScreen() {
  const { upgradeToPro, restorePurchases } = useRevenueCat();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const colors = useThemeColors();

  const handlePurchase = () => {
    upgradeToPro();
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={[styles.closeText, { color: colors.textSecondary }]}>✕</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.emoji}>🚀</Text>
          <Text style={[styles.title, { color: colors.text }]}>Upgrade to PRO</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Unlock the full power of ReelMint</Text>
          <Text style={styles.socialProof}>🔥 Join 50,000+ creators already on PRO</Text>
        </View>

        <View style={styles.plans}>
          <TouchableOpacity
            style={[styles.planCard, { backgroundColor: colors.card }, selectedPlan === 'annual' && styles.planSelected]}
            onPress={() => setSelectedPlan('annual')}
          >
            {selectedPlan === 'annual' && (
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeText}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: colors.text }]}>Annual</Text>
              <Text style={styles.planTrial}>7-day free trial</Text>
            </View>
            <Text style={[styles.planPrice, { color: colors.text }]}>$29.99<Text style={[styles.planPeriod, { color: colors.textSecondary }]}>/year</Text></Text>
            <Text style={[styles.planSavings, { color: colors.textSecondary }]}>Save 50% vs monthly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, { backgroundColor: colors.card }, selectedPlan === 'monthly' && styles.planSelected]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: colors.text }]}>Monthly</Text>
            </View>
            <Text style={[styles.planPrice, { color: colors.text }]}>$4.99<Text style={[styles.planPeriod, { color: colors.textSecondary }]}>/month</Text></Text>
            <Text style={[styles.planSavings, { color: colors.textSecondary }]}>Cancel anytime</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePurchase} activeOpacity={0.8}>
          <LinearGradient colors={['#ff2d6a', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaButton}>
            <Text style={styles.ctaText}>{selectedPlan === 'annual' ? 'Start Free Trial' : 'Subscribe Now'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureInfo}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>{f.title}</Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={restorePurchases} style={styles.restoreBtn}>
          <Text style={[styles.restoreText, { color: colors.textSecondary }]}>Restore Purchases</Text>
        </TouchableOpacity>

        <View style={styles.legal}>
          <Text style={[styles.legalText, { color: colors.textSecondary }]}>
            {selectedPlan === 'annual'
              ? 'Free trial auto-renews at $29.99/year. Cancel anytime.'
              : 'Subscription auto-renews at $4.99/month. Cancel anytime.'}
          </Text>
          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/terms')}>
              <Text style={[styles.legalLink, { color: colors.textSecondary }]}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={[styles.legalDot, { color: colors.textSecondary }]}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/privacy')}>
              <Text style={[styles.legalLink, { color: colors.textSecondary }]}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 48 },
  closeBtn: { position: 'absolute', right: 0, top: 0, zIndex: 10, padding: 8 },
  closeText: { fontSize: 22 },
  header: { alignItems: 'center', marginTop: 24, marginBottom: 28 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '800' },
  subtitle: { fontSize: 16, marginTop: 8 },
  socialProof: { color: '#fbbf24', fontSize: 13, fontWeight: '600', marginTop: 16, backgroundColor: 'rgba(251,191,36,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, overflow: 'hidden' },
  plans: { gap: 12, marginBottom: 20 },
  planCard: { borderRadius: 16, padding: 18, borderWidth: 2, borderColor: 'transparent' },
  planSelected: { borderColor: '#ff2d6a', backgroundColor: 'rgba(255,45,106,0.08)' },
  bestBadge: { position: 'absolute', top: -11, right: 16, backgroundColor: '#ff2d6a', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  bestBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  planName: { fontSize: 18, fontWeight: '700' },
  planTrial: { color: '#22c55e', fontSize: 12, fontWeight: '600', backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, overflow: 'hidden' },
  planPrice: { fontSize: 28, fontWeight: '800' },
  planPeriod: { fontSize: 16, fontWeight: '400' },
  planSavings: { fontSize: 13, marginTop: 4 },
  ctaButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 28 },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  features: { gap: 16, marginBottom: 24 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  featureIcon: { fontSize: 28, width: 40, textAlign: 'center' },
  featureInfo: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: '700' },
  featureDesc: { fontSize: 13, marginTop: 2 },
  restoreBtn: { alignItems: 'center', paddingVertical: 12 },
  restoreText: { fontSize: 14, textDecorationLine: 'underline' },
  legal: { alignItems: 'center', marginTop: 8 },
  legalText: { fontSize: 11, textAlign: 'center', lineHeight: 16 },
  legalLinks: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  legalLink: { fontSize: 12, textDecorationLine: 'underline' },
  legalDot: { fontSize: 12 },
});

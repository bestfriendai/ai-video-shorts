import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRevenueCat } from '../src/services/purchases';

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

  const handlePurchase = () => {
    upgradeToPro();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🚀</Text>
          <Text style={styles.title}>Upgrade to PRO</Text>
          <Text style={styles.subtitle}>Unlock the full power of ReelMint</Text>
          <Text style={styles.socialProof}>🔥 Join 50,000+ creators already on PRO</Text>
        </View>

        {/* Plan cards */}
        <View style={styles.plans}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'annual' && styles.planSelected]}
            onPress={() => setSelectedPlan('annual')}
          >
            {selectedPlan === 'annual' && (
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeText}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Annual</Text>
              <Text style={styles.planTrial}>7-day free trial</Text>
            </View>
            <Text style={styles.planPrice}>$29.99<Text style={styles.planPeriod}>/year</Text></Text>
            <Text style={styles.planSavings}>Save 50% vs monthly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'monthly' && styles.planSelected]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Monthly</Text>
            </View>
            <Text style={styles.planPrice}>$4.99<Text style={styles.planPeriod}>/month</Text></Text>
            <Text style={styles.planSavings}>Cancel anytime</Text>
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <TouchableOpacity onPress={handlePurchase} activeOpacity={0.8}>
          <LinearGradient
            colors={['#ff2d6a', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>
              {selectedPlan === 'annual' ? 'Start Free Trial' : 'Subscribe Now'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Restore */}
        <TouchableOpacity onPress={restorePurchases} style={styles.restoreBtn}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        {/* Legal */}
        <View style={styles.legal}>
          <Text style={styles.legalText}>
            {selectedPlan === 'annual'
              ? 'Free trial auto-renews at $29.99/year. Cancel anytime.'
              : 'Subscription auto-renews at $4.99/month. Cancel anytime.'}
          </Text>
          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/terms')}>
              <Text style={styles.legalLink}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.legalDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/privacy')}>
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  scroll: { padding: 24, paddingBottom: 48 },
  closeBtn: { position: 'absolute', right: 0, top: 0, zIndex: 10, padding: 8 },
  closeText: { color: '#8b8b9e', fontSize: 22 },
  header: { alignItems: 'center', marginTop: 24, marginBottom: 28 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800' },
  subtitle: { color: '#8b8b9e', fontSize: 16, marginTop: 8 },
  socialProof: { color: '#fbbf24', fontSize: 13, fontWeight: '600', marginTop: 16, backgroundColor: 'rgba(251,191,36,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, overflow: 'hidden' },
  plans: { gap: 12, marginBottom: 20 },
  planCard: { backgroundColor: '#252542', borderRadius: 16, padding: 18, borderWidth: 2, borderColor: 'transparent' },
  planSelected: { borderColor: '#ff2d6a', backgroundColor: 'rgba(255,45,106,0.08)' },
  bestBadge: { position: 'absolute', top: -11, right: 16, backgroundColor: '#ff2d6a', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  bestBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  planName: { color: '#fff', fontSize: 18, fontWeight: '700' },
  planTrial: { color: '#22c55e', fontSize: 12, fontWeight: '600', backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, overflow: 'hidden' },
  planPrice: { color: '#fff', fontSize: 28, fontWeight: '800' },
  planPeriod: { fontSize: 16, fontWeight: '400', color: '#8b8b9e' },
  planSavings: { color: '#8b8b9e', fontSize: 13, marginTop: 4 },
  ctaButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 28 },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  features: { gap: 16, marginBottom: 24 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  featureIcon: { fontSize: 28, width: 40, textAlign: 'center' },
  featureInfo: { flex: 1 },
  featureTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  featureDesc: { color: '#8b8b9e', fontSize: 13, marginTop: 2 },
  restoreBtn: { alignItems: 'center', paddingVertical: 12 },
  restoreText: { color: '#8b8b9e', fontSize: 14, textDecorationLine: 'underline' },
  legal: { alignItems: 'center', marginTop: 8 },
  legalText: { color: '#555', fontSize: 11, textAlign: 'center', lineHeight: 16 },
  legalLinks: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  legalLink: { color: '#8b8b9e', fontSize: 12, textDecorationLine: 'underline' },
  legalDot: { color: '#555', fontSize: 12 },
});

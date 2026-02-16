import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRevenueCat } from '../../src/services/purchases';
import { router } from 'expo-router';
import { getProjects } from '../../src/services/projects';
import { useThemeColors, useThemeMode, type ThemeMode } from '../../src/contexts/ThemeContext';

export default function ProfileScreen() {
  const { isProMember, currentOffering } = useRevenueCat();
  const [projectCount, setProjectCount] = useState(0);
  const colors = useThemeColors();
  const { themeMode, setThemeMode } = useThemeMode();

  useEffect(() => {
    getProjects().then((projects) => setProjectCount(projects.length));
  }, []);

  const freeLimit = 3;
  const progressPercent = isProMember ? 100 : Math.min((projectCount / freeLimit) * 100, 100);

  const themeModes: { value: ThemeMode; label: string }[] = [
    { value: 'system', label: '⚙️ System' },
    { value: 'light', label: '☀️ Light' },
    { value: 'dark', label: '🌙 Dark' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={[styles.title, { color: colors.text }]}>👤 Profile</Text></View>

        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}><Text style={[styles.statNumber, { color: colors.text }]}>{projectCount}</Text><Text style={[styles.statLabel, { color: colors.textSecondary }]}>Videos</Text></View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}><Text style={[styles.statNumber, { color: colors.text }]}>{projectCount * 12}</Text><Text style={[styles.statLabel, { color: colors.textSecondary }]}>Likes</Text></View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}><Text style={[styles.statNumber, { color: colors.text }]}>{Math.floor(projectCount * 1.5)}</Text><Text style={[styles.statLabel, { color: colors.textSecondary }]}>Shares</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🎨 Appearance</Text>
          <View style={[styles.themeCard, { backgroundColor: colors.card }]}>
            <View style={styles.themeRow}>
              {themeModes.map((mode) => (
                <TouchableOpacity
                  key={mode.value}
                  style={[styles.themeOption, themeMode === mode.value && { backgroundColor: colors.accent }]}
                  onPress={() => setThemeMode(mode.value)}
                >
                  <Text style={[styles.themeOptionText, { color: themeMode === mode.value ? '#fff' : colors.text }]}>{mode.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>💎 Subscription</Text>
          <TouchableOpacity style={[styles.subscriptionCard, { backgroundColor: colors.card }, isProMember && styles.subscriptionPro]} onPress={() => router.push('/paywall')}>
            <View>
              <Text style={[styles.subscriptionTitle, { color: colors.text }]}>{isProMember ? '🎉 PRO Member' : '✨ Upgrade to PRO'}</Text>
              <Text style={[styles.subscriptionSubtitle, { color: colors.textSecondary }]}>
                {isProMember ? 'Unlimited videos, no watermark, HD export' : `${currentOffering?.monthlyPrice ?? '$4.99/mo'} or ${currentOffering?.yearlyPrice ?? '$29.99/yr'}`}
              </Text>
            </View>
            <Text style={[styles.subscriptionArrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>📊 This Month</Text>
          <View style={[styles.usageCard, { backgroundColor: colors.card }]}>
            <View style={styles.usageRow}>
              <Text style={[styles.usageLabel, { color: colors.text }]}>Video Generations</Text>
              <Text style={styles.usageValue}>{projectCount} / {isProMember ? '∞' : '3'}</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.background }]}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
          </View>
        </View>
        <View style={styles.legalSection}>
          <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/terms')}>
            <Text style={[styles.legalLink, { color: colors.textSecondary }]}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/privacy')}>
            <Text style={[styles.legalLink, { color: colors.textSecondary }]}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>ReelMint v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, gap: 12 },
  statBox: { flex: 1, borderRadius: 16, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  themeCard: { borderRadius: 16, padding: 12 },
  themeRow: { flexDirection: 'row', gap: 8 },
  themeOption: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  themeOptionText: { fontSize: 13, fontWeight: '600' },
  subscriptionCard: { borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subscriptionPro: { backgroundColor: 'rgba(251, 191, 36, 0.15)', borderWidth: 1, borderColor: '#fbbf24' },
  subscriptionTitle: { fontSize: 16, fontWeight: '600' },
  subscriptionSubtitle: { fontSize: 12, marginTop: 4 },
  subscriptionArrow: { fontSize: 24 },
  usageCard: { borderRadius: 16, padding: 16 },
  usageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  usageLabel: { fontSize: 14 },
  usageValue: { color: '#ff2d6a', fontSize: 14, fontWeight: '600' },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#ff2d6a', borderRadius: 4 },
  legalSection: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, gap: 12 },
  legalLink: { fontSize: 14, textDecorationLine: 'underline' },
  versionText: { fontSize: 12, marginTop: 8 },
});

import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRevenueCat } from '../../src/services/purchases';
import { router } from 'expo-router';
import { getProjects } from '../../src/services/projects';

export default function ProfileScreen() {
  const { isProMember, currentOffering } = useRevenueCat();
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    getProjects().then((projects) => setProjectCount(projects.length));
  }, []);

  const freeLimit = 3;
  const progressPercent = isProMember ? 100 : Math.min((projectCount / freeLimit) * 100, 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={styles.title}>👤 Profile</Text></View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}><Text style={styles.statNumber}>{projectCount}</Text><Text style={styles.statLabel}>Videos</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>{projectCount * 12}</Text><Text style={styles.statLabel}>Likes</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>{Math.floor(projectCount * 1.5)}</Text><Text style={styles.statLabel}>Shares</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💎 Subscription</Text>
          <TouchableOpacity style={[styles.subscriptionCard, isProMember && styles.subscriptionPro]} onPress={() => router.push('/paywall')}>
            <View>
              <Text style={styles.subscriptionTitle}>{isProMember ? '🎉 PRO Member' : '✨ Upgrade to PRO'}</Text>
              <Text style={styles.subscriptionSubtitle}>
                {isProMember ? 'Unlimited videos, no watermark, HD export' : `${currentOffering?.monthlyPrice ?? '$4.99/mo'} or ${currentOffering?.yearlyPrice ?? '$29.99/yr'}`}
              </Text>
            </View>
            <Text style={styles.subscriptionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 This Month</Text>
          <View style={styles.usageCard}>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Video Generations</Text>
              <Text style={styles.usageValue}>{projectCount} / {isProMember ? '∞' : '3'}</Text>
            </View>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
          </View>
        </View>
        <View style={styles.legalSection}>
          <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/terms')}>
            <Text style={styles.legalLink}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://reelmint.app/privacy')}>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>ReelMint v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, gap: 12 },
  statBox: { flex: 1, backgroundColor: '#252542', borderRadius: 16, padding: 16, alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#8b8b9e', fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  subscriptionCard: { backgroundColor: '#252542', borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subscriptionPro: { backgroundColor: 'rgba(251, 191, 36, 0.15)', borderWidth: 1, borderColor: '#fbbf24' },
  subscriptionTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  subscriptionSubtitle: { color: '#8b8b9e', fontSize: 12, marginTop: 4 },
  subscriptionArrow: { color: '#8b8b9e', fontSize: 24 },
  usageCard: { backgroundColor: '#252542', borderRadius: 16, padding: 16 },
  usageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  usageLabel: { color: '#fff', fontSize: 14 },
  usageValue: { color: '#ff2d6a', fontSize: 14, fontWeight: '600' },
  progressBar: { height: 8, backgroundColor: '#1a1a2e', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#ff2d6a', borderRadius: 4 },
  legalSection: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, gap: 12 },
  legalLink: { color: '#8b8b9e', fontSize: 14, textDecorationLine: 'underline' },
  versionText: { color: '#555', fontSize: 12, marginTop: 8 },
});

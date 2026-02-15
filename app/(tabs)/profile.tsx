import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRevenueCat } from '../../src/services/purchases';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { isProMember, currentOffering } = useRevenueCat();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>👤 Profile</Text>
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
        </View>

        {/* Subscription Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💎 Subscription</Text>
          <TouchableOpacity 
            style={[styles.subscriptionCard, isProMember && styles.subscriptionPro]}
            onPress={() => router.push('/paywall')}
          >
            <View>
              <Text style={styles.subscriptionTitle}>
                {isProMember ? '🎉 PRO Member' : '✨ Upgrade to PRO'}
              </Text>
              <Text style={styles.subscriptionSubtitle}>
                {isProMember 
                  ? 'Unlimited videos, no watermark, HD export' 
                  : '3 free videos per month • $4.99/mo or $29.99/yr'}
              </Text>
            </View>
            <Text style={styles.subscriptionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 This Month</Text>
          <View style={styles.usageCard}>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Video Generations</Text>
              <Text style={styles.usageValue}>0 / {isProMember ? '∞' : '3'}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '0%' }]} />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>
          <View style={styles.menuList}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>🎨</Text>
              <Text style={styles.menuText}>Appearance</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>🔔</Text>
              <Text style={styles.menuText}>Notifications</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>📤</Text>
              <Text style={styles.menuText}>Export Quality</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>🔒</Text>
              <Text style={styles.menuText}>Privacy</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuText}>Help & Support</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.version}>AI Video Shorts v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#8b8b9e',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  subscriptionCard: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionPro: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  subscriptionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subscriptionSubtitle: {
    color: '#8b8b9e',
    fontSize: 12,
    marginTop: 4,
  },
  subscriptionArrow: {
    color: '#8b8b9e',
    fontSize: 24,
  },
  usageCard: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  usageLabel: {
    color: '#fff',
    fontSize: 14,
  },
  usageValue: {
    color: '#ff2d6a',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff2d6a',
    borderRadius: 4,
  },
  menuList: {
    backgroundColor: '#252542',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  menuArrow: {
    color: '#8b8b9e',
    fontSize: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 40,
    paddingBottom: 100,
  },
  version: {
    color: '#666',
    fontSize: 12,
  },
});

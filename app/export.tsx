import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRevenueCat } from '../src/services/purchases';
import { useThemeColors } from '../src/contexts/ThemeContext';

const exportFormats = [
  { id: 'tiktok', name: 'TikTok', emoji: '🎵', resolution: '1080x1920', ratio: '9:16', duration: '15-60s' },
  { id: 'reels', name: 'Instagram Reels', emoji: '📸', resolution: '1080x1920', ratio: '9:16', duration: '15-90s' },
  { id: 'shorts', name: 'YouTube Shorts', emoji: '▶️', resolution: '1080x1920', ratio: '9:16', duration: '15-60s' },
  { id: 'feed', name: 'Instagram Feed', emoji: '🖼️', resolution: '1080x1080', ratio: '1:1', duration: 'Up to 60s' },
  { id: 'landscape', name: 'Landscape', emoji: '🌄', resolution: '1920x1080', ratio: '16:9', duration: 'Any' },
];

const qualityOptions = [
  { id: 'sd', name: 'Standard', size: '~10MB/min', badge: 'Free' },
  { id: 'hd', name: 'HD', size: '~25MB/min', badge: 'PRO' },
  { id: '4k', name: '4K', size: '~50MB/min', badge: 'PRO' },
];

export default function ExportScreen() {
  const { isProMember, canExport, incrementExport } = useRevenueCat();
  const [selectedFormat, setSelectedFormat] = useState('tiktok');
  const [selectedQuality, setSelectedQuality] = useState('sd');
  const [isExporting, setIsExporting] = useState(false);
  const [watermark, setWatermark] = useState(!isProMember);
  const colors = useThemeColors();

  const format = exportFormats.find((f) => f.id === selectedFormat);
  const quality = qualityOptions.find((q) => q.id === selectedQuality);

  const handleQualitySelect = (id: string) => {
    const q = qualityOptions.find((o) => o.id === id);
    if (q?.badge === 'PRO' && !isProMember) {
      Alert.alert('PRO Feature', 'HD and 4K exports are available for PRO members.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => router.push('/paywall') },
      ]);
      return;
    }
    setSelectedQuality(id);
  };

  const handleWatermarkToggle = () => {
    if (!isProMember && watermark) {
      Alert.alert('PRO Feature', 'Watermark removal is a PRO feature.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => router.push('/paywall') },
      ]);
      return;
    }
    setWatermark(!watermark);
  };

  const handleExport = () => {
    if (!canExport) {
      Alert.alert(
        'Export Limit Reached',
        'Free accounts get 2 exports per month. Upgrade to PRO for unlimited exports!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => router.push('/paywall') },
        ]
      );
      return;
    }

    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      incrementExport();
      Alert.alert('Export Complete! 🎉', 'Your video has been exported successfully.', [
        { text: 'Share', onPress: () => {} },
        { text: 'Done', onPress: () => router.push('/') },
      ]);
    }, 3000);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Choose where to share your video', [
      { text: 'Save to Camera Roll', onPress: () => {} },
      { text: 'Share to TikTok', onPress: () => {} },
      { text: 'Share to Instagram', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={[styles.backText, { color: colors.accent }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>📤 Export</Text>
          {!isProMember && (
            <TouchableOpacity onPress={() => router.push('/paywall')} style={styles.proChip}>
              <Text style={styles.proChipText}>⭐ PRO</Text>
            </TouchableOpacity>
          )}
        </View>

        {!canExport && (
          <TouchableOpacity style={styles.limitBanner} onPress={() => router.push('/paywall')}>
            <Text style={styles.limitText}>⚠️ Export limit reached · Upgrade for unlimited</Text>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>📱 Export Format</Text>
          <View style={styles.formatGrid}>
            {exportFormats.map((fmt) => (
              <TouchableOpacity
                key={fmt.id}
                style={[styles.formatCard, { backgroundColor: colors.card }, selectedFormat === fmt.id && styles.formatCardSelected]}
                onPress={() => setSelectedFormat(fmt.id)}
              >
                <Text style={styles.formatEmoji}>{fmt.emoji}</Text>
                <Text style={[styles.formatName, { color: colors.text }]}>{fmt.name}</Text>
                <Text style={[styles.formatRes, { color: colors.textSecondary }]}>{fmt.resolution}</Text>
                <View style={[styles.formatBadge, { backgroundColor: colors.background }]}>
                  <Text style={[styles.formatBadgeText, { color: colors.textSecondary }]}>{fmt.ratio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🎬 Quality</Text>
          <View style={[styles.qualityList, { backgroundColor: colors.card }]}>
            {qualityOptions.map((q) => (
              <TouchableOpacity
                key={q.id}
                style={[styles.qualityItem, { borderBottomColor: colors.border }, selectedQuality === q.id && styles.qualityItemSelected]}
                onPress={() => handleQualitySelect(q.id)}
              >
                <View style={styles.qualityInfo}>
                  <View style={styles.qualityHeader}>
                    <Text style={[styles.qualityName, { color: colors.text }]}>{q.name}</Text>
                    {q.badge === 'PRO' && (
                      <View style={[styles.proBadge, !isProMember && styles.proBadgeLocked]}>
                        <Text style={styles.proBadgeText}>{isProMember ? 'PRO' : '🔒 PRO'}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.qualitySize, { color: colors.textSecondary }]}>{q.size}</Text>
                </View>
                {selectedQuality === q.id && <Text style={styles.qualityCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>⚙️ Options</Text>
          <View style={[styles.optionsCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionName, { color: colors.text }]}>Remove Watermark {!isProMember && '🔒'}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>Remove ReelMint watermark</Text>
              </View>
              <TouchableOpacity
                style={[styles.toggle, { backgroundColor: colors.background }, !watermark && styles.toggleOn]}
                onPress={handleWatermarkToggle}
              >
                <View style={[styles.toggleThumb, !watermark && styles.toggleThumbOn]} />
              </TouchableOpacity>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionName, { color: colors.text }]}>Add to Gallery</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>Save to your device automatically</Text>
              </View>
              <TouchableOpacity style={[styles.toggle, styles.toggleOn]}>
                <View style={[styles.toggleThumb, styles.toggleThumbOn]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>📋 Export Summary</Text>
          <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Format</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{format?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Resolution</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{format?.resolution}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Quality</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{quality?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Watermark</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{watermark ? 'Included' : 'Removed'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleExport} disabled={isExporting}>
            <LinearGradient
              colors={isExporting ? ['#666', '#444'] : !canExport ? ['#444', '#333'] : ['#22c55e', '#16a34a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.exportButton}
            >
              <Text style={styles.exportText}>
                {isExporting ? '⏳ Exporting...' : !canExport ? '🔒 Upgrade to Export' : '📤 Export Video'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <LinearGradient colors={['#ff2d6a', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.shareGradient}>
              <Text style={styles.shareText}>📲 Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 10 },
  backButton: { marginRight: 16 },
  backText: { fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  proChip: { backgroundColor: 'rgba(251,191,36,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  proChipText: { color: '#fbbf24', fontSize: 12, fontWeight: '700' },
  limitBanner: { backgroundColor: 'rgba(239,68,68,0.15)', marginHorizontal: 20, padding: 12, borderRadius: 12, marginBottom: 12 },
  limitText: { color: '#ef4444', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  formatGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  formatCard: { width: '30%', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  formatCardSelected: { borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)' },
  formatEmoji: { fontSize: 28, marginBottom: 4 },
  formatName: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  formatRes: { fontSize: 9, marginTop: 2 },
  formatBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginTop: 4 },
  formatBadgeText: { fontSize: 9 },
  qualityList: { borderRadius: 16, overflow: 'hidden' },
  qualityItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  qualityItemSelected: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
  qualityInfo: { flex: 1 },
  qualityHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qualityName: { fontSize: 15, fontWeight: '600' },
  proBadge: { backgroundColor: '#fbbf24', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  proBadgeLocked: { backgroundColor: '#555' },
  proBadgeText: { color: '#1a1a2e', fontSize: 10, fontWeight: 'bold' },
  qualitySize: { fontSize: 12, marginTop: 2 },
  qualityCheck: { color: '#22c55e', fontSize: 18, fontWeight: 'bold' },
  optionsCard: { borderRadius: 16, padding: 4 },
  optionRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  optionInfo: { flex: 1 },
  optionName: { fontSize: 15, fontWeight: '600' },
  optionDesc: { fontSize: 12, marginTop: 2 },
  divider: { height: 1, marginHorizontal: 12 },
  toggle: { width: 50, height: 30, borderRadius: 15, padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: '#22c55e' },
  toggleThumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end' },
  summary: { paddingHorizontal: 20, marginBottom: 24 },
  summaryTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  summaryCard: { borderRadius: 16, padding: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: '600' },
  actions: { padding: 20, paddingBottom: 40, gap: 12 },
  exportButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  exportText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  shareButton: { marginTop: 0 },
  shareGradient: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  shareText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

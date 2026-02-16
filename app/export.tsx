import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

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
  const [selectedFormat, setSelectedFormat] = useState('tiktok');
  const [selectedQuality, setSelectedQuality] = useState('sd');
  const [isExporting, setIsExporting] = useState(false);
  const [watermark, setWatermark] = useState(true);

  const format = exportFormats.find((f) => f.id === selectedFormat);
  const quality = qualityOptions.find((q) => q.id === selectedQuality);

  const handleExport = () => {
    if (quality?.badge === 'PRO' && selectedQuality !== 'sd') {
      Alert.alert('PRO Feature', 'HD and 4K exports are available for PRO members. Upgrade to export in higher quality!', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => router.push('/paywall') },
      ]);
      return;
    }

    setIsExporting(true);
    
    setTimeout(() => {
      setIsExporting(false);
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>📤 Export</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Export Format</Text>
          <View style={styles.formatGrid}>
            {exportFormats.map((fmt) => (
              <TouchableOpacity
                key={fmt.id}
                style={[styles.formatCard, selectedFormat === fmt.id && styles.formatCardSelected]}
                onPress={() => setSelectedFormat(fmt.id)}
              >
                <Text style={styles.formatEmoji}>{fmt.emoji}</Text>
                <Text style={styles.formatName}>{fmt.name}</Text>
                <Text style={styles.formatRes}>{fmt.resolution}</Text>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>{fmt.ratio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎬 Quality</Text>
          <View style={styles.qualityList}>
            {qualityOptions.map((q) => (
              <TouchableOpacity
                key={q.id}
                style={[styles.qualityItem, selectedQuality === q.id && styles.qualityItemSelected]}
                onPress={() => setSelectedQuality(q.id)}
              >
                <View style={styles.qualityInfo}>
                  <View style={styles.qualityHeader}>
                    <Text style={styles.qualityName}>{q.name}</Text>
                    {q.badge === 'PRO' && (
                      <View style={styles.proBadge}>
                        <Text style={styles.proBadgeText}>PRO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.qualitySize}>{q.size}</Text>
                </View>
                {selectedQuality === q.id && (
                  <Text style={styles.qualityCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Options</Text>
          <View style={styles.optionsCard}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Remove Watermark</Text>
                <Text style={styles.optionDesc}>Remove AI Video Shorts watermark</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggle, watermark && styles.toggleOn]}
                onPress={() => setWatermark(!watermark)}
              >
                <View style={[styles.toggleThumb, watermark && styles.toggleThumbOn]} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Add to Gallery</Text>
                <Text style={styles.optionDesc}>Save to your device automatically</Text>
              </View>
              <TouchableOpacity style={[styles.toggle, styles.toggleOn]}>
                <View style={[styles.toggleThumb, styles.toggleThumbOn]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>📋 Export Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Format</Text>
              <Text style={styles.summaryValue}>{format?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Resolution</Text>
              <Text style={styles.summaryValue}>{format?.resolution}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Quality</Text>
              <Text style={styles.summaryValue}>{quality?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Watermark</Text>
              <Text style={styles.summaryValue}>{watermark ? 'Included' : 'Removed'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleExport} disabled={isExporting}>
            <LinearGradient colors={isExporting ? ['#666', '#444'] : ['#22c55e', '#16a34a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.exportButton}>
              <Text style={styles.exportText}>
                {isExporting ? '⏳ Exporting...' : '📤 Export Video'}
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
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 10 },
  backButton: { marginRight: 16 },
  backText: { color: '#ff2d6a', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  formatGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  formatCard: { width: '30%', backgroundColor: '#252542', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  formatCardSelected: { borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)' },
  formatEmoji: { fontSize: 28, marginBottom: 4 },
  formatName: { color: '#fff', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  formatRes: { color: '#8b8b9e', fontSize: 9, marginTop: 2 },
  formatBadge: { backgroundColor: '#1a1a2e', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginTop: 4 },
  formatBadgeText: { color: '#8b8b9e', fontSize: 9 },
  qualityList: { backgroundColor: '#252542', borderRadius: 16, overflow: 'hidden' },
  qualityItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a2e' },
  qualityItemSelected: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
  qualityInfo: { flex: 1 },
  qualityHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qualityName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  proBadge: { backgroundColor: '#fbbf24', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  proBadgeText: { color: '#1a1a2e', fontSize: 10, fontWeight: 'bold' },
  qualitySize: { color: '#8b8b9e', fontSize: 12, marginTop: 2 },
  qualityCheck: { color: '#22c55e', fontSize: 18, fontWeight: 'bold' },
  optionsCard: { backgroundColor: '#252542', borderRadius: 16, padding: 4 },
  optionRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  optionInfo: { flex: 1 },
  optionName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  optionDesc: { color: '#8b8b9e', fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#1a1a2e', marginHorizontal: 12 },
  toggle: { width: 50, height: 30, borderRadius: 15, backgroundColor: '#1a1a2e', padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: '#22c55e' },
  toggleThumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end' },
  summary: { paddingHorizontal: 20, marginBottom: 24 },
  summaryTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  summaryCard: { backgroundColor: '#252542', borderRadius: 16, padding: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: '#8b8b9e', fontSize: 14 },
  summaryValue: { color: '#fff', fontSize: 14, fontWeight: '600' },
  actions: { padding: 20, paddingBottom: 40, gap: 12 },
  exportButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  exportText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  shareButton: { marginTop: 0 },
  shareGradient: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  shareText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

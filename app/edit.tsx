import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeColors } from '../src/contexts/ThemeContext';

const editingTools = [
  { id: 'trim', emoji: '✂️', name: 'Trim', description: 'Cut start/end' },
  { id: 'music', emoji: '🎵', name: 'Music', description: 'Add background music' },
  { id: 'text', emoji: '📝', name: 'Text', description: 'Add captions' },
  { id: 'filter', emoji: '🎨', name: 'Filters', description: 'Apply effects' },
  { id: 'speed', emoji: '⚡', name: 'Speed', description: 'Adjust playback' },
  { id: 'volume', emoji: '🔊', name: 'Volume', description: 'Audio levels' },
];

const filters = [
  { id: 'none', name: 'Original' },
  { id: 'vibrant', name: 'Vibrant' },
  { id: 'warm', name: 'Warm' },
  { id: 'cool', name: 'Cool' },
  { id: 'noir', name: 'Noir' },
  { id: 'vintage', name: 'Vintage' },
];

const musicOptions = [
  { id: 'none', name: 'No Music', emoji: '🔇' },
  { id: 'upbeat', name: 'Upbeat', emoji: '🎉' },
  { id: 'chill', name: 'Chill', emoji: '😌' },
  { id: 'dramatic', name: 'Dramatic', emoji: '🎭' },
  { id: 'electronic', name: 'Electronic', emoji: '🎹' },
];

export default function EditScreen() {
  const params = useLocalSearchParams<{ projectId?: string }>();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [selectedMusic, setSelectedMusic] = useState('none');
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const colors = useThemeColors();

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
    setHasChanges(true);
  };

  const handleSave = () => {
    Alert.alert('Saved! 🎉', 'Your edits have been saved.', [
      { text: 'Continue Editing' },
      { text: 'Export Video', onPress: () => router.push('/export') },
    ]);
  };

  const handleReset = () => {
    setSelectedFilter('none');
    setSelectedMusic('none');
    setTrimStart(0);
    setTrimEnd(100);
    setVideoSpeed(1);
    setHasChanges(false);
    Alert.alert('Reset', 'All edits have been reset.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={[styles.backText, { color: colors.accent }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>✏️ Edit Video</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={[styles.resetText, { color: colors.textSecondary }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewContainer}>
          <View style={[styles.preview, { backgroundColor: colors.card }]}>
            <Text style={styles.previewEmoji}>🎬</Text>
            <Text style={[styles.previewText, { color: colors.text }]}>Video Preview</Text>
            <Text style={[styles.previewSubtext, { color: colors.textSecondary }]}>Tap a tool to start editing</Text>
          </View>
          
          <View style={styles.timeline}>
            <View style={[styles.timelineBar, { backgroundColor: colors.card }]}>
              <View style={[styles.timelineSelected, { left: `${trimStart}%`, width: `${trimEnd - trimStart}%` }]} />
            </View>
            <View style={styles.timelineLabels}>
              <Text style={[styles.timelineLabel, { color: colors.textSecondary }]}>{Math.floor(trimStart * 0.6)}s</Text>
              <Text style={[styles.timelineLabel, { color: colors.textSecondary }]}>{Math.floor(trimEnd * 0.6)}s</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🛠️ Tools</Text>
          <View style={styles.toolsGrid}>
            {editingTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[styles.toolCard, { backgroundColor: colors.card }, selectedTool === tool.id && styles.toolCardSelected]}
                onPress={() => handleToolSelect(tool.id)}
              >
                <Text style={styles.toolEmoji}>{tool.emoji}</Text>
                <Text style={[styles.toolName, { color: colors.text }]}>{tool.name}</Text>
                <Text style={[styles.toolDesc, { color: colors.textSecondary }]}>{tool.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedTool === 'filter' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🎨 Filters</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    style={styles.filterCard}
                    onPress={() => {
                      setSelectedFilter(filter.id);
                      setHasChanges(true);
                    }}
                  >
                    <View style={[styles.filterPreview, { backgroundColor: colors.card }, filter.id !== 'none' && { backgroundColor: filter.id === 'vibrant' ? '#ff6b6b' : filter.id === 'warm' ? '#ffa500' : filter.id === 'cool' ? '#4ecdc4' : filter.id === 'noir' ? '#333' : '#d4a574' }]} />
                    <Text style={[styles.filterName, { color: colors.textSecondary }, selectedFilter === filter.id && styles.filterNameSelected]}>{filter.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {selectedTool === 'music' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🎵 Background Music</Text>
            <View style={[styles.musicList, { backgroundColor: colors.card }]}>
              {musicOptions.map((music) => (
                <TouchableOpacity
                  key={music.id}
                  style={[styles.musicItem, { borderBottomColor: colors.border }, selectedMusic === music.id && styles.musicItemSelected]}
                  onPress={() => {
                    setSelectedMusic(music.id);
                    setHasChanges(true);
                  }}
                >
                  <Text style={styles.musicEmoji}>{music.emoji}</Text>
                  <Text style={[styles.musicName, { color: colors.text }]}>{music.name}</Text>
                  {selectedMusic === music.id && <Text style={styles.musicCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTool === 'speed' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>⚡ Speed</Text>
            <View style={styles.speedRow}>
              {[0.5, 1, 1.5, 2].map((speed) => (
                <TouchableOpacity
                  key={speed}
                  style={[styles.speedButton, { backgroundColor: colors.card }, videoSpeed === speed && styles.speedButtonSelected]}
                  onPress={() => {
                    setVideoSpeed(speed);
                    setHasChanges(true);
                  }}
                >
                  <Text style={[styles.speedText, { color: colors.text }, videoSpeed === speed && styles.speedTextSelected]}>{speed}x</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTool === 'trim' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>✂️ Trim Video</Text>
            <View style={styles.trimInfo}>
              <Text style={[styles.trimText, { color: colors.textSecondary }]}>Start: {Math.floor(trimStart * 0.6)}s</Text>
              <Text style={[styles.trimText, { color: colors.textSecondary }]}>End: {Math.floor(trimEnd * 0.6)}s</Text>
              <Text style={[styles.trimText, { color: colors.textSecondary }]}>Duration: {Math.floor((trimEnd - trimStart) * 0.6)}s</Text>
            </View>
            <View style={styles.trimButtons}>
              <TouchableOpacity style={[styles.trimButton, { backgroundColor: colors.card }]} onPress={() => setTrimStart(Math.max(0, trimStart - 5))}>
                <Text style={[styles.trimButtonText, { color: colors.text }]}>- Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.trimButton, { backgroundColor: colors.card }]} onPress={() => setTrimEnd(Math.min(100, trimEnd + 5))}>
                <Text style={[styles.trimButtonText, { color: colors.text }]}>+ End</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTool === 'volume' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🔊 Volume</Text>
            <View style={styles.volumeSlider}>
              <Text style={[styles.volumeLabel, { color: colors.text }]}>Original Audio</Text>
              <View style={[styles.volumeBar, { backgroundColor: colors.card }]}>
                <View style={[styles.volumeFill, { width: '80%' }]} />
              </View>
            </View>
            <View style={styles.volumeSlider}>
              <Text style={[styles.volumeLabel, { color: colors.text }]}>Music</Text>
              <View style={[styles.volumeBar, { backgroundColor: colors.card }]}>
                <View style={[styles.volumeFill, { width: '50%' }]} />
              </View>
            </View>
          </View>
        )}

        {selectedTool === 'text' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📝 Add Text</Text>
            <View style={styles.textOptions}>
              <TouchableOpacity style={[styles.textOption, { backgroundColor: colors.card }]}>
                <Text style={styles.textOptionEmoji}>Aa</Text>
                <Text style={[styles.textOptionName, { color: colors.text }]}>Title</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.textOption, { backgroundColor: colors.card }]}>
                <Text style={styles.textOptionEmoji}>caption</Text>
                <Text style={[styles.textOptionName, { color: colors.text }]}>Caption</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.textOption, { backgroundColor: colors.card }]}>
                <Text style={styles.textOptionEmoji}>💬</Text>
                <Text style={[styles.textOptionName, { color: colors.text }]}>Sticker</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleSave}>
            <LinearGradient colors={hasChanges ? ['#ff2d6a', '#8b5cf6'] : ['#666', '#444']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveButton}>
              <Text style={styles.saveText}>💾 Save & Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/export')}>
            <LinearGradient colors={['#22c55e', '#16a34a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.exportButton}>
              <Text style={styles.exportText}>📤 Export Video</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 10 },
  backButton: { padding: 8 },
  backText: { fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  resetButton: { padding: 8 },
  resetText: { fontSize: 14 },
  previewContainer: { paddingHorizontal: 20, marginBottom: 20 },
  preview: { height: 200, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  previewEmoji: { fontSize: 48, marginBottom: 8 },
  previewText: { fontSize: 16, fontWeight: '600' },
  previewSubtext: { fontSize: 12, marginTop: 4 },
  timeline: { marginTop: 12 },
  timelineBar: { height: 4, borderRadius: 2, position: 'relative' },
  timelineSelected: { position: 'absolute', height: '100%', backgroundColor: '#ff2d6a', borderRadius: 2 },
  timelineLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  timelineLabel: { fontSize: 11 },
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  toolCard: { width: '30%', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  toolCardSelected: { borderColor: '#ff2d6a', backgroundColor: 'rgba(255, 45, 106, 0.1)' },
  toolEmoji: { fontSize: 28, marginBottom: 8 },
  toolName: { fontSize: 13, fontWeight: '600' },
  toolDesc: { fontSize: 10, marginTop: 2, textAlign: 'center' },
  filterRow: { flexDirection: 'row', gap: 12, paddingRight: 20 },
  filterCard: { alignItems: 'center', padding: 8 },
  filterPreview: { width: 60, height: 60, borderRadius: 12, marginBottom: 8 },
  filterName: { fontSize: 12 },
  filterNameSelected: { color: '#ff2d6a', fontWeight: '600' },
  musicList: { borderRadius: 16, overflow: 'hidden' },
  musicItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  musicItemSelected: { backgroundColor: 'rgba(255, 45, 106, 0.1)' },
  musicEmoji: { fontSize: 24, marginRight: 12 },
  musicName: { fontSize: 15, flex: 1 },
  musicCheck: { color: '#ff2d6a', fontSize: 18, fontWeight: 'bold' },
  speedRow: { flexDirection: 'row', gap: 12 },
  speedButton: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  speedButtonSelected: { backgroundColor: '#ff2d6a' },
  speedText: { fontSize: 16, fontWeight: '600' },
  speedTextSelected: { color: '#fff' },
  trimInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  trimText: { fontSize: 14 },
  trimButtons: { flexDirection: 'row', gap: 12 },
  trimButton: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  trimButtonText: { fontSize: 14, fontWeight: '600' },
  volumeSlider: { marginBottom: 16 },
  volumeLabel: { fontSize: 14, marginBottom: 8 },
  volumeBar: { height: 8, borderRadius: 4 },
  volumeFill: { height: '100%', backgroundColor: '#ff2d6a', borderRadius: 4 },
  textOptions: { flexDirection: 'row', gap: 12 },
  textOption: { flex: 1, borderRadius: 16, padding: 20, alignItems: 'center' },
  textOptionEmoji: { fontSize: 32, marginBottom: 8 },
  textOptionName: { fontSize: 13, fontWeight: '600' },
  actions: { padding: 20, paddingBottom: 40, gap: 12 },
  saveButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 12 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  exportButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  exportText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

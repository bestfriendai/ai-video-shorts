import { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTemplates, type Template } from '../../src/services/content';
import { useThemeColors } from '../../src/contexts/ThemeContext';

export default function TemplatesScreen() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const colors = useThemeColors();

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const categories = useMemo(() => ['All', ...new Set(templates.map((t) => t.category))], [templates]);
  const filtered = useMemo(
    () => (selectedCategory === 'All' ? templates : templates.filter((t) => t.category === selectedCategory)),
    [selectedCategory, templates]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>📋 Templates</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Choose from viral-ready templates</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, { backgroundColor: colors.card }, selectedCategory === category && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, { color: colors.textSecondary }, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.templateList}>
        <View style={styles.templatesGrid}>
          {filtered.map((template) => (
            <TouchableOpacity key={template.id} style={[styles.templateCard, { backgroundColor: colors.card }]}>
              <View style={[styles.templatePreview, { backgroundColor: colors.background }]}>
                <Text style={styles.templateEmoji}>{template.emoji}</Text>
                {template.trending && (
                  <View style={styles.trendingBadge}>
                    <Text style={styles.trendingText}>🔥</Text>
                  </View>
                )}
              </View>
              <View style={styles.templateInfo}>
                <Text style={[styles.templateName, { color: colors.text }]}>{template.name}</Text>
                <Text style={[styles.templateCategory, { color: colors.textSecondary }]}>{template.category}</Text>
                <Text style={[styles.templateUses, { color: colors.textSecondary }]}>{template.uses} uses</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  categoryScroll: { paddingHorizontal: 16, marginBottom: 16 },
  categories: { flexDirection: 'row', gap: 10 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  categoryChipActive: { backgroundColor: '#ff2d6a' },
  categoryText: { fontSize: 13, fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  templateList: { flex: 1, paddingHorizontal: 16 },
  templatesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingBottom: 100 },
  templateCard: { width: '47%', borderRadius: 16, overflow: 'hidden' },
  templatePreview: { height: 100, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  templateEmoji: { fontSize: 40 },
  trendingBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#ff2d6a', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  trendingText: { fontSize: 12 },
  templateInfo: { padding: 12 },
  templateName: { fontSize: 14, fontWeight: '600' },
  templateCategory: { fontSize: 11, marginTop: 2 },
  templateUses: { fontSize: 10, marginTop: 4 },
});

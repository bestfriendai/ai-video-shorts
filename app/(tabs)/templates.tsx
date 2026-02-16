import { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTemplates, type Template } from '../../src/services/content';

export default function TemplatesScreen() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const categories = useMemo(() => ['All', ...new Set(templates.map((t) => t.category))], [templates]);
  const filtered = useMemo(
    () => (selectedCategory === 'All' ? templates : templates.filter((t) => t.category === selectedCategory)),
    [selectedCategory, templates]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Templates</Text>
        <Text style={styles.subtitle}>Choose from viral-ready templates</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.templateList}>
        <View style={styles.templatesGrid}>
          {filtered.map((template) => (
            <TouchableOpacity key={template.id} style={styles.templateCard}>
              <View style={styles.templatePreview}>
                <Text style={styles.templateEmoji}>{template.emoji}</Text>
                {template.trending && (
                  <View style={styles.trendingBadge}>
                    <Text style={styles.trendingText}>🔥</Text>
                  </View>
                )}
              </View>
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category}</Text>
                <Text style={styles.templateUses}>{template.uses} uses</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#8b8b9e', fontSize: 14, marginTop: 4 },
  categoryScroll: { paddingHorizontal: 16, marginBottom: 16 },
  categories: { flexDirection: 'row', gap: 10 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#252542' },
  categoryChipActive: { backgroundColor: '#ff2d6a' },
  categoryText: { color: '#8b8b9e', fontSize: 13, fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  templateList: { flex: 1, paddingHorizontal: 16 },
  templatesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingBottom: 100 },
  templateCard: { width: '47%', backgroundColor: '#252542', borderRadius: 16, overflow: 'hidden' },
  templatePreview: { height: 100, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  templateEmoji: { fontSize: 40 },
  trendingBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#ff2d6a', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  trendingText: { fontSize: 12 },
  templateInfo: { padding: 12 },
  templateName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  templateCategory: { color: '#8b8b9e', fontSize: 11, marginTop: 2 },
  templateUses: { color: '#666', fontSize: 10, marginTop: 4 },
});

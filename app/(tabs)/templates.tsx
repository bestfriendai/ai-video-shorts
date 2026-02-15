import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Template {
  id: string;
  name: string;
  emoji: string;
  category: string;
  uses: string;
  trending: boolean;
}

const templates: Template[] = [
  { id: '1', name: 'Dance Challenge', emoji: '💃', category: 'Trending', uses: '2.3M', trending: true },
  { id: '2', name: 'Story Reveal', emoji: '📖', category: 'Narrative', uses: '1.8M', trending: true },
  { id: '3', name: 'Before & After', emoji: '✨', category: 'Transformation', uses: '950K', trending: false },
  { id: '4', name: 'Quick Tutorial', emoji: '📚', category: 'Educational', uses: '720K', trending: false },
  { id: '5', name: 'Comedy Skit', emoji: '😂', category: 'Entertainment', uses: '1.2M', trending: true },
  { id: '6', name: 'Motivation Boost', emoji: '🔥', category: 'Inspiration', uses: '890K', trending: false },
  { id: '7', name: 'Fashion Flip', emoji: '👗', category: 'Fashion', uses: '650K', trending: false },
  { id: '8', name: 'Food ASMR', emoji: '🍜', category: 'Lifestyle', uses: '1.1M', trending: true },
  { id: '9', name: 'Travel Vlog', emoji: '✈️', category: 'Travel', uses: '780K', trending: false },
  { id: '10', name: 'Fitness Tips', emoji: '💪', category: 'Health', uses: '920K', trending: false },
  { id: '11', name: 'DIY Project', emoji: '🛠️', category: 'Craft', uses: '540K', trending: false },
  { id: '12', name: 'Pet Compilations', emoji: '🐕', category: 'Animals', uses: '1.5M', trending: true },
];

const categories = ['All', 'Trending', 'Narrative', 'Entertainment', 'Educational'];

export default function TemplatesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 Templates</Text>
        <Text style={styles.subtitle}>Choose from viral-ready templates</Text>
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categories}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, index === 0 && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Templates Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.templateList}>
        <View style={styles.templatesGrid}>
          {templates.map((template) => (
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
  subtitle: {
    color: '#8b8b9e',
    fontSize: 14,
    marginTop: 4,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#252542',
  },
  categoryChipActive: {
    backgroundColor: '#ff2d6a',
  },
  categoryText: {
    color: '#8b8b9e',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  templateList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 100,
  },
  templateCard: {
    width: '47%',
    backgroundColor: '#252542',
    borderRadius: 16,
    overflow: 'hidden',
  },
  templatePreview: {
    height: 100,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  templateEmoji: {
    fontSize: 40,
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff2d6a',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingText: {
    fontSize: 12,
  },
  templateInfo: {
    padding: 12,
  },
  templateName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  templateCategory: {
    color: '#8b8b9e',
    fontSize: 11,
    marginTop: 2,
  },
  templateUses: {
    color: '#666',
    fontSize: 10,
    marginTop: 4,
  },
});

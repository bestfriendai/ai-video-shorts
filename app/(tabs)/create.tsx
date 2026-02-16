import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRevenueCat } from '../../src/services/purchases';
import { addProject, getProjects } from '../../src/services/projects';
import { router } from 'expo-router';

const styleTemplates = [
  { id: '1', name: 'Dance Trend', emoji: '💃', category: 'Trending' },
  { id: '2', name: 'Story Time', emoji: '📖', category: 'Narrative' },
  { id: '3', name: 'Transformation', emoji: '✨', category: 'Viral' },
  { id: '4', name: 'Tutorial', emoji: '📚', category: 'Educational' },
];

export default function CreateScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isProMember } = useRevenueCat();

  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedTemplate) {
      Alert.alert('Missing Input', 'Please enter a prompt or select a template');
      return;
    }

    const projects = await getProjects();
    if (!isProMember && projects.length >= 3) {
      Alert.alert('Free Limit Reached', "You've used your 3 free videos. Upgrade to PRO for unlimited generations!", [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => router.push('/paywall') },
      ]);
      return;
    }

    setIsGenerating(true);

    const selected = styleTemplates.find((t) => t.id === selectedTemplate);
    await addProject({
      title: prompt.trim() || selected?.name || 'Untitled Video',
      template: selected?.name,
    });

    setIsGenerating(false);
    Alert.alert('Video Created! 🎉', 'Your project was added to your library.', [
      { text: 'View Projects', onPress: () => router.push('/') },
      { text: 'OK' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>✨ Create Video</Text>
          <Text style={styles.subtitle}>Turn your ideas into short videos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Describe Your Video</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="E.g., A person dancing in neon lights..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={prompt}
            onChangeText={setPrompt}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Or Choose a Template</Text>
          <View style={styles.templatesGrid}>
            {styleTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateCard, selectedTemplate === template.id && styles.templateCardSelected]}
                onPress={() => setSelectedTemplate(template.id)}
              >
                <Text style={styles.templateEmoji}>{template.emoji}</Text>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.generateContainer}>
          <TouchableOpacity onPress={handleGenerate} disabled={isGenerating}>
            <LinearGradient colors={isGenerating ? ['#666', '#444'] : ['#ff2d6a', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.generateButton}>
              <Text style={styles.generateText}>{isGenerating ? '🎬 Creating...' : '🚀 Create Project'}</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  promptInput: { backgroundColor: '#252542', borderRadius: 16, padding: 16, color: '#fff', fontSize: 15, minHeight: 120, textAlignVertical: 'top' },
  templatesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  templateCard: { width: '47%', backgroundColor: '#252542', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  templateCardSelected: { borderColor: '#ff2d6a', backgroundColor: 'rgba(255, 45, 106, 0.1)' },
  templateEmoji: { fontSize: 32, marginBottom: 8 },
  templateName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  templateCategory: { color: '#8b8b9e', fontSize: 11, marginTop: 2 },
  generateContainer: { padding: 20, paddingBottom: 40 },
  generateButton: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  generateText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

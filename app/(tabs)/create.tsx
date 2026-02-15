import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRevenueCat } from '../../src/services/purchases';
import { router } from 'expo-router';

const stylesTemplates = [
  { id: '1', name: 'Dance Trend', emoji: '💃', category: 'Trending' },
  { id: '2', name: 'Story Time', emoji: '📖', category: 'Narrative' },
  { id: '3', name: 'Transformation', emoji: '✨', category: 'Viral' },
  { id: '4', name: 'Tutorial', emoji: '📚', category: 'Educational' },
  { id: '5', name: 'Comedy', emoji: '😂', category: 'Entertainment' },
  { id: '6', name: 'Motivation', emoji: '🔥', category: 'Inspiration' },
];

export default function CreateScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isProMember } = useRevenueCat();

  const handleGenerate = () => {
    if (!prompt.trim() && !selectedTemplate) {
      Alert.alert('Missing Input', 'Please enter a prompt or select a template');
      return;
    }

    if (!isProMember) {
      Alert.alert(
        'Free Limit Reached',
        'You\'ve used your 3 free videos. Upgrade to PRO for unlimited generations!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => router.push('/paywall') },
        ]
      );
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert('Video Generated! 🎉', 'Your AI video is ready for editing.');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>✨ Create Video</Text>
          <Text style={styles.subtitle}>Turn your ideas into viral short videos</Text>
        </View>

        {/* Prompt Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Describe Your Video</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="E.g., A person dancing in neon lights with futuristic music..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={prompt}
            onChangeText={setPrompt}
          />
        </View>

        {/* Template Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Or Choose a Template</Text>
          <View style={styles.templatesGrid}>
            {stylesTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id && styles.templateCardSelected,
                ]}
                onPress={() => setSelectedTemplate(template.id)}
              >
                <Text style={styles.templateEmoji}>{template.emoji}</Text>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Options</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🎵</Text>
              <Text style={styles.optionText}>Add Music</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🎤</Text>
              <Text style={styles.optionText}>AI Voiceover</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>💬</Text>
              <Text style={styles.optionText}>Add Captions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🎨</Text>
              <Text style={styles.optionText}>Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Generate Button */}
        <View style={styles.generateContainer}>
          <TouchableOpacity onPress={handleGenerate} disabled={isGenerating}>
            <LinearGradient
              colors={isGenerating ? ['#666', '#444'] : ['#ff2d6a', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              <Text style={styles.generateText}>
                {isGenerating ? '🎬 Generating...' : '🚀 Generate Video'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.generateHint}>
            {isProMember ? 'Unlimited generations' : '3 free generations remaining'}
          </Text>
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
  promptInput: {
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
    color: '#fff',
    fontSize: 15,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '47%',
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templateCardSelected: {
    borderColor: '#ff2d6a',
    backgroundColor: 'rgba(255, 45, 106, 0.1)',
  },
  templateEmoji: {
    fontSize: 32,
    marginBottom: 8,
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    width: '47%',
    backgroundColor: '#252542',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  generateContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  generateButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  generateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  generateHint: {
    color: '#8b8b9e',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});

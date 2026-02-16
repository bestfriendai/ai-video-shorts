import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '🎬',
    title: 'Create AI Videos',
    desc: 'Turn your ideas into stunning short-form videos with the power of AI. No editing skills needed.',
    color: '#ff2d6a',
  },
  {
    emoji: '📤',
    title: 'Export Anywhere',
    desc: 'One-tap export to TikTok, Instagram Reels, YouTube Shorts, and more. Perfect format every time.',
    color: '#8b5cf6',
  },
  {
    emoji: '✨',
    title: 'Go Pro',
    desc: 'Unlimited exports, HD quality, no watermarks, and all premium templates. Start creating like a pro.',
    color: '#22c55e',
  },
];

type Props = {
  onComplete: () => void;
};

export default function OnboardingScreen({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={onComplete}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.slideEmoji}>{item.emoji}</Text>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDesc}>{item.desc}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, currentIndex === i && styles.dotActive]} />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextText}>
          {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  skipBtn: { position: 'absolute', top: 60, right: 24, zIndex: 10 },
  skipText: { color: '#8b8b9e', fontSize: 16 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  slideEmoji: { fontSize: 80, marginBottom: 24 },
  slideTitle: { color: '#fff', fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
  slideDesc: { color: '#8b8b9e', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#252542' },
  dotActive: { backgroundColor: '#ff2d6a', width: 24 },
  nextBtn: { marginHorizontal: 24, marginBottom: 32, backgroundColor: '#ff2d6a', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});

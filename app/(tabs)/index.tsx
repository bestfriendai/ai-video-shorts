import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRevenueCat } from '../../src/services/purchases';

const { width } = Dimensions.get('window');
const VIDEO_WIDTH = width - 32;

interface TrendingVideo {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  likes: string;
  creator: string;
}

const trendingVideos: TrendingVideo[] = [
  { id: '1', thumbnail: '🎵', title: 'AI Dance Challenge', views: '2.3M', likes: '456K', creator: '@dance_ai' },
  { id: '2', thumbnail: '🔥', title: 'Viral Story Format', views: '1.8M', likes: '320K', creator: '@storytime' },
  { id: '3', thumbnail: '✨', title: 'Transform Your Look', views: '950K', likes: '180K', creator: '@beauty_ai' },
  { id: '4', thumbnail: '💫', title: 'Trending Transition', views: '720K', likes: '145K', creator: '@edit_pro' },
  { id: '5', thumbnail: '🎤', title: 'AI Voiceover Magic', views: '1.2M', likes: '210K', creator: '@voice_ai' },
];

export default function HomeScreen() {
  const { isProMember } = useRevenueCat();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#ff2d6a', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoContainer}
          >
            <Text style={styles.logoText}>AI Video Shorts</Text>
          </LinearGradient>
          <Text style={styles.subtitle}>Create viral TikToks & Reels with AI</Text>
        </View>

        {/* Pro Banner */}
        {!isProMember && (
          <TouchableOpacity style={styles.proBanner}>
            <LinearGradient
              colors={['#fbbf24', '#f59e0b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proGradient}
            >
              <Text style={styles.proText}>⚡ Upgrade to PRO - Unlimited Videos</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Quick Create */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Quick Create</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickIcon}>🎬</Text>
              <Text style={styles.quickLabel}>From Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickIcon}>🖼️</Text>
              <Text style={styles.quickLabel}>From Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickIcon}>🎵</Text>
              <Text style={styles.quickLabel}>Add Music</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickIcon}>🎤</Text>
              <Text style={styles.quickLabel}>Voiceover</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
            {trendingVideos.map((video) => (
              <TouchableOpacity key={video.id} style={styles.videoCard}>
                <View style={styles.thumbnail}>
                  <Text style={styles.thumbnailIcon}>{video.thumbnail}</Text>
                  <View style={styles.playOverlay}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                  <Text style={styles.videoMeta}>{video.views} • {video.creator}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📁 Your Projects</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎥</Text>
            <Text style={styles.emptyText}>No videos yet</Text>
            <Text style={styles.emptySubtext}>Tap "Create" to make your first AI video!</Text>
          </View>
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
  logoContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#8b8b9e',
    fontSize: 14,
    marginTop: 8,
  },
  proBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  proGradient: {
    padding: 14,
    alignItems: 'center',
  },
  proText: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  quickIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  trendingScroll: {
    paddingLeft: 20,
  },
  videoCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#252542',
    borderRadius: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailIcon: {
    fontSize: 48,
  },
  playOverlay: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 45, 106, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 4,
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoMeta: {
    color: '#8b8b9e',
    fontSize: 11,
  },
  emptyState: {
    marginHorizontal: 20,
    backgroundColor: '#252542',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#8b8b9e',
    fontSize: 13,
    marginTop: 4,
  },
});

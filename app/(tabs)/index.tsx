import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRevenueCat } from '../../src/services/purchases';
import { getTrendingVideos, type TrendingVideo } from '../../src/services/content';
import { getProjects, type Project } from '../../src/services/projects';
import { useThemeColors } from '../../src/contexts/ThemeContext';

export default function HomeScreen() {
  const { isProMember } = useRevenueCat();
  const [trendingVideos, setTrendingVideos] = useState<TrendingVideo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const colors = useThemeColors();

  useEffect(() => {
    getTrendingVideos().then(setTrendingVideos);
    getProjects().then(setProjects);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LinearGradient colors={['#ff2d6a', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.logoContainer}>
            <Text style={styles.logoText}>ReelMint</Text>
          </LinearGradient>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Create viral TikToks & Reels with AI</Text>
        </View>

        {!isProMember && (
          <TouchableOpacity style={styles.proBanner}>
            <LinearGradient colors={['#fbbf24', '#f59e0b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proGradient}>
              <Text style={styles.proText}>⚡ Upgrade to PRO - Unlimited Videos</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🔥 Trending Now</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
            {trendingVideos.map((video) => (
              <TouchableOpacity key={video.id} style={[styles.videoCard, { backgroundColor: colors.card }]}>
                <View style={[styles.thumbnail, { backgroundColor: colors.background }]}>
                  <Text style={styles.thumbnailIcon}>{video.thumbnail}</Text>
                  <View style={styles.playOverlay}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={[styles.videoTitle, { color: colors.text }]} numberOfLines={2}>{video.title}</Text>
                  <Text style={[styles.videoMeta, { color: colors.textSecondary }]}>{video.views} • {video.creator}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>📁 Your Projects</Text>
          {projects.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
              <Text style={styles.emptyIcon}>🎥</Text>
              <Text style={[styles.emptyText, { color: colors.text }]}>No videos yet</Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Tap "Create" to make your first AI video!</Text>
            </View>
          ) : (
            <View style={[styles.projectList, { backgroundColor: colors.card }]}>
              {projects.slice(0, 5).map((project) => (
                <View key={project.id} style={[styles.projectRow, { borderBottomColor: colors.border }]}>
                  <Text style={[styles.projectTitle, { color: colors.text }]}>{project.title}</Text>
                  <Text style={[styles.projectMeta, { color: colors.textSecondary }]}>{new Date(project.createdAt).toLocaleDateString()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  logoContainer: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, marginTop: 8 },
  proBanner: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: 'hidden' },
  proGradient: { padding: 14, alignItems: 'center' },
  proText: { color: '#1a1a2e', fontWeight: 'bold', fontSize: 15 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', paddingHorizontal: 20, marginBottom: 12 },
  trendingScroll: { paddingLeft: 20 },
  videoCard: { width: 160, marginRight: 12, borderRadius: 16, overflow: 'hidden' },
  thumbnail: { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' },
  thumbnailIcon: { fontSize: 48 },
  playOverlay: { position: 'absolute', width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255, 45, 106, 0.9)', justifyContent: 'center', alignItems: 'center' },
  playIcon: { color: '#fff', fontSize: 20, marginLeft: 4 },
  videoInfo: { padding: 12 },
  videoTitle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  videoMeta: { fontSize: 11 },
  emptyState: { marginHorizontal: 20, borderRadius: 16, padding: 40, alignItems: 'center' },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptySubtext: { fontSize: 13, marginTop: 4 },
  projectList: { marginHorizontal: 20, borderRadius: 16, padding: 16, gap: 12 },
  projectRow: { borderBottomWidth: 1, paddingBottom: 10 },
  projectTitle: { fontSize: 14, fontWeight: '600' },
  projectMeta: { fontSize: 11, marginTop: 4 },
});

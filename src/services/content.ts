export type TrendingVideo = {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  creator: string;
};

export type Template = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  uses: string;
  trending: boolean;
};

const fallbackTrending: TrendingVideo[] = [
  { id: '1', thumbnail: '🎵', title: 'AI Dance Challenge', views: '2.3M', creator: '@dance_ai' },
  { id: '2', thumbnail: '🔥', title: 'Viral Story Format', views: '1.8M', creator: '@storytime' },
  { id: '3', thumbnail: '✨', title: 'Transform Your Look', views: '950K', creator: '@beauty_ai' },
];

const fallbackTemplates: Template[] = [
  { id: '1', name: 'Dance Challenge', emoji: '💃', category: 'Trending', uses: '2.3M', trending: true },
  { id: '2', name: 'Story Reveal', emoji: '📖', category: 'Narrative', uses: '1.8M', trending: true },
  { id: '3', name: 'Before & After', emoji: '✨', category: 'Transformation', uses: '950K', trending: false },
];

function formatViews(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return `${value}`;
}

export async function getTrendingVideos(): Promise<TrendingVideo[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
    const posts: Array<{ id: number; title: string; userId: number }> = await res.json();
    return posts.map((post) => ({
      id: String(post.id),
      thumbnail: ['🎬', '🔥', '✨', '🎤'][post.id % 4],
      title: post.title,
      views: formatViews((post.id + 1) * 123456),
      creator: `@creator_${post.userId}`,
    }));
  } catch {
    return fallbackTrending;
  }
}

export async function getTemplates(): Promise<Template[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=12');
    const albums: Array<{ id: number; title: string; userId: number }> = await res.json();
    const categories = ['Trending', 'Narrative', 'Educational', 'Entertainment', 'Lifestyle'];
    const emojis = ['💃', '📖', '✨', '📚', '😂', '🔥', '🎨', '🎵'];

    return albums.map((album) => ({
      id: String(album.id),
      name: album.title.split(' ').slice(0, 3).join(' '),
      emoji: emojis[album.id % emojis.length],
      category: categories[album.userId % categories.length],
      uses: formatViews((album.id + 2) * 98765),
      trending: album.id % 3 === 0,
    }));
  } catch {
    return fallbackTemplates;
  }
}

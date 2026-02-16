import AsyncStorage from '@react-native-async-storage/async-storage';

export type Project = {
  id: string;
  title: string;
  createdAt: string;
  template?: string;
};

const PROJECTS_KEY = 'ai-video-shorts/projects';

export async function getProjects(): Promise<Project[]> {
  const raw = await AsyncStorage.getItem(PROJECTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Project[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const existing = await getProjects();
  const created: Project = {
    ...project,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [created, ...existing];
  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  return created;
}

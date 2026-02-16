import { useState, useCallback } from 'react';

export type VideoProvider = 'runway' | 'pika' | 'stability' | 'local';

export type VideoGenerationRequest = {
  prompt: string;
  provider: VideoProvider;
  duration?: number;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  seed?: number;
};

export type VideoGenerationStatus = {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  videoUrl?: string;
  error?: string;
  provider: VideoProvider;
  createdAt: string;
};

const API_BASE_URLS = {
  runway: 'https://api.runwayml.com/v1',
  pika: 'https://api.pika.art/v1',
  stability: 'https://api.stability.ai/v1',
};

class VideoGenerationError extends Error {
  constructor(
    message: string,
    public provider: VideoProvider,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'VideoGenerationError';
  }
}

async function getApiKey(provider: VideoProvider): Promise<string> {
  const keyMap: Record<VideoProvider, string> = {
    runway: 'EXPO_PUBLIC_RUNWAY_API_KEY',
    pika: 'EXPO_PUBLIC_PIKA_API_KEY',
    stability: 'EXPO_PUBLIC_STABILITY_API_KEY',
    local: '',
  };
  
  const keyName = keyMap[provider];
  const apiKey = process.env[keyName];
  
  if (!apiKey && provider !== 'local') {
    throw new VideoGenerationError(
      `API key not found. Set ${keyName} in your .env file`,
      provider
    );
  }
  
  return apiKey || '';
}

export async function generateVideo(
  request: VideoGenerationRequest
): Promise<VideoGenerationStatus> {
  const { provider, prompt, duration = 4, aspectRatio = '9:16', seed } = request;
  
  const generationId = `${provider}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  if (provider === 'local') {
    return simulateLocalGeneration(generationId, prompt, duration);
  }
  
  try {
    switch (provider) {
      case 'runway':
        return await generateWithRunway(generationId, prompt, duration, aspectRatio);
      case 'pika':
        return await generateWithPika(generationId, prompt, duration, aspectRatio);
      case 'stability':
        return await generateWithStability(generationId, prompt, duration, aspectRatio, seed);
      default:
        throw new VideoGenerationError(`Unknown provider: ${provider}`, provider);
    }
  } catch (error) {
    if (error instanceof VideoGenerationError) {
      throw error;
    }
    throw new VideoGenerationError(
      error instanceof Error ? error.message : 'Unknown error',
      provider
    );
  }
}

async function generateWithRunway(
  id: string,
  prompt: string,
  duration: number,
  aspectRatio: string
): Promise<VideoGenerationStatus> {
  const apiKey = await getApiKey('runway');
  
  const response = await fetch(`${API_BASE_URLS.runway}/generation`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      duration: Math.min(duration, 5),
      aspect_ratio: aspectRatio,
      model: 'gen3a',
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new VideoGenerationError(
      `Runway API error: ${error}`,
      'runway',
      response.status
    );
  }
  
  const data = await response.json();
  
  return {
    id: data.id || id,
    status: 'processing',
    progress: 0,
    provider: 'runway',
    createdAt: new Date().toISOString(),
  };
}

async function generateWithPika(
  id: string,
  prompt: string,
  duration: number,
  aspectRatio: string
): Promise<VideoGenerationStatus> {
  const apiKey = await getApiKey('pika');
  
  const response = await fetch(`${API_BASE_URLS.pika}/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      duration: Math.min(duration, 5),
      aspect_ratio: aspectRatio.replace(':', 'x'),
      model: 'pika-1.0',
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new VideoGenerationError(
      `Pika API error: ${error}`,
      'pika',
      response.status
    );
  }
  
  const data = await response.json();
  
  return {
    id: data.id || id,
    status: 'processing',
    progress: 0,
    provider: 'pika',
    createdAt: new Date().toISOString(),
  };
}

async function generateWithStability(
  id: string,
  prompt: string,
  duration: number,
  aspectRatio: string,
  seed?: number
): Promise<VideoGenerationStatus> {
  const apiKey = await getApiKey('stability');
  
  const aspectRatioMap: Record<string, { width: number; height: number }> = {
    '9:16': { width: 576, height: 1024 },
    '16:9': { width: 1024, height: 576 },
    '1:1': { width: 768, height: 768 },
  };
  
  const dimensions = aspectRatioMap[aspectRatio] || aspectRatioMap['9:16'];
  
  const response = await fetch(`${API_BASE_URLS.stability}/generation/text-to-video`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      seed: seed || Math.floor(Math.random() * 1000000),
      steps: 30,
      width: dimensions.width,
      height: dimensions.height,
      fps: 24,
      duration_seconds: Math.min(duration, 5),
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new VideoGenerationError(
      `Stability AI error: ${error}`,
      'stability',
      response.status
    );
  }
  
  const data = await response.json();
  
  return {
    id: data.id || id,
    status: 'processing',
    progress: 0,
    provider: 'stability',
    createdAt: new Date().toISOString(),
  };
}

async function simulateLocalGeneration(
  id: string,
  prompt: string,
  duration: number
): Promise<VideoGenerationStatus> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    id,
    status: 'completed',
    progress: 100,
    videoUrl: `https://example.com/videos/${id}.mp4`,
    provider: 'local',
    createdAt: new Date().toISOString(),
  };
}

export async function checkVideoStatus(
  provider: VideoProvider,
  generationId: string
): Promise<VideoGenerationStatus> {
  if (provider === 'local') {
    return {
      id: generationId,
      status: 'completed',
      progress: 100,
      videoUrl: `https://example.com/videos/${generationId}.mp4`,
      provider: 'local',
      createdAt: new Date().toISOString(),
    };
  }
  
  const apiKey = await getApiKey(provider);
  const endpoint = provider === 'runway' 
    ? `${API_BASE_URLS.runway}/generation/${generationId}`
    : provider === 'pika'
    ? `${API_BASE_URLS.pika}/generation/${generationId}`
    : `${API_BASE_URLS.stability}/generation/${generationId}`;
  
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });
  
  if (!response.ok) {
    throw new VideoGenerationError(
      `Failed to check status: ${response.statusText}`,
      provider,
      response.status
    );
  }
  
  const data = await response.json();
  
  return {
    id: generationId,
    status: data.status || 'processing',
    progress: data.progress || 0,
    videoUrl: data.video_url,
    error: data.error,
    provider,
    createdAt: data.created_at || new Date().toISOString(),
  };
}

export function useVideoGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<VideoGenerationStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generate = useCallback(async (request: VideoGenerationRequest) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateVideo(request);
      setCurrentGeneration(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  const checkStatus = useCallback(async (provider: VideoProvider, id: string) => {
    try {
      const status = await checkVideoStatus(provider, id);
      setCurrentGeneration(status);
      return status;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Status check failed';
      setError(errorMessage);
      throw err;
    }
  }, []);
  
  const reset = useCallback(() => {
    setCurrentGeneration(null);
    setError(null);
  }, []);
  
  return {
    generate,
    checkStatus,
    reset,
    isGenerating,
    currentGeneration,
    error,
  };
}

export const PROVIDER_INFO = {
  runway: {
    name: 'Runway ML',
    description: 'Advanced AI video generation with Gen-3 Alpha',
    maxDuration: 5,
    supports: ['text-to-video', 'image-to-video', 'video-to-video'],
    pricing: 'Pay-per-generation',
  },
  pika: {
    name: 'Pika Labs',
    description: 'Fast AI video generation with Pika 1.0',
    maxDuration: 5,
    supports: ['text-to-video', 'image-to-video'],
    pricing: 'Credit-based',
  },
  stability: {
    name: 'Stability AI',
    description: 'Open-source video generation with Stable Video Diffusion',
    maxDuration: 5,
    supports: ['text-to-video', 'image-to-video'],
    pricing: 'Pay-per-generation',
  },
  local: {
    name: 'Local Processing',
    description: 'Generate videos using local FFmpeg processing',
    maxDuration: 60,
    supports: ['video-editing', 'transitions', 'effects'],
    pricing: 'Free',
  },
};

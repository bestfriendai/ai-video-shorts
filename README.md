# AI Video Shorts

AI-powered short video generation app for TikTok, Reels, and YouTube Shorts.

## Features

- AI-powered video generation
- Video editing and trimming
- Music and sound overlay
- Export to social media formats
- Premium templates and effects

## Tech Stack

- Expo SDK 54
- React Native
- Expo Router
- FFmpeg for video processing
- Zustand for state

## Getting Started

```bash
npm install
npx expo start
```

## API Configuration

### Required API Keys

Create a `.env` file in the project root:

```bash
# Video Generation API (Runway, Pika, or custom)
EXPO_PUBLIC_VIDEO_API_KEY=your_video_api_key

# OpenAI (for script generation)
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# RevenueCat (for premium subscriptions)
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key
```

### Getting API Keys

1. **Video Generation API**:
   - Runway ML: https://runwayml.com/
   - Pika Labs: https://pika.art/
   - Or use local FFmpeg processing

2. **OpenAI** (for scripts):
   - Go to https://platform.openai.com/api-keys

3. **RevenueCat**:
   - Go to https://www.revenuecat.com

## Building for Production

```bash
eas build --platform ios
eas build --platform android
```

## License

MIT

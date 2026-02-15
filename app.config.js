module.exports = {
  name: "AI Video Shorts",
  slug: "ai-video-shorts",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  scheme: "aivideoshorts",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0a0a0a"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.aivideoshorts.app",
    infoPlist: {
      NSCameraUsageDescription: "AI Video Shorts needs camera access to record videos",
      NSMicrophoneUsageDescription: "AI Video Shorts needs microphone access to record audio",
      NSPhotoLibraryUsageDescription: "AI Video Shorts needs photo library access to save videos"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#0a0a0a"
    },
    package: "com.aivideoshorts.app",
    permissions: ["CAMERA", "RECORD_AUDIO", "READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"]
  },
  plugins: [
    "expo-router",
    [
      "expo-av",
      {
        microphonePermission: "Allow AI Video Shorts to access your microphone."
      }
    ],
    [
      "expo-image-picker",
      {
        cameraPermission: "Allow AI Video Shorts to access your camera.",
        photosPermission: "Allow AI Video Shorts to access your photos."
      }
    ]
  ],
  extra: {
    revenuecat_api_key: "rcap_key_placeholder"
  }
};

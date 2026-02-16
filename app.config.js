module.exports = {
  name: "ReelMint",
  slug: "ai-video-shorts",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  scheme: "reelmint",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0a0a0a"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.reelmint.app",
    infoPlist: {
      NSCameraUsageDescription: "ReelMint needs camera access to record videos",
      NSMicrophoneUsageDescription: "ReelMint needs microphone access to record audio",
      NSPhotoLibraryUsageDescription: "ReelMint needs photo library access to save videos"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#0a0a0a"
    },
    package: "com.reelmint.app",
    permissions: ["CAMERA", "RECORD_AUDIO", "READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"]
  },
  plugins: [
    "expo-router",
    [
      "expo-av",
      {
        microphonePermission: "Allow ReelMint to access your microphone."
      }
    ],
    [
      "expo-image-picker",
      {
        cameraPermission: "Allow ReelMint to access your camera.",
        photosPermission: "Allow ReelMint to access your photos."
      }
    ]
  ],
  extra: {
    revenuecat_api_key: "rcap_key_placeholder"
  }
};

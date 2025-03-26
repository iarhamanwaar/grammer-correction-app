export default {
  expo: {
    name: 'grammer-correction-app',
    slug: 'grammercorrectionapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.arham.dev.grammercorrectionapp',
      buildNumber: '1.0.0'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.arham.dev.grammercorrectionapp',
      versionCode: 1
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      eas: {
        projectId: '9da7c005-ffa2-46bc-ab0c-1147ec409a59'
      },
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  },
}; 
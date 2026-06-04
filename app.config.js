// @ts-check
const pkg = require('./package.json')

/**
 * @param {import('@expo/config-types').ExpoConfig} _config
 * @returns {{ expo: import('@expo/config-types').ExpoConfig }}
 */
module.exports = function (_config) {
  const VERSION = pkg.version

  const PLATFORM = process.env.EAS_BUILD_PLATFORM ?? 'web'

  const IS_TESTFLIGHT = process.env.EXPO_PUBLIC_ENV === 'testflight'
  const IS_PRODUCTION = process.env.EXPO_PUBLIC_ENV === 'production'
  const IS_DEV = !IS_TESTFLIGHT && !IS_PRODUCTION

  const ASSOCIATED_DOMAINS = [
    'applinks:naschatai.com',
    'applinks:staging.naschatai.com',
    'appclips:naschatai.com',
    ...(IS_DEV || IS_TESTFLIGHT ? [] : []),
  ]

  const UPDATES_ENABLED = IS_TESTFLIGHT || IS_PRODUCTION

  const USE_SENTRY = Boolean(process.env.SENTRY_AUTH_TOKEN)

  const IOS_ICON_FILE =
    PLATFORM === 'web'
      ? './assets/app-icons/naschat_icon_default.png'
      : IS_TESTFLIGHT
        ? './assets/app-icons/naschat_icon_default.png'
        : './assets/app-icons/naschat_icon_default.png'

  return {
    expo: {
      version: VERSION,
      name: 'NasChat',
      slug: 'naschat',
      scheme: 'naschat',
      owner: 'naschat',
      runtimeVersion: {
        policy: 'appVersion',
      },
      icon: './assets/app-icons/naschat_icon_default.png',
      userInterfaceStyle: 'automatic',
      primaryColor: '#006AFF',
      newArchEnabled: false,
      ios: {
        supportsTablet: false,
        bundleIdentifier: 'com.naschat.app',
        config: {
          usesNonExemptEncryption: false,
        },
        icon: IOS_ICON_FILE,
        infoPlist: {
          CADisableMinimumFrameDurationOnPhone: true,
          UIBackgroundModes: ['remote-notification'],
          NSUserActivityTypes: ['INSendMessageIntent'],
          NSCameraUsageDescription:
            'Used for profile pictures, posts, and other kinds of content.',
          NSMicrophoneUsageDescription:
            'Used for posts and other kinds of content.',
          NSPhotoLibraryAddUsageDescription:
            'Used to save images to your library.',
          NSPhotoLibraryUsageDescription:
            'Used for profile pictures, posts, and other kinds of content',
          CFBundleSpokenName: 'NasChat',
          CFBundleLocalizations: [
            'en', 'an', 'ast', 'ca', 'cy', 'da', 'de', 'el', 'eo', 'es',
            'eu', 'fi', 'fr', 'fy', 'ga', 'gd', 'gl', 'hi', 'hu', 'ia',
            'id', 'it', 'ja', 'km', 'ko', 'ne', 'nl', 'pl', 'pt-BR',
            'pt-PT', 'ro', 'ru', 'sv', 'th', 'tr', 'uk', 'vi', 'yue',
            'zh-Hans', 'zh-Hant',
          ],
        },
        associatedDomains: ASSOCIATED_DOMAINS,
        entitlements: {
          'com.apple.developer.kernel.increased-memory-limit': true,
          'com.apple.developer.kernel.extended-virtual-addressing': true,
          'com.apple.security.application-groups': 'group.com.naschat.app',
          'com.apple.developer.usernotifications.communication': true,
        },
        privacyManifests: {
          NSPrivacyCollectedDataTypes: [
            {
              NSPrivacyCollectedDataType: 'NSPrivacyCollectedDataTypeCrashData',
              NSPrivacyCollectedDataTypeLinked: false,
              NSPrivacyCollectedDataTypeTracking: false,
              NSPrivacyCollectedDataTypePurposes: [
                'NSPrivacyCollectedDataTypePurposeAppFunctionality',
              ],
            },
          ],
          NSPrivacyAccessedAPITypes: [
            {
              NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryFileTimestamp',
              NSPrivacyAccessedAPITypeReasons: ['C617.1', '3B52.1', '0A2A.1'],
            },
            {
              NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace',
              NSPrivacyAccessedAPITypeReasons: ['E174.1', '85F4.1'],
            },
            {
              NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategorySystemBootTime',
              NSPrivacyAccessedAPITypeReasons: ['35F9.1'],
            },
            {
              NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryUserDefaults',
              NSPrivacyAccessedAPITypeReasons: ['CA92.1', '1C8F.1'],
            },
          ],
        },
      },
      androidStatusBar: {
        barStyle: 'light-content',
      },
      androidNavigationBar: {
        barStyle: 'light-content',
      },
      android: {
        icon: './assets/app-icons/naschat_icon_default.png',
        adaptiveIcon: {
          foregroundImage: './assets/naschat-logo-light.png',
          monochromeImage: './assets/naschat-logo.png',
          backgroundColor: '#006AFF',
        },
        googleServicesFile: './google-services.json',
        package: 'com.naschat.app',
        intentFilters: [
          {
            action: 'VIEW',
            autoVerify: true,
            data: [
              {
                scheme: 'https',
                host: 'naschatai.com',
              },
              ...(IS_DEV
                ? [
                    {
                      scheme: 'http',
                      host: 'localhost:5000',
                    },
                  ]
                : []),
            ],
            category: ['BROWSABLE', 'DEFAULT'],
          },
        ],
      },
      web: {
        favicon: './assets/favicon.png',
      },
      updates: {
        url: 'https://updates.naschatai.com/manifest',
        enabled: UPDATES_ENABLED,
        fallbackToCacheTimeout: 30000,
        checkAutomatically: 'NEVER',
      },
      plugins: [
        'expo-video',
        'expo-localization',
        'expo-web-browser',
        [
          'react-native-edge-to-edge',
          {android: {enforceNavigationBarContrast: false}},
        ],
        ...(USE_SENTRY
          ? [
              [
                '@sentry/react-native/expo',
                {
                  organization: 'naschat',
                  project: 'app',
                  url: 'https://sentry.io',
                },
              ],
            ]
          : []),
        [
          'expo-build-properties',
          {
            ios: {
              deploymentTarget: '15.1',
              buildReactNativeFromSource: true,
              ccacheEnabled: IS_DEV,
              cxxLanguageStandard: 'c++23',
            },
            android: {
              compileSdkVersion: 36,
              targetSdkVersion: 35,
              buildToolsVersion: '35.0.0',
              buildReactNativeFromSource: IS_PRODUCTION,
            },
          },
        ],
        [
          'expo-notifications',
          {
            icon: './assets/naschat-logo.png',
            color: '#1185fe',
            sounds: PLATFORM === 'ios' ? ['assets/dm.aiff'] : ['assets/dm.mp3'],
          },
        ],
        'react-native-compressor',
        [
          '@bitdrift/react-native',
          {
            networkInstrumentation: true,
          },
        ],
        './plugins/withGradleJVMHeapSizeIncrease.js',
        './plugins/withAndroidManifestLargeHeapPlugin.js',
        './plugins/withAndroidManifestFCMIconPlugin.js',
        './plugins/withAndroidManifestIntentQueriesPlugin.js',
        './plugins/withAndroidStylesAccentColorPlugin.js',
        './plugins/withAndroidNoJitpackPlugin.js',
        [
          'expo-font',
          {
            fonts: [
              './assets/fonts/inter/InterVariable.woff2',
              './assets/fonts/inter/InterVariable-Italic.woff2',
              './assets/fonts/inter/Inter-Regular.otf',
              './assets/fonts/inter/Inter-Italic.otf',
              './assets/fonts/inter/Inter-Medium.otf',
              './assets/fonts/inter/Inter-MediumItalic.otf',
              './assets/fonts/inter/Inter-SemiBold.otf',
              './assets/fonts/inter/Inter-SemiBoldItalic.otf',
              './assets/fonts/inter/Inter-Bold.otf',
              './assets/fonts/inter/Inter-BoldItalic.otf',
            ],
          },
        ],
        [
          'expo-splash-screen',
          {
            ios: {
              enableFullScreenImage_legacy: true,
              backgroundColor: '#006AFF',
              image: './assets/splash/splash.png',
              resizeMode: 'cover',
              dark: {
                enableFullScreenImage_legacy: true,
                backgroundColor: '#002861',
                image: './assets/splash/splash-dark.png',
                resizeMode: 'cover',
              },
            },
            android: {
              backgroundColor: '#006AFF',
              image: './assets/splash/android-splash-logo-white.png',
              imageWidth: 102,
              dark: {
                backgroundColor: '#002861',
                image: './assets/splash/android-splash-logo-white.png',
                imageWidth: 102,
              },
            },
          },
        ],
        ['expo-screen-orientation', {initialOrientation: 'PORTRAIT_UP'}],
        ['expo-location'],
        [
          'expo-contacts',
          {
            contactsPermission:
              'I agree to allow NasChat to use my contacts for friend discovery until I opt out.',
          },
        ],
      ],
      extra: {
        eas: {
          build: {
            experimental: {
              ios: {
                appExtensions: [
                  {
                    targetName: 'Share-with-NasChat',
                    bundleIdentifier: 'com.naschat.app.Share-with-NasChat',
                    entitlements: {
                      'com.apple.security.application-groups': [
                        'group.com.naschat.app',
                      ],
                    },
                  },
                ],
              },
            },
          },
          projectId: 'naschat-app',
        },
      },
    },
  }
}

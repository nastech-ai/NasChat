# NasChat — Complete Setup & Configuration Guide

> Full rebrand from Bluesky Social App to **NasChat**  
> Production domain: `naschatai.com` | Dev: `localhost:5000` (web) / `localhost:8000` (backend)  
> Bundle ID: `com.naschat.app` | Package: `naschat.app` v1.123.0

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Firebase Setup (Required)](#2-firebase-setup-required)
3. [Expo / EAS Setup](#3-expo--eas-setup)
4. [GitHub Repository Secrets](#4-github-repository-secrets-required)
5. [Environment Variables](#5-environment-variables)
6. [iOS Configuration](#6-ios-configuration)
7. [Android Configuration](#7-android-configuration)
8. [Sentry Error Tracking](#8-sentry-error-tracking)
9. [What Was Rebranded](#9-what-was-rebranded)
10. [What Was Intentionally Preserved](#10-what-was-intentionally-preserved)
11. [Running the App](#11-running-the-app)
12. [Build & Submit](#12-build--submit)

---

## 1. Project Identity

| Field | Value |
|---|---|
| App Name | NasChat |
| Slug | `naschat` |
| Bundle ID (iOS) | `com.naschat.app` |
| Package (Android) | `com.naschat.app` |
| URL Scheme | `naschat://` |
| Web Domain | `naschatai.com` |
| Staging Domain | `staging.naschatai.com` |
| Expo Owner | `naschat` |
| Expo Project ID | `naschat-app` |
| App Store ID | `6444370199` *(update if new app created)* |
| Sentry Org | `naschat` |
| Sentry Project | `app` |

---

## 2. Firebase Setup (Required)

Firebase files are **not included in the repo** — they contain private credentials and must be created per-environment.

### 2a. Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `NasChat`
3. Enable **Google Analytics** (optional but recommended)
4. Add **Android app**:
   - Package name: `com.naschat.app`
   - App nickname: `NasChat Android`
   - SHA-1: add your keystore SHA-1 for production
5. Add **iOS app**:
   - Bundle ID: `com.naschat.app`
   - App nickname: `NasChat iOS`

### 2b. Download and Place Config Files

#### Android — `google-services.json`

After registering the Android app in Firebase:

1. Download `google-services.json`
2. Place it at the **repo root**: `./google-services.json`
   - `app.config.js` references it at: `googleServicesFile: './google-services.json'`
3. The file is `.gitignore`d — **never commit it**

Example structure of `google-services.json`:
```json
{
  "project_info": {
    "project_number": "YOUR_PROJECT_NUMBER",
    "project_id": "naschat-app",
    "storage_bucket": "naschat-app.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:YOUR_NUMBER:android:YOUR_HASH",
        "android_client_info": {
          "package_name": "com.naschat.app"
        }
      },
      "api_key": [{"current_key": "YOUR_ANDROID_API_KEY"}],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}
```

#### iOS — `GoogleService-Info.plist`

After registering the iOS app in Firebase:

1. Download `GoogleService-Info.plist`
2. Place it in `ios/NasChat/` (next to `Info.plist`)
3. Also `.gitignore`d — **never commit it**

Key fields must match:
```xml
<key>BUNDLE_ID</key>
<string>com.naschat.app</string>
<key>GOOGLE_APP_ID</key>
<string>1:YOUR_NUMBER:ios:YOUR_HASH</string>
```

### 2c. Firebase Services to Enable

| Service | Purpose | How to Enable |
|---|---|---|
| **Firebase Cloud Messaging (FCM)** | Push notifications | Enable in Firebase console → Cloud Messaging |
| **Firebase Analytics** | Usage analytics | Enabled by default with Firebase |
| **Firebase Crashlytics** | Crash reporting (optional) | Add `@react-native-firebase/crashlytics` |
| **Remote Config** | Feature flags (optional) | Firebase console → Remote Config |

### 2d. FCM Setup for Push Notifications

The app uses `expo-notifications`. To enable push via FCM:

1. In Firebase Console → Project Settings → Cloud Messaging
2. Copy the **Server Key** (legacy) or create a **Service Account** key (v1 API)
3. Add to Expo dashboard at [expo.dev](https://expo.dev):
   - Go to your project → Credentials → Android → FCM API Key
4. For iOS, upload your Apple APNs certificate or key in Firebase

### 2e. GitHub Actions — Firebase Secret

The GitHub Actions workflow uses `GOOGLE_SERVICES_TOKEN`. This is a base64-encoded version of `google-services.json`:

```bash
base64 -i google-services.json | pbcopy
```

Add the output as a GitHub secret named `GOOGLE_SERVICES_TOKEN` in:  
**Settings → Secrets and variables → Actions**

---

## 3. Expo / EAS Setup

### 3a. Expo Account

1. Create account at [expo.dev](https://expo.dev)
2. Create an organization named `naschat` (must match `owner: 'naschat'` in `app.config.js`)
3. Create a project named `naschat` (must match `slug: 'naschat'`)

### 3b. EAS CLI

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### 3c. EAS Update (OTA)

The app is configured to pull OTA updates from:
```
https://updates.naschatai.com/manifest
```

This requires setting up either:
- **Expo EAS Update** (official) — update `eas.json` `updates.url` and configure your project
- **Self-hosted updates server** at `updates.naschatai.com`

### 3d. App Store Connect

Current App Store ID in `eas.json`: `6444370199`

> **Action required:** If creating a new App Store listing for NasChat, update this ID:
> ```json
> "submit": {
>   "production": {
>     "ios": {
>       "ascAppId": "YOUR_NEW_APP_STORE_ID"
>     }
>   }
> }
> ```

---

## 4. GitHub Repository Secrets (Required)

Add these secrets to **nastech-ai/NasChat** → Settings → Secrets and variables → Actions:

| Secret Name | Description | Where to Get |
|---|---|---|
| `EXPO_TOKEN` | Expo access token for EAS builds | [expo.dev/accounts/naschat/settings/access-tokens](https://expo.dev) |
| `GOOGLE_SERVICES_TOKEN` | Base64-encoded `google-services.json` | Firebase Console → Android app → Download config, then `base64 -i google-services.json` |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source maps | [sentry.io](https://sentry.io) → Settings → Auth Tokens |
| `SENTRY_DSN` | Sentry DSN for error tracking | Sentry → Your Project → Settings → Client Keys |
| `AWS_ECR_REGISTRY_USEAST2_PACKAGES_USERNAME` | AWS ECR username | AWS Console → ECR |
| `AWS_ECR_REGISTRY_USEAST2_PACKAGES_PASSWORD` | AWS ECR password | AWS Console → ECR |
| `AWS_ECR_REGISTRY_USEAST2_PACKAGES_REGISTRY` | AWS ECR registry URL | AWS Console → ECR |
| `BITDRIFT_API_KEY` | Bitdrift observability API key | [bitdrift.io](https://bitdrift.io) |
| `CROWDIN_PERSONAL_TOKEN` | Crowdin for i18n sync | [crowdin.com](https://crowdin.com) → Account Settings |
| `SLACK_CLIENT_ALERT_WEBHOOK` | Slack webhook for build alerts | Slack → Apps → Incoming Webhooks |
| `GH_ACTION_DEPLOY_KEY` | SSH deploy key for release tagging | Generate SSH key pair, add public key to repo Deploy Keys |
| `ENV_TOKEN` | Environment configuration token | Custom — contact team |
| `EXPO_PUBLIC_GCP_PROJECT_ID` | GCP project for cloud features | Google Cloud Console |
| `SYNC_INTERNAL_PK` | Internal sync private key | Contact team |

> **Note:** `GITHUB_TOKEN` is auto-provided by GitHub Actions and does not need manual setup.

---

## 5. Environment Variables

### 5a. App Runtime Variables (`.env`)

Create a `.env` file at the repo root (never commit — already in `.gitignore`):

```env
# Required for development
EXPO_PUBLIC_ENV=development

# Backend API (AT Protocol PDS)
EXPO_PUBLIC_API_HOST=https://naschatai.com

# Chat proxy
EXPO_PUBLIC_CHAT_PROXY_HOST=https://api.naschat.chat
# or set the DID directly — default is did:web:api.naschat.chat

# Sentry (optional in dev)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_DSN=your_sentry_dsn_url

# Bitdrift observability (optional)
BITDRIFT_API_KEY=your_bitdrift_key

# Staging captcha
# staging.naschatai.com / app.staging.naschatai.com
```

### 5b. Key Expo Public Variables

| Variable | Default / Description |
|---|---|
| `EXPO_PUBLIC_ENV` | `development` / `testflight` / `production` |
| `EXPO_PUBLIC_API_HOST` | Backend AT Protocol PDS URL |
| `EXPO_PUBLIC_BUNDLE_DATE` | Set by CI — build date |
| `EXPO_PUBLIC_LOG_LEVEL` | Logging verbosity |
| `EXPO_PUBLIC_LOG_DEBUG` | Debug log flag |
| `EXPO_PUBLIC_AI_API_HOST` | AI feature backend |
| `EXPO_PUBLIC_GCP_PROJECT_ID` | GCP project (from GitHub secret) |

---

## 6. iOS Configuration

### 6a. Entitlements

| Entitlement | Value |
|---|---|
| App Group | `group.com.naschat.app` |
| Associated Domains | `applinks:naschatai.com`, `applinks:staging.naschatai.com`, `appclips:naschatai.com` |
| Background Modes | Remote notifications |
| User Notifications | Communication |
| Increased Memory Limit | ✅ |
| Extended Virtual Addressing | ✅ |

### 6b. Share Extension

Bundle ID: `com.naschat.app.Share-with-NasChat`  
App Group shared with main app: `group.com.naschat.app`  
File: `modules/Share-with-Bluesky/ShareViewController.swift`  
Default scheme: `naschat` (fallback if `MainAppScheme` Info.plist key is missing)

### 6c. App Clip

Bundle: `modules/BlueskyClip/`  
Loads from: `https://naschatai.com/?splash=true&clip=true`  
Handles domains: `naschatai.com`, `go.naschatai.com`

### 6d. Xcode Project

After running `expo prebuild`:
1. Open `ios/NasChat.xcworkspace`
2. Set **Team** (Development Team ID) in Signing & Capabilities
3. Verify bundle identifier is `com.naschat.app`
4. Add `GoogleService-Info.plist` to the Xcode project manually if not auto-linked

### 6e. Required Pods

Run `cd ios && pod install` after prebuild. Key pods:
- `Firebase/Messaging` (if added)
- `Sentry` (via `@sentry/react-native`)

---

## 7. Android Configuration

### 7a. App Identifiers

| Field | Value |
|---|---|
| Application ID | `com.naschat.app` |
| SharedPreferences key | `com.naschat.app` |
| Deep link scheme | `naschat://` |
| Intent filter host | `naschatai.com` |

### 7b. Android Modules

| Module | Package | Notes |
|---|---|---|
| Background Notifications | `expo.modules.backgroundnotificationhandler` | SharedPrefs: `com.naschat.app` |
| Swiss Army Module | `expo.modules.blueskyswissarmy` | SharedPrefs: `com.naschat.app` |
| Receive Android Intents | `com.naschat.app.exporeceiveandroidintents` | Intent URLs: `naschat://intent/compose` |

### 7c. Build Config

```
compileSdkVersion: 36
targetSdkVersion: 35
buildToolsVersion: '35.0.0'
minSdkVersion: (set by Expo default — 23)
```

### 7d. google-services.json Location

Must be at repo root: `./google-services.json`  
Referenced in `app.config.js` → `android.googleServicesFile: './google-services.json'`  
Expo copies it to `android/app/google-services.json` during prebuild.

### 7e. Keystore (Production Signing)

For production builds, you need a keystore:
```bash
keytool -genkey -v -keystore naschat-release.keystore \
  -alias naschat -keyalg RSA -keysize 2048 -validity 10000
```

Store the keystore securely (not in the repo). Configure it in EAS:
```bash
eas credentials
```

---

## 8. Sentry Error Tracking

### 8a. Create Sentry Project

1. Go to [sentry.io](https://sentry.io) → New Project → React Native
2. Organization slug: `naschat`
3. Project slug: `app`

### 8b. Configuration

`app.config.js` reads Sentry config when `SENTRY_AUTH_TOKEN` env var is present:

```js
{
  organization: 'naschat',
  project: 'app',
  url: 'https://sentry.io'
}
```

### 8c. Required Secrets

| Secret | Where Used |
|---|---|
| `SENTRY_AUTH_TOKEN` | GitHub Actions, `.env` |
| `SENTRY_DSN` | Runtime error reporting |

---

## 9. What Was Rebranded

Complete list of changes made from Bluesky → NasChat:

### App Identity
- App name: `Bluesky` → `NasChat`
- Slug: `bluesky` → `naschat`
- Bundle ID: `xyz.blueskyweb.app` → `com.naschat.app`
- URL scheme: `bluesky://` → `naschat://`
- Deep link domain: `bsky.app` → `naschatai.com`

### Domains
| Old | New |
|---|---|
| `bsky.app` | `naschatai.com` |
| `bsky.social` | `naschat.social` |
| `blueskyweb.xyz` | `naschatweb.xyz` |
| `bsky.chat` | `naschat.chat` |
| `go.bsky.app` | `go.naschatai.com` |
| `updates.bsky.app` | `updates.naschatai.com` |
| `staging.bsky.dev` | `staging.naschatai.com` |
| `t.gifs.bsky.app` | `t.gifs.naschatai.com` |
| `k.gifs.bsky.app` | `k.gifs.naschatai.com` |

### Native Code
| File | Change |
|---|---|
| `modules/Share-with-Bluesky/ShareViewController.swift` | Default scheme: `"bluesky"` → `"naschat"` |
| `modules/BlueskyClip/ViewController.swift` | URLs: `bsky.app` → `naschatai.com` |
| `modules/expo-background-notification-handler/.../NotificationPrefs.kt` | SharedPrefs key: `xyz.blueskyweb.app` → `com.naschat.app` |
| `modules/expo-bluesky-swiss-army/.../SharedPrefs.kt` | SharedPrefs key: `xyz.blueskyweb.app` → `com.naschat.app` |
| `modules/expo-bluesky-swiss-army/src/Referrer/index.web.ts` | Domain check: `bsky.app` → `naschatai.com` |
| `modules/expo-receive-android-intents/.../ExpoReceiveAndroidIntentsModule.kt` | Package + `bluesky://` → `naschat://` |
| `modules/expo-receive-android-intents/expo-module.config.json` | Module class name updated |

### Source Files
- `src/lib/strings/url-helpers.ts` — `BSKY_APP_HOST` and `BSKY_TRUSTED_HOSTS` array
- `src/env/common.ts` — Chat proxy DID
- `src/screens/Signup/StepCaptcha/CaptchaWebView.tsx` — Staging domain

### Config Files
- `app.config.js` — All identifiers, domains, entitlements
- `package.json` — Package name
- `eas.json` — Build config (Sentry org)
- `webpack.config.js` — Port 5000, allowed hosts, Sentry org
- `.github/workflows/` — Build workflow, Sentry org, artifact names
- `scripts/bundleUpdate.sh` — Upload URL
- `scripts/push-notification/send.sh` — Bundle ID

### Test Files
- `__tests__/lib/strings/url-helpers.test.ts` — All domain test cases
- `__tests__/lib/string.test.ts` — YouTube iframe URLs, GIF CDN, starter pack URLs
- `__tests__/lib/strings/handles.test.ts` — Handle domain examples

### Documentation
- `modules/Share-with-Bluesky/README.md`
- `modules/expo-background-notification-handler/README.md`
- `modules/expo-bluesky-swiss-army/README.md`
- `dev-env/test-pds.ts`

---

## 10. What Was Intentionally Preserved

These were **NOT renamed** — they are protocol identifiers or third-party packages:

| Item | Reason |
|---|---|
| `app.bsky.*` namespaces | AT Protocol Lexicon identifiers — standardized protocol |
| `com.atproto.*` namespaces | AT Protocol — cannot be changed |
| `@bsky.app/alf`, `@bsky.app/expo-scroll-edge-effect` | Real npm scoped packages — changing breaks imports |
| `BSKY_LABELER_DID` | Protocol constant from `@atproto/api` |
| `bluesky-social/react-native-*` GitHub forks | Upstream source — not our branding |
| Go service dirs: `bskyweb/`, `bskyembed/`, `bskylink/`, `bskyogcard/` | Internal service names |
| `expo-bluesky-swiss-army` module name | npm package name — would break imports |
| pnpm store cache (`.local/share/pnpm/store/`) | Third-party package cache — not source code |

---

## 11. Running the App

### Prerequisites

```bash
# Install dependencies
pnpm install

# Required: Node >= 24.15.0, pnpm >= 10
node --version  # v24.x
pnpm --version  # 10.x or 11.x
```

### Web (Development)

```bash
pnpm web
# Opens on http://localhost:5000
```

### Environment File

Copy and fill in your `.env`:
```bash
cp .env.example .env  # or create manually
```

Minimum required for web development:
```env
EXPO_PUBLIC_ENV=development
```

### iOS (Requires Mac)

```bash
pnpm expo:prebuild
cd ios && pod install && cd ..
pnpm ios
```

### Android

```bash
pnpm expo:prebuild
pnpm android
```

---

## 12. Build & Submit

### EAS Build

```bash
# Development build (simulator)
eas build --profile development --platform ios

# Production build
eas build --profile production --platform all

# Submit to stores
eas submit --profile production --platform ios
eas submit --profile production --platform android
```

### OTA Update

```bash
eas update --channel production --message "Your update message"
```

### GitHub Actions

Workflows trigger automatically on push to `main`. Required secrets must be set (see [§4](#4-github-repository-secrets-required)).

| Workflow | Trigger | Purpose |
|---|---|---|
| `build-submit-ios.yml` | Manual / tag | Build & submit iOS to App Store |
| `build-submit-android.yml` | Manual / tag | Build & submit Android to Play Store |
| `bundle-deploy-eas-update.yml` | Push to main | OTA update via EAS |

---

## Quick Checklist Before First Build

- [ ] Firebase project created with package `com.naschat.app`
- [ ] `google-services.json` placed at repo root
- [ ] `GoogleService-Info.plist` placed in `ios/NasChat/`
- [ ] Expo account created with org `naschat`
- [ ] EAS project configured (`eas build:configure`)
- [ ] App Store Connect entry created (update `ascAppId` in `eas.json`)
- [ ] Google Play Console entry created for `com.naschat.app`
- [ ] All GitHub Actions secrets set (see §4)
- [ ] Sentry project created (`naschat` org, `app` project)
- [ ] Android keystore generated and uploaded to EAS credentials
- [ ] iOS certificates and provisioning profiles configured in EAS
- [ ] FCM server key uploaded to Expo dashboard
- [ ] APNs key uploaded to Expo dashboard (for iOS push)
- [ ] Domain `naschatai.com` configured with proper SSL and Apple App Site Association (AASA) for universal links

---

*Generated: 2026-06-04 | NasChat v1.123.0*

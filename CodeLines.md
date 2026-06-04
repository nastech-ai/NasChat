# NasChat — CodeLines

## Project Overview

**NasChat** is a full-featured social networking client built on the AT Protocol (ATProto), built as a standalone social networking app on the AT Protocol. It supports iOS, Android, and web via React Native / Expo.

- **Production domain**: `naschatai.com`
- **Frontend dev server**: `localhost:5000`
- **Backend dev server**: `localhost:8000`
- **Bundle ID**: `com.naschat.app`
- **Expo slug**: `naschat`
- **Deep link scheme**: `naschat://`

---

## Repository Structure

```
naschat/
├── src/                          # Main application source (React Native / Expo)
│   ├── ageAssurance/             # Age verification flow
│   ├── alf/                      # Design system (atoms, themes, tokens)
│   ├── analytics/                # Analytics event tracking
│   ├── components/               # Shared UI components
│   │   ├── Autocomplete/         # Search/mention autocomplete
│   │   ├── Composer/             # Post composer
│   │   ├── Post/                 # Post rendering & embeds
│   │   ├── dialogs/              # Modal dialogs
│   │   ├── images/               # Image gallery, lightbox
│   │   ├── moderation/           # Report & moderation dialogs
│   │   ├── StarterPack/          # Starter pack components
│   │   └── verification/         # Account verification
│   ├── env/                      # Environment variable helpers
│   ├── features/                 # Feature-specific modules
│   │   ├── gifPicker/            # GIF picker (Tenor API)
│   │   └── liveNow/              # Live video feature
│   ├── geolocation/              # Location services
│   ├── lib/                      # Core utilities & API helpers
│   │   ├── api/                  # Feed, post, moderation API wrappers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── media/                # Image/video manipulation
│   │   ├── moderation/           # Moderation utilities
│   │   └── strings/              # URL, handle, text helpers
│   ├── locale/                   # i18n / Lingui translations
│   ├── logger/                   # Logging utilities
│   ├── platform/                 # Platform-specific shims
│   ├── screens/                  # Top-level app screens
│   │   ├── Onboarding/           # New-user onboarding flow
│   │   └── Profile/              # User profile screen
│   ├── state/                    # Global state (Jotai + persisted)
│   │   ├── persisted/            # Persistent storage (MMKV)
│   │   ├── session/              # Auth session management
│   │   └── cache/                # In-memory caches
│   ├── view/                     # Legacy view layer
│   │   ├── com/                  # Legacy components
│   │   │   ├── auth/             # Auth screens (SplashScreen, Login)
│   │   │   ├── composer/         # Post composer (legacy)
│   │   │   └── util/             # Link, text, avatar utilities
│   │   ├── icons/                # Logo, Logotype SVG/image components
│   │   └── screens/              # Legacy screen wrappers
│   ├── Navigation.tsx            # Root navigation (React Navigation)
│   ├── App.native.tsx            # Native app entry
│   └── App.web.tsx               # Web app entry
│
├── assets/                       # Static assets
│   ├── naschat-logo.png          # NasChat logo (primary)
│   ├── naschat-logo-dark.png     # Logo for dark backgrounds
│   ├── naschat-logo-light.png    # Logo for light backgrounds (white N on black)
│   ├── app-icons/                # App store icons
│   ├── splash/                   # Splash screen illustrations
│   ├── fonts/                    # Custom fonts
│   └── images/                   # Miscellaneous images
│
├── bskyweb/                      # Go web server (SSR / meta tags)
│   └── cmd/
│       ├── bskyweb/              # Main web server (Go)
│       └── embedr/               # Post embed server (Go)
│
├── bskyembed/                    # JavaScript post embed widget
│   ├── snippet/                  # Embed snippet loader
│   └── src/                     # Embed React app
│       ├── components/           # Embed UI components
│       └── screens/              # Embed screens
│
├── bskylink/                     # Link card service
│   └── src/
│       ├── routes/               # HTTP routes
│       └── html/                 # Link warning pages
│
├── docs/                         # Developer documentation
│   ├── build.md                  # Build instructions
│   ├── deploy-ota.md             # OTA deploy guide
│   └── localization.md           # i18n guide
│
├── modules/                      # Native Expo modules
│   ├── expo-bluesky-swiss-army/  # Native utility module (camera, haptics, etc.)
│   └── share-menu/               # Native share menu
│
├── patches/                      # pnpm patches for dependencies
├── e2e/                          # End-to-end tests (Maestro)
├── app.config.js                 # Expo app config
├── package.json                  # Node dependencies
├── webpack.config.js             # Web webpack config (port 5000)
├── pnpm-workspace.yaml           # pnpm workspace config
├── .env                          # Local environment variables
├── .env.example                  # Environment variable template
├── LICENSE                       # MIT License (NasChat)
├── README.md                     # Project README
└── CodeLines.md                  # This file
```

---

## Source Code Statistics

| Category | Count |
|---|---|
| Total source files (`.ts`/`.tsx`/`.js`) | 1,538 |
| Total source lines | ~209,577 |
| Source top-level folders | 25 |
| Files rebranded to NasChat | 250+ |
| Config/doc files at root | 17 |

---

## Key Files

| File | Purpose |
|---|---|
| `app.config.js` | Expo config — name, slug, bundle ID, icons |
| `webpack.config.js` | Web bundler config — port 5000, allowedHosts: all |
| `src/lib/constants.ts` | Service URLs, labeler DIDs, app constants |
| `src/Navigation.tsx` | React Navigation root — deep link scheme `naschat://` |
| `src/view/icons/Logo.tsx` | NasChat logo component (image-based) |
| `src/view/icons/Logotype.tsx` | NasChat logotype component (image-based) |
| `src/view/com/auth/SplashScreen.tsx` | Native splash / sign-in screen |
| `src/state/session/` | AT Protocol session management |
| `src/state/persisted/schema.ts` | Persisted state schema (MMKV) |
| `src/env/common.ts` | Environment variable exports |
| `src/lib/strings/url-helpers.ts` | URL parsing — recognizes `naschatai.com` |

---

## Branding

| Item | Value |
|---|---|
| App name | NasChat |
| Production URL | https://naschatai.com |
| Bundle ID | com.naschat.app |
| Deep link scheme | naschat:// |
| Package name (npm) | naschat |
| GIF API client | naschat-ios / naschat-android / naschat-web |
| Cache directory | naschat-composer |
| Draft media storage | naschat-draft-media |
| Web embed service | https://embed.naschatai.com |
| Chat service | https://api.naschat.chat |

---

## Logo Assets

| File | Use Case |
|---|---|
| `assets/naschat-logo.png` | Default / general purpose |
| `assets/naschat-logo-dark.png` | Dark theme (pure black background) |
| `assets/naschat-logo-light.png` | Light theme (white N on black background) |
| `assets/app-icons/naschat_icon_default.png` | App store icon |

---

## Environment Variables

Defined in `.env` (copy from `.env.example`):

```env
EXPO_PUBLIC_NASCHAT_PROXY_DID=        # NasChat proxy service DID
EXPO_PUBLIC_CHAT_PROXY_DID=           # Chat service proxy DID
EXPO_PUBLIC_ENV=development           # Environment flag
```

---

## Development

### Prerequisites
- Node.js 24+
- pnpm
- Expo CLI (patched — serves webpack on port 5000)

### Start the app

```bash
# Install dependencies
pnpm install

# Start web development server (port 5000)
pnpm web

# Start native Metro bundler
pnpm start
```

### Web Server (port 5000)
The webpack dev server is configured in `webpack.config.js`:
- `host: '0.0.0.0'`
- `port: 5000`
- `allowedHosts: 'all'`

The Expo CLI is patched to default to port 5000 (changed from 19006).

### Backend (port 8000)
The Go web server (`bskyweb`) runs on port 8000 in development.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (SDK 53) |
| Web bundler | Webpack 5 (via Expo) |
| Navigation | React Navigation 7 |
| State management | Jotai + persisted (MMKV) |
| Protocol | AT Protocol (`@atproto/api`) |
| Design system | Custom ALF (Atoms, Layout, Foundations) |
| i18n | Lingui v4 |
| Web server | Go 1.22 (bskyweb) |
| Package manager | pnpm (workspace monorepo) |
| Testing | Maestro (e2e) |

---

## AT Protocol Notes

The AT Protocol API namespaces (`app.bsky.*`, `com.atproto.*`) are **intentionally preserved** throughout the codebase. These are protocol identifiers defined by the AT Protocol specification — not NasChat branding. Changing them would break compatibility with the decentralized network.

Similarly, the `BSKY_LABELER_DID` constant imported from `@atproto/api` references the official Bluesky moderation labeler on the AT Protocol network — it is kept as-is for protocol compatibility.

---

*Generated: 2026-06-04 | NasChat v1.0*

---
name: NasChat rebrand
description: Full rebrand of Bluesky social app to NasChat — what was changed, what was intentionally preserved, and important pitfalls.
---

## Summary
Full Bluesky→NasChat rebrand completed across 250+ files. Production domain: naschatai.com. Dev: localhost:5000 (frontend), localhost:8000 (backend). App compiles and runs with `pnpm web`.

## What was changed
- App name: NasChat, slug: naschat, bundle ID: com.naschat.app
- All user-facing "Bluesky" text → "NasChat"
- All `bsky.app` URLs → `naschatai.com`
- All `bsky.social` → `naschat.social`
- All `blueskyweb.xyz` → `naschatweb.xyz`
- All `xyz.blueskyweb.app` → `com.naschat.app` (Android SharedPreferences, Kotlin package names)
- Deep link scheme: `bluesky://` → `naschat://`
- iOS ShareViewController default scheme: "bluesky" → "naschat"
- Android ExpoReceiveAndroidIntents: package + intent URLs updated
- BSKY_APP_HOST / BSKY_TRUSTED_HOSTS in url-helpers.ts updated to naschatai.com
- All test files updated to match new domains
- GitHub workflow files, e2e YAML, scripts, READMEs updated

## Intentionally preserved (do NOT rename)
- `@bsky.app/*` npm scoped packages (e.g. `@bsky.app/alf`, `@bsky.app/expo-scroll-edge-effect`) — real npm packages in node_modules
- `app.bsky.*` and `com.atproto.*` — AT Protocol namespace identifiers
- `BSKY_LABELER_DID` constant from `@atproto/api` — protocol constant
- `bluesky-social/react-native-*` GitHub fork refs in package.json — upstream org, not our branding
- Go service directory names: `bskyweb/`, `bskyembed/`, `bskylink/`, `bskyogcard/` — internal tooling

**Why:** These are third-party identifiers or AT Protocol protocol specs that cannot be renamed without breaking the app or its dependencies.

## Pitfalls
- Early bulk sed changed `@bsky.app/alf` → `@naschatai.com/alf` breaking npm imports — had to revert node_modules-imported packages
- pnpm store (`.local/share/pnpm/store/`) contains `xyz.blueskyweb` refs in a `react-native-device-attest` third-party cache — intentionally left alone
- Expo port must be 5000; `allowedHosts: true` in webpack.config.js for Replit proxy to work

## CodeLines.md
Documentation file created at repo root with 242 lines covering the rebrand.

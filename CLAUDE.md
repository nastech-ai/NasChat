# CLAUDE.md – NasChat App Development Guide

This document provides guidance for working effectively in the NasChat app codebase.

## Project Overview

NasChat is a cross-platform social media application built with React Native and Expo. It runs on iOS, Android, and Web, connecting to the AT Protocol (atproto) decentralized social network.

**Tech Stack:**

- React 19.1
- React Native 0.81 with Expo 54
- TypeScript 6
- React Navigation 7 for routing
- TanStack Query (React Query) for data fetching
- Lingui 5 for internationalization
- Custom design system called ALF (Application Layout Framework)

**Production Domain:** naschatai.com  
**Development:** localhost:5000 (frontend), localhost:8000 (backend/API)

Prefer using the latest features available for each of these libraries (exact versions are found in `package.json`). For example, prefer `@lingui/react/macro` over `@lingui/react`. Suggest refactoring legacy or deprecated uses.

## Essential Commands

```bash
# Development
pnpm start              # Start Expo dev server
pnpm web                # Start web version (port 5000)
pnpm android            # Run on Android
pnpm ios                # Run on iOS

# Testing & Quality
pnpm test               # Run tests
pnpm lint               # Lint code
pnpm typecheck          # Type check

# Internationalization
pnpm intl:build         # Build all locales
pnpm intl:extract       # Extract English strings
pnpm intl:compile       # Compile catalogs
```

## Architecture

- `src/` - Main application code
- `src/view/` - UI components and screens
- `src/state/` - Global state management
- `src/lib/` - Internal libraries
- `src/screens/` - Screen-level components
- `assets/` - Images, fonts, icons
- `bskyweb/` - Go web server (production only)

## Development URLs

- Frontend: http://localhost:5000
- Backend API: http://localhost:8000/api
- Production: https://naschatai.com

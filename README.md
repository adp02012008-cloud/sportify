# 🌊 SoundWave — Modern Music & Audio Streaming Platform

A production-quality, full-stack music, podcast, and audiobook streaming web application built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB** (with automatic zero-dependency in-memory fallback), and **Razorpay Test Payments**.

SoundWave features an original cyber-acoustic design system with deep obsidian tones, neon cyan and purple accents, glassmorphic surfaces, responsive layouts, and royalty-free streaming audio.

---

## ✨ Features Overview

### 1. 🎵 Rich Audio Streaming Engine
- **HTML5 Audio Playback**: High-fidelity audio playback with automatic recovery.
- **Web Audio Procedural Synthesizer**: If an audio URL is blocked or offline, an intelligent harmonic Web Audio oscillator automatically synthesizes ambient melodic sequences so the player never falls silent.
- **Dynamic Crossfade Transitions**: Seamless track overlap with configurable duration (`0s`, `3s`, `5s`, `8s`, `10s`).
- **Sleep Timer**: Suspend playback with presets (`5m`, `15m`, `30m`, `45m`, `60m`), custom duration, or "End of Track" with countdown timer.
- **Variable Playback Speed**: Flexible pitch-neutral speed control (`0.5x`, `0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`).
- **Harmonic Equalizer Presets**: Flat, Bass Boost, Acoustic, Electronic, Vocal Presence, and Club modes.
- **Queue Management**: Full upcoming track queue with reordering, clear queue, and "Play Next" actions.
- **Keyboard Shortcuts**: Spacebar (Play/Pause), Left/Right Arrows (Seek 5s), M (Mute/Unmute).

### 2. 🌌 Visualizer & Real-Time Synchronized Lyrics
- **HTML5 Canvas Audio Visualizer**: Live harmonic sine and frequency bars responding in real time to playback states.
- **Synchronized Lyrics**: Scrolling, highlighted lyrics with click-to-seek timestamp navigation.

### 3. 👥 Social Features & SoundWave Blend
- **SoundWave Blend**: Algorithmic taste-match compatibility calculator (80%–99%) that generates blended collaborative playlists between friends.
- **Friend Activity Feed**: Real-time listening drawer displaying what friends are streaming with one-click "Listen Along" and "Blend".

### 4. 📚 Comprehensive Audio Formats
- **Music Catalog**: 50+ hand-curated tracks spanning Synthwave, Lo-Fi, Cyberpunk, Ambient, Deep House, and Chillstep.
- **21 Artists & 21 Albums**: Verified artist profiles, discographies, monthly listener statistics, and follow controls.
- **15 Curated Playlists**: Fast search, custom playlist creation, cover selection, and track add/remove modals.
- **10 Original Podcasts**: Multi-episode talk shows with category filters and episode streaming.
- **10 Audiobooks**: Chapter-by-chapter book playback, narrator credits, and duration tracking.

### 5. 💳 Razorpay Payments & Subscriptions
- **Subscription Tiers**: Free Starter, Student Premium (₹59/mo), Individual Premium (₹119/mo), and Family Sound (₹179/mo).
- **Razorpay Checkout Modal**: Integrated test-mode checkout invoking `Razorpay` with test key id and server-side HMAC SHA-256 signature verification.
- **Billing & Receipts**: Invoices history table with payment IDs, dates, amounts, and invoice download simulations.

### 6. 🛡️ Admin Management Dashboard
- **Streaming Analytics**: Real-time stream distributions by genre, registered user counts, and platform revenue metrics.
- **Track CRUD**: Add new audio releases and remove tracks.
- **User Role Administration**: Promote or switch accounts between `USER`, `PREMIUM_USER`, and `ADMIN`.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ or v20+
- **npm** v9+

### Installation & Launch

1. Clone or open the repository:
   ```bash
   cd sportify
   ```

2. Install dependencies (already prepared for all workspaces):
   ```bash
   npm install
   cd server && npm install && cd ..
   cd client && npm install && cd ..
   ```

3. Run both Backend Server and Frontend simultaneously:
   ```bash
   npm run dev
   ```

   - **Frontend App**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000/api`

---

## 🔑 Demo Test Accounts

The platform includes pre-seeded demo accounts for instant evaluation:

| Account Role | Email | Password | Features Unlocked |
|---|---|---|---|
| **Administrator** | `admin@soundwave.io` | `admin123` | Full Admin Dashboard, Song CRUD, User role editor |
| **Premium User** | `premium@soundwave.io` | `password123` | 320kbps Lossless, Blend playlists, Ad-free badges |
| **Standard User** | `alex@soundwave.io` | `password123` | Standard streaming, Upgrade prompts, Library management |

> **Quick Switcher**: You can also switch roles with 1 click directly in the application header or on the login page!

---

## 🛠️ Project Architecture

```
sportify/
├── client/                     # React 18 + Vite + TypeScript Frontend
│   ├── public/
│   │   └── soundwave-logo.svg  # Custom vector logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── cards/          # SongCard, SongRow, ArtistCard, AlbumCard, PlaylistCard, PodcastCard, AudiobookCard
│   │   │   ├── layout/         # Sidebar, Header, BottomNav, FriendActivityDrawer
│   │   │   ├── modals/         # CreatePlaylistModal, AddToPlaylistModal, BlendModal, SleepTimerModal
│   │   │   └── player/         # MusicPlayer, FullscreenPlayer, QueueDrawer
│   │   ├── context/            # AudioContext, AuthContext, ToastContext
│   │   ├── pages/              # Home, Search, Explore, Library, LikedSongs, PlaylistDetail,
│   │   │                       # ArtistDetail, AlbumDetail, Podcasts, PodcastDetail, Audiobooks,
│   │   │                       # AudiobookDetail, Profile, Subscription, PaymentHistory, AdminDashboard,
│   │   │                       # Settings, Login, Signup, NotFound
│   │   ├── services/           # api.ts (Axios client with full API endpoints)
│   │   ├── types/              # index.ts (TypeScript interfaces)
│   │   ├── App.tsx             # Root Router & Modals mount
│   │   ├── main.tsx            # DOM root
│   │   └── index.css           # Tailwind CSS directives & theme design tokens
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # db.ts (Mongo + MemoryStore fallback), jwt.ts, razorpay.ts
│   │   ├── controllers/        # apiControllers.ts (Auth, Songs, Artists, Playlists, Payments, Admin)
│   │   ├── middleware/         # auth.ts (JWT protect, authorize, requirePremium)
│   │   ├── models/             # store.ts (Mongoose schemas + resilient in-memory store)
│   │   ├── routes/             # apiRoutes.ts (REST endpoints)
│   │   ├── seed/               # seedData.ts (52 songs, 21 artists, 21 albums, 15 playlists, 10 podcasts, 10 audiobooks)
│   │   └── server.ts           # Express server entry point
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                # Root package.json with concurrent dev runner
└── README.md
```

---

## 💳 Razorpay Test Mode Verification

Razorpay payments use test mode simulation:
- Public Key ID: `rzp_test_soundwave_demo`
- Server-side signature verification: SHA-256 HMAC
- Any test transaction automatically grants `PREMIUM_USER` status and creates an invoice record in **Payment Receipts** (`/payments`).

---

## 📄 License
MIT License. SoundWave audio assets and artwork are sourced from royalty-free public domains.

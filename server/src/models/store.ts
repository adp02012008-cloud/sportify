import mongoose, { Schema, Document } from 'mongoose';
import { isMemoryMode } from '../config/db';

// --- Mongoose Schemas ---

const UserSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'PREMIUM_USER', 'ADMIN'], default: 'USER' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80' },
  bio: { type: String, default: '' },
  likedSongs: [{ type: String }],
  savedAlbums: [{ type: String }],
  followedArtists: [{ type: String }],
  followingUsers: [{ type: String }],
  plan: { type: String, enum: ['FREE', 'PREMIUM_MONTHLY', 'PREMIUM_YEARLY'], default: 'FREE' },
  subscriptionStatus: { type: String, enum: ['ACTIVE', 'CANCELLED', 'EXPIRED', 'NONE'], default: 'NONE' },
  createdAt: { type: Date, default: Date.now },
});

const SongSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  artistId: { type: String, required: true },
  album: { type: String, required: true },
  albumId: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  durationStr: { type: String, required: true },
  artwork: { type: String, required: true },
  audioUrl: { type: String, required: true },
  plays: { type: String, default: '0' },
  playCount: { type: Number, default: 0 },
  releaseYear: { type: Number, default: 2024 },
  mood: { type: String, default: 'Vibrant' },
  lyrics: { type: Array, default: [] },
  isExplicit: { type: Boolean, default: false },
  canvasUrl: { type: String, default: '' },
});

const ArtistSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  monthlyListeners: { type: String, default: '1,000,000' },
  followers: { type: String, default: '500,000' },
  verified: { type: Boolean, default: true },
  bio: { type: String, default: '' },
  avatar: { type: String, required: true },
  banner: { type: String, required: true },
  topSongIds: [{ type: String }],
  albumIds: [{ type: String }],
});

const AlbumSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  artistId: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  artwork: { type: String, required: true },
  songIds: [{ type: String }],
  durationStr: { type: String, default: '' },
  likesCount: { type: String, default: '0' },
});

const PlaylistSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  creator: { type: String, default: 'SoundWave' },
  ownerId: { type: String, default: 'system' },
  isUserCreated: { type: Boolean, default: false },
  cover: { type: String, required: true },
  songIds: [{ type: String }],
  isPublic: { type: Boolean, default: true },
  isCollaborative: { type: Boolean, default: false },
  collaborators: [{ type: String }],
  followers: { type: String, default: '0' },
  accentColor: { type: String, default: '#06b6d4' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PodcastSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  category: { type: String, required: true },
  episodes: [{ type: Object }],
  followers: { type: String, default: '250,000' },
});

const AudiobookSchema = new Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  narrator: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  chapters: [{ type: Object }],
});

const PaymentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String, required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['SUCCESS', 'FAILED', 'PENDING'], default: 'SUCCESS' },
  createdAt: { type: Date, default: Date.now },
});

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  songId: { type: String, required: true },
  title: { type: String },
  artist: { type: String },
  artwork: { type: String },
  playedAt: { type: Date, default: Date.now },
});

// Mongoose Models
export const MgUser = mongoose.model('User', UserSchema);
export const MgSong = mongoose.model('Song', SongSchema);
export const MgArtist = mongoose.model('Artist', ArtistSchema);
export const MgAlbum = mongoose.model('Album', AlbumSchema);
export const MgPlaylist = mongoose.model('Playlist', PlaylistSchema);
export const MgPodcast = mongoose.model('Podcast', PodcastSchema);
export const MgAudiobook = mongoose.model('Audiobook', AudiobookSchema);
export const MgPayment = mongoose.model('Payment', PaymentSchema);
export const MgHistory = mongoose.model('History', HistorySchema);

// In-Memory Data Collections for Zero-Dependency Execution
export const MemoryStore = {
  users: [] as any[],
  songs: [] as any[],
  artists: [] as any[],
  albums: [] as any[],
  playlists: [] as any[],
  podcasts: [] as any[],
  audiobooks: [] as any[],
  payments: [] as any[],
  history: [] as any[],
  notifications: [] as any[],
  friendActivity: [
    {
      id: 'fa-1',
      userId: 'usr-alex',
      userName: 'Alex Chen',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      action: 'listening to',
      itemTitle: 'Neon Horizon',
      itemSubtitle: 'CyberPulse',
      itemArtwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80',
      timestamp: '2m ago'
    },
    {
      id: 'fa-2',
      userId: 'usr-priya',
      userName: 'Priya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      action: 'liked song',
      itemTitle: 'Tum Hi Meri Dharkan',
      itemSubtitle: 'Arijit Verma',
      itemArtwork: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&auto=format&fit=crop&q=80',
      timestamp: '14m ago'
    },
    {
      id: 'fa-3',
      userId: 'usr-marcus',
      userName: 'Marcus Sterling',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      action: 'added to playlist',
      itemTitle: 'Kavithai Paada',
      itemSubtitle: 'Anirudh Sriram',
      itemArtwork: 'https://images.unsplash.com/photo-1520523839898-507127027582?w=200&auto=format&fit=crop&q=80',
      timestamp: '42m ago'
    }
  ] as any[]
};

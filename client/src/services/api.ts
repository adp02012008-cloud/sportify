import axios from 'axios';
import {
  Song,
  Artist,
  Album,
  Playlist,
  Podcast,
  Audiobook,
  User,
  FriendActivity,
  PaymentReceipt,
  AdminStats,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach Bearer token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('soundwave_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalizers to guarantee coverUrl / artwork and songs are always defined
const normalizeSong = (s: any): Song => ({
  ...s,
  coverUrl: s.coverUrl || s.artwork || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  artwork: s.artwork || s.coverUrl,
  duration: s.durationStr || (typeof s.duration === 'number' ? `${Math.floor(s.duration / 60)}:${s.duration % 60 < 10 ? '0' : ''}${s.duration % 60}` : s.duration || '3:30'),
});

const normalizeArtist = (a: any): Artist => ({
  ...a,
  imageUrl: a.imageUrl || a.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  avatar: a.avatar || a.imageUrl,
});

const normalizeAlbum = (al: any): Album => ({
  ...al,
  coverUrl: al.coverUrl || al.artwork || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
  artwork: al.artwork || al.coverUrl,
  year: al.year || al.releaseYear || 2024,
});

const normalizePlaylist = (p: any): Playlist => ({
  ...p,
  coverUrl: p.coverUrl || p.cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  cover: p.cover || p.coverUrl,
  ownerName: p.ownerName || p.creator || 'SoundWave Curator',
  songs: (p.songs || []).map(normalizeSong),
});

const normalizePodcast = (pod: any): Podcast => ({
  ...pod,
  coverUrl: pod.coverUrl || pod.coverImage || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
  host: pod.host || pod.author || 'SoundWave Host',
  rating: pod.rating || 4.9,
});

const normalizeAudiobook = (book: any): Audiobook => ({
  ...book,
  coverUrl: book.coverUrl || book.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
  rating: book.rating || 4.8,
  genre: book.genre || book.category || 'Literature',
});

// Unified API Object
export const api = {
  songs: {
    getAll: async (params?: any) => {
      const res = await apiClient.get('/songs', { params });
      const rawSongs = res.data.songs || res.data || [];
      return { data: rawSongs.map(normalizeSong) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/songs/${id}`);
      return { data: normalizeSong(res.data.song || res.data) };
    },
  },
  artists: {
    getAll: async () => {
      const res = await apiClient.get('/artists');
      const raw = res.data.artists || res.data || [];
      return { data: raw.map(normalizeArtist) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/artists/${id}`);
      return { data: normalizeArtist(res.data.artist || res.data) };
    },
  },
  albums: {
    getAll: async () => {
      const res = await apiClient.get('/albums');
      const raw = res.data.albums || res.data || [];
      return { data: raw.map(normalizeAlbum) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/albums/${id}`);
      return { data: normalizeAlbum(res.data.album || res.data) };
    },
  },
  playlists: {
    getAll: async () => {
      const res = await apiClient.get('/playlists');
      const raw = res.data.playlists || res.data || [];
      return { data: raw.map(normalizePlaylist) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/playlists/${id}`);
      return { data: normalizePlaylist(res.data.playlist || res.data) };
    },
    create: async (data: Partial<Playlist>) => {
      const res = await apiClient.post('/playlists', {
        name: data.name,
        description: data.description,
        cover: data.coverUrl || data.cover,
      });
      return { data: normalizePlaylist(res.data.playlist || res.data) };
    },
    delete: async (id: string) => {
      return apiClient.delete(`/playlists/${id}`);
    },
    addSong: async (playlistId: string, songId: string) => {
      return apiClient.post(`/playlists/${playlistId}/songs`, { songId });
    },
    removeSong: async (playlistId: string, songId: string) => {
      return apiClient.delete(`/playlists/${playlistId}/songs/${songId}`);
    },
  },
  podcasts: {
    getAll: async () => {
      const res = await apiClient.get('/podcasts');
      const raw = res.data.podcasts || res.data || [];
      return { data: raw.map(normalizePodcast) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/podcasts/${id}`);
      return { data: normalizePodcast(res.data.podcast || res.data) };
    },
  },
  audiobooks: {
    getAll: async () => {
      const res = await apiClient.get('/audiobooks');
      const raw = res.data.audiobooks || res.data || [];
      return { data: raw.map(normalizeAudiobook) };
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/audiobooks/${id}`);
      return { data: normalizeAudiobook(res.data.audiobook || res.data) };
    },
  },
  search: {
    query: async (q: string) => {
      const res = await apiClient.get('/search', { params: { q } });
      const d = res.data;
      return {
        data: {
          songs: (d.songs || []).map(normalizeSong),
          artists: (d.artists || []).map(normalizeArtist),
          albums: (d.albums || []).map(normalizeAlbum),
          playlists: (d.playlists || []).map(normalizePlaylist),
        },
      };
    },
  },
  social: {
    getFriendActivity: async () => {
      const res = await apiClient.get('/social/activity');
      const raw = res.data.activity || res.data || [];
      return {
        data: raw.map((item: any) => ({
          id: item.id,
          userName: item.userName || 'Audrey Wave',
          avatar: item.userAvatar || item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          isLive: true,
          timestamp: item.timestamp || 'Listening now',
          song: {
            id: item.songId || 'song-1',
            title: item.itemTitle || item.title || 'Echo Chamber',
            artist: item.itemSubtitle || item.artist || 'Aura Synth',
            coverUrl: item.itemArtwork || item.coverUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80',
            duration: '3:40',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        })),
      };
    },
  },
  payments: {
    createOrder: async (data: { amount: number; planName: string }) => {
      const res = await apiClient.post('/payments/create-order', {
        plan: data.planName.toUpperCase().includes('YEAR') ? 'PREMIUM_YEARLY' : 'PREMIUM_MONTHLY',
        amount: data.amount,
      });
      return res;
    },
    verify: async (data: any) => {
      const res = await apiClient.post('/payments/verify', data);
      return res;
    },
    getHistory: async () => {
      const res = await apiClient.get('/payments/history');
      const raw = res.data.history || res.data || [];
      return {
        data: raw.map((item: any) => ({
          id: item.id || `rec-${Date.now()}`,
          orderId: item.orderId || `order_${item.id}`,
          paymentId: item.paymentId || `pay_${item.id}`,
          planName: item.plan || item.planName || 'Individual Premium',
          amount: item.amount || 119,
          status: item.status || 'SUCCESS',
          createdAt: item.createdAt || new Date().toISOString(),
        })),
      };
    },
  },
  admin: {
    getStats: async () => {
      const res = await apiClient.get('/admin/stats');
      return res;
    },
    getUsers: async () => {
      const res = await apiClient.get('/admin/users');
      return { data: res.data.users || res.data || [] };
    },
    createSong: async (songData: Partial<Song>) => {
      const res = await apiClient.post('/admin/songs', songData);
      return { data: normalizeSong(res.data.song || res.data) };
    },
    deleteSong: async (id: string) => {
      return apiClient.delete(`/admin/songs/${id}`);
    },
    updateUserRole: async (userId: string, role: string) => {
      return apiClient.put(`/admin/users/${userId}/role`, { role });
    },
    getAnalyticsDataset: async (count: number = 100) => {
      const res = await apiClient.get(`/admin/analytics-dataset?count=${count}`);
      return res.data;
    },
    exportAnalyticsDatasetUrl: (count: number = 100) => {
      const token = localStorage.getItem('soundwave_token') || '';
      const base = apiClient.defaults.baseURL || '/api';
      return `${base}/admin/analytics-dataset/export?count=${count}&token=${token}`;
    },
  },
};

// Also export existing modular APIs for backward compatibility
export const authApi = {
  login: async (credentials: any) => (await apiClient.post('/auth/login', credentials)).data,
  register: async (data: any) => (await apiClient.post('/auth/register', data)).data,
  getMe: async () => (await apiClient.get('/auth/me')).data,
  updateProfile: async (data: any) => (await apiClient.put('/auth/profile', data)).data,
};
export const songsApi = api.songs;
export const artistsApi = api.artists;
export const albumsApi = api.albums;
export const playlistsApi = api.playlists;
export const podcastsApi = api.podcasts;
export const audiobooksApi = api.audiobooks;
export const searchApi = api.search;
export const socialApi = api.social;
export const paymentsApi = api.payments;
export const adminApi = api.admin;
export default api;

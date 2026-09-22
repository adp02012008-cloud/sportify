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
import {
  defaultSongs,
  defaultArtists,
  defaultAlbums,
  defaultPlaylists,
  defaultPodcasts,
  defaultAudiobooks
} from '../data/defaultCatalogue';

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
      try {
        const res = await apiClient.get('/songs', { params });
        const rawSongs = res.data.songs || res.data || [];
        if (Array.isArray(rawSongs) && rawSongs.length > 0) {
          return { data: rawSongs.map(normalizeSong) };
        }
      } catch (err) {
        // Backend not available (e.g. Vercel standalone)
      }
      return { data: defaultSongs.map(normalizeSong) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/songs/${id}`);
        const song = res.data.song || res.data;
        if (song) return { data: normalizeSong(song) };
      } catch (err) {}
      const fallback = defaultSongs.find((s) => s.id === id) || defaultSongs[0];
      return { data: normalizeSong(fallback) };
    },
  },
  artists: {
    getAll: async () => {
      try {
        const res = await apiClient.get('/artists');
        const raw = res.data.artists || res.data || [];
        if (Array.isArray(raw) && raw.length > 0) {
          return { data: raw.map(normalizeArtist) };
        }
      } catch (err) {}
      return { data: defaultArtists.map(normalizeArtist) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/artists/${id}`);
        const artist = res.data.artist || res.data;
        if (artist) return { data: normalizeArtist(artist) };
      } catch (err) {}
      const fallback = defaultArtists.find((a) => a.id === id) || defaultArtists[0];
      return { data: normalizeArtist(fallback) };
    },
  },
  albums: {
    getAll: async () => {
      try {
        const res = await apiClient.get('/albums');
        const raw = res.data.albums || res.data || [];
        if (Array.isArray(raw) && raw.length > 0) {
          return { data: raw.map(normalizeAlbum) };
        }
      } catch (err) {}
      return { data: defaultAlbums.map(normalizeAlbum) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/albums/${id}`);
        const album = res.data.album || res.data;
        if (album) return { data: normalizeAlbum(album) };
      } catch (err) {}
      const fallback = defaultAlbums.find((al) => al.id === id) || defaultAlbums[0];
      return { data: normalizeAlbum(fallback) };
    },
  },
  playlists: {
    getAll: async () => {
      try {
        const res = await apiClient.get('/playlists');
        const raw = res.data.playlists || res.data || [];
        if (Array.isArray(raw) && raw.length > 0) {
          return { data: raw.map(normalizePlaylist) };
        }
      } catch (err) {}
      return { data: defaultPlaylists.map(normalizePlaylist) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/playlists/${id}`);
        const playlist = res.data.playlist || res.data;
        if (playlist) return { data: normalizePlaylist(playlist) };
      } catch (err) {}
      const fallback = defaultPlaylists.find((p) => p.id === id) || defaultPlaylists[0];
      return { data: normalizePlaylist(fallback) };
    },
    create: async (data: Partial<Playlist>) => {
      try {
        const res = await apiClient.post('/playlists', {
          name: data.name,
          description: data.description,
          cover: data.coverUrl || data.cover,
        });
        return { data: normalizePlaylist(res.data.playlist || res.data) };
      } catch (err) {
        const newPl: Playlist = {
          id: 'pl-' + Date.now(),
          name: data.name || 'My Playlist',
          description: data.description || 'Custom user playlist',
          coverUrl: data.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
          ownerName: 'You',
          isPublic: true,
          songs: []
        };
        return { data: newPl };
      }
    },
    delete: async (id: string) => {
      try {
        return await apiClient.delete(`/playlists/${id}`);
      } catch (err) {
        return { data: { success: true } };
      }
    },
    addSong: async (playlistId: string, songId: string) => {
      try {
        return await apiClient.post(`/playlists/${playlistId}/songs`, { songId });
      } catch (err) {
        return { data: { success: true } };
      }
    },
    removeSong: async (playlistId: string, songId: string) => {
      try {
        return await apiClient.delete(`/playlists/${playlistId}/songs/${songId}`);
      } catch (err) {
        return { data: { success: true } };
      }
    },
  },
  podcasts: {
    getAll: async () => {
      try {
        const res = await apiClient.get('/podcasts');
        const raw = res.data.podcasts || res.data || [];
        if (Array.isArray(raw) && raw.length > 0) {
          return { data: raw.map(normalizePodcast) };
        }
      } catch (err) {}
      return { data: defaultPodcasts.map(normalizePodcast) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/podcasts/${id}`);
        const podcast = res.data.podcast || res.data;
        if (podcast) return { data: normalizePodcast(podcast) };
      } catch (err) {}
      const fallback = defaultPodcasts.find((p) => p.id === id) || defaultPodcasts[0];
      return { data: normalizePodcast(fallback) };
    },
  },
  audiobooks: {
    getAll: async () => {
      try {
        const res = await apiClient.get('/audiobooks');
        const raw = res.data.audiobooks || res.data || [];
        if (Array.isArray(raw) && raw.length > 0) {
          return { data: raw.map(normalizeAudiobook) };
        }
      } catch (err) {}
      return { data: defaultAudiobooks.map(normalizeAudiobook) };
    },
    getById: async (id: string) => {
      try {
        const res = await apiClient.get(`/audiobooks/${id}`);
        const audiobook = res.data.audiobook || res.data;
        if (audiobook) return { data: normalizeAudiobook(audiobook) };
      } catch (err) {}
      const fallback = defaultAudiobooks.find((ab) => ab.id === id) || defaultAudiobooks[0];
      return { data: normalizeAudiobook(fallback) };
    },
  },
  search: {
    query: async (q: string) => {
      try {
        const res = await apiClient.get('/search', { params: { q } });
        const d = res.data;
        if (d && (d.songs?.length || d.artists?.length || d.albums?.length || d.playlists?.length)) {
          return {
            data: {
              songs: (d.songs || []).map(normalizeSong),
              artists: (d.artists || []).map(normalizeArtist),
              albums: (d.albums || []).map(normalizeAlbum),
              playlists: (d.playlists || []).map(normalizePlaylist),
            },
          };
        }
      } catch (err) {}
      const query = q.toLowerCase().trim();
      const filteredSongs = defaultSongs.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.artist.toLowerCase().includes(query) ||
          s.genre.toLowerCase().includes(query)
      );
      const filteredArtists = defaultArtists.filter(
        (a) => a.name.toLowerCase().includes(query) || a.genre.toLowerCase().includes(query)
      );
      const filteredAlbums = defaultAlbums.filter(
        (al) => al.title.toLowerCase().includes(query) || al.artist.toLowerCase().includes(query)
      );
      const filteredPlaylists = defaultPlaylists.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
      return {
        data: {
          songs: filteredSongs.map(normalizeSong),
          artists: filteredArtists.map(normalizeArtist),
          albums: filteredAlbums.map(normalizeAlbum),
          playlists: filteredPlaylists.map(normalizePlaylist),
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

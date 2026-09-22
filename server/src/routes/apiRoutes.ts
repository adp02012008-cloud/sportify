import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  getSongs,
  getSongById,
  playSong,
  toggleLikeSong,
  getArtists,
  getArtistById,
  getAlbums,
  getAlbumById,
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  generateBlend,
  getPodcasts,
  getPodcastById,
  getAudiobooks,
  getAudiobookById,
  searchAll,
  getRecommendations,
  getFriendActivity,
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getAdminStats,
  adminGetUsers,
  adminAddSong,
  adminDeleteSong
} from '../controllers/apiControllers';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'SoundWave Platform API', version: '1.0.0' });
});

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', protect, getMe);
router.put('/auth/profile', protect, updateProfile);

// Songs
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.post('/songs/:id/play', playSong);
router.post('/songs/:id/like', protect, toggleLikeSong);

// Artists
router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);

// Albums
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);

// Playlists
router.get('/playlists', getPlaylists);
router.get('/playlists/:id', getPlaylistById);
router.post('/playlists', protect, createPlaylist);
router.put('/playlists/:id', protect, updatePlaylist);
router.delete('/playlists/:id', protect, deletePlaylist);
router.post('/playlists/:id/songs', protect, addSongToPlaylist);
router.delete('/playlists/:id/songs/:songId', protect, removeSongFromPlaylist);
router.post('/playlists/blend', protect, generateBlend);

// Podcasts
router.get('/podcasts', getPodcasts);
router.get('/podcasts/:id', getPodcastById);

// Audiobooks
router.get('/audiobooks', getAudiobooks);
router.get('/audiobooks/:id', getAudiobookById);

// Search & Recommendations
router.get('/search', searchAll);
router.get('/recommendations', getRecommendations);

// Social
router.get('/social/activity', getFriendActivity);

// Razorpay Payments & Subscriptions
router.post('/payments/create-order', protect, createPaymentOrder);
router.post('/payments/verify', protect, verifyPayment);
router.get('/payments/history', protect, getPaymentHistory);

// Admin Dashboard (Protected by ADMIN role)
router.get('/admin/stats', protect, authorize('ADMIN'), getAdminStats);
router.get('/admin/users', protect, authorize('ADMIN'), adminGetUsers);
router.post('/admin/songs', protect, authorize('ADMIN'), adminAddSong);
router.delete('/admin/songs/:id', protect, authorize('ADMIN'), adminDeleteSong);

export default router;

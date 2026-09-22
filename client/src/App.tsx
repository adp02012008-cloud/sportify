import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AudioProvider, useAudio } from './context/AudioContext';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { FriendActivityDrawer } from './components/layout/FriendActivityDrawer';

import { MusicPlayer } from './components/player/MusicPlayer';
import { FullscreenPlayer } from './components/player/FullscreenPlayer';
import { QueueDrawer } from './components/player/QueueDrawer';

import { CreatePlaylistModal } from './components/modals/CreatePlaylistModal';
import { AddToPlaylistModal } from './components/modals/AddToPlaylistModal';
import { BlendModal } from './components/modals/BlendModal';
import { SleepTimerModal } from './components/modals/SleepTimerModal';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Explore } from './pages/Explore';
import { Library } from './pages/Library';
import { LikedSongs } from './pages/LikedSongs';
import { PlaylistDetail } from './pages/PlaylistDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { AlbumDetail } from './pages/AlbumDetail';
import { Podcasts } from './pages/Podcasts';
import { PodcastDetail } from './pages/PodcastDetail';
import { Audiobooks } from './pages/Audiobooks';
import { AudiobookDetail } from './pages/AudiobookDetail';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { PaymentHistory } from './pages/PaymentHistory';
import { AdminDashboard } from './pages/AdminDashboard';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';

import { Song, Playlist, FriendActivity } from './types';
import { api } from './services/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { currentSong } = useAudio();
  const { addToast } = useToast();

  // Drawers & Modals state
  const [showFriendActivity, setShowFriendActivity] = useState(false);
  const [showFullscreenPlayer, setShowFullscreenPlayer] = useState(false);
  const [showQueueDrawer, setShowQueueDrawer] = useState(false);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [showBlendModal, setShowBlendModal] = useState(false);
  const [showSleepTimerModal, setShowSleepTimerModal] = useState(false);

  // Selected state for modals
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState<Song | null>(null);
  const [blendFriendName, setBlendFriendName] = useState('Alex Mercer');

  // Shared application datasets
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [friendActivities, setFriendActivities] = useState<FriendActivity[]>([]);

  // Fetch essential shared collections
  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const [playlistsRes, songsRes, activityRes] = await Promise.all([
          api.playlists.getAll(),
          api.songs.getAll(),
          api.social.getFriendActivity(),
        ]);
        setPlaylists(playlistsRes.data);
        setAllSongs(songsRes.data);
        setFriendActivities(activityRes.data);
      } catch (err) {
        console.error('Failed to load shared app data', err);
      }
    };
    fetchSharedData();
  }, []);

  // Playlist handlers
  const handleCreatePlaylist = async (playlistData: Partial<Playlist>) => {
    try {
      const res = await api.playlists.create(playlistData);
      setPlaylists((prev) => [res.data, ...prev]);
      addToast(`Playlist "${res.data.name}" created!`, 'success');
    } catch (err) {
      console.error('Playlist creation error', err);
      addToast('Could not create playlist', 'error');
    }
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenAddToPlaylist = (song: Song) => {
    setSelectedSongForPlaylist(song);
    setShowAddToPlaylistModal(true);
  };

  const handleToggleSongInPlaylist = async (playlistId: string, song: Song) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    const alreadyIn = playlist.songs?.some((s) => s.id === song.id);
    try {
      if (alreadyIn) {
        await api.playlists.removeSong(playlistId, song.id);
        setPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId
              ? { ...p, songs: p.songs?.filter((s) => s.id !== song.id) }
              : p
          )
        );
      } else {
        await api.playlists.addSong(playlistId, song.id);
        setPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId
              ? { ...p, songs: [...(p.songs || []), song] }
              : p
          )
        );
      }
    } catch (err) {
      console.error('Toggle song in playlist error', err);
    }
  };

  const handleOpenBlend = (friendName: string) => {
    setBlendFriendName(friendName);
    setShowBlendModal(true);
  };

  const handleBlendCreated = (blendedPlaylist: Playlist) => {
    setPlaylists((prev) => [blendedPlaylist, ...prev]);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#12162e] via-[#0f1326] to-[#0c0f1f] text-slate-100 overflow-hidden font-sans select-none">
      {/* 1. Left Sidebar Navigation (Desktop) */}
      {!isAuthPage && (
        <Sidebar
          playlists={playlists}
          onOpenCreatePlaylist={() => setShowCreatePlaylistModal(true)}
        />
      )}

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Sticky Header */}
        {!isAuthPage && (
          <Header
            toggleFriendActivity={() => setShowFriendActivity(!showFriendActivity)}
            showFriendActivity={showFriendActivity}
          />
        )}

        {/* Scrollable Page Body */}
        <main className={`flex-1 overflow-y-auto px-4 sm:px-8 pt-4 sm:pt-6 ${
          currentSong ? 'pb-28 sm:pb-32' : 'pb-20 md:pb-8'
        }`}>
          <Routes>
            <Route path="/" element={<Home onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route path="/search" element={<Search onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route path="/explore" element={<Explore onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route
              path="/library"
              element={
                <Library
                  playlists={playlists}
                  onOpenCreatePlaylist={() => setShowCreatePlaylistModal(true)}
                />
              }
            />
            <Route path="/liked" element={<LikedSongs onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route
              path="/playlist/:id"
              element={
                <PlaylistDetail
                  onAddToPlaylist={handleOpenAddToPlaylist}
                  onDeletePlaylist={handleDeletePlaylist}
                />
              }
            />
            <Route path="/artist/:id" element={<ArtistDetail onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route path="/album/:id" element={<AlbumDetail onAddToPlaylist={handleOpenAddToPlaylist} />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcasts/:id" element={<PodcastDetail />} />
            <Route path="/audiobooks" element={<Audiobooks />} />
            <Route path="/audiobooks/:id" element={<AudiobookDetail />} />
            <Route path="/profile" element={<Profile playlists={playlists} />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* 3. Friend Activity Drawer (Desktop Right) */}
      {!isAuthPage && (
        <FriendActivityDrawer
          isOpen={showFriendActivity}
          onClose={() => setShowFriendActivity(false)}
          activities={friendActivities}
          onOpenBlend={handleOpenBlend}
        />
      )}

      {/* 4. Queue Drawer */}
      <QueueDrawer
        isOpen={showQueueDrawer}
        onClose={() => setShowQueueDrawer(false)}
      />

      {/* 5. Persistent Music Player Bottom Bar */}
      {currentSong && !isAuthPage && (
        <MusicPlayer
          onOpenFullscreen={() => setShowFullscreenPlayer(true)}
          onToggleQueue={() => setShowQueueDrawer(!showQueueDrawer)}
          onOpenSleepTimer={() => setShowSleepTimerModal(true)}
          isQueueOpen={showQueueDrawer}
        />
      )}

      {/* 6. Mobile Bottom Navigation */}
      {!isAuthPage && <BottomNav />}

      {/* 7. Fullscreen Visualizer / Lyrics Player */}
      <FullscreenPlayer
        isOpen={showFullscreenPlayer}
        onClose={() => setShowFullscreenPlayer(false)}
      />

      {/* 8. Modals */}
      <CreatePlaylistModal
        isOpen={showCreatePlaylistModal}
        onClose={() => setShowCreatePlaylistModal(false)}
        onCreate={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={showAddToPlaylistModal}
        onClose={() => setShowAddToPlaylistModal(false)}
        song={selectedSongForPlaylist}
        playlists={playlists}
        onToggleSongInPlaylist={handleToggleSongInPlaylist}
        onOpenCreatePlaylist={() => setShowCreatePlaylistModal(true)}
      />

      <BlendModal
        isOpen={showBlendModal}
        onClose={() => setShowBlendModal(false)}
        friendName={blendFriendName}
        allSongs={allSongs}
        onBlendCreated={handleBlendCreated}
      />

      <SleepTimerModal
        isOpen={showSleepTimerModal}
        onClose={() => setShowSleepTimerModal(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <AudioProvider>
            <Router>
              <MainLayout />
            </Router>
          </AudioProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;

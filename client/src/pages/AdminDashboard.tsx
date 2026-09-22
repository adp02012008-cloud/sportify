import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Music, 
  Disc3, 
  CreditCard, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Sparkles,
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Song, Artist, Album, User } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'analytics' | 'songs' | 'artists' | 'albums' | 'users'>('analytics');
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // New Song form modal state
  const [showAddSong, setShowAddSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongAlbum, setNewSongAlbum] = useState('');
  const [newSongGenre, setNewSongGenre] = useState('Synthwave');
  const [newSongDuration, setNewSongDuration] = useState('3:45');
  const [newSongAudioUrl, setNewSongAudioUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  const [newSongCoverUrl, setNewSongCoverUrl] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [songsRes, artistsRes, albumsRes, usersRes] = await Promise.all([
        api.songs.getAll(),
        api.artists.getAll(),
        api.albums.getAll(),
        api.admin.getUsers(),
      ]);

      setSongs(songsRes.data);
      setArtists(artistsRes.data);
      setAlbums(albumsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSong = async (id: string, title: string) => {
    if (window.confirm(`Delete song "${title}"?`)) {
      try {
        await api.admin.deleteSong(id);
        setSongs((prev) => prev.filter((s) => s.id !== id));
        addToast(`Song "${title}" deleted`, 'success');
      } catch (err) {
        addToast('Failed to delete song', 'error');
      }
    }
  };

  const handleCreateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle || !newSongArtist) {
      addToast('Please provide Title and Artist', 'warning');
      return;
    }

    try {
      const res = await api.admin.createSong({
        title: newSongTitle,
        artist: newSongArtist,
        album: newSongAlbum || 'SoundWave Singles',
        genre: newSongGenre,
        duration: newSongDuration,
        audioUrl: newSongAudioUrl,
        coverUrl: newSongCoverUrl,
      });

      setSongs((prev) => [res.data, ...prev]);
      setShowAddSong(false);
      setNewSongTitle('');
      setNewSongArtist('');
      addToast(`Added song "${res.data.title}"`, 'success');
    } catch (err) {
      addToast('Failed to create song', 'error');
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'PREMIUM_USER' | 'ADMIN') => {
    try {
      await api.admin.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      addToast(`Updated user role to ${newRole}`, 'success');
    } catch (err) {
      addToast('Failed to update role', 'error');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#172421] via-[#101b1b] to-[#091114] border border-emerald-500/30 flex items-center justify-between shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">SoundWave Admin Panel</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Manage audio catalogue, curate releases, oversee active user accounts, and track platform metrics.
          </p>
        </div>

        <button
          onClick={() => setShowAddSong(true)}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={16} />
          <span>Upload Song</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Total Catalog Songs</span>
            <Music size={16} className="text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white">{songs.length}</p>
          <span className="text-[11px] text-emerald-400 font-medium">50+ Seed Audio Assets</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Registered Users</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">{users.length}</p>
          <span className="text-[11px] text-purple-400 font-medium">Active streaming base</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Artists & Albums</span>
            <Disc3 size={16} className="text-pink-400" />
          </div>
          <p className="text-2xl font-black text-white">{artists.length + albums.length}</p>
          <span className="text-[11px] text-pink-400 font-medium">{artists.length} Artists • {albums.length} Albums</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Platform Revenue</span>
            <CreditCard size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">₹24,890</p>
          <span className="text-[11px] text-emerald-400 font-medium">+18% Monthly Recurring Growth</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#212440] pb-3 overflow-x-auto">
        {(['analytics', 'songs', 'artists', 'albums', 'users'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'bg-[#16182c] text-gray-300 hover:bg-[#20233f]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Analytics View */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>Real-Time Stream Distribution by Genre</span>
            </h3>

            <div className="space-y-3">
              {[
                { genre: 'Synthwave & Cyberpunk', streams: 14200, percent: 38, color: 'bg-cyan-400' },
                { genre: 'Lo-Fi Study Beats', streams: 11400, percent: 30, color: 'bg-purple-400' },
                { genre: 'Electronic & Deep House', streams: 7200, percent: 19, color: 'bg-emerald-400' },
                { genre: 'Chillstep & Ambient', streams: 4900, percent: 13, color: 'bg-amber-400' },
              ].map((item) => (
                <div key={item.genre} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-200">{item.genre}</span>
                    <span className="text-gray-400 font-mono">{item.streams.toLocaleString()} streams ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#1b1e36] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Songs Management */}
      {activeTab === 'songs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">All Audio Tracks ({songs.length})</h3>
            <button
              onClick={() => setShowAddSong(true)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5"
            >
              <Plus size={14} />
              Add Track
            </button>
          </div>

          <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-[#17192f] text-gray-400 border-b border-[#232746]">
                  <tr>
                    <th className="p-3">Track</th>
                    <th className="p-3">Artist</th>
                    <th className="p-3">Album</th>
                    <th className="p-3">Genre</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2238]">
                  {songs.map((song) => (
                    <tr key={song.id} className="hover:bg-[#191b33] transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img src={song.coverUrl} alt={song.title} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{song.title}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">{song.artist}</td>
                      <td className="p-3 text-gray-400">{song.album}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                          {song.genre}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-gray-400">{song.duration}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteSong(song.id, song.title)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete track"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Artists Management */}
      {activeTab === 'artists' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Artists ({artists.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 rounded-2xl bg-[#131526] border border-[#232746] flex flex-col items-center text-center">
                <img src={artist.imageUrl} alt={artist.name} className="w-20 h-20 rounded-full object-cover mb-2 ring-2 ring-cyan-400/40" />
                <h4 className="text-xs font-bold text-white truncate w-full">{artist.name}</h4>
                <span className="text-[10px] text-cyan-300 capitalize">{artist.genre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Albums Management */}
      {activeTab === 'albums' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Albums ({albums.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="p-3 rounded-2xl bg-[#131526] border border-[#232746]">
                <img src={album.coverUrl} alt={album.title} className="w-full aspect-square rounded-xl object-cover mb-2" />
                <h4 className="text-xs font-bold text-white truncate">{album.title}</h4>
                <p className="text-[11px] text-gray-400 truncate">{album.artist} • {album.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Users Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">User Accounts ({users.length})</h3>
          <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#17192f] text-gray-400 border-b border-[#232746]">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Current Role</th>
                  <th className="p-3 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2238]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#191b33] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : u.role === 'PREMIUM_USER'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-gray-700/30 text-gray-300 border border-gray-600/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleRoleChange(u.id, 'USER')}
                          className="px-2 py-1 rounded bg-[#20233f] hover:bg-[#2c3058] text-[10px] text-gray-300"
                        >
                          User
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'PREMIUM_USER')}
                          className="px-2 py-1 rounded bg-purple-500/20 hover:bg-purple-500/40 text-[10px] text-purple-300 font-semibold"
                        >
                          Premium
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'ADMIN')}
                          className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-[10px] text-emerald-300 font-semibold"
                        >
                          Admin
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Song Modal */}
      {showAddSong && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#121424] border border-[#272b50] rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">Upload New Master Audio Track</h3>
            <form onSubmit={handleCreateSong} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Song Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Horizon"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Artist Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Astral Projection"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Album</label>
                  <input
                    type="text"
                    placeholder="e.g. Neon Horizons"
                    value={newSongAlbum}
                    onChange={(e) => setNewSongAlbum(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Genre</label>
                  <input
                    type="text"
                    placeholder="Synthwave"
                    value={newSongGenre}
                    onChange={(e) => setNewSongGenre(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Audio Stream URL</label>
                <input
                  type="url"
                  value={newSongAudioUrl}
                  onChange={(e) => setNewSongAudioUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Cover Artwork URL</label>
                <input
                  type="url"
                  value={newSongCoverUrl}
                  onChange={(e) => setNewSongCoverUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSong(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

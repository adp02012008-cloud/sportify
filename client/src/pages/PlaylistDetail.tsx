import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Shuffle, Heart, MoreHorizontal, Clock, Trash2, Share2 } from 'lucide-react';
import { Playlist, Song } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { useToast } from '../context/ToastContext';
import { SongRow } from '../components/cards/SongRow';

interface PlaylistDetailProps {
  onAddToPlaylist: (song: Song) => void;
  onDeletePlaylist?: (id: string) => void;
}

export const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ onAddToPlaylist, onDeletePlaylist }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playSong, toggleShuffle } = useAudio();
  const { addToast } = useToast();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.playlists.getById(id);
        setPlaylist(res.data);
      } catch (err) {
        console.error('Failed to load playlist', err);
        addToast('Playlist not found', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-xs">Loading playlist...</p>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="py-20 text-center text-gray-400">
        <h2 className="text-lg font-bold text-white mb-2">Playlist Not Found</h2>
        <button
          onClick={() => navigate('/library')}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-semibold"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const songs = playlist.songs || [];

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  const handleShufflePlay = () => {
    if (songs.length > 0) {
      toggleShuffle();
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSong(songs[randomIndex], songs);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      try {
        await api.playlists.delete(id);
        if (onDeletePlaylist) onDeletePlaylist(id);
        addToast('Playlist deleted', 'info');
        navigate('/library');
      } catch (err) {
        console.error('Delete error', err);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c1e38] via-[#121426] to-[#0d0e1b] border border-[#272a4d] flex flex-col sm:flex-row items-start sm:items-end gap-6 shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15"
          style={{ backgroundImage: `url(${playlist.coverUrl})` }}
        />

        <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 flex-shrink-0">
          <img
            src={playlist.coverUrl}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Playlist
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {playlist.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-xl leading-relaxed">
            {playlist.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-white font-medium">{playlist.ownerName || 'SoundWave Curator'}</span>
            <span>•</span>
            <span>{songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Play Controls & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAll}
            disabled={songs.length === 0}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </button>

          <button
            onClick={handleShufflePlay}
            disabled={songs.length === 0}
            title="Shuffle Play"
            className="p-2.5 rounded-full bg-[#1b1e36] text-gray-300 hover:text-white hover:bg-[#25294a] transition-colors"
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              addToast('Playlist link copied', 'success');
            }}
            title="Share Playlist"
            className="p-2.5 rounded-full bg-[#1b1e36] text-gray-300 hover:text-white hover:bg-[#25294a] transition-colors"
          >
            <Share2 size={18} />
          </button>
        </div>

        {onDeletePlaylist && (
          <button
            onClick={handleDelete}
            title="Delete Playlist"
            className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Song Tracklist */}
      {songs.length === 0 ? (
        <div className="py-16 text-center text-gray-500 rounded-2xl border border-dashed border-[#232746] text-xs">
          This playlist is currently empty. Discover songs and click "Add to Playlist".
        </div>
      ) : (
        <div className="space-y-1">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_4fr_3fr_auto_auto] gap-3 px-3 py-2 text-xs font-semibold text-gray-400 border-b border-[#212440]">
            <span className="w-8 text-center">#</span>
            <span>Title</span>
            <span className="hidden md:block">Album</span>
            <span className="w-10 text-right"><Clock size={14} className="inline" /></span>
            <span className="w-8" />
          </div>

          {songs.map((song, idx) => (
            <SongRow
              key={song.id}
              song={song}
              index={idx}
              playlistContext={songs}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Heart, Play, Clock, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { SongRow } from '../components/cards/SongRow';
import { Song } from '../types';

interface LikedSongsProps {
  onAddToPlaylist: (song: Song) => void;
}

export const LikedSongs: React.FC<LikedSongsProps> = ({ onAddToPlaylist }) => {
  const { likedSongs, playSong } = useAudio();

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playSong(likedSongs[0], likedSongs);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with vibrant blue-indigo gradient */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#4f46e5] via-[#3730a3] to-[#1e1b4b] border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-end gap-6 shadow-2xl">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-2xl flex-shrink-0">
          <Heart size={64} className="text-white fill-white" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-200">
            Playlist
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Liked Songs
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-200 font-medium">
            <span>Curated by You</span>
            <span>•</span>
            <span>{likedSongs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
        >
          <Play size={24} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      {/* Song List */}
      {likedSongs.length === 0 ? (
        <div className="py-20 text-center text-gray-400 rounded-2xl border border-dashed border-[#232746]">
          <Heart size={36} className="mx-auto text-gray-500 mb-2" />
          <h3 className="text-base font-bold text-white mb-1">Songs you like will appear here</h3>
          <p className="text-xs text-gray-500">
            Save songs by tapping the heart icon on any track or player.
          </p>
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

          {likedSongs.map((song, idx) => (
            <SongRow
              key={song.id}
              song={song}
              index={idx}
              playlistContext={likedSongs}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

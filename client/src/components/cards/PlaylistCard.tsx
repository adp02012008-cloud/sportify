import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ListMusic } from 'lucide-react';
import { Playlist } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const navigate = useNavigate();
  const { playSong } = useAudio();

  const handleQuickPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.songs && playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    } else {
      navigate(`/playlist/${playlist.id}`);
    }
  };

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="group relative p-3.5 rounded-2xl bg-[#141525]/70 hover:bg-[#1e2038] border border-[#222543]/40 hover:border-[#373b6b] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Artwork */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e19]">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Playlist badge */}
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-cyan-400">
          <ListMusic size={14} />
        </div>

        {/* Floating Quick Play button */}
        <button
          onClick={handleQuickPlay}
          aria-label={`Play ${playlist.name}`}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
          {playlist.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
          {playlist.description}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-2">
          <span>{playlist.songs?.length || 0} songs</span>
          <span>•</span>
          <span className="truncate">By {playlist.ownerName || 'SoundWave'}</span>
        </div>
      </div>
    </div>
  );
};

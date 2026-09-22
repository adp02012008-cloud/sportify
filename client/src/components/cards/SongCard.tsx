import React from 'react';
import { Play, Pause, Heart, MoreHorizontal, Sparkles } from 'lucide-react';
import { Song } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface SongCardProps {
  song: Song;
  playlistContext?: Song[];
  onAddToPlaylist?: (song: Song) => void;
}

export const SongCard: React.FC<SongCardProps> = ({ song, playlistContext, onAddToPlaylist }) => {
  const { currentSong, isPlaying, playSong, togglePlay, isLiked, toggleLikeSong, addToQueue } = useAudio();
  const { addToast } = useToast();

  const isCurrent = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const liked = isLiked(song.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeSong(song);
    addToast(liked ? 'Removed from Liked Songs' : 'Added to Liked Songs', 'success');
  };

  return (
    <div
      onClick={handlePlayClick}
      className={`group relative p-3.5 rounded-2xl bg-gradient-to-b from-[#1c2244] to-[#161a35] hover:from-[#252d59] hover:to-[#1c2244] border border-[#2f386b] hover:border-[#4d5c9c] transition-all duration-300 cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${
        isCurrent ? 'ring-2 ring-cyan-400/70 bg-[#21274d]' : ''
      }`}
    >
      {/* Artwork container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e19]">
        <img
          src={song.coverUrl}
          alt={song.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Equalizer animation when playing */}
        {isCurrentlyPlaying && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-1">
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-soundwave" />
            <span className="w-1 h-4 bg-purple-400 rounded-full animate-soundwave delay-100" />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-soundwave delay-200" />
          </div>
        )}

        {/* Floating Play Button */}
        <button
          onClick={handlePlayClick}
          aria-label={isCurrentlyPlaying ? 'Pause' : 'Play'}
          className={`absolute bottom-3 right-3 w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isCurrent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          {isCurrentlyPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold truncate tracking-tight ${
          isCurrent ? 'text-cyan-400' : 'text-white group-hover:text-white'
        }`}>
          {song.title}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5 hover:underline">
          {song.artist}
        </p>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#222543]/40">
        <span className="text-[11px] text-gray-500 font-mono">
          {song.duration}
        </span>

        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
          <button
            onClick={handleLike}
            title={liked ? 'Unlike' : 'Like'}
            className={`p-1.5 rounded-full hover:bg-[#2b2e50] transition-colors ${
              liked ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
          </button>

          {onAddToPlaylist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist(song);
              }}
              title="Add to Playlist"
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#2b2e50] transition-colors"
            >
              <MoreHorizontal size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

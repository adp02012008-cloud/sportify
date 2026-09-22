import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, MoreHorizontal, PlusCircle, ListPlus, Volume2 } from 'lucide-react';
import { Song } from '../../types';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface SongRowProps {
  song: Song;
  index: number;
  playlistContext?: Song[];
  onAddToPlaylist?: (song: Song) => void;
  showAlbum?: boolean;
}

export const SongRow: React.FC<SongRowProps> = ({
  song,
  index,
  playlistContext,
  onAddToPlaylist,
  showAlbum = true,
}) => {
  const { currentSong, isPlaying, playSong, togglePlay, isLiked, toggleLikeSong, addToQueue, playNext } = useAudio();
  const { addToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isCurrent = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const liked = isLiked(song.id);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleRowClick = () => {
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
      onClick={handleRowClick}
      className={`group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_4fr_3fr_auto_auto] items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1b1e36]/70 transition-colors cursor-pointer text-sm ${
        isCurrent ? 'bg-[#181a30] text-cyan-400' : 'text-gray-300'
      }`}
    >
      {/* Index or Play / Pause icon */}
      <div className="w-8 text-center flex items-center justify-center font-mono text-xs text-gray-500">
        <span className={`group-hover:hidden ${isCurrentlyPlaying ? 'hidden' : 'block'}`}>
          {index + 1}
        </span>
        {isCurrentlyPlaying && (
          <Volume2 size={16} className="text-cyan-400 animate-pulse group-hover:hidden" />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick();
          }}
          className="hidden group-hover:flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
        >
          {isCurrentlyPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
      </div>

      {/* Song Title and Artist */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <p className={`font-medium truncate text-sm ${isCurrent ? 'text-cyan-400 font-semibold' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-xs text-gray-400 truncate hover:underline">
            {song.artist}
          </p>
        </div>
      </div>

      {/* Album Name (hidden on small screens) */}
      {showAlbum && (
        <div className="hidden md:block truncate text-xs text-gray-400 hover:text-gray-200">
          {song.album}
        </div>
      )}

      {/* Like and Duration */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          title={liked ? 'Unlike' : 'Like'}
          className={`p-1.5 rounded-full hover:bg-[#282b4a] transition-colors ${
            liked ? 'text-cyan-400' : 'text-gray-500 opacity-0 group-hover:opacity-100 hover:text-white'
          }`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>

        <span className="text-xs font-mono text-gray-400 w-10 text-right">
          {song.duration}
        </span>
      </div>

      {/* Dropdown Options */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#282b4a] transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal size={16} />
        </button>

        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-1 w-44 rounded-xl bg-[#17192d] border border-[#2b2e50] shadow-2xl p-1.5 z-50 animate-in fade-in"
          >
            {onAddToPlaylist && (
              <button
                onClick={() => {
                  onAddToPlaylist(song);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-[#222543] rounded-lg flex items-center gap-2"
              >
                <PlusCircle size={14} />
                Add to Playlist
              </button>
            )}
            <button
              onClick={() => {
                addToQueue(song);
                setMenuOpen(false);
                addToast('Added to queue', 'success');
              }}
              className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-[#222543] rounded-lg flex items-center gap-2"
            >
              <ListPlus size={14} />
              Add to Queue
            </button>
            <button
              onClick={() => {
                playNext(song);
                setMenuOpen(false);
                addToast('Playing next', 'success');
              }}
              className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-[#222543] rounded-lg flex items-center gap-2"
            >
              <Play size={14} />
              Play Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

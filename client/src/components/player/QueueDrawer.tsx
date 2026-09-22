import React from 'react';
import { X, Trash2, Play, Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface QueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QueueDrawer: React.FC<QueueDrawerProps> = ({ isOpen, onClose }) => {
  const { currentSong, queue, queueIndex, isPlaying, playSong, removeFromQueue, clearQueue } = useAudio();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const nextTracks = queue.slice(queueIndex + 1);

  return (
    <div className="fixed top-0 right-0 bottom-24 w-80 sm:w-96 bg-[#0f101c]/95 backdrop-blur-xl border-l border-[#222543] z-40 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-[#1f223a] flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Play Queue</h2>
          <p className="text-xs text-gray-400">{nextTracks.length} tracks waiting</p>
        </div>
        <div className="flex items-center gap-1">
          {nextTracks.length > 0 && (
            <button
              onClick={() => {
                clearQueue();
                addToast('Queue cleared', 'info');
              }}
              title="Clear Queue"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close Queue"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Queue Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Currently Playing Card */}
        {currentSong && (
          <div>
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Now Playing
            </h3>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
                <p className="text-xs text-gray-300 truncate">{currentSong.artist}</p>
              </div>
              {isPlaying && (
                <Volume2 size={18} className="text-cyan-400 animate-pulse flex-shrink-0" />
              )}
            </div>
          </div>
        )}

        {/* Next Tracks List */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Next Up
          </h3>

          {nextTracks.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[#262947] text-gray-500 text-xs">
              No tracks in queue. Add songs from your library, playlists, or search.
            </div>
          ) : (
            <div className="space-y-1.5">
              {nextTracks.map((song, idx) => {
                const absoluteIndex = queueIndex + 1 + idx;
                return (
                  <div
                    key={`${song.id}-${idx}`}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#191b30] border border-transparent hover:border-[#272b4c] transition-all cursor-pointer"
                    onClick={() => playSong(song, queue)}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-mono text-gray-500 w-4 text-center">
                        {idx + 1}
                      </span>
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                          {song.title}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-gray-500">
                        {song.duration}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromQueue(absoluteIndex);
                          addToast('Removed from queue', 'info');
                        }}
                        title="Remove track"
                        className="p-1 rounded text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

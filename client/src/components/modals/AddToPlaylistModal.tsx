import React from 'react';
import { X, Plus, Check, ListMusic } from 'lucide-react';
import { Song, Playlist } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  playlists: Playlist[];
  onToggleSongInPlaylist: (playlistId: string, song: Song) => void;
  onOpenCreatePlaylist: () => void;
}

export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  isOpen,
  onClose,
  song,
  playlists,
  onToggleSongInPlaylist,
  onOpenCreatePlaylist,
}) => {
  const { addToast } = useToast();

  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#121424] border border-[#262a4d] rounded-2xl p-5 shadow-2xl relative flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222543]">
          <div className="min-w-0 pr-2">
            <h2 className="text-sm font-bold text-white">Add to Playlist</h2>
            <p className="text-xs text-cyan-400 truncate mt-0.5">{song.title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Create new playlist button */}
        <button
          onClick={() => {
            onClose();
            onOpenCreatePlaylist();
          }}
          className="mt-3 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={15} />
          New Playlist
        </button>

        {/* Playlists selection list */}
        <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
          {playlists.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-xs">
              No playlists found. Click above to create one!
            </div>
          ) : (
            playlists.map((playlist) => {
              const isInPlaylist = playlist.songs?.some((s) => s.id === song.id);
              return (
                <div
                  key={playlist.id}
                  onClick={() => {
                    onToggleSongInPlaylist(playlist.id, song);
                    addToast(
                      isInPlaylist
                        ? `Removed from ${playlist.name}`
                        : `Added to ${playlist.name}`,
                      'success'
                    );
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isInPlaylist
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300'
                      : 'hover:bg-[#1b1e35] border border-transparent text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-white">
                        {playlist.name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {playlist.songs?.length || 0} songs
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                      isInPlaylist
                        ? 'bg-cyan-400 border-cyan-400 text-black'
                        : 'border-gray-500 text-transparent hover:border-gray-300'
                    }`}
                  >
                    <Check size={14} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Done button */}
        <div className="pt-3 border-t border-[#222543] mt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

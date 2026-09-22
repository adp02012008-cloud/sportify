import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Playlist } from '../../types';
import { useToast } from '../../context/ToastContext';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (playlistData: Partial<Playlist>) => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const defaultCovers = [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Please enter a playlist name', 'warning');
      return;
    }

    const selectedCover =
      coverUrl.trim() ||
      defaultCovers[Math.floor(Math.random() * defaultCovers.length)];

    onCreate({
      name: name.trim(),
      description: description.trim() || 'Curated with SoundWave',
      coverUrl: selectedCover,
      isPublic,
      songs: [],
    });

    setName('');
    setDescription('');
    setCoverUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#121424] border border-[#262a4d] rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create New Playlist</h2>
            <p className="text-xs text-gray-400">Add to your SoundWave library</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Playlist Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Midnight Synthwave Drive"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#1a1c30] border border-[#2b2f52] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Give your playlist a vibe or description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#1a1c30] border border-[#2b2f52] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Cover Image URL (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#1a1c30] border border-[#2b2f52] focus:border-cyan-400 text-xs text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>
            {coverUrl && (
              <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-white/20">
                <img src={coverUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-2 border-t border-[#232747]">
            <span className="text-xs text-gray-300">Public Playlist</span>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

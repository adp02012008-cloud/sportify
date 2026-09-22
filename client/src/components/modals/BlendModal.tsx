import React, { useState } from 'react';
import { X, Sparkles, HeartHandshake, Play, Music } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Song, Playlist } from '../../types';

interface BlendModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName?: string;
  allSongs: Song[];
  onBlendCreated: (playlist: Playlist) => void;
}

export const BlendModal: React.FC<BlendModalProps> = ({
  isOpen,
  onClose,
  friendName = 'Alex Mercer',
  allSongs,
  onBlendCreated,
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [partnerName, setPartnerName] = useState(friendName);
  const [isGenerating, setIsGenerating] = useState(false);
  const [blendResult, setBlendResult] = useState<{
    matchScore: number;
    sharedGenres: string[];
    blendedSongs: Song[];
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerateBlend = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Calculate realistic pseudo-random blend score
      const score = Math.floor(Math.random() * 16) + 84; // 84% - 99%
      const genres = ['Synthwave', 'Indie Electronic', 'Cyber Beats', 'Lo-Fi Chill'];
      // Sample 12 songs from catalog
      const sampledSongs = [...allSongs].sort(() => 0.5 - Math.random()).slice(0, 12);

      setBlendResult({
        matchScore: score,
        sharedGenres: genres,
        blendedSongs: sampledSongs,
      });
      setIsGenerating(false);
    }, 900);
  };

  const handleSaveBlend = () => {
    if (!blendResult) return;

    const newBlendPlaylist: Playlist = {
      id: `blend-${Date.now()}`,
      name: `${user?.name || 'You'} + ${partnerName} Blend`,
      description: `A dynamic blend of taste updated daily • ${blendResult.matchScore}% Music Compatibility`,
      coverUrl:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      songs: blendResult.blendedSongs,
      isPublic: true,
      ownerName: 'SoundWave Blend Engine',
    };

    onBlendCreated(newBlendPlaylist);
    addToast('SoundWave Blend saved to your Library!', 'success');
    onClose();
    setBlendResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#121426] border border-[#272a50] rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 text-black shadow-lg shadow-cyan-500/20">
            <HeartHandshake size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SoundWave Blend</h2>
            <p className="text-xs text-gray-400">
              Combine music tastes with your friends into a shared playlist
            </p>
          </div>
        </div>

        {!blendResult ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Blend With Friend
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Enter friend's name or username..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#191b32] border border-[#2d325a] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#17192f] border border-[#25284b] text-xs text-gray-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Sparkles size={16} />
                <span>How Blend Works</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                SoundWave analyzes your recent streaming habits, favorite artists, and acoustic profiles with{' '}
                <span className="text-white font-medium">{partnerName || 'your friend'}</span> to construct an algorithmic playlist that bridges your tastes!
              </p>
            </div>

            <button
              onClick={handleGenerateBlend}
              disabled={isGenerating || !partnerName.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-sm font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Computing Harmonic Affinity...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Blend Playlist</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Blend Result Screen */
          <div className="space-y-5 animate-in zoom-in-95 duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent border border-cyan-500/30 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black font-extrabold text-2xl shadow-xl shadow-cyan-500/30 mb-2">
                {blendResult.matchScore}%
              </div>
              <h3 className="text-base font-bold text-white">
                Musical Match Score!
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                You and {partnerName} share a deep affinity for atmospheric melodies
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                {blendResult.sharedGenres.map((g) => (
                  <span
                    key={g}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#1e2242] text-cyan-300 border border-cyan-500/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Preview Blended Tracks ({blendResult.blendedSongs.length} songs)
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {blendResult.blendedSongs.slice(0, 5).map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#17192f] text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-7 h-7 rounded object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{song.title}</p>
                        <p className="text-[11px] text-gray-400 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-gray-500">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setBlendResult(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
              >
                Try Another Friend
              </button>
              <button
                onClick={handleSaveBlend}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-cyan-500/25"
              >
                Save Blend to Library
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

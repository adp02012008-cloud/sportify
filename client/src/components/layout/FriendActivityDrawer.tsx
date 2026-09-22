import React from 'react';
import { X, Volume2, Sparkles, UserPlus, Play } from 'lucide-react';
import { FriendActivity, Song } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface FriendActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activities: FriendActivity[];
  onOpenBlend: (friendName: string) => void;
}

export const FriendActivityDrawer: React.FC<FriendActivityDrawerProps> = ({
  isOpen,
  onClose,
  activities,
  onOpenBlend,
}) => {
  const { playSong } = useAudio();

  if (!isOpen) return null;

  return (
    <aside className="w-72 md:w-80 h-full bg-[#0c0d15] border-l border-[#1f2136] flex flex-col z-30 transition-all duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#1b1d30]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-white tracking-wide">Friend Activity</h2>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <button
          onClick={onClose}
          aria-label="Close activity"
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#1a1c2e] transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activities.map((item) => (
          <div
            key={item.id}
            className="group p-3 rounded-xl bg-[#141624] hover:bg-[#1b1e33] border border-[#232644]/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={item.avatar}
                  alt={item.userName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2e3258]"
                />
                {item.isLive && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#141624] rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white truncate">{item.userName}</h4>
                  <span className="text-[10px] text-gray-500">{item.timestamp}</span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <img
                    src={item.song.coverUrl}
                    alt={item.song.title}
                    className="w-7 h-7 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-200 truncate font-medium group-hover:text-cyan-400 transition-colors">
                      {item.song.title}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {item.song.artist}
                    </p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="mt-2 pt-2 border-t border-[#1f223a] flex items-center justify-between">
                  <button
                    onClick={() => playSong(item.song as Song)}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => onOpenBlend(item.userName)}
                    className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    <Sparkles size={12} />
                    <span>Blend</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Connect Friends */}
      <div className="p-4 border-t border-[#1b1d30] bg-[#10121f]">
        <button
          onClick={() => onOpenBlend('Community')}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <UserPlus size={15} className="text-cyan-400" />
          <span>Launch SoundWave Blend</span>
        </button>
      </div>
    </aside>
  );
};

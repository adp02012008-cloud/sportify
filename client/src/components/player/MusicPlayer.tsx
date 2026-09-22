import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Volume1,
  Heart,
  Maximize2,
  ListMusic,
  Clock,
  Mic2,
  Gauge
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface MusicPlayerProps {
  onOpenFullscreen: () => void;
  onToggleQueue: () => void;
  onOpenSleepTimer: () => void;
  isQueueOpen: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onOpenFullscreen,
  onToggleQueue,
  onOpenSleepTimer,
  isQueueOpen,
}) => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeatMode,
    playbackRate,
    sleepTimerMinutes,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    setPlaybackRate,
    isLiked,
    toggleLikeSong,
  } = useAudio();

  const { addToast } = useToast();
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  if (!currentSong) return null;

  const liked = isLiked(currentSong.id);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleLike = () => {
    toggleLikeSong(currentSong);
    addToast(liked ? 'Removed from Liked Songs' : 'Added to Liked Songs', 'success');
  };

  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 bg-[#161a38]/95 backdrop-blur-2xl border-t border-[#2d3463] px-3 sm:px-6 flex items-center justify-between z-40 shadow-[0_-10px_35px_rgba(0,0,0,0.35)]">
      {/* 1. Left Track Information */}
      <div className="flex items-center gap-3 w-1/4 min-w-[150px] max-w-[280px]">
        <div
          onClick={onOpenFullscreen}
          className="relative group cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-white/10"
        >
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Maximize2 size={16} className="text-white" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            onClick={onOpenFullscreen}
            className="text-xs sm:text-sm font-semibold text-white truncate cursor-pointer hover:text-cyan-400 transition-colors"
          >
            {currentSong.title}
          </div>
          <div className="text-[11px] sm:text-xs text-gray-400 truncate mt-0.5">
            {currentSong.artist}
          </div>
        </div>

        <button
          onClick={handleLike}
          aria-label={liked ? 'Unlike' : 'Like'}
          className={`p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0 ${
            liked ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 2. Center Player Controls & Progress Scrubber */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-2xl px-2 sm:px-4">
        {/* Playback Button Group */}
        <div className="flex items-center gap-2 sm:gap-4 mb-1.5">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            title={shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
            className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
              shuffle ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle size={16} />
          </button>

          {/* Previous */}
          <button
            onClick={playPrevious}
            title="Previous Track"
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          >
            <SkipBack size={19} />
          </button>

          {/* Play/Pause Main Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={() => playNext()}
            title="Next Track"
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
          >
            <SkipForward size={19} />
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode}`}
            className={`p-1.5 rounded-full hover:bg-white/10 transition-colors relative ${
              repeatMode !== 'off' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? <Repeat1 size={17} /> : <Repeat size={16} />}
            {repeatMode !== 'off' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Progress Bar and Timestamps */}
        <div className="w-full flex items-center gap-2 text-[11px] font-mono text-gray-400 select-none">
          <span className="w-9 text-right">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center group h-4 cursor-pointer">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progressPercent}
              onChange={handleSeekChange}
              className="w-full h-1 bg-[#232644] rounded-lg appearance-none cursor-pointer accent-cyan-400 group-hover:h-1.5 transition-all"
            />
          </div>
          <span className="w-9">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Right Utility Features */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 w-1/4 min-w-[140px] max-w-[280px]">
        {/* Playback Speed Pill */}
        <div className="relative">
          <button
            onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
            title="Playback Speed"
            className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Gauge size={13} />
            <span>{playbackRate}x</span>
          </button>

          {speedMenuOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-[#16182c] border border-[#272a4e] rounded-xl p-1 shadow-2xl z-50 flex flex-col min-w-[70px]">
              {speeds.map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setPlaybackRate(rate);
                    setSpeedMenuOpen(false);
                    addToast(`Speed: ${rate}x`, 'info');
                  }}
                  className={`px-3 py-1 text-xs rounded-lg text-left ${
                    playbackRate === rate ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sleep Timer */}
        <button
          onClick={onOpenSleepTimer}
          title={sleepTimerMinutes ? `Sleep timer: ${sleepTimerMinutes}m left` : 'Sleep Timer'}
          className={`p-1.5 rounded-full hover:bg-white/10 transition-colors relative ${
            sleepTimerMinutes ? 'text-purple-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Clock size={16} />
          {sleepTimerMinutes !== null && (
            <span className="absolute -top-1 -right-1 px-1 text-[9px] bg-purple-500 text-white rounded-full font-bold">
              {sleepTimerMinutes}m
            </span>
          )}
        </button>

        {/* Lyrics/Fullscreen toggle */}
        <button
          onClick={onOpenFullscreen}
          title="Lyrics & Visualizer"
          className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
        >
          <Mic2 size={16} />
        </button>

        {/* Queue Drawer */}
        <button
          onClick={onToggleQueue}
          title="Queue"
          className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
            isQueueOpen ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-400 hover:text-white'
          }`}
        >
          <ListMusic size={17} />
        </button>

        {/* Volume Slider */}
        <div className="hidden lg:flex items-center gap-1.5 pl-1">
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="text-gray-400 hover:text-white p-1 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={17} />
            ) : volume < 0.5 ? (
              <Volume1 size={17} />
            ) : (
              <Volume2 size={17} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-[#232644] rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

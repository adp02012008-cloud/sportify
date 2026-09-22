import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Mic2,
  Sparkles,
  Sliders,
  Share2
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface FullscreenPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullscreenPlayer: React.FC<FullscreenPlayerProps> = ({ isOpen, onClose }) => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    toggleShuffle,
    toggleRepeat,
    isLiked,
    toggleLikeSong,
  } = useAudio();

  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'canvas' | 'lyrics'>('canvas');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Parse lyrics lines or generate rich lyrics fallback
  const lyricsLines = Array.isArray(currentSong?.lyrics)
    ? currentSong.lyrics.map((l) => (typeof l === 'string' ? l : l.text))
    : typeof currentSong?.lyrics === 'string'
    ? currentSong.lyrics.split('\n').filter(Boolean)
    : [
        'Instrumental vibes rising from the soundwaves...',
        'Feel the rhythm pulsing through the night',
        'Synth notes cascading down in neon light',
        'Electric currents guiding our journey',
        'Lost in harmony, found in the groove',
        'SoundWave frequency streaming unbroken',
        'Forever echoing in the acoustic chamber'
      ];

  // Active lyric calculation based on progress
  const currentLineIndex = duration > 0 
    ? Math.min(Math.floor((currentTime / duration) * lyricsLines.length), lyricsLines.length - 1)
    : 0;

  // Visualizer Animation on HTML5 Canvas
  useEffect(() => {
    if (!isOpen || activeTab !== 'canvas') {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 48;
      const barWidth = canvas.width / numBars;
      const centerY = canvas.height * 0.7;

      // Draw subtle wave gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#06b6d4'); // Cyan
      gradient.addColorStop(0.5, '#a855f7'); // Purple
      gradient.addColorStop(1, '#ec4899'); // Pink

      ctx.fillStyle = gradient;

      for (let i = 0; i < numBars; i++) {
        const x = i * barWidth;
        // Harmonic waves calculation
        const amp = isPlaying
          ? Math.sin(phase + i * 0.2) * 40 + Math.cos(phase * 0.8 + i * 0.1) * 30 + 50
          : 6;
        const height = Math.max(4, amp);
        const y = centerY - height;

        ctx.beginPath();
        ctx.roundRect(x + 2, y, barWidth - 4, height, 4);
        ctx.fill();
      }

      phase += isPlaying ? 0.05 : 0.01;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, activeTab, isPlaying]);

  if (!isOpen || !currentSong) return null;

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

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#121324] via-[#090a12] to-[#040408] text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Background ambient light */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 pointer-events-none scale-125"
        style={{ backgroundImage: `url(${currentSong.coverUrl})` }}
      />

      {/* Top Bar */}
      <div className="relative z-10 p-6 flex items-center justify-between">
        <button
          onClick={onClose}
          aria-label="Minimize Player"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronDown size={24} />
        </button>

        {/* Tab Toggle: Visualizer vs Lyrics */}
        <div className="flex items-center p-1 rounded-full bg-[#1b1d33]/80 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'canvas'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            Visualizer
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'lyrics'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Mic2 size={14} />
            Lyrics
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            addToast('Song link copied to clipboard', 'success');
          }}
          aria-label="Share Song"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Center Stage: Canvas or Lyrics */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
        {activeTab === 'canvas' ? (
          <div className="flex flex-col items-center w-full max-w-lg">
            {/* Artwork Card with 3D Depth */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/15 mb-6 group">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Audio Spectrum Canvas */}
            <div className="w-full h-24 sm:h-32 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
            </div>
          </div>
        ) : (
          /* Realtime Synchronized Lyrics View */
          <div className="w-full max-w-xl h-80 sm:h-96 overflow-y-auto px-4 py-8 space-y-6 text-center scrollbar-none flex flex-col items-center">
            {lyricsLines.map((line, idx) => {
              const isCurrentLine = idx === currentLineIndex;
              return (
                <p
                  key={idx}
                  className={`transition-all duration-300 cursor-pointer ${
                    isCurrentLine
                      ? 'text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 scale-105'
                      : 'text-sm sm:text-base font-medium text-gray-500 hover:text-gray-300'
                  }`}
                  onClick={() => {
                    const targetTime = (idx / lyricsLines.length) * duration;
                    seek(targetTime);
                  }}
                >
                  {line}
                </p>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Controls Area */}
      <div className="relative z-10 px-6 pb-10 max-w-2xl mx-auto w-full">
        {/* Track Title and Artist & Like */}
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold truncate text-white">
              {currentSong.title}
            </h2>
            <p className="text-sm text-gray-400 truncate mt-0.5">
              {currentSong.artist} • {currentSong.album}
            </p>
          </div>
          <button
            onClick={() => {
              toggleLikeSong(currentSong);
              addToast(liked ? 'Removed from Liked Songs' : 'Added to Liked Songs', 'success');
            }}
            className={`p-2.5 rounded-full hover:bg-white/10 transition-colors ${
              liked ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Scrubber Slider */}
        <div className="space-y-1 mb-6">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progressPercent}
            onChange={handleSeekChange}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:h-2 transition-all"
          />
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleShuffle}
            title="Shuffle"
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
              shuffle ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle size={20} />
          </button>

          <button
            onClick={playPrevious}
            title="Previous"
            className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <SkipBack size={26} />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={() => playNext()}
            title="Next"
            className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <SkipForward size={26} />
          </button>

          <button
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode}`}
            className={`p-2 rounded-full hover:bg-white/10 transition-colors relative ${
              repeatMode !== 'off' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
            {repeatMode !== 'off' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  ListPlus,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useLibrary } from '../../context/LibraryContext';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { AddToPlaylistModal } from '../common/AddToPlaylistModal';

export const FullscreenPlayer = ({ isOpen, onClose }) => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    nextSong,
    prevSong,
    seekTo,
    changeVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat
  } = useAudio();

  const { isSongLiked, toggleLikeSong } = useLibrary();
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('visualizer'); // 'visualizer' | 'lyrics'

  if (!isOpen || !currentSong) return null;

  const liked = isSongLiked(currentSong.id);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'linear-gradient(180deg, rgba(16, 16, 28, 0.98) 0%, rgba(8, 8, 12, 1) 100%)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 40px',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
          <Sparkles size={16} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            SoundWave Immersive Player • 24-bit 96kHz Lossless
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Exit fullscreen"
          style={{
            padding: '8px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Center Section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Large Album Artwork */}
        <div
          style={{
            position: 'relative',
            width: '360px',
            height: '360px',
            borderRadius: '24px',
            boxShadow: isPlaying ? '0 20px 60px rgba(6, 182, 212, 0.35)' : '0 20px 50px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            transition: 'box-shadow var(--transition-normal), transform var(--transition-normal)',
            transform: isPlaying ? 'scale(1.02)' : 'scale(0.98)'
          }}
        >
          <img
            src={currentSong.artwork}
            alt={currentSong.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Info & Visualizer / Lyrics */}
        <div style={{ flex: 1, maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="badge">{currentSong.genre}</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleLikeSong(currentSong.id, currentSong.title)}
                  title={liked ? 'Unlike' : 'Like'}
                  style={{
                    color: liked ? '#ec4899' : 'var(--text-secondary)',
                    padding: '8px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Heart size={22} fill={liked ? '#ec4899' : 'none'} />
                </button>
                <button
                  onClick={() => setPlaylistModalOpen(true)}
                  title="Add to playlist"
                  style={{
                    color: 'var(--text-secondary)',
                    padding: '8px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <ListPlus size={22} />
                </button>
              </div>
            </div>

            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', lineHeight: 1.15 }}>
              {currentSong.title}
            </h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '6px' }}>
              {currentSong.artist} • <span style={{ color: 'var(--text-muted)' }}>{currentSong.album}</span>
            </h2>
          </div>

          {/* Audio Visualizer Waves */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '90px'
            }}
          >
            {[18, 40, 65, 30, 80, 50, 95, 45, 70, 35, 85, 25, 60, 40, 75, 55, 30, 90, 40, 60].map((h, i) => (
              <span
                key={i}
                style={{
                  width: '4px',
                  height: isPlaying ? `${h}%` : '8%',
                  background: 'var(--accent-gradient)',
                  borderRadius: '3px',
                  transition: 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isPlaying ? '0 0 8px rgba(6, 182, 212, 0.5)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Scrubber & Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '100%' }}>
              <ProgressBar currentTime={currentTime} duration={duration} onSeek={seekTo} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={toggleShuffle}
                  style={{ color: isShuffle ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
                >
                  <Shuffle size={20} />
                </button>
                <button
                  onClick={prevSong}
                  style={{ color: '#fff' }}
                >
                  <SkipBack size={26} />
                </button>
                <button
                  onClick={togglePlay}
                  className="play-button-glow"
                  style={{ width: '56px', height: '56px' }}
                >
                  {isPlaying ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />}
                </button>
                <button
                  onClick={nextSong}
                  style={{ color: '#fff' }}
                >
                  <SkipForward size={26} />
                </button>
                <button
                  onClick={cycleRepeat}
                  style={{ color: repeatMode !== 'off' ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
                >
                  {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
                </button>
              </div>

              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={changeVolume}
                onToggleMute={toggleMute}
              />
            </div>
          </div>
        </div>
      </div>

      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={currentSong}
      />
    </div>
  );
};

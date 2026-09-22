import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  ListPlus,
  ListMusic,
  Maximize2
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useLibrary } from '../../context/LibraryContext';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { QueueDrawer } from '../layout/QueueDrawer';
import { FullscreenPlayer } from './FullscreenPlayer';
import { AddToPlaylistModal } from '../common/AddToPlaylistModal';

export const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    queue,
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

  const [queueOpen, setQueueOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  if (!currentSong) return null;

  const liked = isSongLiked(currentSong.id);

  return (
    <>
      <footer
        style={{
          height: 'var(--player-height)',
          background: 'var(--bg-player)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 120,
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Left: Track Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '280px', minWidth: '200px' }}>
          <div
            onClick={() => setFullscreenOpen(true)}
            style={{ position: 'relative', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
            title="Expand player"
          >
            <img
              src={currentSong.artwork}
              alt={currentSong.title}
              style={{
                width: '56px',
                height: '56px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            {isPlaying && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px'
                }}
              >
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
            )}
          </div>

          <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link
              to={`/album/${currentSong.albumId || 'alb-1'}`}
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#f8fafc',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {currentSong.title}
            </Link>

            <Link
              to={`/artist/${currentSong.artistId || 'art-1'}`}
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {currentSong.artist}
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
            <button
              onClick={() => toggleLikeSong(currentSong.id, currentSong.title)}
              title={liked ? 'Unlike' : 'Like'}
              style={{
                color: liked ? '#ec4899' : 'var(--text-secondary)',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!liked) e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                if (!liked) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Heart size={18} fill={liked ? '#ec4899' : 'none'} />
            </button>

            <button
              onClick={() => setPlaylistModalOpen(true)}
              title="Add to playlist"
              style={{
                color: 'var(--text-secondary)',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <ListPlus size={18} />
            </button>
          </div>
        </div>

        {/* Center: Controls & Scrubber */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '650px',
            padding: '0 16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={toggleShuffle}
              title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
              style={{
                color: isShuffle ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                padding: '4px',
                transition: 'color var(--transition-fast)'
              }}
            >
              <Shuffle size={17} />
            </button>

            <button
              onClick={prevSong}
              title="Previous song"
              style={{
                color: 'var(--text-secondary)',
                padding: '4px',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="play-button-glow"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              style={{ width: '42px', height: '42px' }}
            >
              {isPlaying ? (
                <Pause size={20} fill="#fff" />
              ) : (
                <Play size={20} fill="#fff" style={{ marginLeft: '2px' }} />
              )}
            </button>

            <button
              onClick={nextSong}
              title="Next song"
              style={{
                color: 'var(--text-secondary)',
                padding: '4px',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={cycleRepeat}
              title={`Repeat: ${repeatMode}`}
              style={{
                color: repeatMode !== 'off' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                padding: '4px',
                transition: 'color var(--transition-fast)'
              }}
            >
              {repeatMode === 'one' ? <Repeat1 size={17} /> : <Repeat size={17} />}
            </button>
          </div>

          <ProgressBar currentTime={currentTime} duration={duration} onSeek={seekTo} />
        </div>

        {/* Right: Queue & Volume Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '280px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setQueueOpen((prev) => !prev)}
            title="Queue"
            style={{
              color: queueOpen ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              padding: '6px',
              position: 'relative'
            }}
          >
            <ListMusic size={20} />
            {queue.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '0px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)'
                }}
              />
            )}
          </button>

          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={changeVolume}
            onToggleMute={toggleMute}
          />

          <button
            onClick={() => setFullscreenOpen(true)}
            title="Fullscreen player"
            style={{
              color: 'var(--text-secondary)',
              padding: '6px',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </footer>

      {/* Slide-out Queue Drawer */}
      <QueueDrawer isOpen={queueOpen} onClose={() => setQueueOpen(false)} />

      {/* Fullscreen Overlay */}
      <FullscreenPlayer isOpen={fullscreenOpen} onClose={() => setFullscreenOpen(false)} />

      {/* Add To Playlist Modal */}
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={currentSong}
      />
    </>
  );
};

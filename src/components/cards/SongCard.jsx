import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const SongCard = ({ song, playlist = null }) => {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, playlist);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '14px',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        group: true
      }}
      onClick={handlePlayClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        const btn = e.currentTarget.querySelector('.card-play-btn');
        if (btn) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const btn = e.currentTarget.querySelector('.card-play-btn');
        if (btn && !isCurrentSong) {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(8px)';
        }
      }}
    >
      {/* Artwork Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <img
          src={song.artwork}
          alt={song.title}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Floating Play Button */}
        <button
          className="card-play-btn play-button-glow"
          onClick={handlePlayClick}
          aria-label={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '42px',
            height: '42px',
            opacity: isCurrentSong ? 1 : 0,
            transform: isCurrentSong ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all var(--transition-normal)'
          }}
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={18} fill="#fff" />
          ) : (
            <Play size={18} fill="#fff" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div
          style={{
            fontSize: '0.94rem',
            fontWeight: 700,
            color: isCurrentSong ? 'var(--accent-cyan)' : '#f8fafc',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {song.title}
        </div>

        <Link
          to={`/artist/${song.artistId}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: 'none'
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
          {song.artist}
        </Link>
      </div>
    </div>
  );
};

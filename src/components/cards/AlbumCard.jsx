import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { mockSongs } from '../../data/mockSongs';

export const AlbumCard = ({ album }) => {
  const { playSong } = useAudio();
  const navigate = useNavigate();

  const handlePlayAlbum = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const albumTracks = mockSongs.filter((s) => s.albumId === album.id);
    if (albumTracks.length > 0) {
      playSong(albumTracks[0], albumTracks);
    }
  };

  return (
    <div
      className="glass-panel"
      onClick={() => navigate(`/album/${album.id}`)}
      style={{
        padding: '14px',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        const btn = e.currentTarget.querySelector('.alb-play-btn');
        if (btn) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const btn = e.currentTarget.querySelector('.alb-play-btn');
        if (btn) {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(8px)';
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.4)'
        }}
      >
        <img
          src={album.artwork}
          alt={album.title}
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <button
          className="alb-play-btn play-button-glow"
          onClick={handlePlayAlbum}
          aria-label={`Play ${album.title}`}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '42px',
            height: '42px',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all var(--transition-normal)'
          }}
        >
          <Play size={18} fill="#fff" style={{ marginLeft: '2px' }} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div
          style={{
            fontSize: '0.94rem',
            fontWeight: 700,
            color: '#f8fafc',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {album.title}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {album.releaseYear} • {album.artist}
        </div>
      </div>
    </div>
  );
};

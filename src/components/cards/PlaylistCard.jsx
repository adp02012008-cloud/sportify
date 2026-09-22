import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { mockSongs } from '../../data/mockSongs';

export const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { playSong } = useAudio();

  const handlePlayPlaylist = (e) => {
    e.stopPropagation();
    const tracks = mockSongs.filter((s) => playlist.songIds.includes(s.id));
    if (tracks.length > 0) {
      playSong(tracks[0], tracks);
    }
  };

  return (
    <div
      className="glass-panel"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
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
        const btn = e.currentTarget.querySelector('.pl-play-btn');
        if (btn) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const btn = e.currentTarget.querySelector('.pl-play-btn');
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
          src={playlist.cover}
          alt={playlist.name}
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <button
          className="pl-play-btn play-button-glow"
          onClick={handlePlayPlaylist}
          aria-label={`Play ${playlist.name}`}
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
          {playlist.name}
        </div>

        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4
          }}
        >
          {playlist.description || `By ${playlist.creator}`}
        </div>
      </div>
    </div>
  );
};

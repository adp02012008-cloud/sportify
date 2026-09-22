import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { mockSongs } from '../../data/mockSongs';

export const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  const { playSong } = useAudio();

  const handlePlayArtist = (e) => {
    e.stopPropagation();
    const artistTracks = mockSongs.filter((s) => s.artistId === artist.id);
    if (artistTracks.length > 0) {
      playSong(artistTracks[0], artistTracks);
    }
  };

  return (
    <div
      className="glass-panel"
      onClick={() => navigate(`/artist/${artist.id}`)}
      style={{
        padding: '16px',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '14px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        const btn = e.currentTarget.querySelector('.artist-play-btn');
        if (btn) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const btn = e.currentTarget.querySelector('.artist-play-btn');
        if (btn) {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(8px)';
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}
      >
        <img
          src={artist.avatar}
          alt={artist.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <button
          className="artist-play-btn play-button-glow"
          onClick={handlePlayArtist}
          aria-label={`Play ${artist.name}`}
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            width: '38px',
            height: '38px',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all var(--transition-normal)'
          }}
        >
          <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />
        </button>
      </div>

      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '0.96rem',
            fontWeight: 700,
            color: '#f8fafc',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          <span>{artist.name}</span>
          {artist.verified && (
            <CheckCircle2 size={14} color="#3b82f6" fill="#3b82f6" stroke="#0a0a0f" />
          )}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
          Artist • {artist.monthlyListeners} listeners
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Play, Shuffle, Heart, Clock, Music } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { useAudio } from '../context/AudioContext';
import { useUser } from '../context/UserContext';
import { mockSongs } from '../data/mockSongs';
import { SongRow } from '../components/cards/SongRow';
import { Link } from 'react-router-dom';

export const LikedSongs = () => {
  const { likedSongIds } = useLibrary();
  const { playSong, isShuffle, toggleShuffle } = useAudio();
  const { user } = useUser();

  const likedTracks = mockSongs.filter((s) => likedSongIds.includes(s.id));
  const totalDurationSec = likedTracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMins = Math.floor(totalDurationSec / 60);

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      playSong(likedTracks[0], likedTracks);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 40px rgba(236, 72, 153, 0.35)'
          }}
        >
          <Heart size={84} fill="#ffffff" color="#ffffff" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="badge" style={{ alignSelf: 'flex-start' }}>PLAYLIST</div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Liked Songs
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 700, color: '#f8fafc' }}>
              {user ? user.name : 'Your Library'}
            </span>
            <span>•</span>
            <span>{likedTracks.length} songs</span>
            {totalMins > 0 && (
              <>
                <span>•</span>
                <span>{totalMins} min</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <button
          onClick={handlePlayAll}
          disabled={likedTracks.length === 0}
          className="play-button-glow"
          style={{ width: '56px', height: '56px', opacity: likedTracks.length === 0 ? 0.5 : 1 }}
          aria-label="Play all liked songs"
        >
          <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
        </button>

        <button
          onClick={toggleShuffle}
          disabled={likedTracks.length === 0}
          className="btn-secondary"
          style={{ color: isShuffle ? 'var(--accent-cyan)' : '#fff' }}
        >
          <Shuffle size={18} />
          <span>{isShuffle ? 'Shuffling' : 'Shuffle'}</span>
        </button>
      </div>

      {/* Tracks Table */}
      {likedTracks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <Music size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px auto', display: 'block' }} />
          <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '8px' }}>
            Songs you like will appear here
          </h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Save songs by clicking the heart icon anywhere in SoundWave.
          </p>
          <Link to="/search" className="btn-primary">
            Find Songs
          </Link>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px minmax(200px, 3fr) minmax(120px, 2fr) 90px 48px',
              gap: '16px',
              padding: '8px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '8px'
            }}
          >
            <span style={{ textAlign: 'center' }}>#</span>
            <span>Title</span>
            <span>Album</span>
            <span style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <Clock size={14} />
            </span>
            <span />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {likedTracks.map((song, idx) => (
              <SongRow key={song.id} song={song} index={idx} playlist={likedTracks} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

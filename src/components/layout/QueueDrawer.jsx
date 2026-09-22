import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { X, Play, Trash2, Shuffle, Music } from 'lucide-react';

export const QueueDrawer = ({ isOpen, onClose }) => {
  const {
    queue,
    queueIndex,
    currentSong,
    isPlaying,
    playSong,
    removeFromQueue,
    clearQueue,
    isShuffle,
    toggleShuffle
  } = useAudio();

  if (!isOpen) return null;

  const upNext = queue.slice(queueIndex + 1);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 'var(--player-height)',
        width: '100%',
        maxWidth: '380px',
        background: 'rgba(15, 15, 23, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.6)',
        animation: 'slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Drawer Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px 16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={18} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Play Queue</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleShuffle}
            title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
            style={{
              color: isShuffle ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              padding: '6px'
            }}
          >
            <Shuffle size={16} />
          </button>
          {queue.length > 1 && (
            <button
              onClick={clearQueue}
              title="Clear queue"
              style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: '4px 8px' }}
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close queue"
            style={{ color: 'var(--text-secondary)', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Queue Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Now Playing Section */}
        {currentSong && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '10px' }}>
              Now Playing
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '10px'
              }}
            >
              <img
                src={currentSong.artwork}
                alt={currentSong.title}
                style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {currentSong.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {currentSong.artist}
                </div>
              </div>
              {isPlaying && (
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '16px' }}>
                  <span className="eq-bar"></span>
                  <span className="eq-bar"></span>
                  <span className="eq-bar"></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Up Next List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
              Next Up ({upNext.length})
            </div>
          </div>

          {upNext.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Queue is empty. Select songs or playlists to add more tracks!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {upNext.map((song, idx) => {
                const actualIndex = queueIndex + 1 + idx;
                return (
                  <div
                    key={`${song.id}-${actualIndex}`}
                    onClick={() => playSong(song)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <img
                      src={song.artwork}
                      alt={song.title}
                      style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {song.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        {song.artist}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginRight: '4px' }}>
                      {song.durationStr}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromQueue(actualIndex);
                      }}
                      title="Remove from queue"
                      style={{ color: '#94a3b8', padding: '4px' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

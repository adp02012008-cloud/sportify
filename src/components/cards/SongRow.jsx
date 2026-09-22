import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Heart, MoreHorizontal, ListPlus, ListOrdered, Share2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useLibrary } from '../../context/LibraryContext';
import { useToast } from '../../context/ToastContext';
import { AddToPlaylistModal } from '../common/AddToPlaylistModal';

export const SongRow = ({ song, index, playlist = null, onRemove = null }) => {
  const { currentSong, isPlaying, playSong, togglePlay, playNextInQueue, addToQueue } = useAudio();
  const { isSongLiked, toggleLikeSong } = useLibrary();
  const { addToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const menuRef = useRef(null);

  const isCurrentSong = currentSong?.id === song.id;
  const liked = isSongLiked(song.id);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRowClick = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, playlist);
    }
  };

  const handlePlayNext = (e) => {
    e.stopPropagation();
    playNextInQueue(song);
    setMenuOpen(false);
    addToast(`"${song.title}" will play next`, 'info');
  };

  const handleAddToQueue = (e) => {
    e.stopPropagation();
    addToQueue(song);
    setMenuOpen(false);
    addToast(`Added "${song.title}" to queue`, 'info');
  };

  return (
    <>
      <div
        className="song-row"
        onClick={handleRowClick}
        style={{
          display: 'grid',
          gridTemplateColumns: '40px minmax(200px, 3fr) minmax(120px, 2fr) 90px 48px',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'background var(--transition-fast)',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          const playBtn = e.currentTarget.querySelector('.row-play-btn');
          const indexSpan = e.currentTarget.querySelector('.row-index');
          if (playBtn && indexSpan) {
            playBtn.style.display = 'flex';
            indexSpan.style.display = 'none';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          const playBtn = e.currentTarget.querySelector('.row-play-btn');
          const indexSpan = e.currentTarget.querySelector('.row-index');
          if (playBtn && indexSpan && !isCurrentSong) {
            playBtn.style.display = 'none';
            indexSpan.style.display = 'flex';
          }
        }}
      >
        {/* Index or Play icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isCurrentSong && isPlaying ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '14px', gap: '1px' }}>
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
          ) : (
            <>
              <span
                className="row-index"
                style={{
                  color: isCurrentSong ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {index + 1}
              </span>
              <button
                className="row-play-btn"
                style={{
                  display: isCurrentSong ? 'flex' : 'none',
                  color: '#ffffff',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isCurrentSong && isPlaying ? <Pause size={15} fill="#fff" /> : <Play size={15} fill="#fff" />}
              </button>
            </>
          )}
        </div>

        {/* Title & Artist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <img
            src={song.artwork}
            alt={song.title}
            style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                color: isCurrentSong ? 'var(--accent-cyan)' : '#f8fafc',
                fontWeight: 600,
                fontSize: '0.9rem',
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
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {song.artist}
            </Link>
          </div>
        </div>

        {/* Album */}
        <div style={{ overflow: 'hidden' }}>
          <Link
            to={`/album/${song.albumId}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            {song.album}
          </Link>
        </div>

        {/* Duration & Heart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeSong(song.id, song.title);
            }}
            style={{
              color: liked ? '#ec4899' : 'var(--text-muted)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Heart size={15} fill={liked ? '#ec4899' : 'none'} />
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
            {song.durationStr}
          </span>
        </div>

        {/* More Options Dropdown */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            aria-label="More options"
            style={{
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div
              className="glass-dropdown"
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                width: '180px',
                padding: '6px',
                zIndex: 300,
                boxShadow: 'var(--shadow-lg)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setPlaylistModalOpen(true);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  color: '#fff',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <ListPlus size={15} />
                <span>Add to playlist</span>
              </button>

              <button
                onClick={handlePlayNext}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  color: '#fff',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <ListOrdered size={15} />
                <span>Play next</span>
              </button>

              <button
                onClick={handleAddToQueue}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  color: '#fff',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <ListPlus size={15} />
                <span>Add to queue</span>
              </button>

              {onRemove && (
                <button
                  onClick={(e) => {
                    setMenuOpen(false);
                    onRemove(song.id);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    color: '#f87171',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>Remove from playlist</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={song}
      />
    </>
  );
};

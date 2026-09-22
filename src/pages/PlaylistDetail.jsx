import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Shuffle, Edit2, Trash2, Clock, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { useAudio } from '../context/AudioContext';
import { mockSongs } from '../data/mockSongs';
import { SongRow } from '../components/cards/SongRow';
import { CreatePlaylistModal } from '../components/common/CreatePlaylistModal';

export const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allPlaylists, deletePlaylist, removeSongFromPlaylist, addSongToPlaylist, reorderPlaylistSongs } = useLibrary();
  const { playSong, isShuffle, toggleShuffle } = useAudio();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchSongQuery, setSearchSongQuery] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);

  const playlist = allPlaylists.find((p) => p.id === id) || allPlaylists[0];

  // Tracks in playlist
  const tracks = playlist ? mockSongs.filter((s) => playlist.songIds.includes(s.id)) : [];

  // Total duration in minutes
  const totalDurationSec = tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMins = Math.floor(totalDurationSec / 60);

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playSong(tracks[0], tracks);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
      navigate('/library');
    }
  };

  const handleMoveSong = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= playlist.songIds.length) return;
    const newSongIds = [...playlist.songIds];
    const [moved] = newSongIds.splice(index, 1);
    newSongIds.splice(targetIdx, 0, moved);
    reorderPlaylistSongs(playlist.id, newSongIds);
  };

  // Recommended tracks to add that are not already in the playlist
  const candidateTracks = mockSongs
    .filter((s) => !playlist.songIds.includes(s.id))
    .filter(
      (s) =>
        !searchSongQuery.trim() ||
        s.title.toLowerCase().includes(searchSongQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchSongQuery.toLowerCase())
    )
    .slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap'
        }}
      >
        <img
          src={playlist.cover}
          alt={playlist.name}
          style={{
            width: '210px',
            height: '210px',
            borderRadius: '16px',
            objectFit: 'cover',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div className="badge">{playlist.isUserCreated ? 'CUSTOM PLAYLIST' : 'EDITORIAL PLAYLIST'}</div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {playlist.name}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '600px', lineHeight: 1.4 }}>
            {playlist.description || 'Curated SoundWave playlist.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600, color: '#f8fafc' }}>{playlist.creator}</span>
            <span>•</span>
            <span>{tracks.length} songs</span>
            {totalMins > 0 && (
              <>
                <span>•</span>
                <span>about {totalMins} min</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={handlePlayAll}
          disabled={tracks.length === 0}
          className="play-button-glow"
          style={{ width: '56px', height: '56px', opacity: tracks.length === 0 ? 0.5 : 1 }}
          aria-label="Play playlist"
        >
          <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
        </button>

        <button
          onClick={toggleShuffle}
          className="btn-secondary"
          style={{ color: isShuffle ? 'var(--accent-cyan)' : '#fff' }}
        >
          <Shuffle size={18} />
          <span>{isShuffle ? 'Shuffling' : 'Shuffle'}</span>
        </button>

        {playlist.isUserCreated && (
          <>
            <button
              onClick={() => setEditModalOpen(true)}
              className="btn-secondary"
              title="Edit playlist name or artwork"
            >
              <Edit2 size={16} />
              <span>Edit Details</span>
            </button>

            <button
              onClick={handleDelete}
              className="btn-secondary"
              style={{ color: '#f87171' }}
              title="Delete playlist"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </>
        )}

        <button
          onClick={() => setShowAddSection((prev) => !prev)}
          className="btn-secondary"
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={16} />
          <span>{showAddSection ? 'Hide Song Suggestions' : 'Find More Songs'}</span>
        </button>
      </div>

      {/* Tracks Table */}
      {tracks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '8px' }}>
            This playlist is currently empty
          </h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Find tracks below and add your favorite anthems to this mix.
          </p>
          <button
            onClick={() => setShowAddSection(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            <span>Add Songs</span>
          </button>
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
            {tracks.map((song, idx) => (
              <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ flex: 1 }}>
                  <SongRow
                    song={song}
                    index={idx}
                    playlist={tracks}
                    onRemove={
                      playlist.isUserCreated
                        ? () => removeSongFromPlaylist(playlist.id, song.id, song.title)
                        : null
                    }
                  />
                </div>

                {playlist.isUserCreated && tracks.length > 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={() => handleMoveSong(idx, -1)}
                      disabled={idx === 0}
                      style={{ color: idx === 0 ? 'rgba(255,255,255,0.1)' : 'var(--text-muted)', padding: '2px' }}
                      title="Move up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      onClick={() => handleMoveSong(idx, 1)}
                      disabled={idx === tracks.length - 1}
                      style={{ color: idx === tracks.length - 1 ? 'rgba(255,255,255,0.1)' : 'var(--text-muted)', padding: '2px' }}
                      title="Move down"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Songs to Add */}
      {showAddSection && (
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Find songs to add</h3>
            <input
              type="text"
              placeholder="Filter songs by title or artist..."
              value={searchSongQuery}
              onChange={(e) => setSearchSongQuery(e.target.value)}
              style={{
                width: '260px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '0.86rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {candidateTracks.map((song) => (
              <div
                key={song.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={song.artwork}
                    alt={song.title}
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{song.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{song.artist}</div>
                  </div>
                </div>

                <button
                  onClick={() => addSongToPlaylist(playlist.id, song.id, song.title)}
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  <Plus size={14} />
                  <span>Add to playlist</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {playlist.isUserCreated && (
        <CreatePlaylistModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          editingPlaylist={playlist}
        />
      )}
    </div>
  );
};

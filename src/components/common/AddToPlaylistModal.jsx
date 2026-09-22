import React, { useState } from 'react';
import { Modal } from './Modal';
import { useLibrary } from '../../context/LibraryContext';
import { Plus, Check, ListMusic } from 'lucide-react';

export const AddToPlaylistModal = ({ isOpen, onClose, song }) => {
  const { customPlaylists, addSongToPlaylist, removeSongFromPlaylist, createPlaylist } = useLibrary();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateInput, setShowCreateInput] = useState(false);

  if (!song) return null;

  const handleToggleSongInPlaylist = (playlist) => {
    const isAlreadyIn = playlist.songIds.includes(song.id);
    if (isAlreadyIn) {
      removeSongFromPlaylist(playlist.id, song.id, song.title);
    } else {
      addSongToPlaylist(playlist.id, song.id, song.title);
    }
  };

  const handleCreateAndAdd = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const newId = createPlaylist(newPlaylistName.trim());
    addSongToPlaylist(newId, song.id, song.title);
    setNewPlaylistName('');
    setShowCreateInput(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add to Playlist" maxWidth="440px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Selected Song Preview */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <img
            src={song.artwork}
            alt={song.title}
            style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {song.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {song.artist}
            </div>
          </div>
        </div>

        {/* Playlists List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
          {customPlaylists.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No custom playlists created yet.
            </div>
          ) : (
            customPlaylists.map((playlist) => {
              const isInPlaylist = playlist.songIds.includes(song.id);
              return (
                <button
                  key={playlist.id}
                  onClick={() => handleToggleSongInPlaylist(playlist)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: isInPlaylist ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isInPlaylist ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isInPlaylist) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isInPlaylist) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                        {playlist.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {playlist.songIds.length} songs
                      </div>
                    </div>
                  </div>

                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isInPlaylist ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)',
                    color: isInPlaylist ? '#000' : 'var(--text-secondary)'
                  }}>
                    {isInPlaylist ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Create and Add inline */}
        {showCreateInput ? (
          <form onSubmit={handleCreateAndAdd} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              autoFocus
              placeholder="New playlist name..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.88rem'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Create
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowCreateInput(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '10px',
              border: '1px dashed rgba(255, 255, 255, 0.2)',
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <Plus size={16} />
            <span>Create new playlist</span>
          </button>
        )}
      </div>
    </Modal>
  );
};

import React, { useState } from 'react';
import { Modal } from './Modal';
import { useLibrary } from '../../context/LibraryContext';
import { Music, Image as ImageIcon } from 'lucide-react';

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80'
];

export const CreatePlaylistModal = ({ isOpen, onClose, editingPlaylist = null }) => {
  const { createPlaylist, updatePlaylist } = useLibrary();
  const [name, setName] = useState(editingPlaylist ? editingPlaylist.name : '');
  const [description, setDescription] = useState(editingPlaylist ? editingPlaylist.description : '');
  const [cover, setCover] = useState(
    editingPlaylist ? editingPlaylist.cover : COVER_PRESETS[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingPlaylist) {
      updatePlaylist(editingPlaylist.id, { name: name.trim(), description: description.trim(), cover });
    } else {
      createPlaylist(name.trim(), description.trim(), cover);
    }
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPlaylist ? 'Edit Playlist Details' : 'Create New Playlist'}
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Cover Preview & Presets */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Playlist Artwork
          </label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img
              src={cover}
              alt="Playlist preview"
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Choose an aesthetic artwork:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {COVER_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCover(preset)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: cover === preset ? '2px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                      opacity: cover === preset ? 1 : 0.6,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <img src={preset} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Playlist Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Synthwave Highway, Focus Beats"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: '0.95rem'
            }}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Description (optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Give your playlist a memorable vibe or story..."
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={!name.trim()}
          >
            {editingPlaylist ? 'Save Changes' : 'Create Playlist'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

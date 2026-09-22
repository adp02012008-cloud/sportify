import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  Library,
  PlusSquare,
  Heart,
  Settings,
  Radio,
  Music,
  Trash2,
  FolderHeart
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { CreatePlaylistModal } from '../common/CreatePlaylistModal';

export const Sidebar = () => {
  const { customPlaylists, deletePlaylist, likedSongIds } = useLibrary();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '11px 16px',
    borderRadius: '10px',
    color: isActive ? '#ffffff' : 'var(--text-secondary)',
    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.92rem',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none'
  });

  return (
    <>
      <aside
        className="glass-panel"
        style={{
          width: 'var(--sidebar-width)',
          minWidth: 'var(--sidebar-width)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(12, 12, 18, 0.96)',
          borderRight: '1px solid rgba(255, 255, 255, 0.07)',
          padding: '20px 14px',
          overflow: 'hidden',
          zIndex: 50
        }}
      >
        {/* SoundWave Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '4px 10px 20px 10px',
            textDecoration: 'none'
          }}
        >
          <img
            src="/soundwave-logo.svg"
            alt="SoundWave"
            style={{ width: '38px', height: '38px', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.45))' }}
          />
          <div>
            <div
              style={{
                fontSize: '1.3rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SoundWave
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Lossless Stream
            </div>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <NavLink to="/" style={navItemStyle}>
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/search" style={navItemStyle}>
            <Search size={20} />
            <span>Search</span>
          </NavLink>

          <NavLink to="/library" style={navItemStyle}>
            <Library size={20} />
            <span>Your Library</span>
          </NavLink>
        </nav>

        {/* Quick Actions */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => setCreateModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 16px',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <PlusSquare size={16} />
            </div>
            <span>Create Playlist</span>
          </button>

          <NavLink to="/liked" style={navItemStyle}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Heart size={14} fill="#fff" />
            </div>
            <span>Liked Songs</span>
            {likedSongIds.length > 0 && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.72rem',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-muted)'
                }}
              >
                {likedSongIds.length}
              </span>
            )}
          </NavLink>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '16px 12px' }} />

        {/* Custom Playlists Scrollable List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ padding: '4px 14px 8px 14px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 600 }}>
            Custom Playlists
          </div>

          {customPlaylists.map((pl) => (
            <div
              key={pl.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                color: 'var(--text-secondary)',
                transition: 'all var(--transition-fast)',
                group: true
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                const delBtn = e.currentTarget.querySelector('.pl-del-btn');
                if (delBtn) delBtn.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
                const delBtn = e.currentTarget.querySelector('.pl-del-btn');
                if (delBtn) delBtn.style.opacity = '0';
              }}
            >
              <Link
                to={`/playlist/${pl.id}`}
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                {pl.name}
              </Link>
              <button
                className="pl-del-btn"
                title="Delete playlist"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  deletePlaylist(pl.id);
                }}
                style={{
                  opacity: 0,
                  transition: 'opacity var(--transition-fast)',
                  color: '#94a3b8',
                  padding: '2px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer / Settings */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <NavLink to="/settings" style={navItemStyle}>
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      <CreatePlaylistModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </>
  );
};

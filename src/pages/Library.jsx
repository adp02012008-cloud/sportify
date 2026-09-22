import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { mockSongs } from '../data/mockSongs';
import { mockAlbums } from '../data/mockAlbums';
import { mockArtists } from '../data/mockArtists';
import { PlaylistCard } from '../components/cards/PlaylistCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { ArtistCard } from '../components/cards/ArtistCard';
import { SongRow } from '../components/cards/SongRow';
import { CreatePlaylistModal } from '../components/common/CreatePlaylistModal';
import { Link } from 'react-router-dom';

export const Library = () => {
  const { allPlaylists, likedSongIds, savedAlbumIds, followedArtistIds } = useLibrary();
  const [activeTab, setActiveTab] = useState('playlists'); // 'playlists' | 'songs' | 'albums' | 'artists'
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'alpha'
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filtered collections
  const savedAlbums = mockAlbums.filter((a) => savedAlbumIds.includes(a.id));
  const followedArtists = mockArtists.filter((a) => followedArtistIds.includes(a.id));
  const likedSongs = mockSongs.filter((s) => likedSongIds.includes(s.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Your Library</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
            Manage your saved music, playlists, favorite artists, and custom mixes
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          <span>Create Playlist</span>
        </button>
      </div>

      {/* Tabs & Search/Sort Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px'
        }}
      >
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'playlists', label: `Playlists (${allPlaylists.length})` },
            { id: 'songs', label: `Liked Songs (${likedSongs.length})` },
            { id: 'albums', label: `Albums (${savedAlbums.length})` },
            { id: 'artists', label: `Artists (${followedArtists.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.06)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search inside library */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Filter library..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '0.84rem',
                width: '140px'
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
              fontSize: '0.84rem'
            }}
          >
            <option value="recent" style={{ background: '#12121a' }}>Recently Added</option>
            <option value="alpha" style={{ background: '#12121a' }}>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* TAB CONTENT: PLAYLISTS */}
      {activeTab === 'playlists' && (
        <div>
          {allPlaylists.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No playlists found. Create your first playlist to get started!
            </div>
          ) : (
            <div className="music-grid">
              {allPlaylists
                .filter((p) => !searchFilter || p.name.toLowerCase().includes(searchFilter.toLowerCase()))
                .sort((a, b) => (sortBy === 'alpha' ? a.name.localeCompare(b.name) : 0))
                .map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SONGS */}
      {activeTab === 'songs' && (
        <div>
          {likedSongs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No liked songs in your library yet. Explore and like songs to see them here!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {likedSongs
                .filter(
                  (s) =>
                    !searchFilter ||
                    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    s.artist.toLowerCase().includes(searchFilter.toLowerCase())
                )
                .sort((a, b) => (sortBy === 'alpha' ? a.title.localeCompare(b.title) : 0))
                .map((song, idx) => (
                  <SongRow key={song.id} song={song} index={idx} playlist={likedSongs} />
                ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ALBUMS */}
      {activeTab === 'albums' && (
        <div>
          {savedAlbums.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No albums saved to your library yet. Browse albums and click the heart icon to save them.
            </div>
          ) : (
            <div className="music-grid">
              {savedAlbums
                .filter(
                  (a) =>
                    !searchFilter ||
                    a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    a.artist.toLowerCase().includes(searchFilter.toLowerCase())
                )
                .sort((a, b) => (sortBy === 'alpha' ? a.title.localeCompare(b.title) : 0))
                .map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ARTISTS */}
      {activeTab === 'artists' && (
        <div>
          {followedArtists.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              You are not following any artists yet. Find artists you love and follow them for updates!
            </div>
          ) : (
            <div className="music-grid">
              {followedArtists
                .filter((a) => !searchFilter || a.name.toLowerCase().includes(searchFilter.toLowerCase()))
                .sort((a, b) => (sortBy === 'alpha' ? a.name.localeCompare(b.name) : 0))
                .map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
          )}
        </div>
      )}

      <CreatePlaylistModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

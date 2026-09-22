import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Play, Music, Radio, Disc, ListMusic, Sparkles } from 'lucide-react';
import { mockSongs } from '../data/mockSongs';
import { mockArtists } from '../data/mockArtists';
import { mockAlbums } from '../data/mockAlbums';
import { mockPlaylists, mockGenres } from '../data/mockPlaylists';
import { SongRow } from '../components/cards/SongRow';
import { ArtistCard } from '../components/cards/ArtistCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { PlaylistCard } from '../components/cards/PlaylistCard';
import { useAudio } from '../context/AudioContext';

const RECENT_SEARCHES_DEFAULT = ['Arijit', 'Anirudh', 'CyberPulse', 'Lo-fi', 'Electronic'];

export const Search = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'songs' | 'artists' | 'albums' | 'playlists'
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_recent_searches');
      return saved ? JSON.parse(saved) : RECENT_SEARCHES_DEFAULT;
    } catch {
      return RECENT_SEARCHES_DEFAULT;
    }
  });

  const { playSong } = useAudio();
  const navigate = useNavigate();

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleSelectRecent = (term) => {
    setQuery(term);
  };

  const removeRecent = (term, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    localStorage.setItem('soundwave_recent_searches', JSON.stringify(updated));
  };

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matchedSongs = mockSongs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q)
    );

    const matchedArtists = mockArtists.filter(
      (a) => a.name.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q)
    );

    const matchedAlbums = mockAlbums.filter(
      (alb) =>
        alb.title.toLowerCase().includes(q) ||
        alb.artist.toLowerCase().includes(q) ||
        alb.genre.toLowerCase().includes(q)
    );

    const matchedPlaylists = mockPlaylists.filter(
      (pl) => pl.name.toLowerCase().includes(q) || pl.description.toLowerCase().includes(q)
    );

    // Pick top result (artist match preferred if name matches, else song, else album)
    let topResult = null;
    if (matchedArtists.length > 0 && matchedArtists[0].name.toLowerCase().startsWith(q)) {
      topResult = { type: 'artist', data: matchedArtists[0] };
    } else if (matchedSongs.length > 0) {
      topResult = { type: 'song', data: matchedSongs[0] };
    } else if (matchedArtists.length > 0) {
      topResult = { type: 'artist', data: matchedArtists[0] };
    } else if (matchedAlbums.length > 0) {
      topResult = { type: 'album', data: matchedAlbums[0] };
    } else if (matchedPlaylists.length > 0) {
      topResult = { type: 'playlist', data: matchedPlaylists[0] };
    }

    return {
      topResult,
      songs: matchedSongs,
      artists: matchedArtists,
      albums: matchedAlbums,
      playlists: matchedPlaylists,
      totalCount: matchedSongs.length + matchedArtists.length + matchedAlbums.length + matchedPlaylists.length
    };
  }, [query]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Search Input Bar */}
      <div style={{ maxWidth: '600px', width: '100%', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '12px 20px',
            transition: 'border-color var(--transition-fast), background var(--transition-fast)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          <SearchIcon size={20} color="var(--text-secondary)" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="What do you want to listen to? (Songs, artists, genres...)"
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#ffffff'
            }}
          />
          {query && (
            <button
              onClick={handleClear}
              aria-label="Clear search"
              style={{
                color: 'var(--text-secondary)',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Recent Search Pills (if no query) */}
        {!query && recentSearches.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Recent:
            </span>
            {recentSearches.map((term) => (
              <div
                key={term}
                onClick={() => handleSelectRecent(term)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <span>{term}</span>
                <button
                  onClick={(e) => removeRecent(term, e)}
                  style={{ color: 'var(--text-muted)', padding: '1px' }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FILTER PILLS WHEN SEARCHING */}
      {query && searchResults && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'songs', 'artists', 'albums', 'playlists'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                background: activeFilter === f ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.07)',
                color: activeFilter === f ? '#ffffff' : 'var(--text-secondary)',
                border: activeFilter === f ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* SEARCH RESULTS VIEW */}
      {query && searchResults ? (
        searchResults.totalCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '8px' }}>
              No results found for "{query}"
            </h2>
            <p style={{ fontSize: '0.9rem' }}>
              Please check your spelling, or try searching for another artist, song, or genre.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* Top Result + Songs Preview */}
            {(activeFilter === 'all' || activeFilter === 'songs') && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: searchResults.topResult && activeFilter === 'all' ? 'minmax(280px, 1fr) 2fr' : '1fr',
                  gap: '24px'
                }}
              >
                {/* Top Result Card */}
                {searchResults.topResult && activeFilter === 'all' && (
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '14px' }}>Top Result</h2>
                    <div
                      className="glass-panel"
                      onClick={() => {
                        if (searchResults.topResult.type === 'song') {
                          playSong(searchResults.topResult.data, searchResults.songs);
                        } else if (searchResults.topResult.type === 'artist') {
                          navigate(`/artist/${searchResults.topResult.data.id}`);
                        } else if (searchResults.topResult.type === 'album') {
                          navigate(`/album/${searchResults.topResult.data.id}`);
                        } else {
                          navigate(`/playlist/${searchResults.topResult.data.id}`);
                        }
                      }}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '20px',
                        position: 'relative',
                        height: '240px',
                        transition: 'all var(--transition-normal)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        const btn = e.currentTarget.querySelector('.top-play-btn');
                        if (btn) btn.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        const btn = e.currentTarget.querySelector('.top-play-btn');
                        if (btn) btn.style.opacity = '0';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img
                          src={
                            searchResults.topResult.data.avatar ||
                            searchResults.topResult.data.artwork ||
                            searchResults.topResult.data.cover
                          }
                          alt=""
                          style={{
                            width: searchResults.topResult.type === 'artist' ? '92px' : '84px',
                            height: searchResults.topResult.type === 'artist' ? '92px' : '84px',
                            borderRadius: searchResults.topResult.type === 'artist' ? '50%' : '12px',
                            objectFit: 'cover',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: '1.4rem',
                              fontWeight: 800,
                              color: '#fff',
                              lineHeight: 1.2
                            }}
                          >
                            {searchResults.topResult.data.name || searchResults.topResult.data.title}
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
                            {searchResults.topResult.type === 'song' && `${searchResults.topResult.data.artist} • Song`}
                            {searchResults.topResult.type === 'artist' && 'Artist'}
                            {searchResults.topResult.type === 'album' && `${searchResults.topResult.data.artist} • Album`}
                            {searchResults.topResult.type === 'playlist' && 'Playlist'}
                          </div>
                          <div className="badge" style={{ marginTop: '10px' }}>
                            {searchResults.topResult.type.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <button
                        className="top-play-btn play-button-glow"
                        style={{
                          position: 'absolute',
                          bottom: '20px',
                          right: '20px',
                          opacity: 0,
                          transition: 'opacity var(--transition-fast)'
                        }}
                      >
                        <Play size={20} fill="#fff" style={{ marginLeft: '2px' }} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Songs Section */}
                {searchResults.songs.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '14px' }}>Songs</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {(activeFilter === 'songs' ? searchResults.songs : searchResults.songs.slice(0, 5)).map(
                        (song, idx) => (
                          <SongRow key={song.id} song={song} index={idx} playlist={searchResults.songs} />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Artists */}
            {(activeFilter === 'all' || activeFilter === 'artists') && searchResults.artists.length > 0 && (
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Artists</h2>
                <div className="music-grid">
                  {searchResults.artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {(activeFilter === 'all' || activeFilter === 'albums') && searchResults.albums.length > 0 && (
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Albums</h2>
                <div className="music-grid">
                  {searchResults.albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {(activeFilter === 'all' || activeFilter === 'playlists') && searchResults.playlists.length > 0 && (
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Playlists</h2>
                <div className="music-grid">
                  {searchResults.playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )
      ) : (
        /* BROWSE ALL GENRES & CATEGORIES */
        <section>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Sparkles size={22} color="var(--accent-cyan)" />
                Browse All Genres & Moods
              </h2>
              <div className="section-subtitle">Explore soundscapes by musical aesthetic</div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '18px'
            }}
          >
            {mockGenres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => setQuery(genre.name)}
                style={{
                  height: '140px',
                  borderRadius: '14px',
                  background: genre.color,
                  padding: '18px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{genre.name}</h3>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    right: '-12px',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(15deg)'
                  }}
                >
                  <Music size={36} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

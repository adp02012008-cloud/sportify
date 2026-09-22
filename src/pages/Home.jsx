import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, TrendingUp, Radio, Compass, Disc, Heart } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLibrary } from '../context/LibraryContext';
import { useAudio } from '../context/AudioContext';
import { mockSongs } from '../data/mockSongs';
import { mockArtists } from '../data/mockArtists';
import { mockAlbums } from '../data/mockAlbums';
import { mockPlaylists } from '../data/mockPlaylists';
import { SongCard } from '../components/cards/SongCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { ArtistCard } from '../components/cards/ArtistCard';
import { PlaylistCard } from '../components/cards/PlaylistCard';

export const Home = () => {
  const { user } = useUser();
  const { allPlaylists, likedSongIds } = useLibrary();
  const { playSong } = useAudio();

  // Time-based personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Quick jump items (6 tiles)
  const quickJumpItems = [
    {
      id: 'liked',
      title: 'Liked Songs',
      type: 'liked',
      link: '/liked',
      icon: Heart,
      bgGradient: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
      tracks: mockSongs.filter((s) => likedSongIds.includes(s.id))
    },
    ...allPlaylists.slice(0, 5).map((pl) => ({
      id: pl.id,
      title: pl.name,
      type: 'playlist',
      link: `/playlist/${pl.id}`,
      image: pl.cover,
      tracks: mockSongs.filter((s) => pl.songIds.includes(s.id))
    }))
  ];

  const handleQuickPlay = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.tracks && item.tracks.length > 0) {
      playSong(item.tracks[0], item.tracks);
    }
  };

  const trendingSongs = mockSongs.slice(0, 6);
  const madeForYouSongs = mockSongs.slice(6, 12);
  const newReleases = mockAlbums.slice(0, 5);
  const popularArtists = mockArtists.slice(0, 6);
  const moodPlaylists = allPlaylists.slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Hero Greeting & Quick Jump */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {getGreeting()}{user ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
              Here is your daily mix of curated tracks and trending soundscapes.
            </p>
          </div>
        </div>

        {/* 6 Quick Jump Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '14px'
          }}
        >
          {quickJumpItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                position: 'relative',
                group: true
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                const btn = e.currentTarget.querySelector('.quick-play-btn');
                if (btn) btn.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                const btn = e.currentTarget.querySelector('.quick-play-btn');
                if (btn) btn.style.opacity = '0';
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: item.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  <item.icon size={28} fill="#fff" />
                </div>
              )}

              <span
                style={{
                  flex: 1,
                  padding: '0 16px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item.title}
              </span>

              <button
                className="quick-play-btn play-button-glow"
                onClick={(e) => handleQuickPlay(e, item)}
                style={{
                  marginRight: '14px',
                  width: '40px',
                  height: '40px',
                  opacity: 0,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Made For You */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Sparkles size={22} color="var(--accent-cyan)" />
              Made For You
            </h2>
            <div className="section-subtitle">Personalized recommendations aligned with your listening style</div>
          </div>
          <Link to="/search" className="section-link">Show all</Link>
        </div>
        <div className="music-grid">
          {madeForYouSongs.map((song) => (
            <SongCard key={song.id} song={song} playlist={madeForYouSongs} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <TrendingUp size={22} color="#ec4899" />
              Trending Now
            </h2>
            <div className="section-subtitle">What the world is streaming most this week</div>
          </div>
          <Link to="/search" className="section-link">Show all</Link>
        </div>
        <div className="music-grid">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} playlist={trendingSongs} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Radio size={22} color="#3b82f6" />
              Popular Artists
            </h2>
            <div className="section-subtitle">Top chart innovators and viral performers</div>
          </div>
          <Link to="/search" className="section-link">Show all</Link>
        </div>
        <div className="music-grid">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* New Releases / Popular Albums */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Disc size={22} color="#10b981" />
              Popular Albums & New Releases
            </h2>
            <div className="section-subtitle">Fresh full-length master recordings</div>
          </div>
          <Link to="/search" className="section-link">Show all</Link>
        </div>
        <div className="music-grid">
          {newReleases.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Mood-Based Playlists */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Compass size={22} color="#f59e0b" />
              Moods & Curated Playlists
            </h2>
            <div className="section-subtitle">Hand-picked soundtracks for every state of mind</div>
          </div>
          <Link to="/search" className="section-link">Show all</Link>
        </div>
        <div className="music-grid">
          {moodPlaylists.map((pl) => (
            <PlaylistCard key={pl.id} playlist={pl} />
          ))}
        </div>
      </section>
    </div>
  );
};

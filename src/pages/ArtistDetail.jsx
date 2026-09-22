import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, CheckCircle2, UserPlus, UserCheck, Disc, Radio, MoreHorizontal } from 'lucide-react';
import { mockArtists } from '../data/mockArtists';
import { mockSongs } from '../data/mockSongs';
import { mockAlbums } from '../data/mockAlbums';
import { SongRow } from '../components/cards/SongRow';
import { AlbumCard } from '../components/cards/AlbumCard';
import { ArtistCard } from '../components/cards/ArtistCard';
import { useAudio } from '../context/AudioContext';
import { useLibrary } from '../context/LibraryContext';

export const ArtistDetail = () => {
  const { id } = useParams();
  const { playSong } = useAudio();
  const { isArtistFollowed, toggleFollowArtist } = useLibrary();

  const artist = mockArtists.find((a) => a.id === id) || mockArtists[0];
  const followed = isArtistFollowed(artist.id);

  // Songs by this artist
  const artistSongs = mockSongs.filter((s) => s.artistId === artist.id);
  // Albums by this artist
  const artistAlbums = mockAlbums.filter((alb) => alb.artistId === artist.id);
  // Related artists (same genre or others)
  const relatedArtists = mockArtists.filter((a) => a.id !== artist.id).slice(0, 5);

  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      playSong(artistSongs[0], artistSongs);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Banner Header */}
      <div
        style={{
          position: 'relative',
          height: '320px',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '32px 36px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Background Banner with gradient overlay */}
        <img
          src={artist.banner}
          alt={artist.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.2) 0%, rgba(10, 10, 15, 0.85) 75%, rgba(10, 10, 15, 1) 100%)'
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
          <img
            src={artist.avatar}
            alt={artist.name}
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge verified-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} fill="#60a5fa" stroke="#0a0a0f" />
                <span>Verified Artist</span>
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {artist.genre}
              </span>
            </div>

            <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {artist.name}
            </h1>

            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {artist.monthlyListeners} monthly listeners • {artist.followers} followers
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={handlePlayAll}
          className="play-button-glow"
          style={{ width: '56px', height: '56px' }}
          aria-label={`Play ${artist.name}`}
        >
          <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
        </button>

        <button
          onClick={() => toggleFollowArtist(artist.id, artist.name)}
          className={followed ? 'btn-secondary' : 'btn-primary'}
          style={{ padding: '10px 24px' }}
        >
          {followed ? (
            <>
              <UserCheck size={18} />
              <span>Following</span>
            </>
          ) : (
            <>
              <UserPlus size={18} />
              <span>Follow</span>
            </>
          )}
        </button>

        <div style={{ maxWidth: '480px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginLeft: 'auto' }}>
          {artist.bio}
        </div>
      </div>

      {/* Popular Songs */}
      <section>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Popular Tracks</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {artistSongs.map((song, idx) => (
            <SongRow key={song.id} song={song} index={idx} playlist={artistSongs} />
          ))}
        </div>
      </section>

      {/* Discography / Albums */}
      {artistAlbums.length > 0 && (
        <section>
          <div className="section-header">
            <h2 className="section-title">Discography</h2>
          </div>
          <div className="music-grid">
            {artistAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {/* Fans Also Like / Related Artists */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Fans Also Like</h2>
        </div>
        <div className="music-grid">
          {relatedArtists.map((rel) => (
            <ArtistCard key={rel.id} artist={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, Download, Clock, Disc } from 'lucide-react';
import { mockAlbums } from '../data/mockAlbums';
import { mockSongs } from '../data/mockSongs';
import { SongRow } from '../components/cards/SongRow';
import { useAudio } from '../context/AudioContext';
import { useLibrary } from '../context/LibraryContext';
import { useToast } from '../context/ToastContext';

export const AlbumDetail = () => {
  const { id } = useParams();
  const { playSong } = useAudio();
  const { isAlbumSaved, toggleSaveAlbum } = useLibrary();
  const { addToast } = useToast();

  const album = mockAlbums.find((a) => a.id === id) || mockAlbums[0];
  const albumTracks = mockSongs.filter((s) => album.songIds.includes(s.id));
  const saved = isAlbumSaved(album.id);

  const handlePlayAll = () => {
    if (albumTracks.length > 0) {
      playSong(albumTracks[0], albumTracks);
    }
  };

  const handleDownload = () => {
    addToast(`Downloading "${album.title}" for offline playback...`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Section */}
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
          src={album.artwork}
          alt={album.title}
          style={{
            width: '210px',
            height: '210px',
            borderRadius: '16px',
            objectFit: 'cover',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="badge">ALBUM</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {album.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            <Link
              to={`/artist/${album.artistId}`}
              style={{ fontWeight: 700, color: '#f8fafc', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {album.artist}
            </Link>
            <span>•</span>
            <span>{album.releaseYear}</span>
            <span>•</span>
            <span>{albumTracks.length} songs</span>
            <span>•</span>
            <span>{album.durationStr}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={handlePlayAll}
          className="play-button-glow"
          style={{ width: '56px', height: '56px' }}
          aria-label={`Play ${album.title}`}
        >
          <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
        </button>

        <button
          onClick={() => toggleSaveAlbum(album.id, album.title)}
          title={saved ? 'Remove from Your Library' : 'Save to Your Library'}
          style={{
            color: saved ? '#10b981' : 'var(--text-secondary)',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Heart size={24} fill={saved ? '#10b981' : 'none'} />
        </button>

        <button
          onClick={handleDownload}
          title="Download album"
          style={{
            color: 'var(--text-secondary)',
            padding: '10px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Download size={22} />
        </button>
      </div>

      {/* Tracklist Table Header */}
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

        {/* Tracks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {albumTracks.map((song, idx) => (
            <SongRow key={song.id} song={song} index={idx} playlist={albumTracks} />
          ))}
        </div>
      </div>
    </div>
  );
};

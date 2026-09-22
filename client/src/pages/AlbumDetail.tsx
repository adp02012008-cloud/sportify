import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Disc3, Clock, Sparkles } from 'lucide-react';
import { Album, Song } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { SongRow } from '../components/cards/SongRow';

interface AlbumDetailProps {
  onAddToPlaylist: (song: Song) => void;
}

export const AlbumDetail: React.FC<AlbumDetailProps> = ({ onAddToPlaylist }) => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = useAudio();

  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [albumRes, songsRes] = await Promise.all([
          api.albums.getById(id),
          api.songs.getAll(),
        ]);
        setAlbum(albumRes.data);
        setSongs(songsRes.data.filter((s) => s.albumId === id || s.album === albumRes.data.title));
      } catch (err) {
        console.error('Album detail load error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-xs">Loading album...</p>
      </div>
    );
  }

  if (!album) {
    return <div className="py-20 text-center text-gray-400">Album not found.</div>;
  }

  const handlePlayAlbum = () => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c1e38] via-[#121426] to-[#0d0e1b] border border-[#272a4d] flex flex-col sm:flex-row items-start sm:items-end gap-6 shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15"
          style={{ backgroundImage: `url(${album.coverUrl})` }}
        />

        <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 flex-shrink-0">
          <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Album
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <Link to={`/artist/${album.artistId || ''}`} className="font-semibold text-white hover:text-cyan-400 transition-colors">
              {album.artist}
            </Link>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Play Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayAlbum}
          disabled={songs.length === 0}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
        >
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      {/* Tracklist */}
      <div className="space-y-1">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_4fr_3fr_auto_auto] gap-3 px-3 py-2 text-xs font-semibold text-gray-400 border-b border-[#212440]">
          <span className="w-8 text-center">#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <span className="w-10 text-right"><Clock size={14} className="inline" /></span>
          <span className="w-8" />
        </div>

        {songs.map((song, idx) => (
          <SongRow
            key={song.id}
            song={song}
            index={idx}
            playlistContext={songs}
            onAddToPlaylist={onAddToPlaylist}
            showAlbum={false}
          />
        ))}
      </div>
    </div>
  );
};

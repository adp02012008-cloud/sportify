import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Play, UserPlus, UserCheck, Disc3 } from 'lucide-react';
import { Artist, Song, Album } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SongRow } from '../components/cards/SongRow';
import { AlbumCard } from '../components/cards/AlbumCard';

interface ArtistDetailProps {
  onAddToPlaylist: (song: Song) => void;
}

export const ArtistDetail: React.FC<ArtistDetailProps> = ({ onAddToPlaylist }) => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = useAudio();
  const { followedArtists, followArtist, unfollowArtist } = useAuth();
  const { addToast } = useToast();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [artistRes, songsRes, albumsRes] = await Promise.all([
          api.artists.getById(id),
          api.songs.getAll(),
          api.albums.getAll(),
        ]);

        setArtist(artistRes.data);
        // Filter songs by artist name
        setSongs(songsRes.data.filter((s) => s.artist.toLowerCase() === artistRes.data.name.toLowerCase()));
        setAlbums(albumsRes.data.filter((a) => a.artist.toLowerCase() === artistRes.data.name.toLowerCase()));
      } catch (err) {
        console.error('Artist detail error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtistData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-xs">Loading artist...</p>
      </div>
    );
  }

  if (!artist) {
    return <div className="py-20 text-center text-gray-400">Artist not found.</div>;
  }

  const isFollowed = followedArtists.includes(artist.id);

  const handleFollowToggle = () => {
    if (isFollowed) {
      unfollowArtist(artist.id);
      addToast(`Unfollowed ${artist.name}`, 'info');
    } else {
      followArtist(artist.id);
      addToast(`Following ${artist.name}`, 'success');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Artist Hero Header */}
      <div className="relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10 shadow-2xl border border-[#2a2e52]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e101f] via-[#0e101f]/75 to-transparent" />

        <div className="relative z-10 space-y-2">
          {artist.verified && (
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
              <CheckCircle2 size={16} fill="currentColor" className="text-cyan-950" />
              <span>Verified Artist</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight">
            {artist.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            {artist.monthlyListeners ? `${artist.monthlyListeners.toLocaleString()} monthly listeners` : 'SoundWave Artist'} • {artist.genre}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => songs.length > 0 && playSong(songs[0], songs)}
          disabled={songs.length === 0}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
        >
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </button>

        <button
          onClick={handleFollowToggle}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
            isFollowed
              ? 'bg-[#252849] text-gray-200 border border-[#3b3f70]'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {isFollowed ? (
            <>
              <UserCheck size={15} className="text-cyan-400" />
              <span>Following</span>
            </>
          ) : (
            <>
              <UserPlus size={15} />
              <span>Follow</span>
            </>
          )}
        </button>
      </div>

      {/* Popular Tracks Section */}
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Popular Tracks</h2>
        {songs.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">No tracks listed for this artist.</p>
        ) : (
          <div className="space-y-1">
            {songs.slice(0, 5).map((song, idx) => (
              <SongRow
                key={song.id}
                song={song}
                index={idx}
                playlistContext={songs}
                onAddToPlaylist={onAddToPlaylist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Discography Section */}
      {albums.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Disc3 size={20} className="text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Discography</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      {artist.bio && (
        <section className="p-6 rounded-2xl bg-[#141628] border border-[#232644] space-y-2">
          <h2 className="text-base font-bold text-white">About {artist.name}</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
            {artist.bio}
          </p>
        </section>
      )}
    </div>
  );
};

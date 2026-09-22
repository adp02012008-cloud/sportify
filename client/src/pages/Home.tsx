import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, TrendingUp, Compass, Headphones, Disc3, Mic, BookOpen } from 'lucide-react';
import { Song, Playlist, Artist, Album, Podcast } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { SongCard } from '../components/cards/SongCard';
import { PlaylistCard } from '../components/cards/PlaylistCard';
import { ArtistCard } from '../components/cards/ArtistCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { PodcastCard } from '../components/cards/PodcastCard';

interface HomeProps {
  onAddToPlaylist: (song: Song) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToPlaylist }) => {
  const navigate = useNavigate();
  const { playSong } = useAudio();

  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [songsRes, playlistsRes, artistsRes, albumsRes, podcastsRes] = await Promise.all([
          api.songs.getAll(),
          api.playlists.getAll(),
          api.artists.getAll(),
          api.albums.getAll(),
          api.podcasts.getAll(),
        ]);

        setFeaturedSongs(songsRes.data);
        setPlaylists(playlistsRes.data);
        setArtists(artistsRes.data);
        setAlbums(albumsRes.data);
        setPodcasts(podcastsRes.data);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroSong = featuredSongs[0];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Spotlight Banner */}
      {heroSong && (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2a2e55] bg-gradient-to-r from-[#171a36] via-[#121428] to-[#0d0e1b]">
          <div className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm scale-110" style={{ backgroundImage: `url(${heroSong.coverUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e101f] via-[#0e101f]/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles size={14} />
                <span>Featured Masterpiece of the Day</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {heroSong.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-medium">
                By <span className="text-cyan-400 font-semibold">{heroSong.artist}</span> • Album <span className="text-purple-300">{heroSong.album}</span>
              </p>
              <p className="text-xs text-gray-400 line-clamp-2">
                Immerse yourself in neon synthesizers, hyper-detailed percussion, and transcendent acoustic dynamics.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => playSong(heroSong, featuredSongs)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Play Now</span>
                </button>
                <button
                  onClick={() => navigate(`/album/${heroSong.albumId}`)}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                >
                  View Album
                </button>
              </div>
            </div>

            {/* Right floating vinyl card */}
            <div className="hidden md:flex relative group cursor-pointer" onClick={() => playSong(heroSong, featuredSongs)}>
              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-cyan-500/30 group-hover:scale-105 transition-transform duration-500">
                <img src={heroSong.coverUrl} alt={heroSong.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Quick Mix Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
          {greeting()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {playlists.slice(0, 6).map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="group flex items-center gap-3 p-2 rounded-xl bg-[#141628]/80 hover:bg-[#1d203a] border border-[#222543] transition-all cursor-pointer shadow-md hover:shadow-xl"
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                  {playlist.name}
                </h3>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {playlist.songs?.length || 0} tracks
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (playlist.songs && playlist.songs.length > 0) {
                    playSong(playlist.songs[0], playlist.songs);
                  }
                }}
                className="w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 mr-2"
              >
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Trending Tracks Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Trending Tracks</h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {featuredSongs.slice(1, 13).map((song) => (
            <SongCard
              key={song.id}
              song={song}
              playlistContext={featuredSongs}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </div>
      </section>

      {/* 4. Featured Playlists Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Headphones size={20} className="text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">SoundWave Curated Playlists</h2>
          </div>
          <button
            onClick={() => navigate('/library')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.slice(0, 5).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* 5. Popular Artists Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Popular Artists</h2>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.slice(0, 6).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* 6. Popular Albums Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Disc3 size={20} className="text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Hot Albums</h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.slice(0, 5).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* 7. Trending Podcasts Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mic size={20} className="text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Top Podcasts & Talk</h2>
          </div>
          <button
            onClick={() => navigate('/podcasts')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            Explore Podcasts
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {podcasts.slice(0, 5).map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
};
